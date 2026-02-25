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
    image: "https://pngimg.com/uploads/man/man_PNG6531.png"
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
    image: "https://pngimg.com/uploads/man/man_PNG6533.png"
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
    image: "https://pngimg.com/uploads/girl/girl_PNG69.png"
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
    image: "https://pngimg.com/uploads/man/man_PNG6528.png"
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
    image: "https://pngimg.com/uploads/girl/girl_PNG100.png"
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
    image: "https://pngimg.com/uploads/man/man_PNG6505.png"
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

        {/* Removed redundant top typography section as the peg incorporates the header into the card itself */}

        {/* High-End Editorial Borderless Carousel Matching the Peg */}
        <div
          className="relative w-full max-w-6xl mx-auto mt-16 md:mt-24 pb-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Card with overflow hidden to clip everything to the stylish dark rectangle */}
          <div className="relative w-full bg-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row min-h-[500px] lg:min-h-[560px] overflow-hidden">

            {/* The Gray Circle Backdrop */}
            {/* It sits positioned at the bottom right and is naturally clipped by the parent's overflow-hidden */}
            <div key={`${animKey}-circle`} className="absolute right-[-20%] bottom-[-40%] w-[120vw] md:w-[70vw] lg:w-[800px] lg:h-[800px] aspect-square rounded-full bg-[#dcdcdc] animate-in fade-in zoom-in duration-1000 z-0"></div>

            {/* LEFT COLUMN: Text Content */}
            <div className="w-full md:w-[55%] lg:w-[50%] p-10 md:p-16 flex flex-col justify-center relative z-20">
              <div key={`${animKey}-text`} className="animate-in slide-in-from-left-8 fade-in duration-700 [animation-fill-mode:forwards]">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-8">
                  What Our Customers<br />Have to Say
                </h2>
                <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-12 max-w-[40ch]">
                  {activeStory.quote} {activeStory.context}
                </p>

                <div className="flex flex-col gap-1 mt-auto">
                  <div className="text-sm md:text-base font-bold text-white">{activeStory.name}</div>
                  <div className="text-xs md:text-sm text-white/60 font-medium">{activeStory.location}</div>
                </div>

                {/* Minimalist Dot Indicators */}
                <div className="flex gap-2.5 mt-12">
                  {filteredStories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-700 ease-out ${i === carouselIndex ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
                      aria-label={`Go to story ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Portrait Image */}
            {/* Anchored to the bottom right. Pops OUT of the gray circle, but clipped by the card's overflow-hidden */}
            <div className="absolute bottom-0 right-[0%] lg:right-[5%] w-[80%] md:w-[50%] lg:w-[45%] h-[90%] pointer-events-none z-10 flex items-end justify-center">
              <img
                key={`${animKey}-avatar`}
                src={activeStory.image}
                alt={activeStory.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-bottom animate-in slide-in-from-right-8 fade-in duration-700 [animation-fill-mode:forwards]"
              />
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
