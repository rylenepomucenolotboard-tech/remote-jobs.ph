/**
 * app/api/vapi-webhook/route.js
 * Receives VAPI end-of-call reports → saves to GHL + storage
 * Set this URL in VAPI Dashboard → Assistants → Advanced → Server URL:
 * https://remote-jobs.ph.vercel.app/api/vapi-webhook
 */

import { NextResponse } from 'next/server';
import { parseEndCallReport, formatTranscript } from '@/lib/vapi';
import { logVapiCallToGHL, findContactByPhone, addTags } from '@/lib/ghl';

const VAPI_WEBHOOK_SECRET = process.env.VAPI_WEBHOOK_SECRET;

export async function POST(request) {
    try {
        if (VAPI_WEBHOOK_SECRET) {
            const signature = request.headers.get('x-vapi-signature');
            if (signature !== VAPI_WEBHOOK_SECRET) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        const body = await request.json();
        const { message } = body;

        if (message?.type !== 'end-of-call-report') {
            return NextResponse.json({ received: true, processed: false });
        }

        const report = parseEndCallReport(body);
        if (!report) return NextResponse.json({ error: 'Could not parse call report' }, { status: 400 });

        report.transcript = formatTranscript(report.transcript);

        let ghlContactId = report.ghlContactId;
        if (!ghlContactId && report.customerPhone) {
            const contact = await findContactByPhone(report.customerPhone);
            ghlContactId = contact?.id || null;
        }

        if (ghlContactId) {
            await logVapiCallToGHL(ghlContactId, report);
            const outcomeTags = resolveOutcomeTags(report);
            if (outcomeTags.length > 0) await addTags(ghlContactId, outcomeTags);
        }

        await saveCallLog(report, ghlContactId);

        return NextResponse.json({ success: true, callId: report.callId, ghlContactId });
    } catch (err) {
        console.error('[vapi-webhook error]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

function resolveOutcomeTags(report) {
    const tags = ['vapi-called'];
    const reason = report.endedReason?.toLowerCase() || '';
    if (reason.includes('customer-did-not-answer') || reason.includes('no-answer')) tags.push('call-no-answer');
    else if (reason.includes('voicemail')) tags.push('call-voicemail');
    else if (report.duration > 30) tags.push('call-completed');
    else tags.push('call-short');
    return tags;
}

async function saveCallLog(report, ghlContactId) {
    // TODO: uncomment your preferred storage below

    // ── Vercel KV ──────────────────────────────────────────────────────────────
    // const { kv } = await import('@vercel/kv');
    // await kv.lpush('call_logs', JSON.stringify({ ...report, ghlContactId, savedAt: new Date().toISOString() }));

    // ── Supabase ───────────────────────────────────────────────────────────────
    // const { createClient } = await import('@supabase/supabase-js');
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    // await supabase.from('call_logs').insert({ ...report, ghl_contact_id: ghlContactId });

    console.log('[CALL LOG]', { callId: report.callId, ghlContactId, savedAt: new Date().toISOString() });
}
