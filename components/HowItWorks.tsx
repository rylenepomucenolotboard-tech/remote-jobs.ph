'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HowItWorks = () => {
    const [hoveredColumn, setHoveredColumn] = useState<null | 'employer' | 'jobseeker'>(null);

    const steps = {
        employer: [
            {
                title: 'Create & Post',
                description: 'Register your account in seconds to post your open roles and define your ideal tech stack.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                ),
            },
            {
                title: 'Access 9 Million+ Active Resumes',
                description: 'Filter and search through our database of 9 Million+ active resumes using advanced AI-matching.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                ),
            },
            {
                title: 'Connect & Hire',
                description: 'Select your top 3 candidates and we will handle the connection to get your interview started.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                ),
            },
        ],
        jobseeker: [
            {
                title: 'Build Your Profile',
                description: 'Create a standout digital profile that puts your skills in front of global decision-makers.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                ),
            },
            {
                title: 'Browse & Apply',
                description: 'Explore thousands of high-paying remote roles and apply with a single click.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                ),
            },
            {
                title: 'Get Notified',
                description: 'Receive instant alerts the moment an employer selects you for an interview or a role.',
                icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                ),
            },
        ],
    };

    return (
        <section className="py-32 bg-navy-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-7xl font-black text-navy-900 mb-6 tracking-tight font-geist">
                        Your Global Connection in 3 Easy Steps
                    </h2>
                    <p className="text-navy-600 text-xl max-w-[65ch] mx-auto font-medium leading-relaxed">
                        Whether you are building a team or a career, we make it seamless.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                    {/* For Employers (The Hiring Engine) */}
                    <div
                        className={`group bg-white border border-navy-100 rounded-[3rem] p-12 transition-all duration-700 hover:border-primary-indigo/50 hover:shadow-glow-indigo ${hoveredColumn === 'jobseeker' ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'
                            }`}
                        onMouseEnter={() => setHoveredColumn('employer')}
                        onMouseLeave={() => setHoveredColumn(null)}
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black text-navy-900 font-geist uppercase tracking-tight">For Employers</h3>
                        </div>

                        <div className="space-y-12 mb-16">
                            {steps.employer.map((step, idx) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-primary-indigo/10 rounded-xl flex items-center justify-center text-primary-indigo group-hover:bg-primary-indigo group-hover:text-white transition-all duration-500">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-navy-900 mb-2 font-geist">
                                            Step {idx + 1}: {step.title}
                                        </h4>
                                        <p className="text-navy-600 font-medium leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/employer/post-job" className="btn-primary w-full py-6 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all">
                            Start Hiring Now
                        </Link>
                    </div>

                    {/* For Job Seekers (The Career Launchpad) */}
                    <div
                        className={`group bg-white border border-navy-100 rounded-[3rem] p-12 transition-all duration-700 hover:border-accent-cyber/50 hover:shadow-[0_0_50px_rgba(0,255,148,0.1)] ${hoveredColumn === 'employer' ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'
                            }`}
                        onMouseEnter={() => setHoveredColumn('jobseeker')}
                        onMouseLeave={() => setHoveredColumn(null)}
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-16 h-16 bg-accent-cyber/10 rounded-2xl flex items-center justify-center text-accent-cyber">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black text-navy-900 font-geist uppercase tracking-tight">For Job Seekers</h3>
                        </div>

                        <div className="space-y-12 mb-16">
                            {steps.jobseeker.map((step, idx) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-accent-cyber/10 rounded-xl flex items-center justify-center text-accent-cyber group-hover:bg-accent-cyber group-hover:text-navy-900 transition-all duration-500">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-navy-900 mb-2 font-geist">
                                            Step {idx + 1}: {step.title}
                                        </h4>
                                        <p className="text-navy-600 font-medium leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/register?type=jobseeker" className="btn-mint w-full py-6 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all text-center">
                            Join 9 Million+ Professionals
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
