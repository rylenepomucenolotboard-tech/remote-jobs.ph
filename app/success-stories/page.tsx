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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xNV9waG90b19vZl9hX3BvcnRyYWl0X29mX2JsYWNrX2J1c2luZXNzd29tYW5faV80MDExOTQyNi1mYmFjLTQ4YjgtOWZhYS01NTY2MTNiYjBlNjkucG5n.png"
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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8yX3Bob3RvX29mX2FfcG9ydHJhaXRfb2ZfYV9zbWlsaW5nX21hbl93aXRoX18yNmIyZTVkMi0xZTY3LTRhNTAtOTUxYy01NTI1OWRlMTBhOGIucG5n.png"
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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjEwNjktMjE1LXAucG5n.png"
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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8xX3Bob3RvX29mX2FfcG9ydHJhaXRfb2ZfYV9ibGFja19idXNpbmVzc21hbl9faThkOTQ4NGFkLTNlODAtNDFkMC1hYzQ4LTEyZjk2YWMwYWFhNS5wbmc.png"
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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8yOF9waG90b19vZl95b3VuZ19pbmRpYW5fd29tYW5fYXNpYW5fZXhlY3V0aXZlX184NGIzNGE4OS00MTQxLTRjNjUtOTgyZC05ZGRiY2FjOWQwZTMucG5n.png"
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
    image: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2pvYjExMjAtMTEzLXAucG5n.png"
  }
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

  // Auto-rotate the testimonial carousel every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    const cInterval = setInterval(() => {
      setCarouselIndex((c) => (c + 1) % filteredStories.length);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(cInterval);
  }, [isHovered, filteredStories.length]);

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
    <div className="min-h-[100dvh] flex flex-col bg-[#0c1526] text-white transition-colors duration-500 font-sans selection:bg-accent-cyber selection:text-navy-900 overflow-x-hidden relative">

      {/* Subtle Brand Radial Glow (Mandated by Brand Guidelines to lift darkness) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-indigo opacity-10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center relative z-10">

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

          {/* Photo Layout: Source Cutout Two-Image Assembly */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end relative mt-12 lg:mt-0 shrink-0">
            {/* SVG mask definition for native structural background cutout */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="portraitClip" clipPathUnits="objectBoundingBox">
                  <ellipse cx="0.5" cy="0.28" rx="0.22" ry="0.25" />
                  <ellipse cx="0.5" cy="0.72" rx="0.38" ry="0.42" />
                </clipPath>
              </defs>
            </svg>

            <div key={`${animKey}-avatar`} className="animate-cinematic-drift relative shrink-0 w-[260px] h-[360px] md:w-[320px] md:h-[440px] md:mt-8" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>

              {/* ATMOSPHERIC GLOW */}
              <div className={`absolute bottom-[0px] left-[50%] -translate-x-[50%] w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full z-0 pointer-events-none transition-colors duration-700 bg-gradient-to-br ${getAvatarGradient(carouselIndex).base}`}>
                <div className={`css-avatar-glow ${getAvatarGradient(carouselIndex).glow}`}></div>
              </div>

              {activeStory.image ? (
                <>
                  {/* CIRCLE — clips lower body inside it */}
                  <div className="absolute bottom-[0px] left-[50%] -translate-x-[50%] w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden bg-transparent z-10 border border-white/20 shadow-2xl pointer-events-none">
                    <img
                      src={activeStory.image}
                      alt={activeStory.name}
                      className="absolute bottom-[-10px] md:bottom-[-20px] left-[50%] -translate-x-[50%] object-cover object-top pointer-events-auto w-[221px] h-[364px] md:w-[272px] md:h-[448px]"
                    />
                  </div>

                  {/* OVERFLOW HEAD — same transparent PNG, above circle */}
                  <div className="absolute bottom-[210px] md:bottom-[260px] left-[50%] -translate-x-[50%] w-[260px] md:w-[320px] h-[100px] md:h-[120px] overflow-hidden z-20 pointer-events-none">
                    <img
                      src={activeStory.image}
                      aria-hidden="true"
                      className="absolute bottom-[-220px] md:bottom-[-280px] left-[50%] -translate-x-[50%] object-cover object-top w-[221px] h-[364px] md:w-[272px] md:h-[448px]"
                    />
                  </div>

                  {/* BOTTOM DISSOLVE */}
                  <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[260px] md:w-[320px] h-[80px] md:h-[120px] rounded-b-full bg-gradient-to-t from-[#0c1526] to-transparent z-30 pointer-events-none" />
                </>
              ) : (
                <div className="absolute bottom-[0px] left-[50%] -translate-x-[50%] w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden bg-transparent z-10 border-transparent border pointer-events-none">
                  <div className="css-avatar-silhouette scale-y-125 scale-x-150 md:scale-y-[1.6] md:scale-x-[1.9] origin-bottom absolute bottom-[-10px] left-1/2 -translate-x-1/2">
                    <div className={`css-avatar-head bg-gradient-to-br ${getAvatarGradient(carouselIndex).base}`}>
                      <div className="css-avatar-highlight"></div>
                    </div>
                    <div className={`css-avatar-neck bg-gradient-to-b ${getAvatarGradient(carouselIndex).base}`}></div>
                    <div className={`css-avatar-torso bg-gradient-to-tr ${getAvatarGradient(carouselIndex).base}`}>
                      <div className={`css-avatar-shoulder-l bg-gradient-to-tr ${getAvatarGradient(carouselIndex).base}`}></div>
                      <div className={`css-avatar-shoulder-r bg-gradient-to-tr ${getAvatarGradient(carouselIndex).base}`}></div>
                    </div>
                  </div>
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
