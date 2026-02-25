'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            if (data.user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('user_type')
                    .eq('id', data.user.id)
                    .single();

                router.push(profile?.user_type === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 bg-navy-50 py-20">
                <div className="max-w-md mx-auto px-4">
                    <div className="bg-white border border-navy-100 rounded-[2.5rem] p-10 shadow-xl shadow-navy-900/5">
                        <h1 className="text-4xl font-black text-navy-900 text-center mb-2 tracking-tight italic">Welcome back.</h1>
                        <p className="text-navy-400 text-center font-medium mb-10">Log in to your RemoteJobs.ph account.</p>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-black text-navy-700 uppercase tracking-widest mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-navy-100 bg-navy-50 text-navy-900 font-medium placeholder:text-navy-300 outline-none focus:border-primary-indigo transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-navy-700 uppercase tracking-widest mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-navy-100 bg-navy-50 text-navy-900 font-medium placeholder:text-navy-300 outline-none focus:border-primary-indigo transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-primary-indigo text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Logging In...' : 'Log In'}
                            </button>
                        </form>

                        <p className="text-center mt-8 text-navy-400 font-medium">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary-indigo font-black hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
