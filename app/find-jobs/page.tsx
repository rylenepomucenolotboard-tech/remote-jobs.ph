'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock Data
const MOCK_JOBS = [
    { id: 1, title: 'Visual Designer', company: 'Deloitte', location: 'Chicago IL', experience: '3 to 5 Years', type: 'Full-Time', salary: '$57k - $62k', posted: '3 mins ago', logo: 'D' },
    { id: 2, title: 'Product Designer', company: 'Grubhub', location: 'Chicago IL', experience: '3 to 5 Years', type: 'Full-Time', salary: '$44k - $52k', posted: '17 mins ago', logo: 'G' },
    { id: 3, title: 'Designer', company: 'Fray Design Group, INC', location: 'Chicago IL', experience: '0 to 1 Year', type: 'Paid Internship', salary: '$14k', posted: '20 mins ago', logo: 'F' },
    { id: 4, title: 'UX Designer', company: 'Mintel', location: 'Chicago IL', experience: '6 to 7 Years', type: 'Full-Time', salary: '$49k - $51k', posted: '32 mins ago', logo: 'M' },
];

const POPULAR_COMPANIES = [
    { name: 'Workday', jobs: 129, logo: 'W' },
    { name: 'Salesforce', jobs: 84, logo: 'S' },
    { name: 'Marriott International', jobs: 73, logo: 'M' },
    { name: 'CarMax', jobs: 62, logo: 'C' },
    { name: 'SAP America Inc.', jobs: 39, logo: 'SAP' },
    { name: 'Deloitte', jobs: 26, logo: 'D' },
    { name: 'Accenture', jobs: 107, logo: 'A' },
    { name: 'Alliance Data', jobs: 35, logo: 'AD' },
];

const JOB_TYPES = [
    { label: 'All', count: 284, active: true },
    { label: 'Full Time', count: 146 },
    { label: 'Part Time', count: 32 },
    { label: 'Contract', count: 18 },
    { label: 'Internship', count: 81 },
    { label: 'Freelance', count: 7 },
];

const LOCATIONS = [
    { label: 'Chicago, IL', count: 284, active: true },
    { label: 'Niles, IL', count: 46 },
    { label: 'Oak Brook, IL', count: 39 },
    { label: 'Northbrook, IL', count: 37 },
    { label: 'Skokie, IL', count: 34 },
];

const COMPANIES = [
    { label: 'All', count: 284, active: true },
    { label: 'Abbott', count: 32 },
    { label: 'Drivative Solutions', count: 18 },
    { label: 'Cars.com', count: 29 },
    { label: 'Caterpillar Inc.', count: 27 },
];

const FindJobsPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#f4f7f6]">
            <Header />
            <main className="flex-1">

                {/* HERO SEARCH SECTION */}
                <section className="bg-navy-950 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center md:text-left">Find your dream job</h1>

                        <div className="flex flex-col md:flex-row gap-4 max-w-5xl">
                            {/* Search Keyword Input */}
                            <div className="flex-1 bg-white rounded-xl p-2 flex items-center shadow-lg">
                                <div className="flex-1 px-4">
                                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Search job title, keywords or company</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Designer"
                                            className="w-full bg-transparent border-none text-navy-900 font-bold focus:ring-0 p-0"
                                            defaultValue="Designer"
                                        />
                                        <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Location Input */}
                            <div className="flex-1 bg-white rounded-xl p-2 flex items-center shadow-lg">
                                <div className="flex-1 px-4">
                                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Location</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Chicago, IL"
                                            className="w-full bg-transparent border-none text-navy-900 font-bold focus:ring-0 p-0"
                                            defaultValue="Chicago, IL"
                                        />
                                        <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Search Button */}
                            <button className="bg-primary-indigo text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-indigo/90 transition-colors shadow-lg shadow-primary-indigo/30 text-lg md:text-xl shrink-0">
                                Search
                            </button>
                        </div>
                    </div>
                </section>

                {/* MAIN GRID LAYOUT */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* LEFT COLUMN: FILTERS */}
                        <div className="lg:col-span-3 hidden lg:block space-y-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-navy-900">Filters</h2>
                                <button className="text-sm font-bold text-gray-400 hover:text-navy-900 transition-colors">Clear All</button>
                            </div>

                            {/* Job Type Filter */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Job Type</h3>
                                    <button className="text-[11px] font-bold text-gray-400 hover:text-navy-900">Clear</button>
                                </div>
                                <ul className="space-y-3">
                                    {JOB_TYPES.map((item, i) => (
                                        <li key={i}>
                                            <button className={`text-sm font-semibold flex items-center justify-between w-full text-left transition-colors ${item.active ? 'text-primary-indigo' : 'text-navy-900 hover:text-primary-indigo'}`}>
                                                <span>{item.label}</span>
                                                {item.active ? <span>({item.count})</span> : <span className="text-gray-400 font-medium">({item.count})</span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Location Filter */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Location</h3>
                                    <button className="text-[11px] font-bold text-gray-400 hover:text-navy-900">Clear</button>
                                </div>
                                <ul className="space-y-3">
                                    {LOCATIONS.map((item, i) => (
                                        <li key={i}>
                                            <button className={`text-sm font-semibold flex items-center justify-between w-full text-left transition-colors ${item.active ? 'text-primary-indigo' : 'text-navy-900 hover:text-primary-indigo'}`}>
                                                <span>{item.label}</span>
                                                {item.active ? <span>({item.count})</span> : <span className="text-gray-400 font-medium">({item.count})</span>}
                                            </button>
                                        </li>
                                    ))}
                                    <li><button className="text-xs font-bold text-gray-400 hover:text-navy-900 flex items-center gap-1 mt-2">More <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button></li>
                                </ul>
                            </div>

                            {/* Company Filter */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-wider">Company</h3>
                                    <button className="text-[11px] font-bold text-gray-400 hover:text-navy-900">Clear</button>
                                </div>
                                <ul className="space-y-3">
                                    {COMPANIES.map((item, i) => (
                                        <li key={i}>
                                            <button className={`text-sm font-semibold flex items-center justify-between w-full text-left transition-colors ${item.active ? 'text-primary-indigo' : 'text-navy-900 hover:text-primary-indigo'}`}>
                                                <span>{item.label}</span>
                                                {item.active ? <span>({item.count})</span> : <span className="text-gray-400 font-medium">({item.count})</span>}
                                            </button>
                                        </li>
                                    ))}
                                    <li><button className="text-xs font-bold text-gray-400 hover:text-navy-900 flex items-center gap-1 mt-2">More <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button></li>
                                </ul>
                            </div>
                        </div>

                        {/* MIDDLE COLUMN: JOB LISTINGS */}
                        <div className="lg:col-span-6 space-y-6">

                            {/* Upload Resume Banner */}
                            <div className="bg-indigo-50 border border-primary-indigo/20 rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:bg-indigo-100/50 transition-colors">
                                <div className="bg-white p-3 rounded-lg text-primary-indigo shadow-sm shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-navy-900 text-lg">Upload your resume</h3>
                                    <p className="text-primary-indigo/80 text-sm font-medium">We'll match you with the best jobs. Right job, Right away!</p>
                                </div>
                            </div>

                            {/* Results & Sort */}
                            <div className="flex items-center justify-between text-sm py-2">
                                <span className="text-gray-500 font-medium">284 results found</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400 font-medium">Sort By:</span>
                                    <button className="font-bold text-navy-900 flex items-center gap-1">
                                        Date Posted
                                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Job Cards */}
                            <div className="space-y-4">
                                {MOCK_JOBS.map((job) => (
                                    <div key={job.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">

                                        {/* Card Header */}
                                        <div className="flex gap-4 mb-6">
                                            <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center font-bold text-navy-900 text-xl shrink-0">
                                                {job.logo}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-navy-900 group-hover:text-primary-indigo transition-colors cursor-pointer">{job.title}</h3>
                                                <p className="text-sm font-semibold text-gray-500">{job.company} · {job.location}</p>
                                            </div>
                                        </div>

                                        {/* Card Grid Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Experience</span>
                                                <span className="font-bold text-navy-900 text-sm">{job.experience}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Job Type</span>
                                                <span className="font-bold text-navy-900 text-sm">{job.type}</span>
                                            </div>
                                            <div>
                                                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1 tracking-wider">Salary</span>
                                                <span className="font-bold text-navy-900 text-sm">{job.salary} <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold ml-1">per year</span></span>
                                            </div>
                                        </div>

                                        {/* Card Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <span className="text-xs font-bold text-gray-400 transition-colors">Posted {job.posted}</span>
                                            <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-navy-900 transition-colors">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                                                Save Job
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: WIDGETS */}
                        <div className="lg:col-span-3 space-y-10">

                            {/* Subscribe Widget */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-navy-900 mb-1 leading-snug">Be the first to see new jobs in <span className="text-primary-indigo">Chicago, IL</span></h3>

                                <div className="mt-6 mb-4">
                                    <div className="border border-gray-200 rounded-xl px-4 py-2 hover:border-primary-indigo/50 transition-colors focus-within:border-primary-indigo focus-within:ring-1 focus-within:ring-primary-indigo">
                                        <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Email</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full bg-transparent border-none text-navy-900 font-semibold p-0 focus:ring-0 text-sm"
                                            defaultValue="steve.scaife34@gmail.com"
                                        />
                                    </div>
                                </div>
                                <button className="w-full bg-indigo-50 text-primary-indigo border border-indigo-100 font-bold py-3.5 rounded-xl hover:bg-primary-indigo hover:text-white transition-all text-sm mb-4">
                                    Subscribe Now
                                </button>
                                <button className="text-xs font-semibold text-gray-400 hover:text-navy-900 transition-colors">Not interested. Hide now</button>
                            </div>

                            {/* Popular Companies Widget */}
                            <div>
                                <h3 className="text-lg font-bold text-navy-900 mb-6">Popular in <span className="text-primary-indigo">Chicago</span></h3>
                                <ul className="space-y-5">
                                    {POPULAR_COMPANIES.map((company, i) => (
                                        <li key={i} className="flex items-center gap-4 cursor-pointer group">
                                            <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center font-bold text-navy-900 text-xs shrink-0 group-hover:border-primary-indigo/30 transition-colors">
                                                {company.logo}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-navy-900 group-hover:text-primary-indigo transition-colors">{company.name}</h4>
                                                <p className="text-xs font-semibold text-gray-400">{company.jobs} Jobs</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-sm font-bold text-primary-indigo hover:text-navy-900 transition-colors mt-6 flex items-center gap-1">
                                    See all jobs <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
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
