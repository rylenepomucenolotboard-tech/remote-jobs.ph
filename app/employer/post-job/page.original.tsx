'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function PostJobPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [requirements, setRequirements] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState<'full-time' | 'part-time' | 'contract' | 'internship'>('full-time');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState<'active' | 'draft'>('active');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        setUser(user);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('jobs').insert({
                employer_id: user.id,
                title,
                description,
                requirements: requirements || null,
                salary_range: salaryRange || null,
                location,
                job_type: jobType,
                category,
                deadline: deadline || null,
                status,
            });

            if (error) throw error;

            alert('Job posted successfully!');
            router.push('/employer/dashboard');
        } catch (error: any) {
            alert(error.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="card">
                        <h1 className="mb-8">Post a New Job</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Job Title */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Job Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input-field"
                                    required
                                    placeholder="e.g. Senior React Developer"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Category *</label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="input-field"
                                    required
                                    placeholder="e.g. Software Development, Marketing, Design"
                                />
                            </div>

                            {/* Job Type */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Job Type *</label>
                                <select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value as any)}
                                    className="input-field"
                                    required
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Location *</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="input-field"
                                    required
                                    placeholder="e.g. Remote, Manila, Cebu"
                                />
                            </div>

                            {/* Salary Range */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Salary Range (Optional)</label>
                                <input
                                    type="text"
                                    value={salaryRange}
                                    onChange={(e) => setSalaryRange(e.target.value)}
                                    className="input-field"
                                    placeholder="e.g. ₱30,000 - ₱50,000/month"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Job Description *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input-field"
                                    rows={8}
                                    required
                                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                                />
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Requirements (Optional)</label>
                                <textarea
                                    value={requirements}
                                    onChange={(e) => setRequirements(e.target.value)}
                                    className="input-field"
                                    rows={6}
                                    placeholder="List the skills, experience, and qualifications needed..."
                                />
                            </div>

                            {/* Deadline */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Application Deadline (Optional)</label>
                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="input-field"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-lg font-semibold mb-2">Status *</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="input-field"
                                    required
                                >
                                    <option value="active">Active (Visible to job seekers)</option>
                                    <option value="draft">Draft (Save for later)</option>
                                </select>
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`btn-primary text-lg px-8 py-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {loading ? 'Posting...' : 'Post Job'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-8 py-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
