'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultType = searchParams.get('type') as 'employer' | 'jobseeker' | null;

    const [step, setStep] = useState<1 | 2>(defaultType ? 2 : 1);
    const [userType, setUserType] = useState<'employer' | 'jobseeker'>(defaultType || 'jobseeker');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Employer Specific Fields
    const [companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('');
    const [roleHiringFor, setRoleHiringFor] = useState('');
    const [budgetMessage, setBudgetMessage] = useState('');

    // Job Seeker Specific Fields
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [expectedSalary, setExpectedSalary] = useState('');
    const [role, setRole] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Sign up user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                let resumeUrl = null;

                // Handle Resume Upload if jobseeker
                if (userType === 'jobseeker' && resumeFile) {
                    const fileExt = resumeFile.name.split('.').pop();
                    const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
                    const filePath = `jobseekers/resumes/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('submissions')
                        .upload(filePath, resumeFile);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from('submissions')
                        .getPublicUrl(filePath);

                    resumeUrl = publicUrl;
                }

                // Create profile
                const { error: profileError } = await supabase.from('profiles').insert({
                    id: authData.user.id,
                    user_type: userType,
                    full_name: fullName,
                    phone: phone || null,
                    // Employer fields
                    company_name: userType === 'employer' ? companyName : null,
                    country: userType === 'employer' ? country : null,
                    role_hiring_for: userType === 'employer' ? roleHiringFor : null,
                    budget_message: userType === 'employer' ? budgetMessage : null,
                    // Jobseeker fields
                    years_of_experience: userType === 'jobseeker' ? parseInt(yearsOfExperience) || 0 : null,
                    expected_salary: userType === 'jobseeker' ? expectedSalary : null,
                    role: userType === 'jobseeker' ? role : null,
                    resume_url: resumeUrl,
                });

                if (profileError) throw profileError;

                // Sync to GoHighLevel (fire-and-forget — never blocks the user)
                const [ghlFirstName, ...rest] = fullName.trim().split(' ');
                const ghlLastName = rest.join(' ');
                if (userType === 'employer') {
                    fetch('/api/submit-employer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstName: ghlFirstName,
                            lastName: ghlLastName,
                            email,
                            phone: phone || '',
                            companyName,
                            role1: roleHiringFor,
                            website: '',
                        }),
                    }).catch(err => console.warn('[GHL employer sync]', err));
                } else {
                    fetch('/api/submit-jobseeker', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            firstName: ghlFirstName,
                            lastName: ghlLastName,
                            email,
                            phone: phone || '',
                            jobTitle: role,
                            experience: yearsOfExperience,
                            expectedSalary,
                            skills: '',
                            educationalAttainment: '',
                        }),
                    }).catch(err => console.warn('[GHL jobseeker sync]', err));
                }

                // Redirect to appropriate dashboard
                router.push(userType === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-12 flex items-center justify-center">
                <div className="max-w-4xl w-full px-4">
                    {step === 1 ? (
                        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h1 className="text-5xl font-black text-navy-900 mb-4">How will you use RemoteJobs?</h1>
                            <p className="text-xl text-navy-500 mb-12 font-medium">Select your path to get started</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                <button
                                    onClick={() => { setUserType('jobseeker'); setStep(2); }}
                                    className="group relative bg-white p-10 rounded-[2.5rem] border-2 border-navy-50 hover:border-accent-cyber hover:ring-8 hover:ring-accent-cyber/5 transition-all duration-500 text-left shadow-xl hover:shadow-2xl hover:-translate-y-2"
                                >
                                    <div className="w-20 h-20 bg-accent-cyber/10 rounded-3xl flex items-center justify-center text-accent-cyber mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-black text-navy-900 mb-3">Looking for Work</h2>
                                    <p className="text-navy-500 text-lg leading-relaxed">Browse thousands of remote roles and connect with global employers.</p>
                                    <div className="mt-8 flex items-center gap-2 text-accent-cyber font-bold">
                                        Join as Talent
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { setUserType('employer'); setStep(2); }}
                                    className="group relative bg-white p-10 rounded-[2.5rem] border-2 border-navy-50 hover:border-primary-indigo hover:ring-8 hover:ring-primary-indigo/5 transition-all duration-500 text-left shadow-xl hover:shadow-2xl hover:-translate-y-2"
                                >
                                    <div className="w-20 h-20 bg-primary-indigo/10 rounded-3xl flex items-center justify-center text-primary-indigo mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-black text-navy-900 mb-3">Looking for Talent</h2>
                                    <p className="text-navy-500 text-lg leading-relaxed">Hire specialized Filipino specialists and scale your remote team.</p>
                                    <div className="mt-8 flex items-center gap-2 text-primary-indigo font-bold">
                                        Join as Employer
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-[3rem] border border-navy-100 bg-white overflow-hidden animate-in fade-in zoom-in duration-500">
                            <div className="bg-navy-900 px-8 py-10 text-white relative">
                                <button
                                    onClick={() => setStep(1)}
                                    className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-navy-300 hover:text-white transition-all font-black text-sm uppercase tracking-widest group"
                                >
                                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                                <div className="text-center">
                                    <p className="text-accent-cyber font-black uppercase tracking-[0.2em] text-xs mb-1">
                                        {userType === 'employer' ? 'Employer Account' : 'Talent Account'}
                                    </p>
                                    <h2 className="text-3xl font-black">Register Now</h2>
                                </div>
                            </div>

                            <div className="px-12 py-16">
                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-r-lg mb-10 text-base font-medium flex items-center gap-3">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleRegister} className="space-y-8">
                                    {/* Identification */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-base font-black text-navy-900 mb-3">Full Name</label>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="input-field-modern"
                                                placeholder="e.g. John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-base font-black text-navy-900 mb-3">Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="input-field-modern"
                                                placeholder="e.g. john@example.com"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-base font-black text-navy-900 mb-3">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="input-field-modern"
                                                placeholder="+63 900 000 0000"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-base font-black text-navy-900 mb-3">Create Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="input-field-modern"
                                                placeholder="Minimum 6 characters"
                                                required
                                                minLength={6}
                                            />
                                        </div>
                                    </div>

                                    {/* Adaptive Details */}
                                    <div className="space-y-6 pt-4">
                                        {userType === 'employer' ? (
                                            <>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Company Name</label>
                                                    <input
                                                        type="text"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="Acme Inc."
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Company Location (Country)</label>
                                                    <input
                                                        type="text"
                                                        value={country}
                                                        onChange={(e) => setCountry(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="e.g. United States"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Role you are hiring for</label>
                                                    <input
                                                        type="text"
                                                        value={roleHiringFor}
                                                        onChange={(e) => setRoleHiringFor(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="e.g. Senior React Developer"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Budget Message (Optional)</label>
                                                    <textarea
                                                        value={budgetMessage}
                                                        onChange={(e) => setBudgetMessage(e.target.value)}
                                                        className="input-field-modern min-h-[120px]"
                                                        placeholder="Tell us about your budget or requirements..."
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">What is your current or target role?</label>
                                                    <input
                                                        type="text"
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="e.g. Frontend Engineer"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Total Years of Experience</label>
                                                    <input
                                                        type="number"
                                                        value={yearsOfExperience}
                                                        onChange={(e) => setYearsOfExperience(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="e.g. 5"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Expected Monthly Salary ($)</label>
                                                    <input
                                                        type="text"
                                                        value={expectedSalary}
                                                        onChange={(e) => setExpectedSalary(e.target.value)}
                                                        className="input-field-modern"
                                                        placeholder="e.g. $3,000 - $5,000"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-base font-black text-navy-900 mb-3">Attach Your Resume (PDF/Doc)</label>
                                                    <div className="relative group cursor-pointer">
                                                        <input
                                                            type="file"
                                                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            accept=".pdf,.doc,.docx"
                                                            required
                                                        />
                                                        <div className={`p-6 rounded-2xl border-2 border-dashed transition-all flex items-center justify-center gap-4 ${resumeFile ? 'border-accent-cyber bg-accent-cyber/5 text-navy-900 font-black' : 'border-navy-100 bg-navy-50 text-navy-400 group-hover:border-accent-cyber/40 hover:bg-white'}`}>
                                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <span className="truncate max-w-[250px] text-lg">{resumeFile ? resumeFile.name : 'Click to choose file...'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full ${userType === 'employer' ? 'btn-indigo' : 'btn-cyan'
                                            } !py-6 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)] !text-xl font-black flex items-center justify-center gap-3 active:scale-[0.98] transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-6 w-6 text-current" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Complete Registration
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 bg-gray-50 py-12 flex items-center justify-center">
                    <div className="text-xl font-semibold text-gray-600">Loading registration form...</div>
                </main>
                <Footer />
            </div>
        }>
            <RegisterForm />
        </Suspense>
    );
}
