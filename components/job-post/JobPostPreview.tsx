'use client';

import { Eye, Zap, Building2, MapPin, DollarSign, Clock, ChevronRight, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface JobPostPreviewProps {
    formData: any;
}

export default function JobPostPreview({ formData }: JobPostPreviewProps) {
    return (
        <div className="sticky top-24">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-navy-400 uppercase tracking-widest text-sm flex items-center gap-2">
                    <Eye size={16} />
                    Live Preview
                </h3>
                {formData.isFeatured && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                        <Zap size={10} fill="currentColor" />
                        Featured
                    </span>
                )}
            </div>

            <div className={cn(
                "bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                formData.isFeatured ? "border-primary shadow-xl shadow-primary/10" : "border-navy-100 shadow-lg"
            )}>
                {/* Company Banner (Simulated) */}
                <div className={cn(
                    "h-24 p-6 flex flex-col justify-end",
                    formData.isFeatured ? "bg-primary" : "bg-navy-950"
                )}>
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-bold text-navy-900 border border-white/20">
                            {formData.title ? formData.title.charAt(0).toUpperCase() : <Building2 size={24} />}
                        </div>
                        <div>
                            <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Hiring Company</div>
                            <div className="text-white font-bold leading-tight">Your Company Ltd.</div>
                        </div>
                    </div>
                </div>

                {/* Job Meta */}
                <div className="p-6">
                    <h2 className="text-xl font-bold text-navy-900 mb-2 leading-tight">
                        {formData.title || 'Your Job Title Here'}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="chip text-[11px] py-1 px-3 bg-navy-50 border-navy-100">{formData.category || 'Category'}</span>
                        <span className="chip text-[11px] py-1 px-3 bg-navy-50 border-navy-100 capitalize">{formData.jobType}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 text-navy-500">
                            <MapPin size={16} className="text-primary" />
                            <span className="text-sm font-medium">{formData.location || 'Location'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-navy-500">
                            <DollarSign size={16} className="text-primary" />
                            <span className="text-sm font-bold text-navy-900">
                                ₱{formData.salaryMin.toLocaleString()} - ₱{formData.salaryMax.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-navy-500">
                            <Clock size={16} className="text-primary" />
                            <span className="text-sm font-medium">Remote OK</span>
                        </div>
                    </div>

                    <div className="border-t border-navy-100 pt-6">
                        <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">About the role</h4>
                        <div className="text-sm text-navy-600 line-clamp-[8] leading-relaxed whitespace-pre-line max-h-[180px] overflow-y-auto custom-scrollbar">
                            {formData.description || 'Start typing a description to see it appear here in real-time...'}
                        </div>
                    </div>

                    {formData.requirements && (
                        <div className="mt-6 border-t border-navy-50 pt-6">
                            <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Requirements</h4>
                            <div className="text-sm text-navy-600 line-clamp-4 leading-relaxed whitespace-pre-line">
                                {formData.requirements}
                            </div>
                        </div>
                    )}

                    {formData.perks.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Perks & Benefits</h4>
                            <div className="flex flex-wrap gap-2">
                                {formData.perks.slice(0, 3).map((perk: string) => (
                                    <span key={perk} className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                        <Check size={10} strokeWidth={4} />
                                        {perk}
                                    </span>
                                ))}
                                {formData.perks.length > 3 && (
                                    <span className="text-[10px] font-bold text-navy-400 px-1 py-1">+{formData.perks.length - 3} more</span>
                                )}
                            </div>
                        </div>
                    )}

                    <button className="w-full mt-8 py-4 bg-navy-950 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-navy-900 transition-colors">
                        Quick Apply
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
