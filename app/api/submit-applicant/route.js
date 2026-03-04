/**
 * app/api/submit-applicant/route.js
 * Handles employee form submission → GoHighLevel
 */

import { NextResponse } from 'next/server';
import { upsertContact, triggerWorkflow } from '@/lib/ghl';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, jobTitle, skills, experience, linkedIn } = body;

        if (!firstName || !email) {
            return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 });
        }

        if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
            console.error('Missing GHL environment variables');
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        const contact = await upsertContact({ firstName, lastName, email, phone, jobTitle, skills, experience, linkedIn });
        await triggerWorkflow(contact.id, 'trigger-applicant-sequence');

        return NextResponse.json({
            success: true,
            contactId: contact.id,
            action: contact._action,
            message: `Applicant ${contact._action} in GoHighLevel. Follow-up sequence triggered.`,
        });
    } catch (err) {
        console.error('[submit-applicant error]', err);
        return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 500 });
    }
}
