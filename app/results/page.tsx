"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const STRINGS = {
  HEADER: {
    eyebrow: "VOICES OF GROWTH & SUCCESS",
    headline: "The elite talent & visionaries driving global remote work.",
    stats: [
      { num: "9M+", label: "Resumes" },
      { num: "15k+", label: "Roles Filled" },
      { num: "1,182+", label: "Clients" },
      { num: "12 Days", label: "Avg. Hire" },
    ],
  },
  CTA: {
    headline: '"Your story is next."',
    sub: "1,182+ clients · 15,000+ roles filled · 9M+ active resumes · No agency fees",
    btn1: "Post a Job",
    btn2: "Find Remote Work",
  },
};

const STORIES = [
  {
    type: "Talent",
    name: "Dominic R.",
    role: "Senior Helpdesk Engineer",
    location: "Manila to US Remote",
    kicker: "13 yrs abroad — back home",
    quote: "Now I have both — my career and my family.",
    context: "13 years in Singapore. One remote role changed everything.",
    source: "Verified Contractor",
    tag: "IT / Cybersecurity",
  },
  {
    type: "Talent",
    name: "Mycah A.",
    role: "Program Administrator",
    location: "Cebu to AU Remote",
    kicker: "4-hr commute — eliminated",
    quote: "No time wasted traveling means time for the life I actually want.",
    context: "Four hours of daily commuting — gone. Work-life balance restored.",
    source: "Verified Contractor · LinkedIn",
    tag: "Program Admin",
  },
  {
    type: "Talent",
    name: "Marco V.",
    role: "E-Learning Developer",
    location: "Davao to UK Remote",
    kicker: "Local salary — global rate",
    quote: "I've learned more here than in all my previous jobs combined.",
    context: "Fast-paced UK client. Better pay. Still home in Davao.",
    source: "Indeed · Verified Review",
    tag: "EdTech",
  },
  {
    type: "Employer",
    name: "Ops Director",
    role: "Manufacturing and Engineering Firm",
    location: "Australia",
    kicker: "Scaled during labour shortage",
    quote: "RemoteJobs.ph let us scale when the local market couldn't deliver.",
    context: "Tight market. Multiple roles filled fast. Costs in check.",
    source: "Verified Client",
    tag: "Scale",
  },
  {
    type: "Employer",
    name: "Stuart W.",
    role: "Business Owner, SUPAWOOD",
    location: "Australia",
    kicker: "Long-term partnership",
    quote: "The quality of candidates and support made all the difference.",
    context: "Pre-vetted talent. Ongoing. Exactly what a real partner looks like.",
    source: "LinkedIn · Verified Client",
    tag: "Quality",
  },
  {
    type: "Employer",
    name: "Anonymous Founder",
    role: "CEO, Customer Service Business",
    location: "International",
    kicker: "Expanding to new departments",
    quote: "Efficient, professional, quality service — at an unbeatable price.",
    context: "Top-tier CS team. Fraction of local cost. Already scaling more.",
    source: "Verified Client",
    tag: "Value",
  },
];

const PLACEHOLDERS = [
  "e.g. Senior React developer, 5+ yrs, Node.js, AWS",
  "e.g. UI/UX designer, Figma, mobile apps, 4+ years",
  "e.g. Executive VA, C-suite support, CRM and calendar",
  "e.g. Digital marketing manager, SEO, paid ads, B2B",
  "e.g. Full-stack engineer, Python, Django, SaaS",
];

export default function ResultsPage() {
  const [filter, setFilter] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState("slide-in-from-right-8");
  const [animKey, setAnimKey] = useState(0);

  const filteredStories = STORIES.filter(
    (s) => filter === "All" || s.type === filter
  );

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          handleNext();
          return 0;
        }
        return p + 100 / (7000 / 50);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered, carouselIndex, filteredStories.length]);

  const handleNext = () => {
    setDirection("slide-in-from-right-8");
    setAnimKey((k) => k + 1);
    setCarouselIndex((c) => (c + 1) % filteredStories.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setDirection("slide-in-from-left-8");
    setAnimKey((k) => k + 1);
    setCarouselIndex((c) => (c - 1 + filteredStories.length) % filteredStories.length);
    setProgress(0);
  };

  const setIndex = (i: number) => {
    setDirection(i > carouselIndex ? "slide-in-from-right-8" : "slide-in-from-left-8");
    setAnimKey((k) => k + 1);
    setCarouselIndex(i);
    setProgress(0);
  };

  useEffect(() => {
    setCarouselIndex(0);
    setProgress(0);
    setAnimKey((k) => k + 1);
  }, [filter]);

  const [jobReq, setJobReq] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [aiState, setAiState] = useState<"idle" | "loading" | "results" | "error">("idle");
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const pInterval = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(pInterval);
  }, []);

  const handleMatch = async () => {
    if (!jobReq.trim()) return;
    setAiState("loading");
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "missing",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are the AI matching engine for RemoteJobs.ph — the Philippines' #1 remote work marketplace. Surface the top matched Filipino remote candidates. Respond ONLY with valid JSON — no markdown.",
          messages: [
            {
              role: "user",
              content: `Match this requirement to 3 top candidates from our 9M+ resume database: "${jobReq}"\n\nReturn EXACTLY a JSON array of 3 objects, each with:\n- name (e.g. "Maria S.")\n- title\n- location (Philippine city)\n- exp (e.g. "6 years")\n- matchScore (number 84–97)\n- skills (array of 3 strings)\n- salaryRange (USD/mo)\n- availability ("Available now" or "In 2 weeks")\n- highlight (one sharp sentence about their strongest credential)`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to match");

      const data = await response.json();
      let rawText = data.content[0].text.replace(/```json|```/gi, "").trim();
      const resultData = JSON.parse(rawText);
      setMatches(resultData);
      setAiState("results");
    } catch (e) {
      console.error(e);
      setAiState("error");
    }
  };

  const activeStory = filteredStories[carouselIndex];

  return (
    <div className="min-h-screen flex flex-col bg-background-deep text-white transition-colors duration-500 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Text & Stats */}
          <div className="flex-1 text-center md:text-left relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-accent-cyber font-bold uppercase tracking-widest text-sm mb-6">{STRINGS.HEADER.eyebrow}</div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-10 text-balance shadow-black/20 drop-shadow-xl">{STRINGS.HEADER.headline}</h1>

            <div className="flex flex-wrap shadow-2xl border border-white/5 bg-[#0f1c30] rounded-2xl p-6 md:p-8 gap-8 md:gap-12 mt-8">
              {STRINGS.HEADER.stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-black text-accent-cyber leading-none">{s.num}</span>
                  <span className="text-xs font-bold text-navy-300 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Carousel Card */}
          <div className="w-full lg:w-[600px] bg-[#0A0C10] rounded-[2rem] p-6 md:p-10 shadow-2xl border border-white/5 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000 relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                {["All", "Talent", "Employer"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-primary-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'text-navy-300 hover:bg-white/10 hover:text-white'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-black text-navy-400 tracking-widest px-3 py-1.5 border border-white/10 rounded-lg bg-white/5">
                STORY {carouselIndex + 1} OF {filteredStories.length}
              </div>
            </div>

            <div className="flex-1 flex flex-col relative min-h-[380px] z-10">
              <div key={animKey} className={`flex-1 flex flex-col gap-6 animate-in fade-in ${direction} duration-500`}>

                {/* Story Content & Quote */}
                <div className="flex-1 flex flex-col relative">
                  <div className="text-[100px] font-serif text-white/5 leading-none absolute -top-10 -left-6 -z-10 select-none">"</div>
                  <div className="text-xl md:text-2xl font-black italic text-white leading-snug mb-4 relative z-10">
                    "{activeStory.quote}"
                  </div>
                  <div className="text-sm font-medium text-navy-300 leading-relaxed border-l-2 border-accent-cyber/30 pl-4 mb-6">
                    {activeStory.context}
                  </div>
                </div>

                {/* Separator */}
                <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent my-2" />

                {/* Profile Meta & Tags */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xl font-black text-white">{activeStory.name}</div>
                      <div className="px-2.5 py-1 rounded-md border border-accent-cyber/20 bg-accent-cyber/10 text-accent-cyber text-[9px] font-black uppercase tracking-widest">
                        {activeStory.type}
                      </div>
                    </div>
                    <div className="text-xs font-black uppercase tracking-wide text-primary-indigo mb-1">{activeStory.role}</div>
                    <div className="text-[11px] font-bold text-navy-400">{activeStory.location}</div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2 text-left sm:text-right">
                    <div className="bg-white/5 px-2.5 py-1.5 rounded-md border border-white/10 text-[10px] font-bold text-navy-300 uppercase tracking-widest w-fit sm:w-auto">
                      {activeStory.tag}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-navy-500 tracking-wider uppercase">{activeStory.source}</span>
                      <div className="text-gold text-xs tracking-widest">★★★★★</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Progress Bar & Indicators */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-6">
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-all bg-white/5 backdrop-blur-sm font-bold">→</button>
                  <button onClick={handleNext} className="w-10 h-10 rounded-full border border-white/10 text-white hover:bg-white/10 flex items-center justify-center transition-all bg-white/5 backdrop-blur-sm font-bold">→</button>
                </div>
                <div className="flex-1 h-1 bg-white/5 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 bg-primary-indigo transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex gap-2">
                  {filteredStories.map((_, i) => (
                    <div key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === carouselIndex ? 'w-6 bg-primary-indigo shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'w-2 bg-white/20 hover:bg-white/40'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom CTA Grid/Panel Matching */}
        <section className="mt-20 md:mt-24 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="bg-gradient-to-br from-primary-indigo to-accent-cyber rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_30px_100px_-20px_rgba(99,102,241,0.4)]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="relative z-10 flex-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter italic">{STRINGS.CTA.headline}</h2>
              <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl">{STRINGS.CTA.sub}</p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button className="bg-white text-navy-900 px-8 py-5 text-lg rounded-2xl font-black hover:scale-105 transition-all shadow-xl uppercase tracking-wider">{STRINGS.CTA.btn1}</button>
              <button className="bg-navy-950/20 text-white border-2 border-white/30 px-8 py-5 text-lg rounded-2xl font-black hover:bg-white/10 transition-all uppercase tracking-wider">{STRINGS.CTA.btn2}</button>
            </div>
          </div>
        </section>

      </main>

      {/* Mandatory Base Brand Border */}
      <div className="border-t border-white/5" />
      <Footer />
    </div>
  );
}
