'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Briefcase, Search, MapPin, DollarSign } from 'lucide-react';
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
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
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
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={2} />
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
                        <div className="text-center py-24 bg-white rounded-[40px] shadow-sm border border-navy-100/50 p-12">
                            <div className="w-20 h-20 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Users size={40} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-3xl font-black text-navy-950 mb-4">Can't find the right role?</h3>
                            <p className="text-navy-600 font-medium mb-10 max-w-md mx-auto">
                                Let us do the work for you. Join our <strong>Talent Concierge</strong> and we'll notify you the moment a matching role drops.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/register?type=jobseeker" className="btn-primary !px-10">Join Concierge</Link>
                                <button onClick={() => { setSearchTerm(''); setCategoryFilter(''); }} className="btn-outline-navy !px-10">Clear Filters</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredJobs.map((job) => (
                                <Link href={`/jobs/${job.id}`} key={job.id} className="group">
                                    <div className="bg-white border border-navy-100/50 rounded-[32px] p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-navy-900/5 hover:-translate-y-1 flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex items-start gap-6">
                                            <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/10 transition-colors">
                                                <Briefcase size={32} strokeWidth={1.5} />
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
                                                        <MapPin size={16} strokeWidth={2} />
                                                        {job.location}
                                                    </span>
                                                    {job.salary_range && (
                                                        <span className="flex items-center gap-2 text-green-600 font-bold">
                                                            <DollarSign size={16} strokeWidth={2} />
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
