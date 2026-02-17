'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, Resume, Application } from '@/lib/supabase';

export default function JobseekerDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [resume, setResume] = useState<Resume | null>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Resume form fields
    const [skills, setSkills] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const [education, setEducation] = useState('');
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        // Check if user is a jobseeker
        const { data: profile } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', user.id)
            .single();

        if (profile?.user_type !== 'jobseeker') {
            router.push('/employer/dashboard');
            return;
        }

        setUser(user);
        fetchResume(user.id);
        fetchApplications(user.id);
    };

    const fetchResume = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .eq('jobseeker_id', userId)
                .single();

            if (data) {
                setResume(data);
                setSkills(data.skills?.join(', ') || '');
                setExperienceYears(data.experience_years?.toString() || '');
                setEducation(data.education || '');
            }
        } catch (error) {
            console.error('Error fetching resume:', error);
        }
    };

    const fetchApplications = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select(`
          *,
          jobs (
            id,
            title,
            company_name:employer_id (
              profiles (company_name)
            )
          )
        `)
                .eq('jobseeker_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResumeUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeFile || !user) return;

        setUploading(true);
        try {
            // Upload file to storage
            const fileExt = resumeFile.name.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(fileName, resumeFile);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(fileName);

            // Save resume data
            const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);

            const resumeData = {
                jobseeker_id: user.id,
                file_url: publicUrl,
                file_name: resumeFile.name,
                skills: skillsArray,
                experience_years: experienceYears ? parseInt(experienceYears) : null,
                education: education || null,
            };

            if (resume) {
                // Update existing resume
                const { error } = await supabase
                    .from('resumes')
                    .update(resumeData)
                    .eq('id', resume.id);
                if (error) throw error;
            } else {
                // Insert new resume
                const { error } = await supabase.from('resumes').insert(resumeData);
                if (error) throw error;
            }

            alert('Resume uploaded successfully!');
            fetchResume(user.id);
        } catch (error: any) {
            alert(error.message || 'Failed to upload resume');
        } finally {
            setUploading(false);
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
                    <h1 className="mb-8">Job Seeker Dashboard</h1>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Resume Section */}
                        <div className="card">
                            <h2 className="text-3xl mb-6">
                                {resume ? 'Update Your Resume' : 'Upload Your Resume'}
                            </h2>

                            <form onSubmit={handleResumeUpload} className="space-y-4">
                                <div>
                                    <label className="block text-lg font-semibold mb-2">Resume File (PDF) *</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                                        className="input-field"
                                        required={!resume}
                                    />
                                    {resume && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Current: {resume.file_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold mb-2">Skills (comma-separated)</label>
                                    <input
                                        type="text"
                                        value={skills}
                                        onChange={(e) => setSkills(e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. React, Node.js, TypeScript"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold mb-2">Years of Experience</label>
                                    <input
                                        type="number"
                                        value={experienceYears}
                                        onChange={(e) => setExperienceYears(e.target.value)}
                                        className="input-field"
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-semibold mb-2">Education</label>
                                    <textarea
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                        className="input-field"
                                        rows={3}
                                        placeholder="e.g. BS Computer Science, University of the Philippines"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className={`btn-primary text-base px-6 py-3 w-full ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {uploading ? 'Uploading...' : resume ? 'Update Resume' : 'Upload Resume'}
                                </button>
                            </form>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-6">
                            <div className="card text-center">
                                <p className="text-base text-gray-600 mb-2">Total Applications</p>
                                <p className="text-4xl font-bold text-textPrimary">{applications.length}</p>
                            </div>
                            <div className="card text-center">
                                <p className="text-base text-gray-600 mb-2">Resume Status</p>
                                <p className="text-2xl font-bold text-accent">
                                    {resume ? '✓ Uploaded' : '⚠ Not Uploaded'}
                                </p>
                            </div>
                            <Link href="/jobs" className="btn-secondary text-base px-6 py-3 block text-center">
                                Browse Jobs
                            </Link>
                        </div>
                    </div>

                    {/* Applications */}
                    <div className="card">
                        <h2 className="text-3xl mb-6">My Applications</h2>

                        {applications.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
                                <Link href="/jobs" className="btn-primary text-base px-6 py-3">
                                    Browse Jobs
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((app) => (
                                    <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-heading font-bold text-textPrimary mb-2">
                                                    {app.jobs?.title || 'Job Title'}
                                                </h3>
                                                <div className="flex gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                                                                app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                                                                    'bg-red-100 text-red-700'
                                                        }`}>
                                                        {app.status.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-base text-gray-600">
                                                    Applied: {new Date(app.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/jobs/${app.job_id}`}
                                                className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 text-sm"
                                            >
                                                View Job
                                            </Link>
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
