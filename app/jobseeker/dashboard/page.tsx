'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Briefcase, Calendar, MessageSquare, TrendingUp, Users, CheckCircle, ChevronRight, Send, Bell, Settings, User, LogOut, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const InitialsAvatar = ({ name, size = "w-10 h-10", color = "bg-indigo-100 text-indigo-600" }: { name: string, size?: string, color?: string }) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    return <div className={`flex items-center justify-center rounded-full font-bold ${size} ${color}`}>{initials}</div>;
};
export default function JobseekerDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
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
    const chartData = [{ day: 'Mon', apps: 12 }, { day: 'Tue', apps: 18 }, { day: 'Wed', apps: 15 }, { day: 'Thu', apps: 25 }, { day: 'Fri', apps: 32 }, { day: 'Sat', apps: 28 }, { day: 'Sun', apps: 35 }];
    const maxApps = Math.max(...chartData.map(d => d.apps));

    const handleChat = async (message: string) => {
        if (!message.trim() || chatLoading) return;
        const newMessages = [...chatMessages, { role: "user", content: message }];
        setChatMessages(newMessages);
        setChatInput("");
        setChatLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setChatMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setChatMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now." }]);
        } finally {
            setChatLoading(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <div className="flex-1 flex overflow-hidden">
                <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 p-6 space-y-8">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Navigation</p>
                        <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                            <LayoutDashboard size={20} />Overview
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Briefcase size={20} />Applications</button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Calendar size={20} />Interviews</button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><MessageSquare size={20} />Messages</button>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Account</p>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><User size={20} />Profile</button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"><Settings size={20} />Settings</button>
                        <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-500 hover:bg-red-50 transition-all"><LogOut size={20} />Logout</button>
                    </div>
                    <div className="mt-auto p-4 bg-indigo-900 rounded-2xl text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform"><TrendingUp size={60} /></div>
                        <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">Career Growth</p>
                        <h4 className="text-sm font-bold mb-3">Upgrade to Premium</h4>
                        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all">View Plans</button>
                    </div>
                </aside>
                <main className="flex-1 bg-slate-50/50 p-6 lg:p-10 overflow-y-auto">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black text-navy-900">Good morning, {profile?.full_name?.split(' ')[0] || 'there'} 👋</h1>
                                <p className="text-slate-500 font-medium">Here's your job search overview.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-navy-900 transition-all shadow-sm"><Bell size={20} /></button>
                                <button className="bg-navy-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-navy-800 transition-all shadow-lg active:scale-95"><Plus size={18} />New App</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Briefcase size={22} /></div>
                                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span>
                                </div>
                                <p className="text-3xl font-black text-navy-900">{applications.length}</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Applications</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl"><Users size={22} /></div>
                                    <span className="text-xs font-bold text-slate-400">Target: 20</span>
                                </div>
                                <p className="text-3xl font-black text-navy-900">8</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Shortlisted</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl"><CheckCircle size={22} /></div>
                                    <span className="text-xs font-bold text-amber-600">Top 5%</span>
                                </div>
                                <p className="text-3xl font-black text-navy-900">92%</p>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Success Rate</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-black text-navy-900">Job Analysis</h3>
                                    <select className="bg-slate-50 border-none outline-none text-xs font-bold text-slate-500 p-2 rounded-lg">
                                        <option>Last 7 Days</option>
                                        <option>Last 30 Days</option>
                                    </select>
                                </div>
                                <div className="h-56 w-full">
                                    <svg viewBox="0 0 700 280" className="w-full h-full">
                                        <line x1="0" y1="240" x2="700" y2="240" stroke="#f1f5f9" strokeWidth="2" />
                                        <line x1="0" y1="160" x2="700" y2="160" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
                                        <line x1="0" y1="80" x2="700" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.15" />
                                                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d={`M 50,${240 - (chartData[0].apps / maxApps * 200)} ${chartData.slice(1).map((d, i) => `L ${(i + 1) * 100 + 50},${240 - (d.apps / maxApps * 200)}`).join(' ')}`} fill="none" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d={`M 50,240 ${chartData.map((d, i) => `L ${i * 100 + 50},${240 - (d.apps / maxApps * 200)}`).join(' ')} L 650,240 Z`} fill="url(#chartGradient)" />
                                        {chartData.map((d, i) => (
                                            <circle key={i} cx={i * 100 + 50} cy={240 - (d.apps / maxApps * 200)} r="5" fill="white" stroke="#6366F1" strokeWidth="3" />
                                        ))}
                                    </svg>
                                    <div className="flex justify-between px-8 mt-2">
                                        {chartData.map(d => <span key={d.day} className="text-[10px] font-bold text-slate-400 uppercase">{d.day}</span>)}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                                <h3 className="text-xl font-black text-navy-900 mb-6">Application Requests</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Sheryl Wang', company: 'Nexus AI', date: '2h ago', score: 94 },
                                        { name: 'John Doe', company: 'Global Tech', date: 'Yesterday', score: 88 },
                                        { name: 'Maria Garcia', company: 'FinTech Hub', date: '3 days ago', score: 76 }
                                    ].map((req, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all">
                                            <div className="flex items-center gap-3">
                                                <InitialsAvatar name={req.name} color={i === 0 ? "bg-amber-100 text-amber-600" : "bg-indigo-100 text-indigo-600"} />
                                                <div>
                                                    <p className="font-black text-navy-900 text-sm">{req.name}</p>
                                                    <p className="text-xs text-slate-400 font-bold">{req.company} · {req.date}</p>
                                                </div>
                                            </div>
                                            <div className="relative w-12 h-12 flex items-center justify-center">
                                                <svg className="w-full h-full -rotate-90">
                                                    <circle cx="24" cy="24" r="20" stroke="#f1f5f9" strokeWidth="3" fill="transparent" />
                                                    <circle cx="24" cy="24" r="20" stroke="#6366F1" strokeWidth="3" fill="transparent" strokeDasharray="126" strokeDashoffset={126 - (req.score / 100 * 126)} />
                                                </svg>
                                                <span className="absolute text-[10px] font-black text-navy-900">{req.score}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-black text-navy-900 mb-6">Upcoming Interviews</h3>
                            <div className="grid grid-cols-7 gap-3">
                                {[
                                    { day: 'Mon', date: '12', active: false },
                                    { day: 'Tue', date: '13', active: true, title: 'Tech Interview', company: 'Google', time: '10:00 AM', avatar: 'GT' },
                                    { day: 'Wed', date: '14', active: false },
                                    { day: 'Thu', date: '15', active: true, title: 'HR Screen', company: 'Meta', time: '2:30 PM', avatar: 'MS' },
                                    { day: 'Fri', date: '16', active: false },
                                    { day: 'Sat', date: '17', active: false },
                                    { day: 'Sun', date: '18', active: false },
                                ].map((item, i) => (
                                    <div key={i} className={`p-4 rounded-2xl border transition-all ${item.active ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/20' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                        <p className={`text-[10px] font-black uppercase tracking-wider ${item.active ? 'text-indigo-200' : 'text-slate-400'}`}>{item.day}</p>
                                        <p className="text-xl font-black mb-2">{item.date}</p>
                                        {item.active && (
                                            <div className="mt-2 space-y-2">
                                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[9px] font-black">{item.avatar}</div>
                                                <p className="text-[10px] font-black">{item.title}</p>
                                                <p className="text-[10px] text-indigo-200">{item.time}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <aside className="hidden xl:flex flex-col w-80 bg-white border-l border-slate-100 p-8 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Assistant</span>
                        </div>
                        <h2 className="text-xl font-black text-navy-900">Good morning, <span className="text-indigo-600">{profile?.full_name?.split(' ')[0] || 'there'}</span></h2>
                        <p className="text-sm text-slate-400 mt-1">Ready to optimize your career?</p>
                    </div>
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-sm font-medium text-slate-600 italic">"I've analyzed 200+ remote job listings. Your match score for Full Stack Dev is at an all-time high."</p>
                    </div>
                    <div className="flex-1 space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suggested</p>
                        {[
                            "Prepare for an upcoming interview",
                            "Connect with recruiters directly",
                            "Set a reminder for your next interview"
                        ].map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => handleChat(prompt)}
                                className="w-full text-left p-4 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all flex items-center justify-between group"
                            >
                                {prompt}
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 px-1 min-h-[150px] max-h-[300px] scrollbar-hide">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`p-4 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                                ? 'bg-indigo-600 text-white ml-4'
                                : 'bg-slate-50 text-slate-600 border border-slate-100 mr-4'
                                }`}>
                                {msg.content}
                            </div>
                        ))}
                        {chatLoading && (
                            <div className="bg-slate-50 text-slate-400 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest animate-pulse mr-4">
                                Analyzing...
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <textarea placeholder="Ask your AI recruiter..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleChat(chatInput))} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none" rows={3} />
                        <button onClick={() => handleChat(chatInput)} className="absolute bottom-4 right-4 p-2 bg-navy-900 text-white rounded-xl hover:bg-indigo-600 transition-all active:scale-90"><Send size={16} /></button>
                    </div>
                    <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-tight">Powered by Anthropic</p>
                </aside>
            </div>
            <Footer />
        </div>
    );
}
