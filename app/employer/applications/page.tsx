'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Briefcase, GraduationCap, FileText, Clock, CheckCircle, XCircle, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface ApplicationWithDetails {
    id: string;
    job_id: string;
    jobseeker_id: string;
    cover_letter: string | null;
    status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
    created_at: string;
    jobs: {
        title: string;
    };
    profiles: {
        full_name: string;
        phone: string | null;
    };
    resumes: {
        file_url: string;
        skills: string[] | null;
        experience_years: number | null;
        education: string | null;
    } | null;
}

export default function EmployerApplicationsPage() {
    const router = useRouter();
    const [applications, setApplications] = useState<ApplicationWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterJob, setFilterJob] = useState<string>('');
    const [jobs, setJobs] = useState<{ id: string; title: string }[]>([]);

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

        fetchApplications(user.id);
        fetchJobs(user.id);
    };

    const fetchJobs = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('id, title')
                .eq('employer_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setJobs(data || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const fetchApplications = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select(`
                    *,
                    jobs!inner (
                        title,
                        employer_id
                    ),
                    profiles!applications_jobseeker_id_fkey (
                        full_name,
                        phone
                    ),
                    resumes (
                        file_url,
                        skills,
                        experience_years,
                        education
                    )
                `)
                .eq('jobs.employer_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data as any || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateApplicationStatus = async (applicationId: string, newStatus: 'pending' | 'reviewed' | 'shortlisted' | 'rejected') => {
        try {
            const { error } = await supabase
                .from('applications')
                .update({ status: newStatus })
                .eq('id', applicationId);

            if (error) throw error;

            // Update local state
            setApplications(applications.map(app =>
                app.id === applicationId ? { ...app, status: newStatus } : app
            ));

            alert('Application status updated successfully!');
        } catch (error: any) {
            alert(error.message || 'Failed to update application status');
        }
    };

    const filteredApplications = applications.filter((app) => {
        const matchesStatus = !filterStatus || app.status === filterStatus;
        const matchesJob = !filterJob || app.job_id === filterJob;
        return matchesStatus && matchesJob;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'reviewed':
                return 'bg-blue-100 text-blue-700';
            case 'shortlisted':
                return 'bg-green-100 text-green-700';
            case 'rejected':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-xl">Loading applications...</p>
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
                        <h1>Manage Applications</h1>
                        <Link href="/employer/dashboard" className="text-accent hover:underline text-base flex items-center gap-1">
                            <ChevronLeft size={20} strokeWidth={2} />
                            Back to Dashboard
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="card mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-semibold mb-2">Filter by Job</label>
                                <select
                                    value={filterJob}
                                    onChange={(e) => setFilterJob(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">All Jobs</option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.id}>
                                            {job.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-2">Filter by Status</label>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="shortlisted">Shortlisted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="card text-center">
                            <p className="text-sm text-gray-600 mb-1">Total</p>
                            <p className="text-3xl font-bold text-textPrimary">{applications.length}</p>
                        </div>
                        <div className="card text-center">
                            <p className="text-sm text-gray-600 mb-1">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">
                                {applications.filter(a => a.status === 'pending').length}
                            </p>
                        </div>
                        <div className="card text-center">
                            <p className="text-sm text-gray-600 mb-1">Shortlisted</p>
                            <p className="text-3xl font-bold text-green-600">
                                {applications.filter(a => a.status === 'shortlisted').length}
                            </p>
                        </div>
                        <div className="card text-center">
                            <p className="text-sm text-gray-600 mb-1">Rejected</p>
                            <p className="text-3xl font-bold text-red-600">
                                {applications.filter(a => a.status === 'rejected').length}
                            </p>
                        </div>
                    </div>

                    {/* Applications List */}
                    <div className="card">
                        <h2 className="text-3xl mb-6">Applications ({filteredApplications.length})</h2>

                        {filteredApplications.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No applications found.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredApplications.map((app) => (
                                    <div key={app.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-heading font-bold text-textPrimary mb-1">
                                                    {app.profiles?.full_name || 'Applicant'}
                                                </h3>
                                                <p className="text-base text-gray-600">
                                                    Applied for: <Link href={`/jobs/${app.job_id}`} className="text-accent hover:underline">
                                                        {app.jobs?.title}
                                                    </Link>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(app.created_at).toLocaleDateString()} at {new Date(app.created_at).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                                                {app.status.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Candidate Details */}
                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                {app.profiles?.phone && (
                                                    <p className="text-base text-gray-700 mb-2 flex items-center gap-2">
                                                        <Phone size={18} className="text-navy-400" strokeWidth={2} />
                                                        <strong>Phone:</strong> {app.profiles.phone}
                                                    </p>
                                                )}
                                                {app.resumes?.experience_years !== null && app.resumes?.experience_years !== undefined && (
                                                    <p className="text-base text-gray-700 mb-2 flex items-center gap-2">
                                                        <Briefcase size={18} className="text-navy-400" strokeWidth={2} />
                                                        <strong>Experience:</strong> {app.resumes.experience_years} years
                                                    </p>
                                                )}
                                                {app.resumes?.education && (
                                                    <p className="text-base text-gray-700 mb-2 flex items-center gap-2">
                                                        <GraduationCap size={18} className="text-navy-400" strokeWidth={2} />
                                                        <strong>Education:</strong> {app.resumes.education}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                {app.resumes?.skills && app.resumes.skills.length > 0 && (
                                                    <div>
                                                        <p className="text-base font-semibold mb-2">Skills:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {app.resumes.skills.map((skill, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1 bg-primary/20 text-textPrimary rounded-full text-sm"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Cover Letter */}
                                        {app.cover_letter && (
                                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                                                <p className="text-base font-semibold mb-2">Cover Letter:</p>
                                                <p className="text-base text-gray-700 whitespace-pre-wrap">{app.cover_letter}</p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex flex-wrap gap-3 items-center">
                                            {app.resumes?.file_url && (
                                                <a
                                                    href={app.resumes.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                                                >
                                                    <FileText size={18} strokeWidth={2} />
                                                    View Resume
                                                </a>
                                            )}

                                            <select
                                                value={app.status}
                                                onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                                                className="input-field text-sm py-2"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
