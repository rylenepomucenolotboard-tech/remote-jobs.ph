import React from 'react';

const ComparisonGrid = () => {
    const rows = [
        { label: 'Cost', employer: 'Free to start', jobseeker: 'Always free' },
        { label: 'Access', employer: '9 Million+ Active Resumes', jobseeker: 'Visible to 1,182+ Global Clients' },
        { label: 'Action', employer: 'Post roles, shortlist candidates', jobseeker: 'Browse and apply with one click' },
        { label: 'Discovery', employer: 'You search verified profiles', jobseeker: 'Employers come to you' },
        { label: 'Support', employer: 'We handle the connection', jobseeker: 'Instant interview alerts' },
        { label: 'Verification', employer: 'Company profile reviewed', jobseeker: 'Profile and skills verified' },
    ];

    return (
        <div className="w-full overflow-hidden rounded-[3rem] border border-navy-100 bg-white shadow-xl shadow-navy-900/5">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-navy-100">
                <div className="hidden md:block bg-navy-50/50 p-8 border-r border-navy-100"></div>
                <div className="p-8 border-r border-navy-100 bg-primary-indigo/5">
                    <h3 className="text-xl font-black text-primary-indigo uppercase tracking-wider text-center">For Employers</h3>
                </div>
                <div className="p-8 bg-accent-cyber/5">
                    <h3 className="text-xl font-black text-accent-cyber uppercase tracking-wider text-center">For Job Seekers</h3>
                </div>
            </div>

            {/* Comparison Rows */}
            {rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 border-b border-navy-100 last:border-0 hover:bg-navy-50/50 transition-colors">
                    <div className="p-6 md:p-8 bg-navy-50/30 border-r border-navy-100 flex items-center">
                        <span className="text-sm font-black uppercase tracking-widest text-navy-400">{row.label}</span>
                    </div>
                    <div className="p-6 md:p-8 border-r border-navy-100 flex items-center justify-center text-center">
                        <span className="text-navy-900 font-bold leading-relaxed">{row.employer}</span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-center">
                        <span className="text-navy-900 font-bold leading-relaxed">{row.jobseeker}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComparisonGrid;
