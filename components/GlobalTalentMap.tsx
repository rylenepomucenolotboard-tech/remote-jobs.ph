'use client';

import { STATS } from '@/content/stats';
import { COPY } from '@/content/copy';
import { ICONS } from '@/content/icons';

const GlobalTalentMap = () => {
    return (
        <section className="py-32 bg-navy-950 relative overflow-hidden min-h-[900px] flex items-center justify-center">
            {/* Background Stylized Map (Representative SVG) */}
            <div className="absolute inset-0 z-0 opacity-30">
                <svg
                    viewBox="0 0 1000 500"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Subtle Grid Lines for Tech Feel */}
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="1000" height="500" fill="url(#grid)" />

                    {/* Stylized Landmasses (Outlined Slate Grey #151921) */}
                    <g fill="none" stroke="#151921" strokeWidth="1">
                        {/* North & South America */}
                        <path d="M100,80 L220,80 L250,250 L200,350 L220,480 L180,480 L150,350 L80,250 Z" />
                        {/* Europe & Africa */}
                        <path d="M480,80 L580,80 L620,250 L580,480 L520,480 L500,250 Z" />
                        {/* Eurasia & Asia */}
                        <path d="M600,80 L950,120 L920,350 L650,350 L620,250 Z" />
                        {/* Australia */}
                        <path d="M850,400 L950,400 L930,480 L870,480 Z" />
                    </g>

                    {/* Animated Data Lines (Neon Green #00FF94) - Aligned to Boxes */}
                    <g className="data-lines">
                        {/* To Card 1 (Top Left) */}
                        <path d="M781,275 Q400,100 150,150" className="line-path" />
                        {/* To Card 2 (Bottom Left) */}
                        <path d="M781,275 Q400,450 150,400" className="line-path" />
                        {/* To Card 3 (Top Right) */}
                        <path d="M781,275 Q850,100 900,100" className="line-path" />
                        {/* To Card 4 (Bottom Right) */}
                        <path d="M781,275 Q900,450 920,400" className="line-path" />
                    </g>

                    {/* Glowing Philippines Hub (Cyber Cyan/Mint #00FF94) */}
                    <g className="ph-hub">
                        <circle cx="781" cy="275" r="5" fill="#00FF94" className="animate-pulse">
                            <animate attributeName="r" from="5" to="15" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.6" to="0" dur="3s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="781" cy="275" r="5" fill="#00FF94" />
                    </g>

                    {/* Destination Points (Aligning with Boxes) */}
                    {[
                        { x: 150, y: 150 }, // Card 1
                        { x: 150, y: 400 }, // Card 2
                        { x: 900, y: 100 }, // Card 3
                        { x: 920, y: 400 }, // Card 4
                    ].map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r="3" fill="white" filter="blur(1px)" />
                    ))}
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full">
                <div className="text-center mb-24">
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        {COPY.sections.globalTalentMap.title.split('Map')[0]} <span className="text-primary italic">Talent Map</span>
                    </h3>
                </div>

                {/* Floating Glass Cards Overlay */}
                <div className="relative h-[600px] w-full">
                    {/* Card 1 (Top Left) */}
                    <div className="absolute top-[10%] left-[5%] md:left-[10%] animate-float">
                        <div className="glass-card p-8 border border-white/5 backdrop-blur-2xl rounded-3xl max-w-[280px] group transition-all duration-700 hover:scale-105 hover:border-primary/50 hover:shadow-glow-indigo">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <ICONS.users size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-4xl font-black text-white mb-2 font-geist">{STATS.activeResumes}</h4>
                            <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-4">Active Resumes</p>
                            <p className="text-sm text-text-muted leading-relaxed font-medium">The depth of our talent pool, ready to scale your global vision.</p>
                        </div>
                    </div>

                    {/* Card 2 (Bottom Left) */}
                    <div className="absolute bottom-[10%] left-[2%] md:left-[5%] animate-float-slow">
                        <div className="glass-card p-8 border border-white/5 backdrop-blur-2xl rounded-3xl max-w-[280px] group transition-all duration-700 hover:scale-105 hover:border-primary/50 hover:shadow-glow-indigo">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <ICONS.globe size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-4xl font-black text-white mb-2 font-geist">{STATS.globalClients}</h4>
                            <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-4">Global Clients</p>
                            <p className="text-sm text-text-muted leading-relaxed font-medium">Real-time marketplace activity connecting talent to leaders.</p>
                        </div>
                    </div>

                    {/* Card 3 (Top Right) */}
                    <div className="absolute top-[5%] right-[5%] md:right-[10%] animate-float-delayed">
                        <div className="glass-card p-8 border border-white/5 backdrop-blur-2xl rounded-3xl max-w-[280px] group transition-all duration-700 hover:scale-105 hover:border-accent-cyber/50 hover:shadow-[0_0_50px_rgba(202,244,113,0.1)]">
                            <div className="w-12 h-12 rounded-2xl bg-accent-cyber/10 flex items-center justify-center text-accent-cyber mb-6">
                                <ICONS.briefcase size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-4xl font-black text-white mb-2 font-geist">{STATS.rolesFilledTotal}</h4>
                            <p className="text-accent-cyber font-bold text-[10px] uppercase tracking-widest mb-4">Roles Filled</p>
                            <p className="text-sm text-text-muted leading-relaxed font-medium">The significant value we bring to Filipino remote professionals.</p>
                        </div>
                    </div>

                    {/* Card 4 (Bottom Right) */}
                    <div className="absolute bottom-[5%] right-[2%] md:right-[8%] animate-float-slow-delayed">
                        <div className="glass-card p-8 border border-white/5 backdrop-blur-2xl rounded-3xl max-w-[280px] group transition-all duration-700 hover:scale-105 hover:border-accent-cyber/50 hover:shadow-[0_0_50px_rgba(202,244,113,0.1)]">
                            <div className="w-12 h-12 rounded-2xl bg-accent-cyber/10 flex items-center justify-center text-accent-cyber mb-6">
                                <ICONS.clock size={24} strokeWidth={1.5} />
                            </div>
                            <h4 className="text-4xl font-black text-white mb-2 font-geist">{STATS.avgTimeToHire}</h4>
                            <p className="text-accent-cyber font-bold text-[10px] uppercase tracking-widest mb-4">Avg. Time-to-Hire</p>
                            <p className="text-sm text-text-muted leading-relaxed font-medium">Unparalleled efficiency for employers sourcing elite tech talent.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
        .line-path {
          fill: none;
          stroke: #00FF94;
          stroke-width: 1.5;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 5s linear infinite;
          opacity: 0.3;
          filter: drop-shadow(0 0 8px rgba(0, 255, 148, 0.4));
        }
        .line-path-short {
          fill: none;
          stroke: #00FF94;
          stroke-width: 1.5;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-short 3s linear infinite;
          opacity: 0.3;
        }
        @keyframes draw {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes draw-short {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes fadePulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
        </section>
    );
};

export default GlobalTalentMap;
