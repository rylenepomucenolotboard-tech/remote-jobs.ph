'use client';
/**
 * components/ApplicantForm.jsx
 * Employee application form → submits to /api/submit-applicant → GHL
 * Usage: <ApplicantForm jobTitle="Virtual Assistant" />
 */

import { useState } from 'react';

export default function ApplicantForm({ jobTitle = '' }) {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        jobTitle, skills: '', experience: '', linkedIn: '',
    });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch('/api/submit-applicant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Submission failed.');
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    }

    if (status === 'success') {
        return (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Application Submitted!</h3>
                <p className="text-green-700">Thanks! We'll reach out via email or SMS shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Maria"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Santos"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="maria@email.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-gray-400 text-xs">(for SMS + AI follow-up)</span></label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+63 917 123 4567"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Applying For</label>
                <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Virtual Assistant, Customer Support..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                <input name="skills" value={form.skills} onChange={handleChange} placeholder="Canva, Excel, HubSpot..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                <select name="experience" value={form.experience} onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select...</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1–3 years</option>
                    <option value="3-5">3–5 years</option>
                    <option value="5+">5+ years</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input name="linkedIn" value={form.linkedIn} onChange={handleChange} placeholder="https://linkedin.com/in/yourname"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            {status === 'error' && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">❌ {errorMsg}</div>
            )}

            <button type="submit" disabled={status === 'loading'}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                {status === 'loading' ? 'Submitting...' : 'Submit Application →'}
            </button>

            <p className="text-center text-xs text-gray-400">
                By submitting, you agree to be contacted via email, SMS, or AI-assisted call for follow-up.
            </p>
        </form>
    );
}
