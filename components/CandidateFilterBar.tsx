"use client";

import { useState } from 'react';

export default function CandidateFilterBar() {
    const [skills, setSkills] = useState(['React', 'Node.js', 'UI Design']);

    return (
        <div className="bg-white border-b border-navy-100 sticky top-20 z-30 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Skill Tags */}
                    <div className="flex-1 min-w-[300px]">
                        <label className="block text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Expertise</label>
                        <div className="flex flex-wrap gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Filter by skills (e.g. AWS, Python)"
                                    className="w-full pl-10 pr-4 py-2 bg-navy-50 border border-navy-100 rounded-lg text-sm focus:outline-none focus:border-primary transition-all"
                                />
                                <svg className="w-4 h-4 text-navy-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Years of Experience */}
                    <div className="w-48">
                        <label className="block text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Experience</label>
                        <select className="w-full px-4 py-2 bg-navy-50 border border-navy-100 rounded-lg text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer font-bold text-navy-950">
                            <option>All Experience</option>
                            <option>Entry (0-2 yrs)</option>
                            <option>Mid (3-5 yrs)</option>
                            <option>Senior (6-10 yrs)</option>
                            <option>Expert (10+ yrs)</option>
                        </select>
                    </div>

                    {/* Expected Salary */}
                    <div className="w-56">
                        <label className="block text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Min. Monthly Salary</label>
                        <div className="flex items-center gap-3">
                            <span className="text-navy-400 font-bold">$</span>
                            <input
                                type="number"
                                placeholder="2,000"
                                className="w-full px-4 py-2 bg-navy-50 border border-navy-100 rounded-lg text-sm focus:outline-none focus:border-primary font-bold text-navy-950"
                            />
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="w-44">
                        <label className="block text-xs font-black text-navy-400 uppercase tracking-widest mb-2">Availability</label>
                        <select className="w-full px-4 py-2 bg-navy-50 border border-navy-100 rounded-lg text-sm focus:outline-none focus:border-primary appearance-none cursor-pointer font-bold text-navy-950">
                            <option>Any Availability</option>
                            <option>Immediate</option>
                            <option>2 Weeks</option>
                            <option>1 Month</option>
                        </select>
                    </div>

                    {/* Reset Filters */}
                    <div className="flex items-end pb-0.5">
                        <button className="text-navy-400 hover:text-primary text-sm font-bold transition-colors">
                            Reset All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
