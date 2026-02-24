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
];

const PLACEHOLDERS = [
  "e.g. Senior React developer, 5+ yrs, Node.js, AWS",
  "e.g. UI/UX designer, Figma, mobile apps, 4+ years",
  "e.g. Executive VA, C-suite support, CRM and calendar",
  "e.g. Digital marketing manager, SEO, paid ads, B2B",
  "e.g. Full-stack engineer, Python, Django, SaaS",
];

export default function ResultsPage() {
  const getAvatarGradient = (index: number) => {
    const gradients = [
      { base: 'from-primary-indigo to-blue-400', glow: 'bg-primary-indigo' },
      { base: 'from-accent-mint to-teal-300', glow: 'bg-accent-mint' },
      { base: 'from-amber-400 to-orange-300', glow: 'bg-amber-500' },
      { base: 'from-rose-500 to-pink-300', glow: 'bg-rose-500' },
      { base: 'from-purple-500 to-fuchsia-300', glow: 'bg-purple-500' },
      { base: 'from-accent-cyber to-emerald-300', glow: 'bg-accent-cyber' },
    ];
    return gradients[index % gradients.length];
  };

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
            Check out how RemoteJobs.ph helped professionals and organizations of all sizes achieve their global expansion goals.
          </p>
        </div>

        {/* High-End Editorial Borderless Carousel (Phase 23) */}
        <div
          className="relative w-full max-w-6xl mx-auto mt-16 md:mt-24 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 pb-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Body: Enormous Quote */}
          <div className="w-full lg:w-3/4 flex flex-col justify-center relative z-20">
            <div key={`${animKey}-text`} className="animate-cinematic-drift opacity-0 [animation-fill-mode:forwards]">
              {/* Massive subtle quote mark behind text */}
              <div className="text-[180px] md:text-[240px] font-sans text-white/5 leading-none absolute -top-16 md:-top-24 -left-8 md:-left-16 -z-10 select-none">"</div>

              <h2 className="text-4xl md:text-5xl lg:text-[72px] font-sans font-medium italic text-white leading-[1.05] tracking-tight mb-12 relative z-10 text-balance drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                "{activeStory.quote}"
              </h2>

              <div className="flex flex-col md:flex-row md:items-center gap-3 text-navy-200">
                <div className="text-2xl font-black text-white">{activeStory.name}</div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-cyber opacity-80"></div>
                <div className="text-lg font-medium tracking-wide">{activeStory.role} {activeStory.source ? `at ${activeStory.source}` : ''}</div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20"></div>
                <div className="text-sm font-semibold text-accent-cyber tracking-widest uppercase">{activeStory.tag}</div>
              </div>

              {/* Minimalist Dot Indicators */}
              <div className="flex gap-3 mt-16">
                {filteredStories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-700 ease-out ${i === carouselIndex ? 'w-16 bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'w-6 bg-white/20 hover:bg-white/40'}`}
                    aria-label={`Go to story ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Photo Layout: Pure CSS Silhouette Pop-Out */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end relative pointer-events-none mt-12 lg:mt-0">
            <div key={`${animKey}-avatar`} className="animate-cinematic-drift opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '300ms' }}>

              <div className="css-avatar-base">
                {/* Radial base glow anchoring it to canvas */}
                <div className={`css-avatar-glow ${getAvatarGradient(carouselIndex).glow}`}></div>

                {/* The Pop-Out Geometry */}
                {activeStory.image ? (
                  <div className="absolute inset-x-[-10%] bottom-[-10px] h-[260px] z-10 flex flex-col items-center justify-end overflow-visible pointer-events-auto filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-700">
                    <img
                      src={activeStory.image}
                      alt={activeStory.name}
                      className="w-full h-full object-cover rounded-t-[140px] rounded-b-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    />
                  </div>
                ) : (
                  <div className="css-avatar-person">
                    <div className={`css-avatar-head bg-gradient-to-br ${getAvatarGradient(carouselIndex).base}`}></div>
                    <div className={`css-avatar-body bg-gradient-to-tr ${getAvatarGradient(carouselIndex).base}`}></div>
                  </div>
                )}
              </div>

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
