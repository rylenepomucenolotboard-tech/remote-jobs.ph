import Link from 'next/link';
import { COPY } from '@/content/copy';

export default function Footer() {
    return (
        <footer className="bg-navy-900 text-white border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 lg:gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2 lg:col-span-2 max-w-sm">
                        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 bg-primary-indigo rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-indigo/20 group-hover:rotate-6 transition-all">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="tracking-tight font-extrabold flex items-center">
                                RemoteJobs<span className="text-accent-cyber italic">.ph</span>
                            </span>
                        </Link>
                        <p className="text-text-muted text-lg leading-relaxed mb-8">
                            The premier ecosystem connecting global tech leaders with elite Filipino remote talent. Built for the future of distributed work.
                        </p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent-cyber mb-10 glow-cyan">
                            Platform
                        </h4>
                        <ul className="space-y-5 text-text-muted font-medium">
                            <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                            <li><Link href="/results" className="hover:text-white transition-colors">Real Results</Link></li>
                        </ul>
                    </div>

                    {/* For Talent */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary-indigo mb-10">
                            For Talent
                        </h4>
                        <ul className="space-y-5 text-text-muted font-medium">
                            <li><Link href="/jobs" className="hover:text-white transition-colors">Browse Roles</Link></li>
                            <li><Link href="/register?type=jobseeker" className="hover:text-white transition-colors">Post Resume</Link></li>
                            <li><Link href="/jobseeker/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* For Companies */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent-cyber mb-10">
                            For Companies
                        </h4>
                        <ul className="space-y-5 text-text-muted font-medium">
                            <li><Link href="/employer/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
                            <li><Link href="/employer/search-resumes" className="hover:text-white transition-colors">Hire Specialists</Link></li>
                            <li><Link href="/employer/dashboard" className="hover:text-white transition-colors">{COPY.navigation.employerDashboard}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/20 text-sm font-medium">
                        &copy; {new Date().getFullYear()} RemoteJobs.ph. Designed for the Future.
                    </p>
                    <div className="flex gap-10 text-sm font-bold text-white/20">
                        <Link href="/privacy" className="hover:text-white transition-colors">Security</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Legal</Link>
                        <a href="mailto:contact@remotejobs.ph" className="hover:text-white transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
