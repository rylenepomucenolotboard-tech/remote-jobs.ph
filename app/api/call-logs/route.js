/**
 * app/api/call-logs/route.js
 * Returns saved VAPI call logs for display on the website
 */

import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const contactId = searchParams.get('contactId');
        const limit = parseInt(searchParams.get('limit') || '50');
        const logs = await getCallLogs({ contactId, limit });
        return NextResponse.json({ success: true, logs });
    } catch (err) {
        console.error('[call-logs GET error]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

async function getCallLogs({ contactId, limit }) {
    // TODO: uncomment your preferred storage below (must match vapi-webhook/route.js)

    // ── Vercel KV ──────────────────────────────────────────────────────────────
    // const { kv } = await import('@vercel/kv');
    // const raw = await kv.lrange('call_logs', 0, limit - 1);
    // const all = raw.map(r => JSON.parse(r));
    // return contactId ? all.filter(l => l.ghlContactId === contactId) : all;

    // ── Supabase ───────────────────────────────────────────────────────────────
    // const { createClient } = await import('@supabase/supabase-js');
    // const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    // let q = supabase.from('call_logs').select('*').order('startedAt', { ascending: false }).limit(limit);
    // if (contactId) q = q.eq('ghl_contact_id', contactId);
    // const { data } = await q;
    // return data || [];

    // Placeholder until storage is configured:
    return [];
}
