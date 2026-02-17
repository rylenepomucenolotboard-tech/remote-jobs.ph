'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, Job } from '@/lib/supabase';

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('status', 'active')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || job.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = Array.from(new Set(jobs.map((job) => job.category)));

    return (
        <div className="min-h-screen flex flex-col bg-navy-50/50">
            <Header />

            <main className="flex-1 pb-24">
                {/* Page Header */}
                <div className="hero-gradient pt-20 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-navy-950 mb-4">Find your dream job</h1>
                                <p className="text-lg text-navy-900/50 max-w-xl">
                                    Looking for jobs? Browse our latest job openings to view & apply to the best jobs today!
                                </p>
                            </div>
                            <div className="shrink-0">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-navy-950 font-bold text-sm shadow-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    {filteredJobs.length} Jobs results
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                    {/* Search and Filters */}
                    <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-navy-100/50 border border-navy-100/20 mb-12">
                        <div className="grid md:grid-cols-5 gap-6">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search job title or keyword"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="input-field !pl-12 !bg-navy-50/30 !border-transparent focus:!bg-white"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="input-field !pl-12 !bg-navy-50/30 !border-transparent focus:!bg-white appearance-none"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <button onClick={fetchJobs} className="btn-primary w-full h-full !py-3">Find Jobs</button>
                            </div>
                        </div>
                    </div>

                    {/* Jobs List */}
                    {loading ? (
                        <div className="text-center py-24">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                            <p className="text-xl text-navy-900/40 font-semibold tracking-tight">Loading jobs...</p>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-navy-100/50">
                            <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔎</div>
                            <h3 className="text-2xl font-bold text-navy-950 mb-2">No jobs matched your search</h3>
                            <p className="text-navy-900/40 font-medium">Try adjusting your filters or searching for something else.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredJobs.map((job) => (
                                <Link href={`/jobs/${job.id}`} key={job.id} className="group">
                                    <div className="bg-white border border-navy-100/50 rounded-[32px] p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-navy-900/5 hover:-translate-y-1 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex items-start gap-6">
                                            <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center text-3xl shrink-0 group-hover:bg-primary/10 transition-colors">
                                                💼
                                            </div>
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                                                        {job.job_type}
                                                    </span>
                                                    <span className="text-navy-900/30 font-bold text-xs uppercase tracking-widest">•</span>
                                                    <span className="text-navy-900/50 font-semibold text-sm">
                                                        {job.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-heading font-extrabold text-navy-950 mb-3 group-hover:text-primary transition-colors">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-6 text-sm text-navy-900/40 font-medium">
                                                    <span className="flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {job.location}
                                                    </span>
                                                    {job.salary_range && (
                                                        <span className="flex items-center gap-2 text-green-600 font-bold">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16V15" />
                                                            </svg>
                                                            {job.salary_range}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <span className="btn-primary !py-4 !px-8 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">View Details</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
