'use client';
/**
 * components/GHLEmployerForm.jsx
 * Backup employer form — embeds the GHL-hosted form as an iframe.
 *
 * HOW TO ACTIVATE:
 * 1. In GHL dashboard → Sites → Forms → New Form
 * 2. Name it: "Remote-Jobs.ph — Employer Registration"
 * 3. Add fields (matching your custom field keys):
 *      Full Name, Email, Phone, Company Name, Company Location (Country),
 *      Role Hiring For, Budget / Requirements, Website
 * 4. On submit action: Add tags  employer + trigger-employer-sequence
 * 5. Publish the form, click "Integrate" → copy the form ID from the embed URL
 * 6. Set  NEXT_PUBLIC_GHL_EMPLOYER_FORM_ID  in Vercel environment variables
 *
 * USAGE on any page:
 *   import GHLEmployerForm from '@/components/GHLEmployerForm';
 *   <GHLEmployerForm />
 */

export default function GHLEmployerForm({ className = '' }) {
    const formId = process.env.NEXT_PUBLIC_GHL_EMPLOYER_FORM_ID;

    if (!formId) {
        return (
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400 text-sm">
                GHL Employer Form not configured.
                <br />
                Set <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_GHL_EMPLOYER_FORM_ID</code> in Vercel.
            </div>
        );
    }

    return (
        <div className={`w-full ${className}`}>
            <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
                style={{ width: '100%', height: '750px', border: 'none', borderRadius: '12px' }}
                scrolling="no"
                id="ghl-employer-form"
                title="Employer Registration Form"
                onLoad={() => {
                    // Auto-resize: GHL posts a message with height
                    window.addEventListener('message', (e) => {
                        if (e.data?.type === 'SET_HEIGHT' && e.data?.formId === formId) {
                            const el = document.getElementById('ghl-employer-form');
                            if (el) el.style.height = e.data.value + 'px';
                        }
                    });
                }}
            />
        </div>
    );
}
