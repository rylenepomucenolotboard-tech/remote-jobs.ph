'use client';

import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface JobFormBasicsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    categories: string[];
    jobTypes: { value: string; label: string }[];
}

export default function JobFormBasics({ formData, handleChange, categories, jobTypes }: JobFormBasicsProps) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Job Title</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={20} />
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field pl-12"
                            placeholder="e.g. Senior Frontend Engineer (React)"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Job Type</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="input-field"
                            required
                        >
                            {jobTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={20} />
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="input-field pl-12"
                                placeholder="e.g. Remote, Manila, Cebu"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wider">Application Deadline</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400" size={20} />
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline}
                                onChange={handleChange}
                                className="input-field pl-12"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
