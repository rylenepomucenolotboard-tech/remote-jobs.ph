'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const MobileStickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-500 md:hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="bg-navy-900/90 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center p-2 shadow-2xl overflow-hidden">
                <Link
                    href="/employer/search-resumes"
                    className="flex-1 text-center py-3 text-white font-black text-xs uppercase tracking-wider"
                >
                    Browse Talent
                </Link>
                <div className="w-px h-8 bg-white/10"></div>
                <Link
                    href="/employer/post-job"
                    className="flex-1 text-center py-3 bg-primary-indigo text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg"
                >
                    Post a Job
                </Link>
            </div>
        </div>
    );
};

export default MobileStickyCTA;
