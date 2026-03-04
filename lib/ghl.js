/**
 * lib/ghl.js
 * GoHighLevel API helper — all GHL interactions go through here
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION = process.env.GHL_LOCATION_ID;

async function ghlFetch(path, method = 'GET', body = null) {
    const res = await fetch(`${GHL_BASE}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
            Version: '2021-07-28',
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || `GHL ${method} ${path} failed (${res.status})`);
    return data;
}

// contactType must be 'employer' or 'jobseeker'
export async function upsertContact({
    contactType,
    firstName,
    lastName,
    email,
    phone,
    // Jobseeker fields
    jobTitle,
    skills,
    experience,
    linkedIn,
    // Employer fields
    companyName,
    companySize,
    industry,
    rolesHiring,
    website,
    // Shared
    source = 'remote-jobs.ph',
}) {
    if (!contactType || !['employer', 'jobseeker'].includes(contactType)) {
        throw new Error('contactType must be "employer" or "jobseeker"');
    }

    const search = await ghlFetch(
        `/contacts/search/duplicate?locationId=${GHL_LOCATION}&email=${encodeURIComponent(email)}`
    );

    const customFields =
        contactType === 'jobseeker'
            ? [
                { key: 'contact_type', field_value: 'jobseeker' },
                { key: 'job_title_applied', field_value: jobTitle || '' },
                { key: 'skills', field_value: skills || '' },
                { key: 'years_experience', field_value: experience || '' },
                { key: 'linkedin_url', field_value: linkedIn || '' },
                { key: 'applicant_source', field_value: source },
            ]
            : [
                { key: 'contact_type', field_value: 'employer' },
                { key: 'company_name', field_value: companyName || '' },
                { key: 'company_size', field_value: companySize || '' },
                { key: 'industry', field_value: industry || '' },
                { key: 'roles_hiring', field_value: rolesHiring || '' },
                { key: 'website', field_value: website || '' },
                { key: 'lead_source', field_value: source },
            ];

    const tags = [
        'remote-jobs-ph',
        contactType,   // 'employer' or 'jobseeker'
        contactType === 'employer'
            ? 'trigger-employer-sequence'
            : 'trigger-jobseeker-sequence',
    ];

    const contactPayload = {
        locationId: GHL_LOCATION,
        firstName,
        lastName,
        email,
        phone,
        ...(contactType === 'employer' && companyName ? { companyName } : {}),
        source,
        customFields,
        tags,
    };

    if (search?.contact?.id) {
        const updated = await ghlFetch(`/contacts/${search.contact.id}`, 'PUT', contactPayload);
        return { ...updated.contact, _action: 'updated', contactType };
    }

    const created = await ghlFetch('/contacts/', 'POST', contactPayload);
    return { ...created.contact, _action: 'created', contactType };
}

export async function addTags(contactId, tags = []) {
    return ghlFetch(`/contacts/${contactId}/tags`, 'POST', { tags });
}

export async function triggerWorkflow(contactId, workflowTag) {
    return addTags(contactId, [workflowTag]);
}

export async function addNote(contactId, body) {
    return ghlFetch(`/contacts/${contactId}/notes`, 'POST', { body, userId: '' });
}

export async function logVapiCallToGHL(contactId, callData) {
    const { callId, status, duration, transcript, summary, recordingUrl, startedAt, endedAt, endedReason } = callData;
    const noteBody = `
📞 VAPI AI Call Log
──────────────────────
Call ID:    ${callId}
Status:     ${status}
Duration:   ${duration}s
Started:    ${startedAt}
Ended:      ${endedAt}
End Reason: ${endedReason}

📋 Summary:
${summary || 'No summary provided.'}

📝 Transcript:
${transcript || 'No transcript available.'}

🎙️ Recording:
${recordingUrl || 'No recording URL.'}
  `.trim();
    return addNote(contactId, noteBody);
}

export async function findContactByPhone(phone) {
    const result = await ghlFetch(
        `/contacts/search/duplicate?locationId=${GHL_LOCATION}&phone=${encodeURIComponent(phone)}`
    );
    return result?.contact || null;
}

export async function findContactByEmail(email) {
    const result = await ghlFetch(
        `/contacts/search/duplicate?locationId=${GHL_LOCATION}&email=${encodeURIComponent(email)}`
    );
    return result?.contact || null;
}
