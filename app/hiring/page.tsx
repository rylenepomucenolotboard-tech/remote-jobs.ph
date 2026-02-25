'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const HiringPlatformPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <section className="relative pt-20 pb-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-5xl md:text-8xl font-black text-navy-900 mb-8 leading-[0.9] tracking-tighter italic">
                            <span className="block">Source the</span>
                            <span className="block text-primary-indigo">Top 1%.</span>
                            <span className="block">Hire in 12 Days.</span>
                        </h1>
                        <p className="text-navy-600 text-xl md:text-2xl mb-12 max-w-[30ch] font-medium leading-relaxed">
                            Access 9 Million+ verified Filipino professionals. No agencies. No placement fees. Just elite talent, fast.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/employer/search-resumes" className="bg-primary-indigo text-white px-10 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all text-center shadow-lg">
                                Search Candidates Free
                            </Link>
                            <Link href="/employer/post-job" className="bg-navy-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-navy-950 transition-all text-center">
                                Post a Job
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HiringPlatformPage;
