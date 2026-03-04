/**
 * lib/ghl.js
 * GoHighLevel API helper — all GHL interactions go through here
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_KEY  = process.env.GHL_API_KEY;
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

export async function upsertContact({ firstName, lastName, email, phone, jobTitle, skills, experience, linkedIn, source = 'remote-jobs.ph' }) {
  const search = await ghlFetch(
    `/contacts/search/duplicate?locationId=${GHL_LOCATION}&email=${encodeURIComponent(email)}`
  );

  const contactPayload = {
    locationId: GHL_LOCATION,
    firstName,
    lastName,
    email,
    phone,
    source,
    customFields: [
      { key: 'job_title_applied', field_value: jobTitle   || '' },
      { key: 'skills',            field_value: skills     || '' },
      { key: 'years_experience',  field_value: experience || '' },
      { key: 'linkedin_url',      field_value: linkedIn   || '' },
      { key: 'applicant_source',  field_value: source          },
    ],
    tags: ['applicant', 'remote-jobs-ph'],
  };

  if (search?.contact?.id) {
    const updated = await ghlFetch(`/contacts/${search.contact.id}`, 'PUT', contactPayload);
    return { ...updated.contact, _action: 'updated' };
  }

  const created = await ghlFetch('/contacts/', 'POST', contactPayload);
  return { ...created.contact, _action: 'created' };
}

export async function addTags(contactId, tags = []) {
  return ghlFetch(`/contacts/${contactId}/tags`, 'POST', { tags });
}

export async function triggerWorkflow(contactId, workflowTag = 'trigger-applicant-sequence') {
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
