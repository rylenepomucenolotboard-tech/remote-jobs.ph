'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import GlobalTalentMap from '@/components/GlobalTalentMap';
import ResumeSpotlight from '@/components/ResumeSpotlight';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import StatsTicker from '@/components/StatsTicker';
import TestimonialsTrustBar from '@/components/TestimonialsTrustBar';
import { COPY } from '@/content/copy';
import { STATS } from '@/content/stats';
import { IMAGES } from '@/content/images';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'talent'>('jobs');

  return (
    <div className="min-h-screen flex flex-col bg-background-deep transition-colors duration-500">
      <Header />

      <main className="flex-1">
        {/* New Split Hero Section */}
        <section className={`relative pt-12 pb-0 md:pt-20 overflow-hidden transition-colors duration-700 ${activeTab === 'jobs' ? 'bg-white' : 'bg-[#0A0C10]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Column: Text & Search */}
              <div className="flex-1 text-center lg:text-left pt-10 pb-20 lg:pb-32">

                <h1 className={`text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 ${activeTab === 'jobs' ? 'text-navy-900' : 'text-white'}`}>
                  Philippines’ #1 <br className="xs:hidden" /> Marketplace for <br className="lg:hidden" /> <span className="text-primary italic">Remote Work</span>
                </h1>

                <p className={`text-lg mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 ${activeTab === 'jobs' ? 'text-navy-600' : 'text-navy-300'}`}>
                  {activeTab === 'jobs' ? `Join ${STATS.activeResumes} active professionals who updated today and get discovered by international tech leaders.` : `Instant access to ${STATS.activeResumes} active resumes trusted by ${STATS.globalClients} global clients. Filter by tech stack, experience, and salary.`}
                </p>

                {/* Tabbed Search Module */}
                <div className="mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 max-w-2xl mx-auto lg:mx-0">
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setActiveTab('jobs')}
                      className={`px-6 py-2 rounded-t-xl font-black text-sm uppercase tracking-wider transition-all ${activeTab === 'jobs' ? 'bg-primary-indigo text-white' : 'bg-navy-50 text-navy-400 hover:bg-navy-100'}`}
                    >
                      Find Remote Jobs
                    </button>
                    <button
                      onClick={() => setActiveTab('talent')}
                      className={`px-6 py-2 rounded-t-xl font-black text-sm uppercase tracking-wider transition-all ${activeTab === 'talent' ? 'bg-accent-cyber text-navy-900' : 'bg-navy-50 text-navy-400 hover:bg-navy-100'}`}
                    >
                      Search Candidates
                    </button>
                  </div>

                  <div className={`p-2 rounded-3xl rounded-tl-none border-2 shadow-xl transition-all duration-300 ${activeTab === 'jobs' ? 'bg-white border-navy-100' : 'bg-navy-900 border-white/10'}`}>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {activeTab === 'jobs' ? (
                        <>
                          <input
                            type="text"
                            placeholder="Keywords (eg. React, DevOps)"
                            className="flex-1 px-6 py-4 bg-transparent outline-none text-navy-900 font-bold placeholder:text-navy-300"
                          />
                          <select className="px-6 py-4 bg-transparent outline-none text-navy-900 font-bold appearance-none border-l border-navy-100 sm:w-48">
                            <option>All Categories</option>
                            <option>Development</option>
                            <option>Design</option>
                            <option>Marketing</option>
                          </select>
                          <Link
                            href="/jobs"
                            className="bg-primary-indigo text-white px-8 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all text-center"
                          >
                            Browse Roles
                          </Link>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Skill (eg. Python, AWS)"
                            className="flex-1 px-6 py-4 bg-transparent outline-none text-white font-bold placeholder:text-navy-500"
                          />
                          <input
                            type="text"
                            placeholder="Sal: $3000/mo"
                            className="px-6 py-4 bg-transparent outline-none text-white font-bold placeholder:text-navy-500 border-l border-white/10 sm:w-48"
                          />
                          <Link
                            href="/employer/search-resumes"
                            className="bg-accent-cyber text-navy-900 px-8 py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-95 transition-all text-center"
                          >
                            Search Talent
                          </Link>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                    <p className={`font-bold text-sm italic ${activeTab === 'jobs' ? 'text-navy-400' : 'text-navy-500'}`}>{COPY.hero.hiringTalent}</p>
                    <Link
                      href="/employer/post-job"
                      className="text-primary-indigo font-black text-sm uppercase tracking-wider hover:underline"
                    >
                      {COPY.hero.postJobCta}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Image with Inspo container */}
              <div className="flex-1 relative w-full lg:w-auto mt-10 lg:mt-0 animate-in fade-in slide-in-from-right-10 duration-1000">
                <div className={`relative z-10 rounded-[2rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] transition-colors duration-700 ${activeTab === 'jobs' ? 'border-white' : 'border-navy-800'}`}>
                  <Image
                    src="/hero-filipino.png"
                    alt="Elite Filipino Remote Talent"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Floating badge from inspo */}
                  <div className={`absolute -bottom-6 -left-6 p-4 rounded-2xl shadow-xl hidden md:block border transition-colors duration-700 ${activeTab === 'jobs' ? 'bg-white border-navy-50' : 'bg-navy-900 border-white/5'}`}>
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
                <h2 className="text-4xl font-black text-white mb-6">{COPY.dualGateway.employer.title}</h2>
                <p className="text-lg text-text-muted font-medium mb-10 leading-relaxed">
                  Built from {STATS.activeResumes} active resumes and trusted by {STATS.globalClients} global clients across the Philippine tech ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/employer/search-resumes" className="btn-indigo">
                    Search Candidates Free
                  </Link>
                  <Link href="/employer/post-job" className="btn-outline-white">
                    Post a Job – $199
                  </Link>
                </div>
              </div>

              {/* Jobseeker Card */}
              <div className="group bg-background-slate border border-white/5 p-10 rounded-3xl transition-all duration-500 hover:border-accent-cyber/50 hover:shadow-[0_0_50px_rgba(202,244,113,0.1)]">
                <h2 className="text-4xl font-black text-white mb-6">{COPY.dualGateway.jobseeker.title}</h2>
                <p className="text-lg text-text-muted font-medium mb-10 leading-relaxed">
                  Join {STATS.activeResumes} active professionals and get discovered by international tech leaders. No more hunting—let work find you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register?type=jobseeker" className="btn-cyan">
                    Get Discovered
                  </Link>
                  <Link href="/jobs" className="btn-outline-white">
                    Browse Roles
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
        <TestimonialsTrustBar />
        <Testimonials />



        {/* Pricing Tables */}
        <section className="py-32 bg-navy-950" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black text-white mb-6">Simple, Transparent Pricing</h2>
              <div className="bg-primary-indigo/10 border border-primary-indigo/20 rounded-2xl p-4 max-w-2xl mx-auto mb-8">
                <p className="text-primary-indigo font-bold italic">
                  "{COPY.pricing.agencyComparison}"
                </p>
              </div>
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
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-tight tracking-tighter italic">{COPY.cta.title}</h2>
                <p className="text-xl md:text-2xl text-white/90 mb-16 font-medium leading-relaxed">{COPY.cta.description}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                  <Link href="/employer/post-job" className="bg-white text-navy-900 !px-16 !py-6 text-xl rounded-2xl font-black hover:scale-105 transition-all shadow-xl">{COPY.hero.postJobCta}</Link>
                  <Link href="/jobs" className="bg-navy-950/20 text-white border-2 border-white/30 !px-16 !py-6 text-xl rounded-2xl font-black hover:bg-white/10 transition-all">Browse Roles</Link>
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
