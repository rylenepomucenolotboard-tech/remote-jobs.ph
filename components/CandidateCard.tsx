import Link from 'next/link';
import { Star } from 'lucide-react';

interface CandidateCardProps {
    name: string;
    title: string;
    skills: string[];
    isRemoteReady?: boolean;
    isTopRated?: boolean;
}

export default function CandidateCard({ name, title, skills, isRemoteReady = true, isTopRated }: CandidateCardProps) {
    return (
        <div className="group bg-background-slate rounded-3xl p-8 border border-white/5 hover:border-primary-indigo/50 hover:shadow-[0px_0px_30px_#6366f133] transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8 w-full">
                    {/* Avatar/Initials */}
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-2xl font-black text-white group-hover:bg-primary-indigo transition-all shrink-0 border border-white/5">
                        {name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-black text-white truncate group-hover:text-primary-indigo transition-colors font-heading">
                                {name}
                            </h3>
                            {isRemoteReady && (
                                <span className="flex items-center gap-1 px-2.5 py-1 bg-accent-cyber/10 text-accent-cyber text-[10px] font-black uppercase tracking-tighter rounded-full border border-accent-cyber/20 glow-cyan">
                                    <span className="w-1.5 h-1.5 bg-accent-cyber rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                    Remote Ready
                                </span>
                            )}
                            {isTopRated && (
                                <span className="px-2.5 py-1 bg-accent-cyber/10 text-accent-cyber text-[10px] font-black uppercase tracking-tighter rounded-full border border-accent-cyber/20 flex items-center gap-1">
                                    <Star size={12} strokeWidth={2.5} fill="currentColor" />
                                    Top Rated
                                </span>
                            )}
                        </div>

                        <p className="text-text-muted font-bold mb-4">{title}</p>

                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 text-text-muted text-xs font-bold rounded-lg border border-white/10 group-hover:border-primary-indigo/30 group-hover:text-white transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center gap-4 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-10">
                    <Link href="#" className="text-white/20 hover:text-accent-cyber font-bold text-sm underline decoration-accent-cyber/20 mb-2 truncate transition-colors">
                        View Portfolio
                    </Link>
                    <div className="flex gap-3 w-full lg:w-auto">
                        <button className="btn-primary !py-3 !px-6 !text-sm whitespace-nowrap">
                            Contact Candidate
                        </button>
                        <button className="btn-outline-white !py-3 !px-6 !text-sm whitespace-nowrap">
                            Invite
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
