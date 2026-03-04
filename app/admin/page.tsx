'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClipboardList, Calculator, Settings, BarChart3 } from 'lucide-react';

export default function AdminPortal() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

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

    useEffect(() => {
        if (localStorage.getItem('admin:authed') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0D0F1A] flex items-center justify-center p-4 font-sans">
                <div className="bg-[#1C2038] p-10 rounded-[2.5rem] border border-white/5 w-full max-w-md shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl font-black text-[#E8EAF6] mb-2 tracking-tight italic">Admin Portal</h1>
                        <p className="text-[#8B92B8] text-sm">Enter password to access admin tools</p>
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
                            Unlock Portal
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const adminTools = [
        {
            title: 'Employer Submissions',
            description: 'View and manage all new employer registration leads.',
            href: '/admin/employer-leads',
            icon: ClipboardList,
            color: 'text-primary-indigo',
            bgColor: 'bg-primary-indigo/10'
        },
        {
            title: 'Calculator Leads',
            description: 'Track interactions with the pricing calculator.',
            href: '/admin/calc-leads',
            icon: Calculator,
            color: 'text-accent-cyber',
            bgColor: 'bg-accent-cyber/10'
        },
        // Placeholders for future tools
        {
            title: 'Site Analytics',
            description: 'Coming Soon: Traffic and conversion insights.',
            href: '#',
            icon: BarChart3,
            color: 'text-gray-500',
            bgColor: 'bg-gray-500/10',
            disabled: true
        },
        {
            title: 'System Settings',
            description: 'Coming Soon: Global configuration and feature flags.',
            href: '#',
            icon: Settings,
            color: 'text-gray-500',
            bgColor: 'bg-gray-500/10',
            disabled: true
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#0D0F1A] text-[#E8EAF6]">
            <Header />

            <main className="flex-1 p-8 lg:p-16">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-16">
                        <h1 className="text-4xl font-black italic tracking-tight mb-4">RemoteJobs Central Command</h1>
                        <p className="text-[#8B92B8] text-lg max-w-2xl">Access all administrative tools and data insights from one central location.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {adminTools.map((tool, i) => (
                            <Link
                                key={i}
                                href={tool.href}
                                className={`group p-8 rounded-[2.5rem] bg-[#1C2038] border border-white/5 transition-all duration-500 ${tool.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/20 hover:scale-[1.02] shadow-xl hover:shadow-[#4F46E5]/10'}`}
                            >
                                <div className={`w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center ${tool.color} mb-8 group-hover:scale-110 transition-transform`}>
                                    <tool.icon size={32} />
                                </div>
                                <h2 className="text-2xl font-black mb-3">{tool.title}</h2>
                                <p className="text-[#8B92B8] leading-relaxed mb-6">{tool.description}</p>
                                {!tool.disabled && (
                                    <div className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest ${tool.color}`}>
                                        Open Tool
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
                        <p className="text-[#8B92B8] text-xs font-bold uppercase tracking-widest">v2.4.0 — Operational</p>
                        <button
                            onClick={() => { localStorage.removeItem('admin:authed'); setIsAuthenticated(false); }}
                            className="text-[#8B92B8] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                        >
                            Logout Session
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
