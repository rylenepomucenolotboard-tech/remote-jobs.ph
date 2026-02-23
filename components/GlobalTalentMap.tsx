'use client';

import { STATS } from '@/content/stats';
import { COPY } from '@/content/copy';
import { ICONS } from '@/content/icons';
import { useMemo } from 'react';

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

    // Tertiary nodes to simulate active users scattered across the globe map
    const tertiaryNodes = useMemo(() => [
        // Americas
        { x: 180, y: 120 }, { x: 210, y: 150 }, { x: 150, y: 250 }, { x: 190, y: 320 }, { x: 220, y: 420 }, { x: 240, y: 460 },
        // Europe / Africa
        { x: 480, y: 140 }, { x: 520, y: 180 }, { x: 550, y: 220 }, { x: 580, y: 380 }, { x: 540, y: 420 }, { x: 520, y: 260 },
        // Asia / Eurasia
        { x: 650, y: 120 }, { x: 720, y: 180 }, { x: 850, y: 160 }, { x: 820, y: 260 }, { x: 880, y: 280 }, { x: 910, y: 220 },
        // AUS
        { x: 870, y: 420 }, { x: 920, y: 440 }, { x: 900, y: 470 }
    ].map(n => ({ ...n, delay: Math.random() * 5 })), []);

    // A web of global connections to showcase true global presence and reach
    // Coordinates mapped to 2754 x 1398 viewbox (Equirectangular roughly)
    const globalNetworkPaths = [
        // US East (760, 420) to UK (1350, 310)
        "M760,420 Q1050,200 1350,310",
        // UK (1350, 310) to PH Hub (2300, 720)
        "M1350,310 Q1800,200 2300,720",
        // PH Hub to US West Coast (450, 430) -- across Pacific
        "M2300,720 Q2800,500 2754,580", // Exits right
        "M0,580 Q200,500 450,430", // Enters left
        // PH to AUS (2460, 1080)
        "M2300,720 Q2400,900 2460,1080",
        // LATAM (940, 1000) to US East (760, 420)
        "M940,1000 Q800,700 760,420",
        // LATAM to South Africa (1480, 1050)
        "M940,1000 Q1200,1100 1480,1050",
        // South Africa to PH Hub
        "M1480,1050 Q1900,1000 2300,720",
        // UK to East Asia (2380, 450)
        "M1350,310 Q1800,200 2380,450",
        // East Asia to PH Hub
        "M2380,450 Q2300,550 2300,720",
        // Connections descending from PH Hub directly to the 4 Feature Cards at the bottom border
        "M2300,720 Q1500,850 450,1350",
        "M2300,720 Q1800,900 1070,1350",
        "M2300,720 Q2100,1050 1680,1350",
        "M2300,720 Q2300,1050 2300,1350",
    ];

    // Key Global Junctions to ripple when packets pass through
    const keyJunctions = [
        { x: 760, y: 420 },  // New York / US East
        { x: 450, y: 430 },  // SF / US West
        { x: 1350, y: 310 }, // London / UK
        { x: 940, y: 1000 }, // São Paulo / Latam
        { x: 1480, y: 1050 },// Cape Town / SA
        { x: 2460, y: 1080 },// Sydney / AUS
        { x: 2380, y: 450 }, // Tokyo / JP
        { x: 2300, y: 720 }, // Manila / PH (Explicit Highlight)
        // 4 Terminal Feature Card Nodes (approximate horizontal centers of the 4 grid positions)
        { x: 450, y: 1350 },
        { x: 1070, y: 1350 },
        { x: 1680, y: 1350 },
        { x: 2300, y: 1350 },
    ];

    return (
        <section className="py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-900 via-navy-950 to-[#05070A] relative overflow-hidden flex items-center justify-center">
            {/* Immersive SVG Background */}
            <div className="absolute inset-0 z-0 opacity-50">
                <svg
                    viewBox="0 0 2754 1398"
                    className="w-full h-full object-cover"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00FF94" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00FF94" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Realistic World Map Background */}
                    <image
                        href="/world_map.svg"
                        width="2754"
                        height="1398"
                        className="world-map-bg"
                    />

                    {/* Blinking Tertiary Nodes (Active Global Users) */}
                    <g className="tertiary-nodes">
                        {tertiaryNodes.map((node, i) => (
                            <circle
                                key={i}
                                cx={node.x * 2.75} // roughly scaling my old 1000x500 coordinates
                                cy={node.y * 2.75}
                                r="4"
                                fill="#00FF94"
                                className="global-node-pulse"
                                style={{ animationDelay: `${node.delay}s` }}
                            />
                        ))}
                    </g>

                    {/* Worldwide Data Network Lines & Comets */}
                    <g className="network-layer">
                        {globalNetworkPaths.map((d, i) => (
                            <g key={`path-${i}`}>
                                {/* Persistent Glowing Track */}
                                <path d={d} className="network-track" strokeWidth="4" />

                                {/* Fast Comet Packet */}
                                <path
                                    d={d}
                                    className="comet-path"
                                    pathLength="100"
                                    strokeWidth="8"
                                    style={{
                                        animationDuration: `${2.5 + ((i % 4) * 0.2)}s`,
                                        animationDelay: `${(i % 5) * 0.5}s`
                                    }}
                                />
                                {/* Slower Comet Packet */}
                                <path
                                    d={d}
                                    className="comet-path opacity-60"
                                    pathLength="100"
                                    strokeWidth="6"
                                    style={{
                                        animationDuration: `${3.2 + ((i % 3) * 0.3)}s`,
                                        animationDelay: `${1.5 + ((i % 4) * 0.7)}s`
                                    }}
                                />
                            </g>
                        ))}
                    </g>

                    {/* Central PH Hub - Massive Sonar Effect */}
                    <g className="ph-hub">
                        {/* Philippine Map highlight pulse */}
                        <circle cx="2300" cy="720" r="80" fill="url(#hub-glow)" className="hub-core-glow" />
                        {/* Sonar Expansion Rings */}
                        {[0, 1.2, 2.4].map((delay, i) => (
                            <circle
                                key={`sonar-${i}`}
                                cx="2300"
                                cy="720"
                                r="10"
                                fill="none"
                                stroke="#00FF94"
                                strokeWidth="4"
                                className="sonar-ring"
                                style={{ animationDelay: `${delay}s` }}
                            />
                        ))}
                        {/* Solid Bright Core targeting Metro Manila */}
                        <circle cx="2300" cy="720" r="10" fill="#ffffff" />
                        <circle cx="2300" cy="720" r="16" fill="#00FF94" opacity="0.8" />

                        {/* Label */}
                        <text x="2330" y="730" fill="#00FF94" fontSize="36" fontWeight="bold" className="hub-label drop-shadow-lg">
                            PHILIPPINES
                        </text>
                    </g>

                    {/* Global Junctions (Pulsing Centers Worldwide) */}
                    {keyJunctions.map((pt, i) => (
                        <g key={`dest-${i}`}>
                            <circle cx={pt.x} cy={pt.y} r="12" fill="#151921" stroke="rgba(0, 255, 148, 0.4)" strokeWidth="6" />
                            <circle cx={pt.x} cy={pt.y} r="6" fill="#ffffff" className="dest-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="10"
                                fill="none"
                                stroke="#00FF94"
                                strokeWidth="8"
                                className="dest-ripple"
                                style={{
                                    animationDelay: `${(i % 5) * 0.5}s`,
                                    transformOrigin: `${pt.x}px ${pt.y}px`
                                }}
                            />
                        </g>
                    ))}
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full pointer-events-none">
                <div className="text-center mb-24 pointer-events-auto">
                    <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        {COPY.sections.globalTalentMap.title.split('Map')[0]} <span className="text-primary italic">Talent Map</span>
                    </h3>
                </div>

                {/* Minimalist Grid Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch pointer-events-auto">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-card p-6 md:p-8 border border-white/5 backdrop-blur-2xl rounded-3xl group transition-all duration-700 hover:scale-[1.02] hover:border-white/20 flex flex-col justify-center text-center">
                            <h4 className="text-4xl md:text-5xl font-black text-white mb-2 font-geist tracking-tighter">
                                {stat.value}
                            </h4>
                            <p className={`${stat.color} font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-3`}>
                                {stat.label}
                            </p>
                            <p className="text-[10px] md:text-xs text-text-muted leading-relaxed font-medium transition-colors group-hover:text-gray-300">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                /* Background Map Overlays */
                .global-node-pulse {
                    animation: nodeTwinkle 4s infinite alternate ease-in-out;
                    opacity: 0.1;
                }
                
                /* Hub Sonar */
                .hub-core-glow {
                    animation: breatheGlow 3s infinite alternate ease-in-out;
                }
                .sonar-ring {
                    animation: sonarExpand 3.6s infinite linear;
                    opacity: 0;
                    transform-origin: 781px 275px;
                }

                /* Data Tracks */
                .network-track {
                    fill: none;
                    stroke: rgba(0, 255, 148, 0.15);
                    stroke-width: 1.5;
                    stroke-dasharray: 6 6;
                    animation: march 40s linear infinite reverse;
                }

                /* Fast Comets / Data Packets */
                .comet-path {
                    fill: none;
                    stroke: #ffffff;
                    stroke-width: 3.5;
                    stroke-linecap: round;
                    /* Dash array represents: [Length of comet, Space before next one]. Using pathLength="100" */
                    stroke-dasharray: 10 120;
                    animation: flyComet linear infinite;
                    opacity: 0;
                    filter: drop-shadow(0 0 8px rgba(0, 255, 148, 1));
                }

                /* Destination Targets */
                .dest-dot {
                    animation: blinkDot 2s infinite alternate ease-in-out;
                }
                .dest-ripple {
                    animation: pingRipple 3s infinite ease-out;
                    opacity: 0;
                }

                /* Keyframes */
                @keyframes nodeTwinkle {
                    0% { opacity: 0.1; transform: scale(1); }
                    100% { opacity: 0.9; transform: scale(1.8); filter: drop-shadow(0 0 4px #00FF94); }
                }

                @keyframes breatheGlow {
                    0% { opacity: 0.3; transform: scale(0.9); }
                    100% { opacity: 0.8; transform: scale(1.1); }
                }

                @keyframes sonarExpand {
                    0% { transform: scale(1); opacity: 1; stroke-width: 2px; }
                    100% { transform: scale(8); opacity: 0; stroke-width: 0px; }
                }

                @keyframes march {
                    to { stroke-dashoffset: 1000; }
                }

                @keyframes flyComet {
                    /* With pathLength=100, we offset from 100 (start) to -50 (end, well past offscreen) */
                    0% { stroke-dashoffset: 100; opacity: 0; }
                    5% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { stroke-dashoffset: -50; opacity: 0; }
                }

                @keyframes blinkDot {
                    0% { opacity: 0.3; }
                    100% { opacity: 1; filter: drop-shadow(0 0 6px #fff); }
                }

                @keyframes pingRipple {
                    0% { transform: scale(0.5); opacity: 0.8; stroke-width: 2px; }
                    100% { transform: scale(5); opacity: 0; stroke-width: 0px; }
                }
            `}</style>
        </section>
    );
};

export default GlobalTalentMap;
