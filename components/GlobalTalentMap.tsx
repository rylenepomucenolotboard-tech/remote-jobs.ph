'use client';

import { STATS } from '@/content/stats';
import { COPY } from '@/content/copy';
import { ICONS } from '@/content/icons';

const GlobalTalentMap = () => {
    const stats = [
        {
            value: "9 Million+",
            label: "Active Resumes",
            description: "The depth of our talent pool, ready to scale your global vision.",
            color: "text-primary"
        },
        {
            value: "15,000+",
            label: "Roles Filled",
            description: "Real-time marketplace activity connecting talent to leaders.",
            color: "text-accent-cyber"
        },
        {
            value: "1,182+",
            label: "Global Clients",
            description: "The significant value we bring to Filipino remote professionals.",
            color: "text-primary"
        },
        {
            value: "12 Days",
            label: "Avg. Time-to-Hire",
            description: "Unparalleled efficiency for employers sourcing elite tech talent.",
            color: "text-accent-cyber"
        }
    ];

    return (
        <section className="py-32 bg-navy-950 relative overflow-hidden flex items-center justify-center">
            {/* Background Stylized Map (Representative SVG) - Background only, no icons */}
            <div className="absolute inset-0 z-0 opacity-30">
                <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="1000" height="500" fill="url(#grid)" />
                    <g fill="none" stroke="#151921" strokeWidth="1">
                        <path d="M100,80 L220,80 L250,250 L200,350 L220,480 L180,480 L150,350 L80,250 Z" />
                        <path d="M480,80 L580,80 L620,250 L580,480 L520,480 L500,250 Z" />
                        <path d="M600,80 L950,120 L920,350 L650,350 L620,250 Z" />
                        <path d="M850,400 L950,400 L930,480 L870,480 Z" />
                    </g>
                    <g className="ph-hub">
                        <circle cx="781" cy="275" r="5" fill="#00FF94" className="animate-pulse">
                            <animate attributeName="r" from="5" to="15" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="781" cy="275" r="5" fill="#00FF94" />
                    </g>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center mb-24">
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        {COPY.sections.globalTalentMap.title.split('Map')[0]} <span className="text-primary italic">Talent Map</span>
                    </h3>
                </div>

                {/* Minimalist Grid Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-card p-6 md:p-8 border border-white/5 backdrop-blur-2xl rounded-3xl group transition-all duration-700 hover:scale-[1.02] hover:border-white/20 flex flex-col justify-center text-center">
                            <h4 className="text-4xl md:text-5xl font-black text-white mb-2 font-geist tracking-tighter">
                                {stat.value}
                            </h4>
                            <p className={`${stat.color} font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3`}>
                                {stat.label}
                            </p>
                            <p className="text-[10px] md:text-xs text-text-muted leading-relaxed font-medium">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlobalTalentMap;
