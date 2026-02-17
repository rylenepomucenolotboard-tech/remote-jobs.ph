'use client';

import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 4000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let start = 0;
        const increment = end / (duration / 16); // 60fps approximate

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const StatsTicker = () => {
    const stats = [
        { label: 'Active Opportunities', value: 4200, suffix: '+', icon: '💼' },
        { label: 'Verified Hires', value: 850, suffix: '+', icon: '✅' },
        { label: 'Avg. Salary Boost', value: 45, suffix: '%', icon: '🚀' },
        { label: 'Global Partners', value: 120, suffix: '+', icon: '🌍' },
    ];

    return (
        <section className="py-20 px-4 bg-[#0A0C10]">
            <div className="max-w-7xl mx-auto">
                <div className="bg-background-slate/50 border border-white/5 rounded-[40px] p-8 md:p-14 shadow-2xl flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-4 backdrop-blur-md relative overflow-hidden">
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-primary/2 opacity-[0.03] pointer-events-none"></div>

                    {stats.map((stat, i) => (
                        <div key={i} className="text-center md:text-left px-8 group relative z-10">
                            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 duration-300">{stat.icon}</span>
                                <p className="text-4xl md:text-6xl font-black text-white tracking-tighter glow-indigo-hover transition-all">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </p>
                            </div>
                            <p className="text-[#94A3B8] font-bold text-xs uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsTicker;
