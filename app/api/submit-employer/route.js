/**
 * app/api/submit-employer/route.js
 * Employer form submission → GoHighLevel
 *
 * GHL result:
 *   tag: employer
 *   tag: remote-jobs-ph
 *   tag: trigger-employer-sequence  ← fires employer email/SMS workflow
 *   custom field contact_type = 'employer'
 */

import { NextResponse } from 'next/server';
import { upsertContact } from '@/lib/ghl';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, companyName, companySize, industry, rolesHiring, website } = body;

        if (!firstName || !email) {
            return NextResponse.json({ error: 'First name and email are required.' }, { status: 400 });
        }

        if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
            console.error('[submit-employer] Missing GHL environment variables');
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        const contact = await upsertContact({
            contactType: 'employer',
            firstName, lastName, email, phone,
            companyName, companySize, industry, rolesHiring, website,
        });

        return NextResponse.json({
            success: true,
            contactId: contact.id,
            contactType: 'employer',
            action: contact._action,
            message: `Employer ${contact._action} in GoHighLevel.`,
        });

    } catch (err) {
        console.error('[submit-employer error]', err);
        return NextResponse.json({ error: err.message || 'Submission failed.' }, { status: 500 });
    }
}
