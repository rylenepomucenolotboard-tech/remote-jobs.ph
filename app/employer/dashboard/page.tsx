'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, Job } from '@/lib/supabase';

export default function EmployerDashboard() {
    const router = useRouter();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        // Check if user is an employer
        const { data: profile } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.id)
            .single();

        if (profile?.user_type !== 'employer') {
            router.push('/jobseeker/dashboard');
            return;
        }

        setUser(user);
        fetchJobs(user.id);
        fetchApplicationCount(user.id);
    };

    const fetchJobs = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .eq('employer_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplicationCount = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('id', { count: 'exact', head: true })
                .in('job_id', jobs.map(j => j.id));

            if (error) throw error;

            // Alternative: fetch with join
            const { count } = await supabase
                .from('applications')
                .select('*, jobs!inner(employer_id)', { count: 'exact', head: true })
                .eq('jobs.employer_id', userId);

            setTotalApplications(count || 0);
        } catch (error) {
            console.error('Error fetching application count:', error);
        }
    };

    const deleteJob = async (jobId: string) => {
        if (!confirm('Are you sure you want to delete this job?')) return;

        try {
            const { error } = await supabase.from('jobs').delete().eq('id', jobId);
            if (error) throw error;

            setJobs(jobs.filter(job => job.id !== jobId));
            alert('Job deleted successfully');
        } catch (error: any) {
            alert(error.message || 'Failed to delete job');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1>Employer Dashboard</h1>
                        <Link href="/employer/post-job" className="btn-primary text-base px-6 py-3">
                            + Post New Job
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="card text-center">
                            <p className="text-base text-gray-600 mb-2">Total Jobs Posted</p>
                            <p className="text-4xl font-bold text-textPrimary">{jobs.length}</p>
                        </div>
                        <div className="card text-center">
                            <p className="text-base text-gray-600 mb-2">Active Jobs</p>
                            <p className="text-4xl font-bold text-accent">
                                {jobs.filter(j => j.status === 'active').length}
                            </p>
                        </div>
                        <div className="card text-center">
                            <p className="text-base text-gray-600 mb-2">Draft Jobs</p>
                            <p className="text-4xl font-bold text-gray-500">
                                {jobs.filter(j => j.status === 'draft').length}
                            </p>
                        </div>
                        <div className="card text-center">
                            <p className="text-base text-gray-600 mb-2">Total Applications</p>
                            <p className="text-4xl font-bold text-primary">{totalApplications}</p>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-3xl mb-6">Your Job Postings</h2>

                        {jobs.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600 mb-4">You haven't posted any jobs yet.</p>
                                <Link href="/employer/post-job" className="btn-primary text-base px-6 py-3">
                                    Post Your First Job
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-heading font-bold text-textPrimary mb-2">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${job.status === 'active' ? 'bg-green-100 text-green-700' :
                                                        job.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {job.status.toUpperCase()}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        {job.job_type}
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        {job.category}
                                                    </span>
                                                </div>
                                                <p className="text-base text-gray-600">
                                                    Posted: {new Date(job.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 ml-4">
                                                <Link
                                                    href={`/jobs/${job.id}`}
                                                    className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 text-sm"
                                                >
                                                    View
                                                </Link>
                                                <button
                                                    onClick={() => deleteJob(job.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/employer/applications" className="btn-primary text-base px-6 py-3 text-center">
                            📋 Manage Applications
                        </Link>
                        <Link href="/employer/search-resumes" className="btn-secondary text-base px-6 py-3 text-center">
                            🔍 Search Resumes
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
