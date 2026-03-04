'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, Calendar, MessageSquare, TrendingUp, Users, CheckCircle, ChevronRight, Send, Bell, Settings, User, LogOut, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const InitialsAvatar = ({ name, size = "w-10 h-10", color = "bg-indigo-100 text-indigo-600" }: { name: string, size?: string, color?: string }) => {
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);
    return <div className={`flex items-center justify-center rounded-full font-bold text-sm ${size} ${color}`}>{initials}</div>;
};
export default function JobseekerDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
    const [chatLoading, setChatLoading] = useState(false);
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/login'); return; }
            setUser(user);
            const { data: profileData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(profileData);
            const { data: apps } = await supabase.from('applications').select('*').eq('jobseeker_id', user.id);
            setApplications(apps || []);
            setLoading(false);
        };
        checkUser();
    }, [router]);
    const handleSignOut = async () => { await supabase.auth.signOut(); router.push('/'); };
    const handleChat = async (message: string) => {
        if (!message.trim()) return;
        const newMessages = [...chatMessages, { role: 'user', content: message }];
        setChatMessages(newMessages);
        setChatInput('');
        setChatLoading(true);
        try {
            const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: newMessages }) });
            const data = await res.json();
            setChatMessages([...newMessages, { role: 'assistant', content: data.reply }]);
        } catch (e) {
            setChatMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
        }
        setChatLoading(false);
    };
    const chartData = [{ day: 'Mon', apps: 12 },{ day: 'Tue', apps: 18 },{ day: 'Wed', apps: 15 },{ day: 'Thu', apps: 25 },{ day: 'Fri', apps: 32 },{ day: 'Sat', apps: 28 },{ day: 'Sun', apps: 35 }];
    const maxApps = Math.max(...chartData.map(d => d.apps));
    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 space-y-8">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
                        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><LayoutDashboard size={20} /><span>Overview</span></button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Briefcase size={20} /><span>Applications</span></button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Calendar size={20} /><span>Interviews</span></button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><MessageSquare size={20} /><span>Messages</span></button>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Account</p>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><User size={20} /><span>Profile</span></button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Settings size={20} /><span>Settings</span></button>
                        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition-all"><LogOut size={20} /><span>Logout</span></button>
                    </div>
                    <div className="mt-auto p-4 bg-indigo-900 rounded-2xl text-white relative overflow-hidden">
                        <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Career Growth</p>
                        <h4 className="text-sm font-bold mb-3">Upgrade to Premium</h4>
                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all">View Plans</button>
                    </div>
                </aside>
                <main className="flex-1 bg-slate-50/50 p-6 lg:p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900">Good morning, {profile?.full_name?.split(' ')[0] || 'there'} 👋</h1>
                                <p className="text-slate-500 font-medium">Here's your job search overview.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm"><Bell size={20} /></button>
                                <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all"><Plus size={18} /><span>New App</span></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4"><div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Briefcase size={22} /></div><span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span></div>
                                <p className="text-3xl font-black text-slate-900">{applications.length}</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Total Applications</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4"><div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><Users size={22} /></div><span className="text-xs font-bold text-slate-400">Target: 20</span></div>
                                <p className="text-3xl font-black text-slate-900">8</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Shortlisted</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <div className="flex items-center justify-between mb-4"><div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><CheckCircle size={22} /></div><span className="text-xs font-bold text-amber-600">Top 5%</span></div>
                                <p className="text-3xl font-black text-slate-900">92%</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">Success Rate</p>
                            </div>
                        </div>
                <aside className="hidden xl:flex flex-col w-80 bg-white border-l border-slate-100 p-8 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Assistant</span>
                        </div>
                        <h2 className="text-xl font-black text-slate-900">Good morning, <span className="text-indigo-600">{profile?.full_name?.split(' ')[0] || 'there'}</span></h2>
                        <p className="text-sm text-slate-400 mt-1">Ready to optimize your career?</p>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
                        {chatMessages.length === 0 ? (
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <p className="text-sm font-medium text-slate-600 italic">"I've analyzed 200+ remote job listings. Your match score for Full Stack Dev is at an all-time high."</p>
                            </div>
                        ) : (
                            chatMessages.map((msg, i) => (
                                <div key={i} className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white ml-4' : 'bg-slate-50 border border-slate-100 text-slate-700 mr-4'}`}>
                                    {msg.content}
                                </div>
                            ))
                        )}
                        {chatLoading && (
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mr-4">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested</p>
                        {['Prepare for an upcoming interview', 'Connect with recruiters directly', 'Set a reminder for my next interview'].map((prompt, i) => (
                            <button key={i} onClick={() => handleChat(prompt)} className="w-full text-left p-4 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-between group">
                                <span>{prompt}</span>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <textarea placeholder="Ask your AI recruiter..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChat(chatInput); }}} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none" rows={3} />
                        <button onClick={() => handleChat(chatInput)} className="absolute bottom-4 right-4 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all active:scale-90"><Send size={16} /></button>
                    </div>
                    <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-tight">Powered by Anthropic</p>
                </aside>
            </div>
            <Footer />
        </div>
    );
}
