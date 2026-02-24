'use client';

import { Zap, Sparkles } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface JobFormPerksSalaryProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    perks: string[];
    togglePerk: (perk: string) => void;
}

export default function JobFormPerksSalary({ formData, setFormData, perks, togglePerk }: JobFormPerksSalaryProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-8">
                <div>
                    <label className="block text-sm font-bold text-navy-900 mb-6 uppercase tracking-wider">Monthly Salary Range (PHP)</label>
                    <div className="px-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-1 text-center bg-navy-50 py-3 rounded-xl border border-navy-100 font-bold text-navy-900">
                                ₱{formData.salaryMin.toLocaleString()}
                            </div>
                            <div className="text-navy-300 font-bold">—</div>
                            <div className="flex-1 text-center bg-navy-50 py-3 rounded-xl border border-navy-100 font-bold text-navy-900">
                                ₱{formData.salaryMax.toLocaleString()}
                            </div>
                        </div>
                        <input
                            type="range"
                            min="10000"
                            max="100000"
                            step="1000"
                            value={formData.salaryMin}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, salaryMin: parseInt(e.target.value), salaryMax: Math.max(prev.salaryMax, parseInt(e.target.value)) }))}
                            className="w-full h-2 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-primary mb-4"
                        />
                        <input
                            type="range"
                            min="10000"
                            max="300000"
                            step="5000"
                            value={formData.salaryMax}
                            onChange={(e) => setFormData((prev: any) => ({ ...prev, salaryMax: parseInt(e.target.value), salaryMin: Math.min(prev.salaryMin, parseInt(e.target.value)) }))}
                            className="w-full h-2 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy-900 mb-4 uppercase tracking-wider">Company Perks</label>
                    <div className="flex flex-wrap gap-3">
                        {perks.map(perk => (
                            <button
                                key={perk}
                                type="button"
                                onClick={() => togglePerk(perk)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all duration-300",
                                    formData.perks.includes(perk)
                                        ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                                        : "bg-white border-navy-100 text-navy-600 hover:border-navy-300"
                                )}
                            >
                                {perk}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100 border-dashed">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center text-primary">
                                <Zap size={24} fill="currentColor" />
                            </div>
                            <div>
                                <h4 className="font-bold text-navy-900 text-lg flex items-center gap-2">
                                    Feature this Job Post
                                    <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-black">Hot</span>
                                </h4>
                                <p className="text-navy-500 text-sm">Priority placement, highlighted styling, and 3x more visibility.</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setFormData((prev: any) => ({ ...prev, isFeatured: !prev.isFeatured }))}
                            className={cn(
                                "relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300",
                                formData.isFeatured ? "bg-primary" : "bg-navy-200"
                            )}
                        >
                            <span className={cn(
                                "inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300",
                                formData.isFeatured ? "translate-x-7" : "translate-x-1"
                            )} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
