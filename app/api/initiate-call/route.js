/**
 * app/api/initiate-call/route.js
 * Triggers an outbound VAPI AI call to an applicant
 */

import { NextResponse } from 'next/server';
import { initiateCall } from '@/lib/vapi';

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization');
        if (INTERNAL_SECRET && authHeader !== `Bearer ${INTERNAL_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { phone, firstName, lastName, jobTitle, ghlContactId } = body;

        if (!phone || !firstName) {
            return NextResponse.json({ error: 'phone and firstName are required' }, { status: 400 });
        }

        const call = await initiateCall({ phone, firstName, lastName, jobTitle, ghlContactId });

        return NextResponse.json({
            success: true,
            callId: call.id,
            status: call.status,
            message: `AI call initiated to ${firstName} at ${phone}`,
        });
    } catch (err) {
        console.error('[initiate-call error]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
