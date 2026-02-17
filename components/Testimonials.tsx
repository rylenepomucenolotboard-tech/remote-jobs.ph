'use client';

import React from 'react';
import Image from 'next/image';

const testimonials = [
    {
        type: 'client',
        name: 'Sarah Chen',
        role: 'CTO @ TechFlow',
        content: 'The quality of Filipino engineers we found here is unparalleled. We scaled our dev team by 40% in just two months.',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        accent: '#016CF9'
    },
    {
        type: 'talent',
        name: 'Marco Rivera',
        role: 'Senior Full Stack Dev',
        content: 'Securing a global role while staying in Manila changed my life. The salary boost and work-life balance are incredible.',
        avatar: 'https://i.pravatar.cc/150?u=marco',
        accent: '#00FF94'
    },
    {
        type: 'client',
        name: 'James Wilson',
        role: 'Founder @ ScaleUp',
        content: 'Verified resumes saved us weeks of screening. The AI-matching is scary accurate for complex technical roles.',
        avatar: 'https://i.pravatar.cc/150?u=james',
        accent: '#016CF9'
    },
    {
        type: 'talent',
        name: 'Elena Santos',
        role: 'UI/UX Lead',
        content: 'I went from local agencies to lead designer for a Silicon Valley unicorn. This platform is the ultimate career launchpad.',
        avatar: 'https://i.pravatar.cc/150?u=elena',
        accent: '#00FF94'
    }
];

const Testimonials = () => {
    return (
        <section className="py-32 bg-navy-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tight font-geist uppercase">
                        Voices of Growth & Success
                    </h2>
                    <p className="text-navy-600 text-xl max-w-2xl mx-auto font-medium">
                        Hear from the visionaries building teams and the elite talent driving global innovation.
                    </p>
                </div>

                {/* Horizontal Scrolling Carousel */}
                <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[350px] md:w-[450px] bg-white border border-navy-100 rounded-[2.5rem] p-10 transition-all duration-500 hover:scale-[1.02] hover:border-primary-indigo/20 group shadow-sm hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-navy-900 font-geist font-black text-lg leading-none mb-1">{t.name}</h4>
                                    <p className="text-navy-400 font-bold text-xs uppercase tracking-widest">{t.role}</p>
                                </div>
                                <div
                                    className="ml-auto px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter"
                                    style={{
                                        backgroundColor: `${t.accent}15`,
                                        color: t.accent,
                                        border: `1px solid ${t.accent}30`
                                    }}
                                >
                                    {t.type}
                                </div>
                            </div>

                            <blockquote className="relative">
                                <span className="absolute -top-4 -left-2 text-6xl opacity-10 font-serif" style={{ color: t.accent }}>"</span>
                                <p className="text-navy-600 text-lg md:text-xl font-medium leading-relaxed italic relative z-10">
                                    {t.content}
                                </p>
                            </blockquote>

                            <div className="mt-8 pt-8 border-t border-navy-50 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.accent }}></div>
                                <div className="w-8 h-px bg-navy-100"></div>
                                <span className="text-[10px] text-navy-300 font-black uppercase tracking-[0.2em]">Verified Review</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-indigo/5 blur-[120px] rounded-full"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent-cyber/5 blur-[120px] rounded-full"></div>
        </section>
    );
};

export default Testimonials;
