'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ComparisonGrid from '@/components/HowItWorks/ComparisonGrid';
import FaqAccordion from '@/components/HowItWorks/FaqAccordion';

const HowItWorksPage = () => {
    const [activeTab, setActiveTab] = useState<'employer' | 'jobseeker'>('employer');
    const employerRef = useRef<HTMLElement>(null);
    const jobseekerRef = useRef<HTMLElement>(null);
    const [quickJobTitle, setQuickJobTitle] = useState('');

    // Stats confirmed from live site
    const stats = [
        { value: '9 Million+', label: 'Active Resumes' },
        { value: '15,000+', label: 'Roles Filled' },
        { value: '1,182+', label: 'Global Clients' },
        { value: '35%', label: 'Avg. Salary Growth' },
        { value: '12 Days', label: 'Avg. Time-to-Hire' }
    ];

    // FAQ Content
    const employerFaqs = [
        { question: 'How much does it cost to post a job?', answer: 'Posting starts at $199 for a single job post with 30 days visibility. Our Pro plan at $499 includes 3 job posts, 60 days visibility, featured placement, and full resume database access. Enterprise pricing is available for unlimited posts with a dedicated account manager.' },
        { question: 'Are the resumes really verified?', answer: 'Every profile in our database goes through a review process to confirm skills, experience, and availability. Verified profiles display a Verified badge in employer search results.' },
        { question: 'Can I search active resumes before posting a job?', answer: 'Yes. Use Hire Specialists to search active resumes from our database of 9 Million+ Verified Professionals before committing to a job post.' },
        { question: 'What happens after I select my top 3 candidates?', answer: 'We handle the connection to get your interview started. You will receive everything you need to move forward.' },
        { question: 'Is there a contract or lock-in period?', answer: 'No. Each job post is a one-time transaction with no subscription and no lock-in.' },
        { question: 'What if I am not satisfied with the candidates?', answer: '[PLACEHOLDER — confirm satisfaction or re-match policy with business owner before publishing]' },
    ];

    const jobseekerFaqs = [
        { question: 'Is it free to create a profile?', answer: 'Yes. Creating and maintaining your profile is completely free. You will never be charged to apply or to get discovered by employers.' },
        { question: 'Do I need to actively apply to jobs?', answer: 'No. Once your profile is live you can get discovered by global employers. Receive instant alerts the moment an employer selects you for an interview or a role.' },
        { question: 'What kind of salary growth can I expect?', answer: 'Professionals on RemoteJobs.ph see an average salary growth of 35%. Results vary by skill set and experience level.' },
        { question: 'Can I browse and apply while waiting to be discovered?', answer: 'Yes. Explore thousands of high-paying remote roles and apply with a single click at any time from the Jobs page.' },
        { question: 'What if I do not have a portfolio or GitHub?', answer: '[PLACEHOLDER — confirm profile requirements with business owner before publishing]' },
    ];

    const steps = {
        employer: [
            {
                title: 'Create & Post',
                description: 'Register your account to post your open roles and define your ideal tech stack.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            },
            {
                title: 'Search Active Resumes',
                description: 'Search active resumes from our database of 9 Million+ Verified Professionals using advanced AI-matching.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            },
            {
                title: 'Connect & Hire',
                description: 'Select your top 3 candidates and we will handle the connection to get your interview started.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            }
        ],
        jobseeker: [
            {
                title: 'Build Your Profile',
                description: 'Create a standout digital profile that puts your skills in front of global decision-makers.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            },
            {
                title: 'Browse & Apply',
                description: 'Explore thousands of high-paying remote roles and apply with a single click.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            },
            {
                title: 'Get Notified',
                description: 'Receive instant alerts the moment an employer selects you for an interview or a role.',
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            }
        ]
    };

    // Intersection Observer for scroll-synced navigation
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'for-employers') {
                        setActiveTab('employer');
                    } else if (entry.target.id === 'for-jobseekers') {
                        setActiveTab('jobseeker');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const employerHeading = document.getElementById('for-employers');
        const jobseekerHeading = document.getElementById('for-jobseekers');

        if (employerHeading) observer.observe(employerHeading);
        if (jobseekerHeading) observer.observe(jobseekerHeading);

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-deep">
            <Header />

            <main className="flex-1">
                {/* SECTION 1 — PAGE HERO */}
                <section className="relative pt-20 pb-32 overflow-hidden bg-background-deep">
                    <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-indigo/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <span className="inline-block px-4 py-2 bg-primary-indigo/10 text-primary-indigo border border-primary-indigo/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    Platform Guide
                                </span>
                                <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter italic animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    How It Works.<br />
                                    <span className="text-primary-indigo">Why It Works.</span>
                                </h1>
                                <p className="text-text-muted text-xl md:text-2xl mb-12 max-w-[25ch] lg:mx-0 mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                                    A transparent process built for employers who need elite talent and professionals who are ready to go global.
                                </p>

                                {/* Mini Action Tabs */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                                    <button
                                        onClick={() => scrollToSection('for-employers')}
                                        className={`px-10 py-5 rounded-2xl font-black transition-all ${activeTab === 'employer' ? 'bg-primary-indigo text-white shadow-glow-indigo' : 'bg-white/5 text-text-muted hover:bg-white/10'}`}
                                    >
                                        For Employers
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('for-jobseekers')}
                                        className={`px-10 py-5 rounded-2xl font-black transition-all ${activeTab === 'jobseeker' ? 'bg-accent-cyber text-navy-900' : 'bg-white/5 text-text-muted hover:bg-white/20'}`}
                                    >
                                        For Job Seekers
                                    </button>
                                </div>

                                {/* Quick Post Mini Form */}
                                <div className="bg-navy-900/50 backdrop-blur-xl border border-white/10 p-2 rounded-3xl flex flex-col sm:flex-row gap-2 max-w-xl shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
                                    <input
                                        type="text"
                                        value={quickJobTitle}
                                        onChange={(e) => setQuickJobTitle(e.target.value)}
                                        placeholder="Job title or role (e.g. React Developer)"
                                        className="flex-1 px-6 py-4 bg-transparent text-white font-bold placeholder:text-navy-500 outline-none"
                                    />
                                    <Link
                                        href={`/employer/post-job?title=${encodeURIComponent(quickJobTitle)}`}
                                        className="bg-primary-indigo text-white px-8 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all text-center"
                                    >
                                        Post a Job
                                    </Link>
                                </div>
                                <p className="mt-4 text-navy-500 text-sm font-medium">Free to start. No credit card required.</p>
                            </div>

                            {/* Right Content — Video Placeholder */}
                            <div className="flex-1 w-full lg:max-w-xl animate-in fade-in zoom-in duration-1000">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-primary-indigo/20 blur-3xl rounded-full opacity-50"></div>
                                    <div className="relative aspect-video bg-navy-900 rounded-[3rem] border-8 border-white/5 overflow-hidden shadow-2xl group cursor-pointer ring-1 ring-white/10">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 to-primary-indigo/20"></div>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                            <div className="w-20 h-20 bg-primary-indigo rounded-full flex items-center justify-center shadow-glow-indigo group-hover:scale-110 transition-transform duration-500">
                                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1.5"></div>
                                            </div>
                                            <h4 className="mt-6 text-xl font-black text-white italic">How RemoteJobs.ph Works</h4>
                                            <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-2">Platform Walkthrough</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex items-center gap-4 text-navy-500 px-6">
                                        <span className="text-xs font-black uppercase tracking-widest">See it in action</span>
                                        <div className="h-px flex-1 bg-white/5"></div>
                                        <p className="text-[10px] font-medium max-w-[20ch]">See how employers find elite Filipino talent.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TRUST BAR — STATS */}
                <section className="py-12 border-y border-white/5 bg-navy-950/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-between items-center gap-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-3xl font-black text-white leading-none mb-1">{stat.value}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-500">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 2 — FOR EMPLOYERS — 3 STEPS */}
                <section id="for-employers" className="py-32 bg-background-deep scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-24">
                            <span className="inline-block px-4 py-2 bg-primary-indigo/10 text-primary-indigo border border-primary-indigo/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                For Employers
                            </span>
                            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 font-geist tracking-tighter italic">
                                Your Global Connection<br />
                                in <span className="text-primary-indigo text-outline">3 Easy Steps</span>
                            </h2>
                            <p className="text-text-muted text-xl max-w-[65ch] mx-auto font-medium leading-relaxed">
                                Whether you are building a team or a career, we make it seamless.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {steps.employer.map((step, idx) => (
                                <div key={idx} className="group glass-card p-12 border border-white/5 hover:border-primary-indigo/50 transition-all duration-700 hover:shadow-glow-indigo relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 text-[12rem] font-black text-white/[0.03] italic leading-none group-hover:text-primary-indigo/[0.05] transition-colors">{idx + 1}</div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-primary-indigo/10 rounded-2xl flex items-center justify-center text-primary-indigo mb-10 group-hover:bg-primary-indigo group-hover:text-white transition-all duration-500">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4 font-geist">Step {idx + 1}: {step.title}</h3>
                                        <p className="text-text-muted font-medium leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 flex flex-col items-center gap-6">
                            <Link href="/employer/post-job" className="btn-primary py-6 px-16 rounded-2xl text-xl shadow-xl hover:scale-105 transition-all">Start Hiring Now</Link>
                            <Link href="/employer/search-resumes" className="text-navy-400 font-black hover:text-white transition-colors uppercase tracking-widest text-xs">Search 9M+ Resumes Free</Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 3 — FOR JOB SEEKERS — 3 STEPS */}
                <section id="for-jobseekers" className="py-32 bg-navy-950 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-24">
                            <span className="inline-block px-4 py-2 bg-accent-cyber/10 text-accent-cyber border border-accent-cyber/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                For Job Seekers
                            </span>
                            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 font-geist tracking-tighter italic">
                                Your Global Connection<br />
                                in <span className="text-accent-cyber">3 Easy Steps</span>
                            </h2>
                            <p className="text-text-muted text-xl max-w-[65ch] mx-auto font-medium leading-relaxed">
                                Whether you are building a team or a career, we make it seamless.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {steps.jobseeker.map((step, idx) => (
                                <div key={idx} className="group glass-card p-12 border border-white/5 hover:border-accent-cyber/50 transition-all duration-700 hover:shadow-[0_0_50px_rgba(202,244,113,0.1)] relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 text-[12rem] font-black text-white/[0.03] italic leading-none group-hover:text-accent-cyber/[0.05] transition-colors">{idx + 1}</div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-accent-cyber/10 rounded-2xl flex items-center justify-center text-accent-cyber mb-10 group-hover:bg-accent-cyber group-hover:text-navy-900 transition-all duration-500">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-4 font-geist">Step {idx + 1}: {step.title}</h3>
                                        <p className="text-text-muted font-medium leading-relaxed mb-8">{step.description}</p>

                                        <div className="flex flex-wrap gap-2">
                                            {idx === 0 && (
                                                <>
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy-400">Free Forever</span>
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy-400">Global Reach</span>
                                                </>
                                            )}
                                            {idx === 1 && (
                                                <>
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy-400">Thousands of Roles</span>
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy-400">One-Click Apply</span>
                                                </>
                                            )}
                                            {idx === 2 && (
                                                <>
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-navy-400">Instant Alerts</span>
                                                    <span className="px-3 py-1 bg-accent-cyber/10 text-accent-cyber rounded-full text-[10px] font-black uppercase tracking-widest">35% Avg. Salary Growth</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 flex flex-col items-center gap-6">
                            <Link href="/register?type=jobseeker" className="btn-cyan py-6 px-16 rounded-2xl text-xl shadow-xl hover:scale-105 transition-all text-center">Join 9M+ Professionals</Link>
                            <Link href="/jobs" className="text-navy-400 font-black hover:text-white transition-colors uppercase tracking-widest text-xs">Browse Roles</Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 4 — AT A GLANCE COMPARISON */}
                <section className="py-32 bg-navy-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <span className="inline-block px-4 py-2 bg-primary-indigo/10 text-primary-indigo border border-primary-indigo/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                At a Glance
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 font-geist tracking-tight italic">
                                Two Paths. One Platform.
                            </h2>
                            <p className="text-text-muted text-xl max-w-[65ch] mx-auto font-medium leading-relaxed">
                                Whether you are hiring or looking for work — the process is simple and transparent.
                            </p>
                        </div>

                        <ComparisonGrid />

                        {/* Stats Row below table */}
                        <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center flex flex-col justify-center backdrop-blur-xl">
                                    <span className="text-2xl font-black text-primary-indigo mb-1">{stat.value}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 5 — SECONDARY VIDEO (Gated) */}
                {process.env.NEXT_PUBLIC_VIDEO_WALKTHROUGH_URL && (
                    <section className="py-32 bg-background-deep text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-geist tracking-tight italic">See the Full Platform Walkthrough</h2>
                            <p className="text-white/60 text-xl font-medium mb-16 leading-relaxed">A deeper look at how employers search active resumes and how professionals build their profiles.</p>

                            <div className="relative aspect-video bg-navy-800 rounded-[3rem] overflow-hidden shadow-glow-indigo border border-white/10 group mb-16">
                                <div className="absolute inset-0 bg-primary-indigo/10 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-primary-indigo rounded-full flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform cursor-pointer">
                                        <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-8">
                                <Link href="/employer/post-job" className="btn-primary py-6 px-12 rounded-2xl shadow-xl hover:scale-105 transition-all text-xl">Start Hiring Now</Link>
                                <Link href="/register?type=jobseeker" className="btn-cyan py-6 px-12 rounded-2xl text-xl hover:scale-105 transition-all font-black">Join 9M+ Professionals</Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 6 — FAQ */}
                <section className="py-32 bg-navy-950">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <span className="inline-block px-4 py-2 bg-primary-indigo/10 text-primary-indigo border border-primary-indigo/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                                FAQ
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-geist tracking-tight italic">Common Questions</h2>
                            <p className="text-text-muted text-xl font-medium leading-relaxed">Everything else you need to know before you start.</p>
                        </div>

                        <FaqAccordion employerFaqs={employerFaqs} jobseekerFaqs={jobseekerFaqs} />

                        {/* Still have questions block */}
                        <div className="mt-24 p-12 bg-white/5 rounded-[3rem] border border-white/10 text-center shadow-sm backdrop-blur-xl">
                            <p className="text-xl font-black text-white mb-8 italic">Still have questions? Our team is here to help.</p>
                            <a href="mailto:contact@remotejobs.ph" className="btn-outline-white py-5 px-12 rounded-2xl text-lg font-black hover:scale-105 transition-all inline-block">Contact Support</a>
                        </div>
                    </div>
                </section>

                {/* SECTION 7 — BOTTOM CTA REDESIGNED TO MATCH HOMEPAGE */}
                <section className="py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-primary-indigo to-accent-cyber rounded-[60px] p-16 md:p-24 relative overflow-hidden text-center shadow-[0_30px_100px_-20px_rgba(99,102,241,0.5)]">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                            <div className="relative z-10 max-w-4xl mx-auto">
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tighter italic">Ready to Start?</h2>
                                <p className="text-xl md:text-2xl text-white/90 mb-16 font-medium leading-relaxed">Choose your path—the elite standard in Filipino remote remote hiring starts here.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] flex flex-col items-center">
                                        <h3 className="text-3xl font-black text-white mb-4 italic">For Employers</h3>
                                        <p className="text-white/80 font-medium mb-8 flex-1">Source the top 1% of Filipino talent effortlessly.</p>
                                        <Link href="/employer/post-job" className="bg-white text-navy-900 w-full py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">Post a Job</Link>
                                    </div>
                                    <div className="bg-navy-950/20 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center">
                                        <h3 className="text-3xl font-black text-white mb-4 italic">For Job Seekers</h3>
                                        <p className="text-white/80 font-medium mb-8 flex-1">Go global from home and grow your career.</p>
                                        <Link href="/register?type=jobseeker" className="bg-navy-900 text-white w-full py-5 rounded-2xl font-black text-lg hover:bg-navy-950/80 transition-all border border-white/10">Browse Roles</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <p className="text-lg font-medium text-navy-400">
                                Already have an account? <Link href="/login" className="text-primary-indigo font-black hover:underline ml-2 transition-all">Log In</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HowItWorksPage;
