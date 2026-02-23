'use client';

import React, { useState } from 'react';

interface FaqItem {
    question: string;
    answer: React.ReactNode;
}

interface FaqAccordionProps {
    employerFaqs: FaqItem[];
    jobseekerFaqs: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ employerFaqs, jobseekerFaqs }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first employer FAQ

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const renderFaqList = (faqs: FaqItem[], offset: number) => {
        return faqs.map((faq, idx) => {
            const index = idx + offset;
            const isOpen = openIndex === index;
            return (
                <div key={index} className="border-b border-navy-100 last:border-0">
                    <button
                        onClick={() => toggleFaq(index)}
                        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                    >
                        <span className={`text-lg font-black transition-colors ${isOpen ? 'text-primary-indigo' : 'text-navy-900 group-hover:text-primary-indigo'}`}>
                            {faq.question}
                        </span>
                        <span className={`text-2xl font-black ml-4 flex-shrink-0 transition-colors ${isOpen ? 'text-primary-indigo' : 'text-navy-200'}`}>
                            {isOpen ? '−' : '+'}
                        </span>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}
                    >
                        <p className="text-navy-600 font-medium leading-relaxed max-w-[65ch]">
                            {faq.answer}
                        </p>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="space-y-16">
            <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary-indigo mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-primary-indigo/20"></span>
                    For Employers
                </h3>
                <div className="bg-white rounded-3xl border border-navy-100 px-8 shadow-xl shadow-navy-900/5">
                    {renderFaqList(employerFaqs, 0)}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-cyber mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-accent-cyber/20"></span>
                    For Job Seekers
                </h3>
                <div className="bg-white rounded-3xl border border-navy-100 px-8 shadow-xl shadow-navy-900/5">
                    {renderFaqList(jobseekerFaqs, employerFaqs.length)}
                </div>
            </div>
        </div>
    );
};

export default FaqAccordion;
