'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLeadsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [leads, setLeads] = useState<any[]>([]);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterTrigger, setFilterTrigger] = useState('All');
    const [filterCurrency, setFilterCurrency] = useState('All');
    const [filterConverted, setFilterConverted] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    // --- AUTHENTICATION ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would check against process.env.NEXT_PUBLIC_ADMIN_CALC_PASSWORD
        // For this demo/implementation, we'll use a hardcoded value if the env var is missing
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_CALC_PASSWORD || 'elite2026';
        if (password === adminPass) {
            setIsAuthenticated(true);
            localStorage.setItem('admin:authed', 'true');
        } else {
            alert('Incorrect password');
        }
    };

    // --- DATA LOADING ---
    useEffect(() => {
        if (localStorage.getItem('admin:authed') === 'true') {
            setIsAuthenticated(true);
        }
        loadLeads();
        setIsLoading(false);
    }, []);

    const loadLeads = () => {
        const allLeads: any[] = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('lead:')) {
                try {
                    const lead = JSON.parse(localStorage.getItem(key)!);
                    allLeads.push({ ...lead, storageKey: key });
                } catch (e) {
                    console.error('Failed to parse lead', e);
                }
            }
        }
        // Sort by timestamp descending
        allLeads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setLeads(allLeads);
    };

    // --- ACTIONS ---
    const toggleConverted = (storageKey: string, currentStatus: boolean) => {
        const lead = JSON.parse(localStorage.getItem(storageKey)!);
        lead.converted = !currentStatus;
        localStorage.setItem(storageKey, JSON.stringify(lead));
        loadLeads();
    };

    const deleteLead = (storageKey: string) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            localStorage.removeItem(storageKey);
            loadLeads();
        }
    };

    const exportCSV = () => {
        const filteredLeads = getFilteredLeads();
        if (filteredLeads.length === 0) return;

        const headers = ['Date/Time', 'Category', 'Role', 'Posts/mo', 'Currency', 'Cost/Post', 'Agency Fee', 'Saved', 'Trigger', 'CTA Clicked', 'Email', 'Converted'];
        const rows = filteredLeads.map(l => [
            new Date(l.timestamp).toLocaleString(),
            l.category,
            l.role || '—',
            l.posts_per_month,
            l.currency,
            l.cost_per_post,
            l.agency_fee_avg,
            l.agency_fee_avg - l.cost_per_post,
            l.trigger,
            l.cta_clicked || '—',
            l.email || '—',
            l.converted ? 'Yes' : 'No'
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `remotejobs-calc-leads-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearAll = () => {
        if (confirm('DANGER: This will delete ALL captured leads permanently. Proceed?')) {
            const keysToRemove = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith('lead:')) keysToRemove.push(key);
            }
            keysToRemove.forEach(k => localStorage.removeItem(k));
            loadLeads();
        }
    };

    // --- FILTERING ---
    const getFilteredLeads = () => {
        return leads.filter(l => {
            const matchCat = filterCategory === 'All' || l.category === filterCategory.toLowerCase();
            const matchTrig = filterTrigger === 'All' || l.trigger === filterTrigger.toLowerCase();
            const matchCurr = filterCurrency === 'All' || l.currency === filterCurrency;
            const matchConv = filterConverted === 'All' || (filterConverted === 'Yes' ? l.converted : !l.converted);
            return matchCat && matchTrig && matchCurr && matchConv;
        });
    };

    const filteredLeads = getFilteredLeads();

    if (isLoading) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center p-4 font-geist">
                <div className="bg-[#1C2038] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-black text-[#E8EAF6] mb-2 tracking-tight italic">Admin Access</h1>
                        <p className="text-[#8B92B8] text-sm">Enter password to view calculator leads</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-[#0D0F1A] border border-white/10 p-5 rounded-2xl text-[#E8EAF6] outline-none focus:border-[#4F46E5] transition-all text-center text-lg"
                            autoFocus
                        />
                        <button type="submit" className="w-full bg-[#4F46E5] text-white py-5 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all">
                            Unlock Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0D0F1A] text-[#E8EAF6] font-geist p-8">
            <div className="max-w-[1600px] mx-auto">
                {/* HEADER */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                    <div>
                        <h1 className="text-3xl font-black italic tracking-tight mb-2">RemoteJobs.ph — Calculator Leads</h1>
                        <div className="flex gap-4 text-[#8B92B8] text-xs font-bold uppercase tracking-widest">
                            <span>Total: {leads.length}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full my-auto"></span>
                            <span>Converted: {leads.filter(l => l.converted).length}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full my-auto"></span>
                            <span>Emails: {leads.filter(l => l.email).length}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button onClick={loadLeads} className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Refresh</button>
                        <button onClick={exportCSV} className="bg-[#AAFF45] text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all">Export CSV</button>
                        <button onClick={clearAll} className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Clear All</button>
                        <button onClick={() => { localStorage.removeItem('admin:authed'); setIsAuthenticated(false); }} className="text-[#8B92B8] hover:text-white px-4 py-3 font-bold text-xs uppercase tracking-widest">Logout</button>
                    </div>
                </header>

                {/* FILTERS */}
                <div className="bg-[#1C2038] p-6 rounded-3xl border border-white/5 mb-8 flex flex-wrap gap-8">
                    <div>
                        <label className="block text-[#8B92B8] text-[10px] uppercase font-black tracking-widest mb-3">Category</label>
                        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-[#0D0F1A] border border-white/10 p-3 rounded-xl text-xs font-bold outline-none cursor-pointer">
                            {['All', 'Tech', 'Design', 'Ops', 'Marketing', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#8B92B8] text-[10px] uppercase font-black tracking-widest mb-3">Trigger</label>
                        <select value={filterTrigger} onChange={(e) => setFilterTrigger(e.target.value)} className="bg-[#0D0F1A] border border-white/10 p-3 rounded-xl text-xs font-bold outline-none cursor-pointer">
                            {['All', 'Slider', 'Row_click', 'Idle', 'Currency', 'Cta_click'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#8B92B8] text-[10px] uppercase font-black tracking-widest mb-3">Currency</label>
                        <select value={filterCurrency} onChange={(e) => setFilterCurrency(e.target.value)} className="bg-[#0D0F1A] border border-white/10 p-3 rounded-xl text-xs font-bold outline-none cursor-pointer">
                            {['All', 'USD', 'AUD', 'GBP', 'CAD', 'NZD'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#8B92B8] text-[10px] uppercase font-black tracking-widest mb-3">Converted</label>
                        <select value={filterConverted} onChange={(e) => setFilterConverted(e.target.value)} className="bg-[#0D0F1A] border border-white/10 p-3 rounded-xl text-xs font-bold outline-none cursor-pointer">
                            {['All', 'Yes', 'No'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* LEADS TABLE */}
                <div className="bg-[#1C2038] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#0D0F1A]/50 text-[#8B92B8] font-black uppercase tracking-widest text-[10px]">
                                    <th className="px-8 py-5">Date/Time</th>
                                    <th className="px-6 py-5">Category</th>
                                    <th className="px-6 py-5">Role</th>
                                    <th className="px-6 py-5">Posts/mo</th>
                                    <th className="px-6 py-5">Trigger</th>
                                    <th className="px-6 py-5">Email</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLeads.length > 0 ? filteredLeads.map((lead, i) => (
                                    <tr key={i} className={`group hover:bg-white/5 transition-colors ${lead.converted ? 'border-l-4 border-[#AAFF45]' : ''}`}>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="text-sm font-bold text-[#E8EAF6]">{new Date(lead.timestamp).toLocaleDateString()}</div>
                                            <div className="text-[10px] text-[#8B92B8] mt-1">{new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-xs uppercase tracking-widest text-[#E8EAF6]">{lead.category}</td>
                                        <td className="px-6 py-6">
                                            <div className="text-sm font-bold">{lead.role || '—'}</div>
                                            <div className="text-[10px] text-[#8B92B8] mt-1">{lead.currency} @ {lead.posts_per_month} posts/mo</div>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-sm">{lead.posts_per_month}</td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${lead.trigger === 'slider' ? 'bg-[#4F46E5]/20 text-[#4F46E5]' :
                                                    lead.trigger === 'row_click' ? 'bg-[#AAFF45]/20 text-[#AAFF45]' :
                                                        lead.trigger === 'idle' ? 'bg-amber-500/20 text-amber-500' :
                                                            lead.trigger === 'currency' ? 'bg-sky-500/20 text-sky-500' :
                                                                'bg-purple-500/20 text-purple-500'
                                                }`}>
                                                {lead.trigger}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-medium text-sm">
                                            {lead.email ? (
                                                <a href={`mailto:${lead.email}`} className="text-[#4F46E5] hover:underline flex items-center gap-1">
                                                    {lead.email}
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="mb-0.5"><path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </a>
                                            ) : '—'}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => toggleConverted(lead.storageKey, lead.converted)} className={`text-[10px] font-black uppercase tracking-widest ${lead.converted ? 'text-[#8B92B8]' : 'text-[#AAFF45]'}`}>
                                                {lead.converted ? 'Mark Pending' : 'Mark Converted'}
                                            </button>
                                            <button onClick={() => deleteLead(lead.storageKey)} className="text-[10px] font-black uppercase tracking-widest text-red-500">Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-20 text-center">
                                            <div className="text-[#8B92B8] text-sm mb-2">No calculator interactions recorded yet.</div>
                                            <p className="text-[#8B92B8]/50 text-xs">Leads will appear here when visitors interact with the pricing page calculator.</p>
                                            <button onClick={() => router.push('/pricing')} className="mt-8 text-white font-black hover:text-[#4F46E5] transition-colors">Go to Pricing Page →</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* HELP SECTION */}
                <details className="mt-12 group">
                    <summary className="text-[#8B92B8] text-xs font-black uppercase tracking-widest cursor-pointer hover:text-white transition-colors flex items-center gap-2 select-none">
                        <span className="group-open:rotate-180 transition-transform">▾</span> How to use this page
                    </summary>
                    <div className="mt-6 bg-[#1C2038] p-8 rounded-3xl border border-white/5 text-[#8B92B8] text-sm leading-relaxed max-w-2xl">
                        <p className="mb-4">Each row is a visitor who interacted with the cost calculator on the pricing page.</p>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-[#E8EAF6] block mb-1">TRIGGER tells you what made them engage:</strong>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li><strong>Slider</strong> — they moved the posts-per-month slider to 3+</li>
                                    <li><strong>Row click</strong> — they clicked on a specific role in the table</li>
                                    <li><strong>Idle</strong> — they spent 30+ seconds on the calculator without acting</li>
                                    <li><strong>Currency</strong> — they switched to a non-USD currency (international lead)</li>
                                    <li><strong>CTA click</strong> — they clicked a call-to-action button</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#E8EAF6] block mb-1">EMAIL:</strong>
                                If shown, the visitor entered their email in the nudge field. Click to open an email to them.
                            </div>
                            <div>
                                <strong className="text-[#E8EAF6] block mb-1">CONVERTED:</strong>
                                Mark this Yes once the visitor has posted a job or created an account. Use this to track which leads turned into users.
                            </div>
                            <div>
                                <strong className="text-[#E8EAF6] block mb-1">EXPORT CSV:</strong>
                                Downloads all visible records as a spreadsheet for your team.
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}
