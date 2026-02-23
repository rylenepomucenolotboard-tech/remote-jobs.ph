'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- TIERS DATA ---
const TIERS = {
    basic: {
        name: 'Basic',
        monthly: 0,
        perHire: 1500,
        features: ['Post up to 3 jobs/mo', 'Browse 9M+ resumes', 'AI matching', 'Up to 20 applications/job', 'Dashboard included']
    },
    pro: {
        name: 'Pro',
        monthly: 79,
        annual: 59,
        features: ['Post up to 3 jobs/mo', 'Instant approval', '300 applications/job', 'AI tells you who to hire', 'Contact 75 candidates/mo', 'Email match alerts', 'Full pipeline dashboard']
    }
};

const AVG_SALARY = 36000;
const AGENCY_RATE = 0.175;
const agencyCost = Math.round(AVG_SALARY * AGENCY_RATE); // 6300

export default function PricingPage() {
    // Calculator state
    const [calcStep, setCalcStep] = useState(1);
    const [numRoles, setNumRoles] = useState(1);
    const [wantsContact, setWantsContact] = useState<boolean | null>(null);

    // Form state
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPhone, setFormPhone] = useState('');
    const [formRole, setFormRole] = useState('');
    const [formErrors, setFormErrors] = useState({ name: false, email: false });

    // Plan cards state
    const [proAnnual, setProAnnual] = useState(false);
    const [teamAnnual, setTeamAnnual] = useState(false);

    // FAQ state
    const [openFaq, setOpenFaq] = useState<number | null>(0); // 0 is Q1 open by default

    const pickNum = (num: number) => {
        setNumRoles(num);
        setTimeout(() => {
            setCalcStep(2);
        }, 220);
    };


    const pickApproach = (wantsOutreach: boolean) => {
        setWantsContact(wantsOutreach);
        setTimeout(() => {
            setCalcStep(3);
        }, 220);
    };

    const getRecommendedTier = () => {
        if (numRoles === 4) return 'elite';
        return wantsContact ? 'pro' : 'basic';
    };

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = { name: !formName.trim(), email: !formEmail.trim() };
        setFormErrors(errors);

        if (!errors.name && !errors.email) {
            const tier = getRecommendedTier();
            if (tier === 'elite') {
                window.location.href = 'https://calendly.com/remotejobs-ph/recruiter';
            } else {
                window.location.href = `/register?name=${encodeURIComponent(formName)}&email=${encodeURIComponent(formEmail)}&role=${encodeURIComponent(formRole)}&plan=${tier}`;
            }
        }
    };

    return (
        <div className="min-h-screen bg-off-white font-geist">
            <Header />

            <main>
                {/* HERO SECTION with embedded calculator */}
                <section className="bg-[#13162A] pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center" style={{ backgroundColor: 'var(--dk2, #13162A)' }}>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black text-[#E8EAF6] mb-6 tracking-tighter italic leading-[0.9]">
                            Use our job posting<br />
                            <em className="text-[#AAFF45] not-italic">calculator today.</em>
                        </h1>
                        <p className="hero-sub text-[#8B92B8] text-xl mb-12 max-w-[50ch] mx-auto font-medium leading-relaxed">
                            Answer two questions. Get your plan, your price, and post your first job in minutes.<br />
                            Trusted by 1,182+ companies hiring elite Filipino remote talent.
                        </p>

                        {/* EMBEDDED CALCULATOR WIZARD */}
                        <div className="bg-[#1C2038] border border-white/10 rounded-[14px] p-8 text-left max-w-2xl mx-auto shadow-2xl relative" style={{ backgroundColor: 'var(--dk3, #1C2038)', borderColor: 'var(--bd, rgba(255,255,255,.07))', borderRadius: 'var(--r, 14px)' }}>

                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-full bg-[#0D0F1A] h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-[#4F46E5] h-full transition-all duration-300" style={{ width: `${calcStep * 33.33}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* STEP 1 */}
                            {calcStep === 1 && (
                                <div id="s1" className="animate-in fade-in zoom-in-95 duration-200 block">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-xs font-black uppercase tracking-widest text-[#8B92B8]">Start here</span>
                                        <div className="h-px bg-white/10 flex-1"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#E8EAF6] mb-8 font-syne">How many roles are you looking to fill per month?</h3>

                                    <div className="flex flex-wrap items-center gap-4 mb-6 num-opts">
                                        {[1, 2, 3].map(n => (
                                            <button
                                                key={n}
                                                onClick={() => pickNum(n)}
                                                className={`w-[52px] h-[52px] rounded-xl font-black text-xl flex items-center justify-center transition-all border-2 ${numRoles === n ? 'border-[#AAFF45] bg-[#AAFF45]/10 text-[#AAFF45]' : 'border-white/10 text-[#E8EAF6] hover:border-white/30 hover:bg-white/5'}`}
                                            >
                                                {n}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => pickNum(4)}
                                            className={`px-6 h-[52px] rounded-xl font-black text-lg flex items-center justify-center transition-all border-2 ${numRoles === 4 ? 'border-[#AAFF45] bg-[#AAFF45]/10 text-[#AAFF45]' : 'border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/10'}`}
                                        >
                                            4 or more
                                        </button>
                                    </div>
                                    <p className="text-[#8B92B8] text-sm">Hiring 4 or more roles? We'll connect you with a recruiter who can manage the search end-to-end.</p>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {calcStep === 2 && (
                                <div id="s2" className="animate-in fade-in zoom-in-95 duration-200 block">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className="text-xs font-black uppercase tracking-widest text-[#8B92B8]">Hiring approach</span>
                                            <div className="h-px bg-white/10 flex-1"></div>
                                        </div>
                                        <button onClick={() => setCalcStep(1)} className="text-[#8B92B8] hover:text-white text-sm font-bold">← Back</button>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#E8EAF6] mb-8 font-syne">How do you want to find your hire?</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => pickApproach(false)}
                                            className={`opt large p-6 text-left rounded-xl border-2 transition-all ${wantsContact === false ? 'border-[#AAFF45] bg-[#AAFF45]/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                                        >
                                            <h4 className="text-[#E8EAF6] font-black text-lg mb-2">Post & Wait</h4>
                                            <p className="text-[#8B92B8] text-sm leading-relaxed">Receive applications, review profiles. Pay only when you hire.</p>
                                        </button>
                                        <button
                                            onClick={() => pickApproach(true)}
                                            className={`opt large p-6 text-left rounded-xl border-2 transition-all ${wantsContact === true ? 'border-[#AAFF45] bg-[#AAFF45]/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}
                                        >
                                            <h4 className="text-[#E8EAF6] font-black text-lg mb-2">Post & Reach Out</h4>
                                            <p className="text-[#8B92B8] text-sm leading-relaxed">Proactively contact pre-matched candidates yourself.</p>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {calcStep === 3 && (
                                <div id="s3" className="animate-in fade-in zoom-in-95 duration-200 block">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4 flex-1">
                                            <span className="text-xs font-black uppercase tracking-widest text-[#8B92B8]">Your plan</span>
                                            <div className="h-px bg-white/10 flex-1"></div>
                                        </div>
                                        <button onClick={() => setCalcStep(2)} className="text-[#8B92B8] hover:text-white text-sm font-bold">← Back</button>
                                    </div>

                                    {getRecommendedTier() === 'basic' ? (
                                        // BASIC RESULT
                                        <div id="tier-result-box" className="recommended border-2 border-[#AAFF45] bg-[#AAFF45]/10 p-6 rounded-xl mb-6 flex flex-col md:flex-row gap-6 items-center">
                                            <div className="flex-1">
                                                <div className="flex flex-col gap-2 mb-2">
                                                    <span className="text-[#E8EAF6] font-black text-2xl">Basic</span>
                                                </div>
                                                <div className="text-[#AAFF45] font-black text-lg leading-tight mb-4">No monthly cost<br /><span className="text-[#8B92B8] text-sm">Pay per hire only</span></div>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {TIERS.basic.features.map((f, i) => (
                                                        <span key={i} className="tr-feat hi bg-white/10 text-[#E8EAF6] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{f}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : getRecommendedTier() === 'elite' ? (
                                        // ELITE RESULT
                                        <div id="tier-result-box" className="recommended border-2 border-[#AAFF45] bg-[#AAFF45]/10 p-6 rounded-xl mb-6 flex flex-col md:flex-row gap-6 items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-[#E8EAF6] font-black text-2xl">Elite</span>
                                                    <span className="bg-[#AAFF45] text-[#13162A] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended for you</span>
                                                </div>
                                                <div className="flex items-end gap-1 mb-4">
                                                    <span className="text-[#AAFF45] font-black text-4xl leading-none">Custom</span>
                                                    <span className="text-[#8B92B8] font-bold pb-1 ml-2">Pricing</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {['Dedicated Recruiter', 'Contact up to 150 candidates / mo', 'End-to-End Search', 'Candidate Screening'].map((f, i) => (
                                                        <span key={i} className="tr-feat hi bg-white/10 text-[#E8EAF6] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{f}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // PRO RESULT
                                        <div id="tier-result-box" className="recommended border-2 border-[#AAFF45] bg-[#AAFF45]/10 p-6 rounded-xl mb-6 flex flex-col md:flex-row gap-6 items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-[#E8EAF6] font-black text-2xl">Pro</span>
                                                    <span className="bg-[#AAFF45] text-[#13162A] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Recommended for you</span>
                                                </div>
                                                <div className="flex items-end gap-1 mb-4">
                                                    <span className="text-[#AAFF45] font-black text-4xl leading-none">$79</span>
                                                    <span className="text-[#8B92B8] font-bold pb-1">/ month</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {TIERS.pro.features.slice(0, 5).map((f, i) => (
                                                        <span key={i} className="tr-feat hi bg-white/10 text-[#E8EAF6] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{f}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* SAVINGS BOX */}
                                    {getRecommendedTier() !== 'elite' && (
                                        <div id="savings-box" className="border border-[#AAFF45]/50 bg-[#0D0F1A] rounded-xl p-6 mb-8">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-[#8B92B8] mb-4">HOW MUCH YOU SAVE VS. HIRING ON YOUR OWN</div>
                                            <div className="space-y-4 text-sm font-medium">
                                                <div className="flex justify-between items-center text-[#E8EAF6]">
                                                    <span className="opacity-80">Typical agency placement fee (17.5% of $36,000/yr salary)</span>
                                                    <span className="font-bold text-red-400">-$6,300</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[#E8EAF6]">
                                                    <span className="opacity-80">{getRecommendedTier() === 'basic' ? 'Basic placement fee (per hire)' : 'Pro plan ($79/mo subscription)'}</span>
                                                    <span className="font-bold text-[#AAFF45]">-${getRecommendedTier() === 'basic' ? '1,500' : '79'}</span>
                                                </div>
                                                <div className="h-px bg-white/10 my-2"></div>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-black text-lg text-[#E8EAF6]">You save</span>
                                                    <span className="font-black text-2xl text-[#AAFF45]">
                                                        ${getRecommendedTier() === 'basic' ? '4,800' : '6,221'}
                                                        <span className="text-sm ml-2">(~{getRecommendedTier() === 'basic' ? '76' : '98'}%)</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* SIGNUP FORM */}
                                    <div className="signup-box border-2 border-[#4F46E5]/30 bg-[#4F46E5]/5 p-6 rounded-xl">
                                        <h4 className="text-xl font-black text-[#E8EAF6] mb-1">
                                            {getRecommendedTier() === 'elite' ? 'Let\'s build your team together' : 'Create your account — start in 2 minutes'}
                                        </h4>
                                        <p className="text-[#8B92B8] text-sm mb-6">
                                            {getRecommendedTier() === 'elite' ? 'Fill in your details below and book a consultation with our recruitment specialists.' : 'Your plan is ready. Fill in your details and post your first job immediately.'}
                                        </p>

                                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    id="f-name"
                                                    placeholder="Full name"
                                                    value={formName}
                                                    onChange={(e) => setFormName(e.target.value)}
                                                    className={`w-full bg-[#0D0F1A] border ${formErrors.name ? 'border-[rgba(255,80,80,.5)]' : 'border-white/10'} p-4 rounded-lg text-[#E8EAF6] placeholder:text-[#8B92B8] outline-none focus:border-[#4F46E5]`}
                                                />
                                                <input
                                                    type="email"
                                                    id="f-email"
                                                    placeholder="Work email"
                                                    value={formEmail}
                                                    onChange={(e) => setFormEmail(e.target.value)}
                                                    className={`w-full bg-[#0D0F1A] border ${formErrors.email ? 'border-[rgba(255,80,80,.5)]' : 'border-white/10'} p-4 rounded-lg text-[#E8EAF6] placeholder:text-[#8B92B8] outline-none focus:border-[#4F46E5]`}
                                                />
                                            </div>
                                            <input
                                                type="tel"
                                                id="f-phone"
                                                placeholder="Phone number (optional)"
                                                value={formPhone}
                                                onChange={(e) => setFormPhone(e.target.value)}
                                                className="w-full bg-[#0D0F1A] border border-white/10 p-4 rounded-lg text-[#E8EAF6] placeholder:text-[#8B92B8] outline-none focus:border-[#4F46E5]"
                                            />
                                            <input
                                                type="text"
                                                id="f-role"
                                                placeholder="Role you want to hire (e.g. Full-Stack Developer)"
                                                value={formRole}
                                                onChange={(e) => setFormRole(e.target.value)}
                                                className="w-full bg-[#0D0F1A] border border-white/10 p-4 rounded-lg text-[#E8EAF6] placeholder:text-[#8B92B8] outline-none focus:border-[#4F46E5]"
                                            />
                                            <button type="submit" className="w-full bg-[#AAFF45] text-[#13162A] py-4 rounded-xl font-black text-lg hover:bg-[#91e63a] transition-all">
                                                {getRecommendedTier() === 'elite' ? 'Book a Free Consultation →' : 'Post Your First Job →'}
                                            </button>
                                            <p className="text-center text-[10px] text-[#8B92B8] uppercase tracking-widest mt-4">
                                                {getRecommendedTier() === 'elite' ? 'Our recruitment specialists will reach out to you.' : 'No credit card required for Basic. Paid plans include a 100% money-back guarantee.'}
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </section>

                {/* STATIC STATS STRIP */}
                <div className="bg-[#1C2038] py-16 overflow-hidden border-t border-white/5 relative shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] z-20" style={{ backgroundColor: 'var(--dk3, #1C2038)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 divide-x-0 lg:divide-x divide-white/10">
                            {[
                                { label: "Active Resumes", value: "9 Million+" },
                                { label: "Roles Filled", value: "15,000+" },
                                { label: "Global Clients", value: "1,182+" },
                                { label: "Avg. Salary Growth", value: "35%" },
                                { label: "Avg. Time-to-Hire", value: "12 Days" }
                            ].map((stat, i) => (
                                <div key={i} className={`text-center px-4 ${i === 4 ? 'col-span-2 lg:col-span-1' : ''}`}>
                                    <div className="text-3xl lg:text-4xl font-black text-[#E8EAF6] tracking-tight">{stat.value}</div>
                                    <div className="text-[10px] lg:text-xs uppercase font-bold tracking-[0.2em] text-[#AAFF45] mt-2 opacity-90">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PLAN CARDS */}
                <section className="py-24 bg-off-white" id="plans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                            {/* BASIC CARD */}
                            <div className="bg-white p-10 rounded-3xl flex flex-col" style={{ border: '1px solid var(--bd, rgba(0,0,0,.1))' }}>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-navy-900 mb-6">Basic</h3>
                                    <p className="basic-price-note text-[#AAFF45] font-semibold text-xl leading-tight bg-navy-900 p-4 rounded-xl">No upfront cost — pay only when you hire</p>
                                </div>
                                <div className="space-y-4 mb-10 flex-1">
                                    {[
                                        { text: "Post up to 3 jobs / month", incl: true },
                                        { text: "Browse 9 Million+ active resumes", incl: true },
                                        { text: "24–48 hr job post approval", incl: true },
                                        { text: "Up to 20 applications per job", incl: true },
                                        { text: "View full candidate profiles", incl: true },
                                        { text: "See all job applications", incl: true },
                                        { text: "AI matching", incl: true },
                                        { text: "Dashboard — posts & applications", incl: true },
                                        { text: "Contact candidates", incl: false },
                                        { text: "Email match notifications", incl: false },
                                        { text: "Recruitment pipeline", incl: false }
                                    ].map((feat, i) => (
                                        <div key={i} className={`flex items-start gap-3 ${feat.incl ? 'text-navy-900' : 'text-navy-300 opacity-50'}`}>
                                            <span className="font-bold flex-shrink-0 mt-0.5">{feat.incl ? '✓' : '—'}</span>
                                            <span className="font-medium text-sm leading-snug">{feat.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/register" className="border-2 border-navy-900 text-navy-900 py-4 rounded-xl font-black text-center hover:bg-navy-900 hover:text-white transition-all">
                                    Post a Job Free
                                </Link>
                                <div className="text-center mt-4 text-navy-400 font-bold uppercase tracking-widest text-[10px]">Pay only when you make a hire</div>
                            </div>

                            {/* PRO CARD */}
                            <div className="p-10 rounded-3xl flex flex-col relative" style={{ borderColor: 'var(--i)', borderWidth: '2px', background: 'linear-gradient(160deg, rgba(79,70,229,.12), rgba(255,255,255,.03))' }}>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-md" style={{ background: 'rgba(79,70,229,.2)', border: '1px solid var(--i)', color: 'var(--il, #6366F1)' }}>
                                    Most Popular
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-white mb-6">Pro</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span id="pro-amt" className="text-5xl font-black text-white">{proAnnual ? '$59' : '$79'}</span>
                                        <span className="text-navy-300 font-bold">/ mo</span>
                                    </div>
                                    <a onClick={() => setProAnnual(!proAnnual)} className="mt-4 inline-block cursor-pointer font-bold text-sm text-[#818CF8] hover:underline decoration-2 underline-offset-4">
                                        Save 25% — switch to annual ($59/mo)
                                    </a>
                                </div>
                                <div className="space-y-4 mb-10 flex-1">
                                    {[
                                        "Post up to 3 jobs / month",
                                        "Browse 9 Million+ active resumes",
                                        "Instant job post approval",
                                        "Up to 300 applications per job",
                                        "View full candidate profiles",
                                        "See all job applications",
                                        "AI matching — tells you who to hire",
                                        "Contact up to 75 candidates / month",
                                        "Email match notifications",
                                        "Dashboard — jobs, AI & pipeline",
                                        "Money-back guarantee"
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-start gap-3 text-[#E8EAF6]">
                                            <span className="font-bold flex-shrink-0 mt-0.5 text-[#818CF8]">✓</span>
                                            <span className="font-bold text-sm leading-snug">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/employer/post-job" className="bg-[#4F46E5] text-white py-4 rounded-xl font-black text-center hover:bg-[#3730A3] transition-all shadow-lg shadow-[#4F46E5]/25">
                                    Start Posting Jobs Today!
                                </Link>
                                <div className="text-center mt-4 text-navy-400 font-bold uppercase tracking-widest text-[10px]">Free cancellation anytime</div>
                            </div>

                            {/* TEAM CARD */}
                            <div className="p-10 rounded-3xl flex flex-col relative" style={{ borderColor: 'rgba(170,255,69,.35)', borderWidth: '2px', background: 'linear-gradient(160deg, rgba(170,255,69,.07), rgba(255,255,255,.02))', boxShadow: '0 0 48px rgba(170,255,69,.06)' }}>
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-md" style={{ background: 'rgba(170,255,69,.12)', border: '1px solid var(--g)', color: 'var(--g, #AAFF45)' }}>
                                    <span className="text-[#13162A]">Best for Teams</span>
                                </div>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-white mb-6">Team</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span id="team-amt" className="text-5xl font-black text-white">{teamAnnual ? '$149' : '$199'}</span>
                                        <span className="text-navy-300 font-bold">/ mo</span>
                                    </div>
                                    <a onClick={() => setTeamAnnual(!teamAnnual)} className="mt-4 inline-block cursor-pointer font-bold text-sm text-[var(--g)] hover:underline decoration-2 underline-offset-4">
                                        Save 25% — switch to annual ($149/mo)
                                    </a>
                                </div>
                                <div className="space-y-4 mb-10 flex-1">
                                    {[
                                        "Post up to 10 jobs / month",
                                        "Browse 9 Million+ active resumes",
                                        "Instant job post approval",
                                        "Up to 300 applications per job",
                                        "View full candidate profiles",
                                        "See all job applications",
                                        "AI matching — tells you who to hire",
                                        "Contact up to 500 candidates / month",
                                        "Email match notifications",
                                        "Dashboard — jobs, AI & pipeline",
                                        "Money-back guarantee"
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-start gap-3 text-[#E8EAF6]">
                                            <span className="font-bold flex-shrink-0 mt-0.5 text-[#AAFF45]">✓</span>
                                            <span className="font-bold text-sm leading-snug">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/employer/post-job?plan=team" className="bg-[#AAFF45] text-[#13162A] py-4 rounded-xl font-black text-center hover:bg-[#91e63a] transition-all shadow-lg shadow-[#AAFF45]/25">
                                    Go Team
                                </Link>
                                <div className="text-center mt-4 text-navy-500 font-bold uppercase tracking-widest text-[10px]">Free cancellation anytime</div>
                            </div>

                        </div>

                        <p className="ent-ln mt-16 text-center text-navy-600 font-medium text-lg">
                            Hiring more than 10 roles?{' '}
                            <a href="mailto:contact@remotejobs.ph" className="text-navy-900 font-black hover:underline decoration-2 underline-offset-4 whitespace-nowrap">Talk to us about Enterprise →</a>
                        </p>
                    </div>
                </section>

                {/* FEATURE COMPARISON TABLE */}
                <section className="py-24 bg-white" id="compare">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-black text-navy-900 mb-12 tracking-tight italic text-center">Compare all features</h2>

                        <div className="overflow-x-auto pb-8 rounded-2xl shadow-sm border border-navy-100">
                            <table className="w-full min-w-[800px] text-left border-collapse bg-white">
                                <thead>
                                    <tr className="border-b-2 border-navy-900/10">
                                        <th className="py-6 px-8 text-navy-500 font-black text-xs uppercase tracking-widest w-[40%] bg-navy-50/50">Feature</th>
                                        <th className="py-6 px-8 text-navy-900 font-black text-base w-[20%] bg-navy-50/50 border-l border-navy-100">Basic</th>
                                        <th className="py-6 px-8 text-[#4F46E5] font-black text-base w-[20%] bg-[#4F46E5]/5 border-l-2 border-[#4F46E5]/20 shadow-[inset_0_4px_0_0_#4F46E5]">Pro <span className="text-sm font-bold text-navy-500 ml-1">· $79/mo</span></th>
                                        <th className="py-6 px-8 text-[#13162A] bg-[#AAFF45]/20 font-black text-base w-[20%] border-l-2 border-[#AAFF45]/50 shadow-[inset_0_4px_0_0_#AAFF45]">Team <span className="text-sm font-bold opacity-70 ml-1">· $199/mo</span></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* GROUP: Job Posting */}
                                    <tr><td colSpan={4} className="bg-navy-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3 rounded-t-lg">Job Posting</td></tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Job posts / month</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base border-l border-navy-100">Up to 3</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">Up to 3</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">Up to 10</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Job post approval</td>
                                        <td className="py-5 px-8 text-navy-900 font-medium text-sm border-l border-navy-100">24–48 hrs</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-sm uppercase tracking-wider bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">Instant</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-sm uppercase tracking-wider bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">Instant</td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Max applications per job</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-lg border-l border-navy-100">20</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-lg bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">300</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-lg bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">300</td>
                                    </tr>

                                    {/* GROUP: Candidate Access */}
                                    <tr><td colSpan={4} className="bg-navy-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3">Candidate Access</td></tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Browse 9 Million+ resumes</td>
                                        <td className="py-5 px-8 text-navy-900 font-bold text-xl border-l border-navy-100">✓</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">View full candidate profiles</td>
                                        <td className="py-5 px-8 text-navy-900 font-bold text-xl border-l border-navy-100">✓</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">See all job applications</td>
                                        <td className="py-5 px-8 text-navy-900 font-bold text-xl border-l border-navy-100">✓</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Contact candidates</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">75 / month</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">500 / month</td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Email match notifications</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>

                                    {/* GROUP: AI & Intelligence */}
                                    <tr><td colSpan={4} className="bg-navy-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3">AI & Intelligence</td></tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">AI matching</td>
                                        <td className="py-5 px-8 text-navy-900 font-bold text-xl border-l border-navy-100">✓</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">AI tells you who to hire</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>

                                    {/* GROUP: Dashboard */}
                                    <tr><td colSpan={4} className="bg-navy-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3">Dashboard</td></tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Posts & applications view</td>
                                        <td className="py-5 px-8 text-navy-900 font-bold text-xl border-l border-navy-100">✓</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">AI matching dashboard</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Recruitment pipeline</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>

                                    {/* GROUP: Pricing */}
                                    <tr><td colSpan={4} className="bg-navy-900 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-3">Pricing</td></tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Cost model</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-base border-l border-navy-100">Pay per hire</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-base bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">$79/mo</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-base bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">$199/mo</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Annual price</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-base bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">$59/mo</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-base bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">$149/mo</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Annual saving</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#10B981] font-black text-base bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">Save $240/yr</td>
                                        <td className="py-5 px-8 text-[#10B981] font-black text-base bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">Save $600/yr</td>
                                    </tr>
                                    <tr className="border-b border-navy-100 group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Money-back guarantee</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-[#4F46E5] font-black text-xl bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">✓</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-xl bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">✓</td>
                                    </tr>
                                    <tr className="group transition-colors hover:bg-navy-50/50">
                                        <td className="py-5 px-8 text-navy-800 font-semibold text-sm">Cancellation</td>
                                        <td className="py-5 px-8 text-navy-300 font-bold border-l border-navy-100">—</td>
                                        <td className="py-5 px-8 text-navy-900 font-black text-sm uppercase tracking-wider bg-[#4F46E5]/[0.02] border-l-2 border-[#4F46E5]/10">Free, anytime</td>
                                        <td className="py-5 px-8 text-[#13162A] font-black text-sm uppercase tracking-wider bg-[#AAFF45]/10 border-l-2 border-[#AAFF45]/30">Free, anytime</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className="py-24 bg-off-white" id="faq">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-black text-navy-900 mb-12 tracking-tight italic text-center">Common Questions.</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "What does \"pay only when you hire\" mean on Basic?",
                                    a: "On the Basic plan there is no monthly subscription fee. You post jobs, receive up to 20 applications per role, and review profiles at no cost. A placement fee applies only when you successfully hire someone — so you never pay unless the process works. It is designed for employers who want to explore the platform before committing."
                                },
                                {
                                    q: "What is the difference between Basic and Pro?",
                                    a: "Basic is free to start — you post jobs and receive applications but cannot contact candidates directly. Pro adds direct candidate contact (up to 75 per month), instant post approval, up to 300 applications per job, AI-powered hire recommendations, email match notifications, and the full recruitment pipeline dashboard. If you want to move faster and control who you reach, Pro is the right step."
                                },
                                {
                                    q: "When should I choose Team instead of Pro?",
                                    a: "Team is built for employers filling multiple roles at once. It increases your job post limit to 10 per month and your candidate contact allowance to 500 per month — versus 3 posts and 75 contacts on Pro. If you are building out a department or running a hiring sprint across several roles, Team is the more efficient choice."
                                },
                                {
                                    q: "Why does the calculator redirect me to a consultation if I need 4 or more hires?",
                                    a: "When you are filling 4 or more roles at once, the complexity of sourcing, screening, and coordinating across multiple searches means you get better results with a dedicated recruiter managing the process. Our team consultation is free and typically results in faster, higher-quality hires than self-service tools alone."
                                },
                                {
                                    q: "Can I cancel my subscription anytime?",
                                    a: "Yes. Team plans offer free cancellation at any time with no penalty. Your access continues until the end of your current billing period and you will not be charged again."
                                },
                                {
                                    q: "Do you take a cut of the hire's salary?",
                                    a: "No. You negotiate compensation directly with your hire. Your subscription or placement fee is the only cost — there are no salary markups, no placement percentages, and no surprises after the hire is made."
                                }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white border border-navy-100 rounded-2xl overflow-hidden transition-all duration-300">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full p-6 text-left flex items-center justify-between font-black text-navy-900 text-lg hover:bg-navy-50 transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <span className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-navy-900 font-bold flex-shrink-0 ml-4">
                                            {openFaq === i ? '−' : '+'}
                                        </span>
                                    </button>
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="px-6 pb-6 text-navy-600 font-medium leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* BOTTOM CTA */}
                <section className="py-32 bg-navy-900 text-white relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#AAFF45] to-transparent opacity-50"></div>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">Post your first job today.</h2>
                        <p className="text-navy-300 text-lg md:text-xl mb-12 max-w-[55ch] mx-auto font-medium leading-relaxed">
                            Access 9 Million+ active resumes from Filipino remote professionals.<br />
                            1,182+ companies hiring now. No placement fees, no salary markups.
                        </p>
                        <Link href="/register" className="bg-[#AAFF45] text-[#13162A] px-10 py-5 rounded-xl font-black text-xl hover:bg-[#91e63a] transition-all inline-block shadow-lg shadow-[#AAFF45]/20">
                            Post a Job Free →
                        </Link>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
