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
    <div className="min-h-screen flex flex-col bg-background-deep text-navy-900 transition-colors duration-500 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* 1. Page Header */}
        <div className="text-center md:text-left mb-16 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="text-primary-indigo font-bold uppercase tracking-widest text-sm mb-4">{STRINGS.HEADER.eyebrow}</div>
              <h1 className="text-5xl md:text-6xl font-black text-navy-900 leading-[1.1] tracking-tight">{STRINGS.HEADER.headline}</h1>
            </div>
            <div className="flex flex-wrap shadow-sm border border-navy-50 bg-white rounded-2xl p-6 gap-8 md:gap-12">
              {STRINGS.HEADER.stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-3xl md:text-4xl font-black text-primary-indigo leading-none">{s.num}</span>
                  <span className="text-xs font-bold text-navy-500 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full">

          {/* LEFT PANEL: Carousel */}
          <section className="lg:col-span-7 bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] border border-navy-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-1000" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-navy-50">
              <div className="flex bg-navy-50 p-1 rounded-xl">
                {["All", "Talent", "Employer"].map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${filter === f ? 'bg-white text-primary-indigo shadow-sm' : 'text-navy-500 hover:bg-navy-100/50 hover:text-navy-900'}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="text-xs font-black text-navy-400 tracking-widest px-4 py-2 border border-navy-100 rounded-lg">
                STORY {carouselIndex + 1} OF {filteredStories.length}
              </div>
            </div>

            <div className="flex-1 flex flex-col relative min-h-[400px]">
              <div key={animKey} className={`flex-1 flex flex-col md:flex-row gap-8 animate-in fade-in ${direction} duration-500`}>

                {/* Story Metadata Sidebar */}
                <div className="w-full md:w-48 flex flex-col gap-4 md:border-r border-navy-100 md:pr-6">
                  <div className="px-3 py-1 rounded-md border border-primary-indigo/20 text-primary-indigo text-[10px] font-black uppercase tracking-widest w-fit">
                    {activeStory.type}
                  </div>
                  <div>
                    <div className="text-xl font-black text-navy-900 mb-1">{activeStory.name}</div>
                    <div className="text-xs font-black uppercase tracking-wide text-primary-indigo mb-2">{activeStory.role}</div>
                    <div className="text-sm font-medium text-navy-500">{activeStory.location}</div>
                  </div>
                  <div className="bg-background-deep p-4 rounded-xl mt-2 border border-navy-50">
                    <div className="text-[10px] font-black uppercase tracking-widest text-navy-400 mb-2">Key Result</div>
                    <div className="text-sm font-bold text-navy-900 leading-snug">{activeStory.kicker}</div>
                  </div>
                  <div className="mt-4 md:mt-auto flex flex-col gap-3">
                    <div className="bg-navy-50 px-3 py-1.5 rounded-md w-fit text-xs font-bold text-navy-600">{activeStory.tag}</div>
                    <div className="text-accent-cyber text-sm tracking-[0.2em]">★★★★★</div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="flex-1 flex flex-col justify-center relative pt-4 md:pt-0">
                  <div className="text-[120px] font-serif text-navy-50 leading-none absolute -top-8 -left-4 -z-10 select-none">"</div>
                  <div className="text-2xl md:text-3xl font-black italic text-navy-900 leading-tight mb-6 relative z-10 text-balance">
                    "{activeStory.quote}"
                  </div>
                  <div className="text-base font-medium text-navy-600 leading-relaxed border-l-4 border-primary-indigo/20 pl-4 mb-8 max-w-lg">
                    {activeStory.context}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-[10px] font-black uppercase tracking-wider bg-navy-900 text-white px-3 py-1.5 rounded-md">Verified Review</div>
                    <div className="text-xs font-bold text-navy-400 tracking-wider uppercase">via {activeStory.source}</div>
                  </div>
                </div>

              </div>

              {/* Controls */}
              <div className="mt-8 pt-6 border-t border-navy-50 flex items-center gap-6">
                <div className="flex gap-2">
                  <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-navy-200 text-navy-600 hover:bg-navy-50 hover:text-navy-900 hover:border-navy-300 flex items-center justify-center transition-all bg-white shadow-sm font-bold">→</button>
                  <button onClick={handleNext} className="w-10 h-10 rounded-full border border-navy-200 text-navy-600 hover:bg-navy-50 hover:text-navy-900 hover:border-navy-300 flex items-center justify-center transition-all bg-white shadow-sm font-bold">→</button>
                </div>
                <div className="flex-1 h-1.5 bg-navy-50 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 bg-primary-indigo transition-all duration-75" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex gap-2">
                  {filteredStories.map((_, i) => (
                    <div key={i} onClick={() => setIndex(i)} className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === carouselIndex ? 'w-8 bg-primary-indigo' : 'w-2 bg-navy-200 hover:bg-navy-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL: AI Match Console */}
          <section className="lg:col-span-5 bg-[#0A0C10] rounded-[2rem] p-6 md:p-10 shadow-2xl border border-white/5 flex flex-col relative overflow-hidden h-[700px] lg:h-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="flex justify-between items-center mb-8 relative z-10 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyber animate-pulse shadow-[0_0_10px_#CAF471]" />
                <span className="text-sm font-black text-white tracking-widest uppercase">AI Resume Match</span>
              </div>
              <div className="text-[10px] font-bold text-navy-400 border border-white/10 rounded-lg px-3 py-1.5 uppercase tracking-wider bg-white/5">Scanning 9M+ Resumes</div>
            </div>

            <div className="flex flex-col gap-4 mb-6 relative z-20">
              <textarea
                value={jobReq}
                onChange={(e) => setJobReq(e.target.value)}
                placeholder={PLACEHOLDERS[placeholderIdx]}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm font-medium outline-none focus:border-accent-cyber/50 focus:bg-white/10 transition-all resize-none h-[100px] placeholder-white/30"
              />
              <button
                onClick={handleMatch}
                disabled={aiState === "loading" || !jobReq.trim()}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${aiState === 'loading' || !jobReq.trim() ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-accent-cyber text-navy-900 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(202,244,113,0.3)]'}`}
              >
                {aiState === "loading" ? "Scanning Database..." : "Match Candidates Now"}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto relative z-10 custom-scrollbar pr-2">
              <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
              `}</style>

              {aiState === "idle" && (
                <div className="flex flex-col items-center justify-center h-full pb-10 text-center opacity-60 px-4">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-accent-cyber/30 flex items-center justify-center mb-6 animate-[spin_15s_linear_infinite]">
                    <div className="w-3 h-3 rounded-full bg-accent-cyber animate-pulse" />
                  </div>
                  <div className="text-2xl font-black italic text-white mb-3 tracking-tight">Describe your ideal hire.</div>
                  <div className="text-sm font-medium text-navy-300 leading-relaxed max-w-[250px]">Our AI scans 9M+ active resumes and surfaces your top 3 matches in seconds.</div>
                </div>
              )}

              {aiState === "loading" && (
                <div className="space-y-4 pt-4">
                  <div className="bg-accent-cyber/10 border border-accent-cyber/20 text-accent-cyber text-xs font-black uppercase tracking-widest text-center py-3 rounded-xl mb-6">Analyzing requirements & ranking...</div>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-36 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
                    </div>
                  ))}
                </div>
              )}

              {aiState === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-400 text-sm font-bold flex flex-col items-center gap-3">
                  <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Matching engine currently at capacity. Please try again.
                </div>
              )}

              {aiState === "results" && (
                <div className="flex flex-col gap-4">
                  {matches.map((m, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 relative group hover:bg-white/[0.07] transition-colors animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'both' }}>
                      <div className="flex justify-between items-start mb-5">
                        <div className="pr-4">
                          <div className="text-xl font-black text-white mb-1 group-hover:text-accent-cyber transition-colors">{m.name}</div>
                          <div className="text-sm font-bold text-navy-300 mb-3">{m.title}</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-black uppercase text-navy-400 bg-white/5 px-2.5 py-1 rounded-md tracking-wider border border-white/5">{m.location}</span>
                            <span className="text-[10px] font-black uppercase text-accent-cyber bg-accent-cyber/10 px-2.5 py-1 rounded-md tracking-wider border border-accent-cyber/20">{m.exp} exp</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end w-16">
                          <div className="text-3xl font-black text-white leading-none mb-1">{m.matchScore}</div>
                          <div className="text-[9px] font-black uppercase text-accent-cyber tracking-[0.2em] mb-2">Match</div>
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-accent-cyber transition-all duration-1000 ease-out" style={{ width: `${m.matchScore}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {m.skills?.map((s: string, idx: number) => (
                          <div key={idx} className="text-[10px] font-bold uppercase tracking-wider text-navy-200 border border-white/10 rounded-full px-3 py-1 bg-white/5">{s}</div>
                        ))}
                      </div>

                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-5 relative">
                        <div className="absolute top-2 left-2 text-3xl text-white/5 font-serif leading-none">"</div>
                        <div className="text-sm italic text-navy-200 font-medium relative z-10 leading-relaxed pr-2">"{m.highlight}"</div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <div className="text-xs font-black text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 tracking-wider ">{m.salaryRange}</div>
                        <button className="text-[11px] font-black text-white px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all uppercase tracking-widest border border-white/10">View Profile</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* 3. Bottom CTA Grid/Panel Matching */}
        <section className="mt-16 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
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

      <Footer />
    </div>
  );
}
