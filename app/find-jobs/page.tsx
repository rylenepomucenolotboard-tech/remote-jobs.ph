'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const jobCategories = [
    { title: 'Software Engineering', count: '12,400+', icon: '💻' },
    { title: 'Product & Design', count: '4,200+', icon: '🎨' },
    { title: 'Data & Analytics', count: '3,800+', icon: '📊' },
    { title: 'Marketing & Growth', count: '5,100+', icon: '📈' },
    { title: 'Customer Success', count: '6,700+', icon: '🤝' },
    { title: 'Finance & Accounting', count: '2,900+', icon: '💼' },
];

const stats = [
    { value: '9M+', label: 'Active Professionals' },
    { value: '15,000+', label: 'Roles Filled' },
    { value: '35%', label: 'Avg. Salary Growth' },
    { value: '12 Days', label: 'Avg. Time-to-Hire' },
];

const FindJobsPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">

                {/* HERO */}
                <section className="relative pt-20 pb-32 bg-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-cyber/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-8xl font-black text-navy-900 mb-8 leading-[0.9] tracking-tighter italic">
                                <span className="block">Find Your</span>
                                <span className="block text-primary-indigo">Dream Job.</span>
                                <span className="block">Go Global.</span>
                            </h1>
                            <p className="text-navy-600 text-xl md:text-2xl mb-12 max-w-[40ch] font-medium leading-relaxed">
                                Browse thousands of high-paying remote roles from global companies — and get discovered while you sleep.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/jobs" className="bg-accent-cyber text-navy-900 px-10 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all text-center shadow-lg">
                                    Browse All Jobs
                                </Link>
                                <Link href="/register?type=jobseeker" className="bg-navy-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-navy-950 transition-all text-center">
                                    Get Discovered Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="py-12 border-y border-navy-100 bg-navy-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-between items-center gap-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-3xl font-black text-navy-900 leading-none mb-1">{stat.value}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-600">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* JOB CATEGORIES */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <span className="inline-block px-4 py-2 bg-navy-900 text-accent-cyber rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-md">Browse by Category</span>
                            <h2 className="text-5xl md:text-7xl font-black text-navy-900 mb-6 tracking-tighter italic">
                                Every Role.<br /><span className="text-primary-indigo">Every Industry.</span>
                            </h2>
                            <p className="text-navy-600 text-xl max-w-[50ch] mx-auto font-medium leading-relaxed">
                                From startups to Fortune 500s — thousands of remote roles waiting for elite Filipino talent.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobCategories.map((cat, i) => (
                                <Link key={i} href="/jobs" className="group bg-navy-50/50 border border-navy-100 rounded-[2rem] p-8 hover:bg-navy-900 hover:border-navy-900 hover:shadow-2xl hover:shadow-navy-900/20 transition-all duration-300 flex flex-col justify-center min-h-[160px]">
                                    <h3 className="text-xl font-black text-navy-900 group-hover:text-white mb-2 transition-colors duration-300">{cat.title}</h3>
                                    <p className="text-primary-indigo group-hover:text-accent-cyber font-black text-sm transition-colors duration-300">{cat.count} open roles</p>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/jobs" className="bg-navy-900 text-white px-14 py-5 rounded-2xl font-black text-lg hover:bg-navy-950 transition-all shadow-xl inline-block">
                                View All Jobs
                            </Link>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS FOR JOB SEEKERS */}
                <section className="py-32 bg-navy-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <span className="inline-block px-4 py-2 bg-navy-900 text-accent-cyber rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-md">How It Works</span>
                            <h2 className="text-5xl md:text-7xl font-black text-navy-900 mb-6 tracking-tighter italic">
                                Land a Global Role<br /><span className="text-primary-indigo">in 3 Steps.</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: '01', title: 'Build Your Profile', desc: 'Create a free profile that puts your skills in front of global hiring managers. No resume required.' },
                                { step: '02', title: 'Apply or Get Found', desc: 'Browse thousands of remote roles and apply with one click — or let employers discover you directly.' },
                                { step: '03', title: 'Get Hired', desc: 'Receive instant notifications when an employer selects you. Avg. time-to-hire is just 12 days.' },
                            ].map((item, i) => (
                                <div key={i} className="group bg-white border border-navy-100 rounded-[2.5rem] p-12 hover:border-accent-cyber/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute -top-6 -right-6 text-[10rem] font-black text-navy-900/[0.03] italic leading-none">{item.step}</div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-primary-indigo/10 rounded-2xl flex items-center justify-center text-primary-indigo font-black text-xl mb-8 group-hover:bg-primary-indigo group-hover:text-white transition-all duration-500">
                                            {item.step}
                                        </div>
                                        <h3 className="text-2xl font-black text-navy-900 mb-4">{item.title}</h3>
                                        <p className="text-navy-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-navy-900 to-primary-indigo rounded-[60px] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic leading-tight">Your Global Career Starts Here.</h2>
                                <p className="text-white/80 text-xl font-medium mb-12">Join 9M+ professionals already on RemoteJobs.ph. Free forever.</p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/register?type=jobseeker" className="bg-accent-cyber text-navy-900 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
                                        Create Free Profile
                                    </Link>
                                    <Link href="/jobs" className="bg-white/10 border border-white/20 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                                        Browse Jobs
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default FindJobsPage;
