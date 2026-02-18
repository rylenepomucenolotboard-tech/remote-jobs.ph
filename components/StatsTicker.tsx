import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '@/content/stats';

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

    return (
        <span
            ref={countRef}
            className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const StatsTicker = () => {
    const stats = [
        { label: 'Roles Filled', value: parseInt(STATS.rolesFilledTotal.replace(/\D/g, '')), suffix: '+' },
        { label: 'Global Clients', value: parseInt(STATS.globalClients.replace(/\D/g, '')), suffix: '+' },
        { label: 'Active Resumes', value: parseInt(STATS.activeResumes.replace(/\D/g, '')), suffix: ' Million+' },
        { label: 'Avg. Salary Growth', value: parseInt(STATS.avgSalaryGrowth.replace(/\D/g, '')), suffix: '%' },
    ];

    return (
        <section className="py-20 px-4 bg-[#0A0C10]">
            <div className="max-w-7xl mx-auto">
                <div className="bg-background-slate/30 border border-white/5 rounded-[40px] p-8 md:p-14 shadow-2xl backdrop-blur-md relative overflow-hidden">
                    {/* Subtle Glow Background */}
                    <div className="absolute inset-0 bg-primary/2 opacity-[0.03] pointer-events-none"></div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center group">
                                <p className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-3 tracking-tighter transition-all">
                                    <CountUp end={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-[#6B7280] font-normal text-xs md:text-sm uppercase tracking-[0.2em]">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsTicker;
