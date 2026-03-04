/**
 * lib/vapi.js
 * VAPI AI Calling helper
 */

const VAPI_BASE = 'https://api.vapi.ai';
const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_ASSISTANT = process.env.VAPI_ASSISTANT_ID;
const VAPI_PHONE_ID = process.env.VAPI_PHONE_NUMBER_ID;

async function vapiFetch(path, method = 'GET', body = null) {
    const res = await fetch(`${VAPI_BASE}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${VAPI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || `VAPI ${method} ${path} failed (${res.status})`);
    return data;
}

export async function initiateCall({ phone, firstName, lastName, jobTitle, ghlContactId }) {
    return vapiFetch('/call/phone', 'POST', {
        phoneNumberId: VAPI_PHONE_ID,
        assistantId: VAPI_ASSISTANT,
        customer: {
            number: phone,
            name: `${firstName} ${lastName}`,
        },
        assistantOverrides: {
            variableValues: {
                applicantName: firstName,
                jobTitle: jobTitle || 'the role',
                ghlContactId,
            },
        },
        metadata: {
            ghlContactId,
            applicantName: `${firstName} ${lastName}`,
            source: 'remote-jobs.ph',
        },
    });
}

export async function getCall(callId) {
    return vapiFetch(`/call/${callId}`);
}

export function parseEndCallReport(webhookBody) {
    const { message } = webhookBody;
    if (message?.type !== 'end-of-call-report') return null;
    const call = message.call || {};
    const analysis = message.analysis || {};
    return {
        callId: call.id,
        status: call.status,
        duration: message.durationSeconds || 0,
        startedAt: call.startedAt,
        endedAt: call.endedAt,
        endedReason: message.endedReason,
        transcript: message.transcript || '',
        summary: message.summary || analysis.summary || '',
        recordingUrl: message.recordingUrl || '',
        ghlContactId: call.metadata?.ghlContactId || null,
        customerPhone: call.customer?.number || '',
    };
}

export function formatTranscript(rawTranscript) {
    if (!rawTranscript) return '';
    if (typeof rawTranscript === 'string') return rawTranscript;
    if (Array.isArray(rawTranscript)) {
        return rawTranscript
            .map(t => `${t.role === 'assistant' ? '🤖 AI' : '👤 Applicant'}: ${t.content}`)
            .join('\n');
    }
    return String(rawTranscript);
}
