'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user, setUser] = useState<any>(null);
    const [userType, setUserType] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserType(session.user.id);
            }
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchUserType(session.user.id);
            } else {
                setUserType(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    async function fetchUserType(userId: string) {
        const { data } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', userId)
            .single();
        setUserType(data?.user_type ?? null);
    }

    async function handleSignOut() {
        await supabase.auth.signOut();
        setMobileMenuOpen(false);
        router.push('/');
    }

    return (
        <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-navy-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo Block */}
                    <Link href="/" className="text-2xl font-bold text-navy-900 flex items-center gap-3 group shrink-0">
                        <div className="w-12 h-12 bg-primary-indigo rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-indigo/20 group-hover:rotate-6 transition-all duration-300">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="tracking-tight font-extrabold flex items-center">
                            RemoteJobs<span className="text-primary-indigo italic">.ph</span>
                        </span>
                    </Link>

                    {/* Navigation Block (All right-aligned) */}
                    <div className="hidden md:flex items-center gap-10 ml-auto">
                        <Link href="/jobs" className="text-navy-600 hover:text-primary-indigo transition-colors font-bold text-xs tracking-wide uppercase">
                            How it Works
                        </Link>
                        <Link href="/pricing" className="text-navy-600 hover:text-primary-indigo transition-colors font-bold text-xs tracking-wide uppercase">
                            Pricing
                        </Link>
                        <Link href="/results" className="text-navy-600 hover:text-primary-indigo transition-colors font-bold text-xs tracking-wide uppercase">
                            Real Results
                        </Link>

                        {/* For Companies Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-navy-600 hover:text-primary-indigo transition-colors font-bold text-xs tracking-wide uppercase cursor-pointer">
                                For Companies
                                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white border border-navy-100 rounded-2xl p-3 shadow-2xl min-w-[200px]">
                                    <Link href="/employer/post-job" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-primary-indigo transition-all font-bold text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-primary-indigo/10 flex items-center justify-center text-primary-indigo">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        Post a Job
                                    </Link>
                                    <Link href="/employer/search-resumes" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-primary-indigo transition-all font-bold text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-primary-indigo/10 flex items-center justify-center text-primary-indigo">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        Hire Specialists
                                    </Link>
                                    <Link href="/employer/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-primary-indigo transition-all font-bold text-xs border-t border-navy-50 mt-1 pt-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary-indigo/10 flex items-center justify-center text-primary-indigo">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                        </div>
                                        Company Portal
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* For Jobseekers Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1.5 text-navy-600 hover:text-accent-cyber transition-colors font-bold text-xs tracking-wide uppercase cursor-pointer">
                                For Jobseekers
                                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                                <div className="bg-white border border-navy-100 rounded-2xl p-3 shadow-2xl min-w-[200px]">
                                    <Link href="/jobs" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-accent-cyber transition-all font-bold text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-accent-cyber/10 flex items-center justify-center text-accent-cyber">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        Browse Roles
                                    </Link>
                                    <Link href="/register?type=jobseeker" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-accent-cyber transition-all font-bold text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-accent-cyber/10 flex items-center justify-center text-accent-cyber">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        Post Resume
                                    </Link>
                                    <Link href="/jobseeker/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-navy-50 text-navy-600 hover:text-accent-cyber transition-all font-bold text-xs border-t border-navy-50 mt-1 pt-4">
                                        <div className="w-8 h-8 rounded-lg bg-accent-cyber/10 flex items-center justify-center text-accent-cyber">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {user ? (
                            <div className="flex items-center gap-10">
                                <Link
                                    href={userType === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'}
                                    className={`text-navy-600 font-bold text-xs tracking-wide uppercase transition-colors ${userType === 'employer' ? 'hover:text-primary-indigo' : 'hover:text-accent-cyber'
                                        }`}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="text-navy-600 hover:text-red-500 transition-colors font-bold text-xs tracking-wide uppercase cursor-pointer"
                                >
                                    Sign Out
                                </button>
                                <Link
                                    href="/profile"
                                    className={`w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center hover:ring-4 transition-all shadow-inner border border-navy-100 ${userType === 'employer' ? 'hover:ring-primary-indigo/10' : 'hover:ring-accent-cyber/10'
                                        }`}
                                >
                                    <span className="text-navy-900 font-extrabold text-[10px]">{user.email?.substring(0, 2).toUpperCase()}</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-10">
                                <Link href="/login" className="text-navy-600 hover:text-primary-indigo transition-colors font-bold text-xs tracking-wide uppercase">
                                    Log In
                                </Link>
                                <Link href="/register" className="btn-cyan !py-2.5 !px-8 shadow-lg !text-xs">
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-3 rounded-xl text-navy-600 hover:bg-navy-50 transition-colors"
                    >
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex flex-col gap-5">
                            <Link
                                href="/jobs"
                                className="text-text-muted hover:text-white transition-colors font-bold px-2 py-3 text-xl"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                How it Works
                            </Link>
                            <Link
                                href="/pricing"
                                className="text-text-muted hover:text-white transition-colors font-bold px-2 py-3 text-xl"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/results"
                                className="text-text-muted hover:text-white transition-colors font-bold px-2 py-3 text-xl"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Real Results
                            </Link>

                            <div className="h-px bg-navy-100 my-2"></div>

                            {/* Mobile For Companies */}
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-300 px-2">For Companies</p>
                                <div className="flex flex-col gap-2">
                                    <Link href="/employer/post-job" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Post a Job</Link>
                                    <Link href="/employer/search-resumes" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Hire Specialists</Link>
                                    <Link href="/employer/dashboard" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Company Portal</Link>
                                </div>
                            </div>

                            <div className="h-px bg-navy-100 my-2"></div>

                            {/* Mobile For Jobseekers */}
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-cyber px-2">For Jobseekers</p>
                                <div className="flex flex-col gap-2">
                                    <Link href="/jobs" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Browse Roles</Link>
                                    <Link href="/register?type=jobseeker" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Post Resume</Link>
                                    <Link href="/jobseeker/dashboard" className="text-navy-900 font-bold px-2 py-2 text-lg" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                                </div>
                            </div>

                            <div className="h-px bg-navy-100 my-2"></div>
                            {user ? (
                                <>
                                    <Link
                                        href={userType === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard'}
                                        className="text-text-muted hover:text-navy-900 transition-colors font-bold px-2 py-3 text-xl"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-text-muted hover:text-navy-900 transition-colors font-bold text-left px-2 py-3 text-xl"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-text-muted hover:text-navy-900 transition-colors font-bold px-2 py-3 text-xl"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="btn-primary w-full text-center mt-4 !py-4 text-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
