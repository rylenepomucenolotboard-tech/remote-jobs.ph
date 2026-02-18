'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Users } from 'lucide-react';
import { STATS } from '@/content/stats';
import { COPY } from '@/content/copy';

const talentData = [
    {
        id: 'talent-1',
        role: 'Lead Full-Stack Developer',
        exp: '10+ Years',
        skills: ['React', 'AWS', 'Python'],
        rate: '$3,5k – $5,5k / mo',
        seed: 'filipino-dev-001',
        bgColor: 'b6e3f4',
        lastActive: 'Active Today'
    },
    {
        id: 'talent-2',
        role: 'Senior UI/UX Designer',
        exp: '8+ Years',
        skills: ['Figma', 'Prototyping', 'Design Systems'],
        rate: '$3k – $4.5k / mo',
        seed: 'filipino-designer-001',
        bgColor: 'c0aede',
        lastActive: 'Active 2h ago'
    },
    {
        id: 'talent-3',
        role: 'DevOps Engineer',
        exp: '6+ Years',
        skills: ['Kubernetes', 'CI/CD', 'Terraform'],
        rate: '$3.2k – $5k / mo',
        seed: 'filipino-devops-001',
        bgColor: 'd1d4f9',
        lastActive: 'Active Today'
    },
    {
        id: 'talent-4',
        role: 'Mobile App Developer',
        exp: '7+ Years',
        skills: ['Flutter', 'React Native', 'Firebase'],
        rate: '$3k – $4.8k / mo',
        seed: 'filipino-mobile-001',
        bgColor: 'ffd5dc',
        lastActive: 'Active Yesterday'
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
                        {COPY.sections.resumeSpotlight.title}
                    </h2>
                    <p className="text-navy-600 text-lg max-w-[65ch] mx-auto font-medium leading-relaxed">
                        Trusted by {STATS.globalClients} global companies. Access {STATS.activeResumes} active resumes.
                    </p>
                </div>

                {/* Grid Layout (Responsive) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {talentData.map((talent, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white border border-navy-100 rounded-[2.5rem] p-8 transition-all duration-500 hover:scale-[1.05] hover:border-primary-indigo/50 hover:shadow-xl overflow-hidden"
                        >
                            <div className="absolute top-6 right-6">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyber opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyber"></span>
                                </span>
                            </div>

                            {/* DiceBear Avatar with Verified Badge */}
                            <div className="relative w-12 h-12 md:w-16 md:h-16 mb-6 mx-auto">
                                <div
                                    className="w-full h-full rounded-full overflow-hidden border-2 border-primary-indigo transition-all duration-500"
                                    style={{ backgroundColor: `#${talent.bgColor}` }}
                                >
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${talent.seed}&backgroundColor=${talent.bgColor}`}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white text-navy-900 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md border border-navy-50">
                                    <CheckCircle size={10} className="text-primary-indigo" />
                                    {COPY.sections.resumeSpotlight.badge}
                                </div>
                            </div>

                            {/* Talent Info */}
                            <div className="text-center mb-4">
                                <h4 className="text-navy-900 font-geist font-black text-base md:text-lg mb-1">{talent.role}</h4>
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-navy-400 font-bold text-[9px] uppercase tracking-[0.2em]">{talent.exp}</p>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-navy-50 rounded-full">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <span className="text-[9px] font-bold text-navy-500">{talent.lastActive}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Ghost Pills */}
                            <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                                {talent.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-0.5 bg-primary-indigo/5 border border-primary-indigo/10 text-primary-indigo rounded-full text-[9px] font-bold"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Expected Fee */}
                            <div className="text-center mb-10">
                                <p className="text-primary-indigo font-black text-lg">{talent.rate}</p>
                                <p className="text-[9px] text-navy-400 uppercase tracking-widest font-bold">Monthly Target</p>
                            </div>

                            {/* Action Overlay */}
                            <div className="absolute inset-0 bg-navy-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 backdrop-blur-[2px]">
                                <Link
                                    href="/employer/search-resumes"
                                    className="w-full bg-primary-indigo text-white py-3 rounded-2xl font-black text-sm text-center shadow-xl hover:bg-primary-hover transition-colors"
                                >
                                    View Full Profile
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/employer/search-resumes"
                        className="inline-flex items-center px-12 py-5 bg-navy-900 text-white rounded-[2rem] font-black text-lg hover:bg-primary-indigo hover:-translate-y-1 transition-all duration-300 shadow-2xl"
                    >
                        Search All Candidates
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResumeSpotlight;
