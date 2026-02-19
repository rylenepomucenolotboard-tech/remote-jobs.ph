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
        <div className="w-full overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10">
                <div className="hidden md:block bg-white/5 p-8 border-r border-white/10"></div>
                <div className="p-8 border-r border-white/10 bg-primary-indigo/10">
                    <h3 className="text-xl font-black text-primary-indigo uppercase tracking-wider text-center">For Employers</h3>
                </div>
                <div className="p-8 bg-accent-cyber/10">
                    <h3 className="text-xl font-black text-accent-cyber uppercase tracking-wider text-center">For Job Seekers</h3>
                </div>
            </div>

            {/* Comparison Rows */}
            {rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                    <div className="p-6 md:p-8 bg-white/5 border-r border-white/10 flex items-center">
                        <span className="text-sm font-black uppercase tracking-widest text-text-muted">{row.label}</span>
                    </div>
                    <div className="p-6 md:p-8 border-r border-white/10 flex items-center justify-center text-center">
                        <span className="text-white/90 font-bold leading-relaxed">{row.employer}</span>
                    </div>
                    <div className="p-6 md:p-8 flex items-center justify-center text-center">
                        <span className="text-white/90 font-bold leading-relaxed">{row.jobseeker}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ComparisonGrid;
