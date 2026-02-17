'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase, Resume } from '@/lib/supabase';

export default function SearchResumesPage() {
    const router = useRouter();
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [minExperience, setMinExperience] = useState('');

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

        fetchResumes();
    };

    const fetchResumes = async () => {
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select(`
          *,
          profiles (
            full_name,
            phone
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setResumes(data || []);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredResumes = resumes.filter((resume) => {
        const matchesSearch =
            !searchTerm ||
            resume.skills?.some((skill: string) =>
                skill.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            resume.education?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resume.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesExperience =
            !minExperience ||
            (resume.experience_years && resume.experience_years >= parseInt(minExperience));

        return matchesSearch && matchesExperience;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-8">Search Resumes</h1>

                    {/* Search Filters */}
                    <div className="card mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-semibold mb-2">Search by Skills or Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. React, JavaScript, John Doe"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold mb-2">Minimum Experience (years)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 3"
                                    value={minExperience}
                                    onChange={(e) => setMinExperience(e.target.value)}
                                    className="input-field"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Resumes List */}
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">Loading resumes...</p>
                        </div>
                    ) : filteredResumes.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-600">No resumes found. Try adjusting your search.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredResumes.map((resume) => (
                                <div key={resume.id} className="card hover:shadow-2xl transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-heading font-bold text-textPrimary mb-2">
                                                {resume.profiles?.full_name || 'Candidate'}
                                            </h3>

                                            {resume.experience_years && (
                                                <p className="text-lg text-accent font-semibold mb-2">
                                                    {resume.experience_years} years of experience
                                                </p>
                                            )}

                                            {resume.skills && resume.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {resume.skills.map((skill: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-primary/20 text-textPrimary rounded-full text-sm font-semibold"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {resume.education && (
                                                <p className="text-base text-gray-700 mb-2">
                                                    🎓 {resume.education}
                                                </p>
                                            )}

                                            {resume.profiles?.phone && (
                                                <p className="text-base text-gray-600">
                                                    📞 {resume.profiles.phone}
                                                </p>
                                            )}
                                        </div>

                                        <div className="ml-4">
                                            <a
                                                href={resume.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-secondary text-sm px-4 py-2 inline-block"
                                            >
                                                View Resume
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
