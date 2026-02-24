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
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
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
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
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
    <div className="min-h-[100dvh] flex flex-col bg-background-deep text-white transition-colors duration-500 font-sans selection:bg-accent-cyber selection:text-navy-900 overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center">

        {/* Top Typography Section - Centered */}
        <div className="text-center relative z-10 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Customer success stories
          </h1>
          <p className="text-lg md:text-xl text-navy-300 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Check out how RemoteJobs.ph helps professionals and organizations of all sizes achieve their global expansion goals.
          </p>
        </div>

        {/* Floating Circle Carousel Section (LinkedIn Inspiration) */}
        <div className="relative w-full max-w-6xl mx-auto mt-8 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-8 pb-16" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

          {/* Left Side: The Quote Content */}
          <div className="w-full md:w-5/12 relative z-20 flex flex-col justify-center animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="text-[120px] font-serif text-accent-cyber/20 leading-none absolute -top-12 -left-8 -z-10 select-none">"</div>
            <div key={`${animKey}-content`} className={`animate-in fade-in ${direction} duration-500`}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-snug mb-8 relative z-10 text-balance shadow-black/20 drop-shadow-lg">
                "{activeStory.quote}"
              </h2>

              <div className="flex flex-col gap-1">
                <div className="text-lg font-black text-white">{activeStory.name}</div>
                <div className="text-sm font-medium text-navy-300">{activeStory.role} at {activeStory.source}</div>
                <div className="text-xs font-bold text-accent-cyber tracking-widest uppercase mt-4 mb-8">
                  {activeStory.tag}
                </div>
              </div>

              {/* Minimalist Dot Indicators */}
              <div className="flex gap-2">
                {filteredStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-3 rounded-full transition-all duration-300 ${i === carouselIndex ? 'w-8 bg-accent-cyber shadow-[0_0_10px_rgba(202,244,113,0.5)]' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: The Massive Floating Circles Array */}
          <div className="w-full md:w-7/12 relative min-h-[400px] md:min-h-[500px] flex items-center justify-center lg:justify-end pr-0 lg:pr-12 pointer-events-none">

            {/* The Primary Anchor Circle */}
            <div className="absolute right-0 md:right-12 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-primary-indigo to-[#014eb3] rounded-full shadow-[0_30px_100px_-20px_rgba(1,108,249,0.5)] z-0 transition-transform duration-1000 ease-out animate-pulse-slow" />

            {/* Staggered Secondary Circles (Background Avatars) */}
            <div className="absolute right-[-20px] top-[10%] w-[120px] h-[120px] bg-accent-cyber/20 border border-accent-cyber/30 rounded-full blur-[2px] z-0 flex items-center justify-center overflow-hidden opacity-50">
              <span className="text-3xl font-black text-navy-900 opacity-20">R</span>
            </div>
            <div className="absolute right-[40%] bottom-[-10px] w-[150px] h-[150px] bg-white/5 border border-white/10 rounded-full blur-[1px] z-0 flex items-center justify-center overflow-hidden opacity-40">
              <span className="text-4xl font-black text-white opacity-20">S</span>
            </div>

            {/* The Primary Active Avatar Overlapping */}
            <div key={`${animKey}-avatar`} className={`absolute right-[10%] md:right-[20%] top-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[320px] md:h-[320px] bg-[#0A0C10] border-[8px] border-background-deep rounded-full z-10 flex items-center justify-center shadow-2xl animate-in fade-in zoom-in-95 duration-500 overflow-hidden`}>
              {activeStory.image ? (
                <img src={activeStory.image} alt={activeStory.name} className="w-full h-full object-cover rounded-full pointer-events-auto filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-700" />
              ) : (
                <div className="w-full h-full bg-accent-cyber rounded-full flex flex-col items-center justify-center text-navy-900 overflow-hidden relative group pointer-events-auto">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
                  <span className="text-[100px] md:text-[140px] font-black leading-none pb-2 relative z-10">{activeStory.name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Integrated CTA Below the Carousel */}
        <div className="mt-8 mb-24 relative z-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 w-full text-center flex flex-col items-center">
          <button className="bg-primary-indigo text-white px-12 py-5 text-lg md:text-xl rounded-full font-black hover:scale-105 transition-all shadow-[0_20px_50px_-10px_rgba(1,108,249,0.5)] uppercase tracking-widest border border-white/10 hover:bg-[#014eb3]">
            Create Your Own Success Story
          </button>
          <div className="mt-6 flex flex-wrap justify-center gap-6 opacity-70">
            {STRINGS.HEADER.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-black text-accent-cyber">{s.num}</span>
                <span className="text-xs font-bold text-white uppercase tracking-widest">{s.label}</span>
                {i < STRINGS.HEADER.stats.length - 1 && <span className="text-white/20 mx-2">|</span>}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Mandatory Base Brand Border */}
      <div className="border-t border-white/5" />
      <Footer />
    </div>
  );
}
