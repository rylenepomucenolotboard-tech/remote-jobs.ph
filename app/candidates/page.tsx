"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CandidateFilterBar from '@/components/CandidateFilterBar';
import CandidateCard from '@/components/CandidateCard';
import FeaturedTalent from '@/components/FeaturedTalent';

export default function CandidateSearchPage() {
    const [hasFilters, setHasFilters] = useState(false);

    // Mock search results
    const searchResults = [
        { name: 'Alice Rivera', title: 'Senior React Developer', skills: ['React', 'Next.js', 'Tailwind CSS', 'Redux', 'TypeScript'], isRemoteReady: true },
        { name: 'Bob Santos', title: 'Full Stack Engineer', skills: ['Node.js', 'Express', 'MongoDB', 'React', 'Docker'], isRemoteReady: true },
        { name: 'Charlie Cruz', title: 'UX Designer', skills: ['Figma', 'User Testing', 'Prototyping', 'Design Systems', 'UI'], isRemoteReady: true },
        { name: 'Diana Lim', title: 'Marketing Specialist', skills: ['SEO', 'SEM', 'Content Strategy', 'Social Media', 'Analytics'], isRemoteReady: true },
        { name: 'Edward Sy', title: 'Backend Developer', skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'API Design'], isRemoteReady: true },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
            <Header />

            <main className="flex-1 pt-24 pb-32">
                {/* Hero Header */}
                <section className="bg-navy-950 py-16 mb-0 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--primary),transparent_70%)]"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                            Find Your Next <span className="text-accent">Elite Hire</span>
                        </h1>
                        <p className="text-xl text-navy-300 max-w-2xl font-medium">
                            Browse thousands of verified remote professionals in the Philippines and scale your team with the top 1% talent.
                        </p>
                    </div>
                </section>

                {/* Filter Bar */}
                <CandidateFilterBar />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {!hasFilters ? (
                        <FeaturedTalent />
                    ) : (
                        <div>
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black text-navy-950">
                                    Search Results <span className="text-navy-400 font-bold ml-2">(1,240 Professionals Found)</span>
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-navy-400 text-sm font-bold uppercase tracking-widest">Sort By:</span>
                                    <select className="bg-white border border-navy-100 rounded-lg px-4 py-2 text-sm font-bold text-navy-950 focus:outline-none focus:border-primary cursor-pointer">
                                        <option>Relevance</option>
                                        <option>Experience: High to Low</option>
                                        <option>Salary: Low to High</option>
                                        <option>Newest First</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {searchResults.map((candidate, i) => (
                                    <CandidateCard key={i} {...candidate} />
                                ))}
                            </div>

                            {/* Pagination Placeholder */}
                            <div className="mt-16 flex justify-center gap-2">
                                <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-primary bg-primary text-white font-black shadow-lg shadow-primary/20">1</button>
                                <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-navy-100 bg-white text-navy-600 font-black hover:border-navy-300 transition-all">2</button>
                                <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-navy-100 bg-white text-navy-600 font-black hover:border-navy-300 transition-all">3</button>
                                <span className="flex items-center justify-center px-2 text-navy-300">...</span>
                                <button className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-navy-100 bg-white text-navy-600 font-black hover:border-navy-300 transition-all">12</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
