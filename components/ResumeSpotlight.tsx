'use client';

import React from 'react';
import Link from 'next/link';

const talentData = [
    {
        role: 'Lead Full-Stack Developer',
        exp: '10+ Years',
        skills: ['React', 'AWS', 'Python'],
        rate: '$3.5k – $5.5k / mo',
    },
    {
        role: 'Senior UI/UX Designer',
        exp: '8+ Years',
        skills: ['Figma', 'Prototyping', 'Design Systems'],
        rate: '$3k – $4.5k / mo',
    },
    {
        role: 'DevOps Engineer',
        exp: '6+ Years',
        skills: ['Kubernetes', 'CI/CD', 'Terraform'],
        rate: '$3.2k – $5k / mo',
    },
    {
        role: 'Mobile App Developer',
        exp: '7+ Years',
        skills: ['Flutter', 'React Native', 'Firebase'],
        rate: '$3k – $4.8k / mo',
    },
];

const ResumeSpotlight = () => {
    return (
        <section className="py-32 bg-navy-50 relative overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tight font-geist">
                        Meet the Top 1% of the 9 Million++.
                    </h2>
                    <p className="text-navy-600 text-lg max-w-2xl mx-auto font-medium">
                        A real-time preview of verified remote professionals currently available for global roles.
                    </p>
                </div>

                {/* Horizontal Scrolling Carousel */}
                <div className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {talentData.map((talent, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[320px] group relative bg-white border border-navy-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-[1.05] hover:border-primary-indigo/50 hover:shadow-xl overflow-hidden"
                        >
                            {/* Anonymous Avatar with Verified Badge */}
                            <div className="relative w-20 h-20 mb-6 mx-auto">
                                <div className="w-full h-full bg-navy-50 rounded-2xl flex items-center justify-center text-3xl opacity-40 blur-[2px]">
                                    👤
                                </div>
                                <div className="absolute -bottom-3 -right-3 bg-accent-cyber text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_10px_20px_rgba(0,255,148,0.3)] border-2 border-white ring-4 ring-accent-cyber/20" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                                    <span className="text-xs">✅</span> Verified
                                </div>
                            </div>

                            {/* Talent Info */}
                            <div className="text-center mb-6">
                                <h4 className="text-navy-900 font-geist font-black text-xl mb-1">{talent.role}</h4>
                                <p className="text-navy-400 font-bold text-xs uppercase tracking-widest">{talent.exp}</p>
                            </div>

                            {/* Skills Ghost Pills */}
                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {talent.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 bg-primary-indigo/10 border border-primary-indigo/20 text-primary-indigo rounded-full text-[10px] font-bold"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Expected Fee */}
                            <div className="text-center mb-10">
                                <p className="text-accent-cyber font-black text-xl">{talent.rate}</p>
                                <p className="text-[10px] text-navy-400 uppercase tracking-widest font-bold">Expected Fee</p>
                            </div>

                            {/* Action Overlay */}
                            <div className="absolute inset-0 bg-navy-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                                <Link
                                    href="/resumes/preview"
                                    className="w-full bg-primary-indigo text-white py-4 rounded-2xl font-black text-sm text-center shadow-xl hover:bg-primary-hover transition-colors"
                                >
                                    View Full Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/resumes"
                        className="inline-flex items-center px-12 py-5 bg-navy-900 text-white rounded-[2rem] font-black text-lg hover:bg-primary-indigo hover:-translate-y-1 transition-all duration-300 shadow-2xl"
                    >
                        Search All 9 Million++ Resumes
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResumeSpotlight;
