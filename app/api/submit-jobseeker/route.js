/**
 * app/api/submit-jobseeker/route.js
 * Jobseeker form submission → GoHighLevel
 *
 * GHL result:
 *   tag: jobseeker
 *   tag: remote-jobs-ph
 *   tag: trigger-jobseeker-sequence  ← fires jobseeker email/SMS workflow
 *   custom field contact_type = 'jobseeker'
 */

import { NextResponse } from 'next/server';
import { upsertContact } from '@/lib/ghl';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, jobTitle, skills, experience, linkedIn } = body;

        if (!firstName || !email) {
            return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 });
        }

        if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
            console.error('[submit-jobseeker] Missing GHL environment variables');
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        const contact = await upsertContact({
            contactType: 'jobseeker',
            firstName, lastName, email, phone,
            jobTitle, skills, experience, linkedIn,
        });

        return NextResponse.json({
            success: true,
            contactId: contact.id,
            contactType: 'jobseeker',
            action: contact._action,
            message: `Jobseeker ${contact._action} in GoHighLevel.`,
        });

    } catch (err) {
        console.error('[submit-jobseeker error]', err);
        return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 500 });
    }
}
