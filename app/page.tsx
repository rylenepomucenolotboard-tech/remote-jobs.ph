import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import GlobalTalentMap from '@/components/GlobalTalentMap';
import ResumeSpotlight from '@/components/ResumeSpotlight';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import StatsTicker from '@/components/StatsTicker';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <Header />

      <main className="flex-1">
        {/* New Split Hero Section */}
        <section className="relative pt-12 pb-0 md:pt-20 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Column: Text & Search */}
              <div className="flex-1 text-center lg:text-left pt-10 pb-20 lg:pb-32">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-navy-900 rounded-full mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 border-2 border-accent-cyber/30 shadow-[0_20px_40px_-15px_rgba(0,255,148,0.2)]">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyber opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-cyber"></span>
                  </span>
                  <span className="text-accent-cyber font-black text-xs uppercase tracking-[0.25em]">9 Million++ Resumes</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-navy-900 mb-6 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                  Philippines’ #1 Marketplace for <span className="text-primary italic">Remote Work</span>
                </h1>

                <p className="text-lg text-navy-600 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  Infinite Opportunities. Connecting Global Ambition with Filipino Excellence.
                </p>

                {/* Selection Buttons - Simplified */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  <Link
                    href="/employer/post-job"
                    className="flex-1 group bg-white text-navy-900 py-6 px-8 rounded-2xl border-2 border-navy-100 hover:border-primary-indigo hover:text-primary-indigo hover:-translate-y-1 transition-all duration-300 text-center shadow-sm hover:shadow-md"
                  >
                    <h3 className="text-xl font-black">Looking for talent?</h3>
                  </Link>

                  <Link
                    href="/jobs"
                    className="flex-1 group bg-white text-navy-900 py-6 px-8 rounded-2xl border-2 border-navy-100 hover:border-accent-cyber hover:text-accent-cyber hover:-translate-y-1 transition-all duration-300 text-center shadow-sm hover:shadow-md"
                  >
                    <h3 className="text-xl font-black">Looking for work?</h3>
                  </Link>
                </div>
              </div>

              {/* Right Column: Image with Inspo container */}
              <div className="flex-1 relative w-full lg:w-auto mt-10 lg:mt-0 animate-in fade-in slide-in-from-right-10 duration-1000">
                <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white">
                  <Image
                    src="/hero-filipino.png"
                    alt="Elite Filipino Remote Talent"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Floating badge from inspo */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl hidden md:block border border-navy-50">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Decorative blob behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Dual-Entry Gateway (Decision Matrix) */}
        <section className="py-20 relative z-30 bg-[#0A0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Employer Card */}
              <div className="group bg-background-slate border border-white/5 p-10 rounded-3xl transition-all duration-500 hover:border-primary-indigo/50 hover:shadow-glow-indigo">
                <h2 className="text-4xl font-black text-white mb-6">Source the Top 1%.</h2>
                <p className="text-lg text-text-muted font-medium mb-10 leading-relaxed">
                  Instant access to the world’s largest pool of 9 Million++ Verified Resumes. Filter by tech stack, experience, and salary.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/employer/search-resumes" className="btn-indigo">
                    Search Resumes Free
                  </Link>
                  <Link href="/employer/post-job" className="btn-outline-white">
                    Post a Job
                  </Link>
                </div>
              </div>

              {/* Jobseeker Card */}
              <div className="group bg-background-slate border border-white/5 p-10 rounded-3xl transition-all duration-500 hover:border-accent-cyber/30 hover:shadow-glow-cyan">
                <h2 className="text-4xl font-black text-white mb-6">Go Global from Home.</h2>
                <p className="text-lg text-text-muted font-medium mb-10 leading-relaxed">
                  Join 9 Million++ peers and get discovered by international tech leaders. No more hunting—let the work find you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register?type=jobseeker" className="btn-cyan">
                    Upload Resume
                  </Link>
                  <Link href="/jobs" className="btn-outline-white">
                    Browse 5k+ Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: The Path to Success (How It Works) */}
        <HowItWorks />


        {/* Section 2: Global Talent Map */}
        <GlobalTalentMap />

        {/* Section 3: The Resume Spotlight */}
        <ResumeSpotlight />

        {/* Section 5: Client & Talent Testimonials */}
        <Testimonials />



        {/* Pricing Tables */}
        <section className="py-32 bg-navy-950" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-white mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-text-muted font-medium max-w-2xl mx-auto">Choose the plan that fits your hiring needs. No hidden fees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Starter', price: '$199', features: ['1 Job Post', '30 Days Visibility', 'Social Media Blast'], spotlight: false },
                { name: 'Pro', price: '$499', features: ['3 Job Posts', '60 Days Visibility', 'Featured Badge', 'Resume Database Access', 'Priority Support'], spotlight: true },
                { name: 'Enterprise', price: 'Custom', features: ['Unlimited Posts', 'Dedicated Account Manager', 'Custom Branding', 'API Access'], priceLabel: 'Contact Us', spotlight: false },
              ].map((tier, i) => (
                <div key={i} className={`card-slate relative flex flex-col p-10 ${tier.spotlight ? 'border-primary-indigo/50 shadow-[0px_0px_60px_#6366f133] md:scale-110 z-10' : ''}`}>
                  {tier.spotlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-indigo text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-black text-white">{tier.price}</span>
                    {tier.name !== 'Enterprise' && <span className="text-text-muted font-bold"> / post</span>}
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-text-muted font-bold">
                        <svg className="w-5 h-5 text-accent-cyber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={tier.spotlight ? 'btn-primary w-full' : 'btn-outline-white w-full'}>
                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Redesigned */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary-indigo to-accent-cyber rounded-[60px] p-16 md:p-24 relative overflow-hidden text-center shadow-[0_30px_100px_-20px_rgba(99,102,241,0.5)]">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tighter italic">Join the Elite.</h2>
                <p className="text-xl md:text-2xl text-white/90 mb-16 font-medium leading-relaxed">The premier community of remote professionals and global employers.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <Link href="/register" className="bg-white text-navy-900 !px-16 !py-6 text-xl rounded-2xl font-black hover:scale-105 transition-all shadow-xl">Get Started Now</Link>
                  <Link href="/jobs" className="bg-navy-950/20 text-white border-2 border-white/30 !px-16 !py-6 text-xl rounded-2xl font-black hover:bg-white/10 transition-all">Browse All Jobs</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 6: Animated Stats Ticker (Counting) */}
        <StatsTicker />
      </main>

      <Footer />
    </div >
  );
}
