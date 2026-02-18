'use client';

import React from 'react';
import { STATS } from '@/content/stats';

const TestimonialsTrustBar = () => {
    return (
        <div className="bg-navy-900 border-y border-white/5 py-12 mb-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center text-center gap-8 md:gap-12 w-full">
                    <div className="w-full">
                        <p className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Verified Trust Network</p>
                        <div className="text-xl md:text-2xl font-semibold text-white flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                            <span>
                                <strong className="font-bold text-2xl md:text-3xl mr-2">{STATS.globalClients}</strong>
                                <span className="text-navy-300">Clients</span>
                            </span>
                            <span className="text-[#D1D5DB] opacity-50 hidden md:block">|</span>
                            <span>
                                <strong className="font-bold text-2xl md:text-3xl mr-2">{STATS.rolesFilledTotal}</strong>
                                <span className="text-navy-300">Roles Filled</span>
                            </span>
                            <span className="text-[#D1D5DB] opacity-50 hidden md:block">|</span>
                            <span>
                                <strong className="font-bold text-2xl md:text-3xl mr-2">{STATS.activeResumes}</strong>
                                <span className="text-navy-300">Active Resumes</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsTrustBar;
