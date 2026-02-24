'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

// Modular Components
import JobFormBasics from '@/components/job-post/JobFormBasics';
import JobFormDescription from '@/components/job-post/JobFormDescription';
import JobFormPerksSalary from '@/components/job-post/JobFormPerksSalary';
import JobPostPreview from '@/components/job-post/JobPostPreview';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const CATEGORIES = [
    'Software Development',
    'Marketing',
    'Design',
    'Sales',
    'Customer Support',
    'Human Resources',
    'Writing',
    'Data Science',
    'Virtual Assistant',
    'Other'
];

const JOB_TYPES = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
];

const PERKS = [
    'Remote-first',
    'Flexible hours',
    'Health insurance',
    'Paid time off',
    'Learning budget',
    'Gym membership',
    'Home office stipend',
    'Annual retreat'
];

export default function PostJobPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        jobType: 'full-time',
        location: 'Remote',
        description: '',
        requirements: '',
        salaryMin: 30000,
        salaryMax: 60000,
        perks: [] as string[],
        isFeatured: false,
        deadline: '',
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/login');
            return;
        }
        setUser(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePerk = (perk: string) => {
        setFormData(prev => ({
            ...prev,
            perks: prev.perks.includes(perk)
                ? prev.perks.filter(p => p !== perk)
                : [...prev.perks, perk]
        }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.from('jobs').insert({
                employer_id: user.id,
                title: formData.title,
                description: formData.description,
                requirements: formData.requirements,
                salary_range: `₱${formData.salaryMin.toLocaleString()} - ₱${formData.salaryMax.toLocaleString()}/month`,
                location: formData.location,
                job_type: formData.jobType,
                category: formData.category,
                deadline: formData.deadline || null,
                perks: formData.perks,
                is_featured: formData.isFeatured,
                status: 'active'
            });

            if (error) throw error;
            router.push('/employer/dashboard');
        } catch (error: any) {
            alert(error.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-100 flex flex-col font-sans">
            <Header />

            <main className="flex-1 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Left Column: Form */}
                        <div className="flex-1">
                            <div className="card shadow-md">
                                <h1 className="text-3xl font-bold text-navy-900 mb-2">Post a New Job</h1>
                                <p className="text-navy-500 mb-8">Follow our simple 3-step process to reach thousands of Filipino remote talents.</p>

                                {/* Stepper Header */}
                                <div className="flex items-center justify-between mb-12 relative">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-navy-200 -z-10 -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 left-0 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }}></div>

                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className="flex flex-col items-center">
                                            <div className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-4 transition-all duration-300",
                                                step >= s ? "bg-primary border-primary text-white" : "bg-white border-navy-200 text-navy-400"
                                            )}>
                                                {step > s ? <Check size={24} strokeWidth={3} /> : s}
                                            </div>
                                            <span className={cn(
                                                "mt-2 text-sm font-semibold",
                                                step >= s ? "text-navy-900" : "text-navy-400"
                                            )}>
                                                {s === 1 ? 'Job Basics' : s === 2 ? 'Description' : 'Perks & Salary'}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Form Content */}
                                <div className="space-y-8">
                                    {step === 1 && (
                                        <JobFormBasics
                                            formData={formData}
                                            handleChange={handleChange}
                                            categories={CATEGORIES}
                                            jobTypes={JOB_TYPES}
                                        />
                                    )}

                                    {step === 2 && (
                                        <JobFormDescription
                                            formData={formData}
                                            handleChange={handleChange}
                                        />
                                    )}

                                    {step === 3 && (
                                        <JobFormPerksSalary
                                            formData={formData}
                                            setFormData={setFormData}
                                            perks={PERKS}
                                            togglePerk={togglePerk}
                                        />
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="flex items-center justify-between pt-8 border-t border-navy-100">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            disabled={step === 1}
                                            className={cn(
                                                "flex items-center gap-2 px-6 py-4 font-bold rounded-xl transition-all duration-300 focus:outline-none",
                                                step === 1 ? "text-navy-300 cursor-not-allowed" : "text-navy-600 hover:bg-white hover:text-navy-900 hover:shadow-sm"
                                            )}
                                        >
                                            <ChevronLeft size={20} />
                                            Previous Step
                                        </button>

                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="btn-primary flex items-center gap-2 min-w-[180px] justify-center"
                                            >
                                                Next Step
                                                <ChevronRight size={20} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className={cn(
                                                    "btn-primary flex items-center gap-2 min-w-[220px] justify-center relative overflow-hidden group",
                                                    loading && "opacity-80 cursor-not-allowed"
                                                )}
                                            >
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Posting Job...
                                                    </span>
                                                ) : (
                                                    <>
                                                        Publish Job Proposal
                                                        <Sparkles size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Live Preview */}
                        <div className="lg:w-[400px]">
                            <JobPostPreview formData={formData} />
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
