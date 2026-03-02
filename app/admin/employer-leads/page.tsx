'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Profile } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmployerLeadsPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [leads, setLeads] = useState<Profile[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    // --- AUTHENTICATION ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
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
        fetchEmployerLeads();
    }, []);

    const fetchEmployerLeads = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_type', 'employer')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Error fetching employer leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- FILTERING ---
    const filteredLeads = leads.filter(lead => {
        const searchLower = searchTerm.toLowerCase();
        return (
            lead.full_name?.toLowerCase().includes(searchLower) ||
            lead.company_name?.toLowerCase().includes(searchLower) ||
            lead.role_hiring_for?.toLowerCase().includes(searchLower)
        );
    });

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center p-4 font-sans">
                <div className="bg-[#1C2038] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-black text-[#E8EAF6] mb-2 tracking-tight italic">Admin Access</h1>
                        <p className="text-[#8B92B8] text-sm">Enter password to view employer registrations</p>
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
        <div className="min-h-screen flex flex-col bg-[#0D0F1A] text-[#E8EAF6]">
            <Header />

            <main className="flex-1 p-8">
                <div className="max-w-[1600px] mx-auto">
                    {/* HEADER */}
                    <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                        <div>
                            <h1 className="text-3xl font-black italic tracking-tight mb-2">Employer Registrations</h1>
                            <div className="flex gap-4 text-[#8B92B8] text-xs font-bold uppercase tracking-widest">
                                <span>Total: {leads.length}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={async () => {
                                    if (!confirm('Generate a fake employer lead for testing?')) return;
                                    const testId = crypto.randomUUID();
                                    const { error } = await supabase.from('profiles').insert({
                                        id: testId,
                                        email: `test-${testId.slice(0, 4)}@example.com`,
                                        user_type: 'employer',
                                        full_name: 'Developer Test Account',
                                        company_name: 'RemoteJobs DevTools',
                                        country: 'Philippines',
                                        role_hiring_for: 'Sr. Product Designer',
                                        budget_message: 'This is a test lead generated by the developer tool to bypass Supabase rate limits.',
                                        created_at: new Date().toISOString(),
                                    });
                                    if (error) {
                                        console.error(error);
                                        alert(`Failed to generate lead. Did you run the 'DROP CONSTRAINT' SQL script? Error: ${error.message}`);
                                    } else {
                                        fetchEmployerLeads();
                                    }
                                }}
                                className="bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                Generate Test Lead
                            </button>
                            <button onClick={fetchEmployerLeads} className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Refresh</button>
                            <button onClick={() => { localStorage.removeItem('admin:authed'); setIsAuthenticated(false); }} className="text-[#8B92B8] hover:text-white px-4 py-3 font-bold text-xs uppercase tracking-widest">Logout</button>
                        </div>
                    </header>

                    {/* SEARCH */}
                    <div className="bg-[#1C2038] p-6 rounded-3xl border border-white/5 mb-8">
                        <input
                            type="text"
                            placeholder="Search by name, company, or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#0D0F1A] border border-white/10 p-4 rounded-xl text-[#E8EAF6] outline-none focus:border-[#4F46E5] transition-all"
                        />
                    </div>

                    {/* TABLE */}
                    <div className="bg-[#1C2038] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#0D0F1A]/50 text-[#8B92B8] font-black uppercase tracking-widest text-[10px]">
                                        <th className="px-8 py-5">Date</th>
                                        <th className="px-6 py-5">Employer Details</th>
                                        <th className="px-6 py-5">Company & Role</th>
                                        <th className="px-6 py-5">Budget Message</th>
                                        <th className="px-8 py-5 text-right">Contact</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center">
                                                <div className="animate-spin h-8 w-8 border-4 border-[#4F46E5] border-t-transparent rounded-full mx-auto mb-4"></div>
                                                <p className="text-[#8B92B8]">Loading registrations...</p>
                                            </td>
                                        </tr>
                                    ) : filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="text-sm font-bold text-[#E8EAF6]">{new Date(lead.created_at).toLocaleDateString()}</div>
                                                <div className="text-[10px] text-[#8B92B8] mt-1">{new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="text-sm font-bold">{lead.full_name}</div>
                                                <div className="text-[10px] text-[#8B92B8] mt-1">{lead.phone || 'No phone'}</div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="text-sm font-bold text-accent-cyber">{lead.company_name}</div>
                                                <div className="text-[10px] text-[#8B92B8] mt-1">{lead.role_hiring_for} ({lead.country})</div>
                                            </td>
                                            <td className="px-6 py-6 font-medium text-xs leading-relaxed max-w-xs truncate" title={lead.budget_message}>
                                                {lead.budget_message || '—'}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {lead.email ? (
                                                    <a
                                                        href={`mailto:${lead.email}`}
                                                        className="inline-flex items-center gap-2 bg-[#4F46E5]/10 text-[#4F46E5] px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-[#4F46E5] hover:text-white transition-all"
                                                    >
                                                        Email Employer
                                                    </a>
                                                ) : (
                                                    <span className="text-[#8B92B8] text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg cursor-not-allowed">No Email</span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-[#8B92B8]">
                                                No employer registrations found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
