'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, Job } from '@/lib/supabase';

export default function JobDetailPage() {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id as string;

    const [job, setJob] = useState<Job | null>(null);
    const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [applied, setApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (jobId) {
            fetchJob();
            checkUser();
        }
    }, [jobId]);

    const fetchJob = async () => {
        try {
            const { data, error } = await supabase
                .from('jobs')
                .select('*, profiles(*)')
                .eq('id', jobId)
                .single();

            if (error) throw error;
            setJob(data);

            // Fetch similar jobs
            if (data?.category) {
                const { data: similar } = await supabase
                    .from('jobs')
                    .select('*, profiles(*)')
                    .eq('category', data.category)
                    .neq('id', jobId)
                    .eq('status', 'active')
                    .limit(4);

                setSimilarJobs(similar || []);
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        } finally {
            setLoading(false);
        }
    };

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
            // Check if already applied
            const { data } = await supabase
                .from('applications')
                .select('id')
                .eq('job_id', jobId)
                .eq('jobseeker_id', user.id)
                .single();

            if (data) setApplied(true);
        }
    };

    const handleApply = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setApplying(true);
        try {
            // Get user's resume
            const { data: resume } = await supabase
                .from('resumes')
                .select('id')
                .eq('jobseeker_id', user.id)
                .single();

            // Create application
            const { error } = await supabase.from('applications').insert({
                job_id: jobId,
                jobseeker_id: user.id,
                resume_id: resume?.id || null,
                cover_letter: coverLetter || null,
                status: 'pending'
            });

            if (error) throw error;

            setApplied(true);
            alert('Application submitted successfully!');
        } catch (error: any) {
            alert(error.message || 'Failed to submit application');
        } finally {
            setApplying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-navy-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-navy-500 font-medium">Loading job details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col bg-navy-50">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-navy-900 mb-4">Job Not Found</h1>
                        <p className="text-navy-600 mb-8">The job you are looking for might have been removed or expired.</p>
                        <Link href="/jobs" className="btn-primary">Browse All Jobs</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-navy-50">
            <Header />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Column: Content */}
                        <div className="lg:w-[70%] space-y-8">
                            <div className="card !p-10">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 leading-tight mb-4">
                                            {job.title}
                                        </h1>
                                        <div className="flex items-center gap-2 text-xl text-navy-600 font-medium">
                                            <span>{job.profiles?.company_name || 'Generic Corp'}</span>
                                            <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full p-0.5" title="Verified Employer">
                                                <svg fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    {job.profiles?.company_name && (
                                        <div className="hidden md:block w-20 h-20 bg-white border border-navy-100 rounded-2xl p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <div className="text-2xl font-black text-primary opacity-20 uppercase tracking-tighter">
                                                {job.profiles.company_name.substring(0, 2)}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-navy-50/50 rounded-2xl border border-navy-100/50 mb-10">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-navy-400 font-bold mb-1">Salary</span>
                                        <span className="text-navy-900 font-bold">{job.salary_range || 'Competitive'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-navy-400 font-bold mb-1">Location</span>
                                        <span className="text-navy-900 font-bold">🏠 Remote</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-navy-400 font-bold mb-1">Job Type</span>
                                        <span className="text-navy-900 font-bold capitalize">{job.job_type.replace('-', ' ')}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-wider text-navy-400 font-bold mb-1">Experience</span>
                                        <span className="text-navy-900 font-bold">Mid-Senior</span>
                                    </div>
                                </div>

                                <div className="prose prose-lg max-w-none text-navy-800 space-y-10">
                                    <section>
                                        <h2 className="text-2xl font-bold text-navy-900 mb-4 border-l-4 border-primary pl-4">The Role</h2>
                                        <div className="whitespace-pre-wrap leading-relaxed">{job.description}</div>
                                    </section>

                                    {job.requirements && (
                                        <section>
                                            <h2 className="text-2xl font-bold text-navy-900 mb-4 border-l-4 border-primary pl-4">Requirements</h2>
                                            <div className="whitespace-pre-wrap leading-relaxed">{job.requirements}</div>
                                        </section>
                                    )}

                                    <section>
                                        <h2 className="text-2xl font-bold text-navy-900 mb-4 border-l-4 border-primary pl-4">Benefits & Perks</h2>
                                        <ul className="grid md:grid-cols-2 gap-3 list-none p-0">
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">100% Remote Work</span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">Flexible Hours</span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">Competitive Pay</span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">Health & Wellness Stipend</span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">Professional Development</span>
                                            </li>
                                            <li className="flex items-center gap-3 bg-white border border-navy-100 p-4 rounded-xl shadow-sm">
                                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                <span className="font-semibold text-navy-700">Home Office Budget</span>
                                            </li>
                                        </ul>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Actions */}
                        <div className="lg:w-[30%]">
                            <div className="sticky top-32 space-y-6">
                                {/* Apply Card */}
                                <div className="card !p-8 shadow-xl shadow-navy-900/5">
                                    {applied ? (
                                        <div className="text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6">
                                            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-emerald-900 mb-1">Application Sent!</h3>
                                            <p className="text-emerald-700 text-sm">We've received your application for this role.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleApply}
                                                disabled={applying}
                                                className="btn-primary w-full !py-5 text-xl tracking-tight mb-4 shadow-xl shadow-emerald-500/20"
                                            >
                                                {applying ? 'Processing...' : 'Apply for this job'}
                                            </button>

                                            <div className="flex gap-3 mb-8">
                                                <button
                                                    onClick={() => setIsSaved(!isSaved)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-navy-100 rounded-xl hover:border-pink-200 hover:bg-pink-50 transition-all duration-300 group"
                                                >
                                                    <svg className={`w-6 h-6 ${isSaved ? 'text-pink-500 fill-pink-500' : 'text-navy-400 group-hover:text-pink-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                    <span className={`font-bold text-sm uppercase tracking-wide ${isSaved ? 'text-pink-600' : 'text-navy-600'}`}>{isSaved ? 'Saved' : 'Save Job'}</span>
                                                </button>
                                                <button className="flex items-center justify-center px-4 py-3 border-2 border-navy-100 rounded-xl hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 text-navy-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    <div className="bg-navy-50 rounded-xl p-5 border border-navy-100">
                                        <div className="flex items-center gap-3 text-navy-500 text-sm mb-3">
                                            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-navy-500 text-sm">
                                            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            <span>240 views</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Snapshot */}
                                <div className="card !p-8 bg-navy-950 text-white border-none shadow-2xl shadow-navy-900/20">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm overflow-hidden border border-white/10">
                                            <span className="text-2xl font-black text-white">{job.profiles?.company_name?.substring(0, 1) || 'C'}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-lg leading-tight">{job.profiles?.company_name || 'Generic Corp'}</h3>
                                            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Industry: Tech</span>
                                        </div>
                                    </div>
                                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                                        We are a forward-thinking technology company focused on building tools for the future of remote work. Join our global team of innovators.
                                    </p>
                                    <Link
                                        href={`/jobs?employer=${job.employer_id}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-300"
                                    >
                                        <span>View all jobs at {job.profiles?.company_name?.split(' ')[0] || 'Company'}</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Similar Jobs */}
                    {similarJobs.length > 0 && (
                        <div className="mt-20">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-navy-900 mb-2">Similar Remote Jobs</h2>
                                    <p className="text-navy-500 font-medium">Hand-picked remote opportunities you might also like</p>
                                </div>
                                <Link href="/jobs" className="text-primary font-bold flex items-center gap-2 group">
                                    See everything
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </div>

                            <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar">
                                {similarJobs.map((similarJob) => (
                                    <Link
                                        key={similarJob.id}
                                        href={`/jobs/${similarJob.id}`}
                                        className="flex-shrink-0 w-80 group"
                                    >
                                        <div className="bg-white border border-navy-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-300 hover:border-primary/20 h-full flex flex-col">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center text-primary font-black group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                    {similarJob.profiles?.company_name?.substring(0, 1) || 'C'}
                                                </div>
                                                <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-accent/20 text-navy-800 rounded-full">
                                                    {similarJob.job_type.replace('-', ' ')}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-navy-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                                {similarJob.title}
                                            </h3>
                                            <p className="text-navy-500 font-medium mb-6">{similarJob.profiles?.company_name || 'Generic Corp'}</p>

                                            <div className="mt-auto pt-6 border-t border-navy-50 flex items-center justify-between">
                                                <span className="text-navy-900 font-bold">{similarJob.salary_range || 'Competitive'}</span>
                                                <div className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center text-navy-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
