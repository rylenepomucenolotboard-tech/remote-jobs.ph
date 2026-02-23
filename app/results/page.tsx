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
    <div className="min-h-[100dvh] flex flex-col bg-background-deep text-white transition-colors duration-500 font-sans selection:bg-accent-cyber selection:text-navy-900 overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 2xl:py-32 flex flex-col justify-center">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left: Huge Stacked Text & Blocky Stats (Inspired by reference screens) */}
          <div className="w-full lg:w-5/12 text-left relative z-10 animate-in fade-in slide-in-from-left-8 duration-700">
            {/* The background radial for brand alignment */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-cyber/5 rounded-full blur-[120px] pointer-events-none" />

            <h1 className="text-[5rem] md:text-[6.5rem] lg:text-[7rem] xl:text-[8rem] font-black text-white leading-[0.82] tracking-tighter mb-10 uppercase drop-shadow-xl">
              <span className="block mb-3">Success</span>
              <span className="block text-accent-cyber">Stories<span className="text-white">.</span></span>
            </h1>

            <p className="text-xl md:text-2xl text-navy-300 font-medium mb-12 max-w-sm leading-snug border-l-4 border-primary-indigo/30 pl-5">
              The premier ecosystem connecting global tech leaders with elite Filipino remote talent.
            </p>

            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {STRINGS.HEADER.stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-2 bg-[#0A0C10] border border-white/5 rounded-[1.5rem] p-6 lg:p-8 shadow-2xl hover:border-white/10 transition-colors">
                  <span className="text-4xl lg:text-5xl font-black text-white leading-none">{s.num}</span>
                  <span className="text-[11px] font-black text-navy-400 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Curved Carousel Card (Inspired by reference screens + dark UI) */}
          <div className="w-full lg:w-7/12 aspect-square md:aspect-[4/3] lg:aspect-[4/3.5] bg-[#0c1526] rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>

            {/* Organic Curved Shape (Mimicking the photo cutout in the reference) */}
            <div className="absolute bottom-0 right-0 w-[80%] h-[75%] bg-primary-indigo/20 rounded-tl-[160px] blur-sm transition-all duration-1000" />
            <div className="absolute bottom-0 right-0 w-[75%] h-[70%] bg-primary-indigo rounded-tl-[140px] z-[1] transition-all duration-700 shadow-[-20px_-20px_40px_rgba(0,0,0,0.5)] border-t border-l border-white/10" />
            <div className="absolute bottom-0 right-0 w-[72%] h-[68%] bg-[#060b18] rounded-tl-[130px] z-[2] transition-all duration-700 border-t border-l border-white/5" />

            <div key={animKey} className={`flex-1 flex flex-col relative animate-in fade-in ${direction} duration-700 z-10 h-full`}>

              <div className="flex justify-between items-center mb-auto">
                {/* Reference style pill box */}
                <div className="bg-white text-navy-900 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                  Verified Review
                </div>
                <div className="bg-white/5 border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                  STORY {carouselIndex + 1} OF {filteredStories.length}
                </div>
              </div>

              <div className="relative mt-12 mb-auto max-w-lg lg:max-w-xl z-10 pointer-events-none">
                <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight [text-wrap:balance]">
                  "{activeStory.quote}"
                </h2>
                <div className="text-sm md:text-base font-medium text-navy-300 mt-6 leading-relaxed border-l-2 border-accent-cyber/30 pl-5">
                  {activeStory.context}
                </div>
              </div>

              {/* Profile Details sitting in the curve */}
              <div className="absolute bottom-4 md:bottom-8 right-0 md:right-4 z-20 text-right flex flex-col items-end">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent-cyber rounded-full mb-4 md:mb-5 flex items-center justify-center shadow-[0_0_40px_rgba(202,244,113,0.3)] border-[4px] border-[#0A0C10]">
                  <span className="text-2xl md:text-4xl font-black text-navy-900 leading-none pb-1">{activeStory.name.charAt(0)}</span>
                </div>
                <div className="text-xl md:text-2xl font-black text-white">{activeStory.name}</div>
                <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary-indigo mt-1">{activeStory.role}</div>
                <div className="text-[10px] font-bold text-navy-400 uppercase tracking-widest mt-1">{activeStory.location}</div>
              </div>

            </div>

            {/* Navigation buttons matching inspiration wireframe circles */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 flex gap-4">
              <button onClick={handlePrev} className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-navy-900 transition-all font-black text-xl hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md">←</button>
              <button onClick={handleNext} className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-navy-900 transition-all font-black text-xl hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md">→</button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Customization requested by user */}
        <section className="mt-24 md:mt-32 relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          <div className="bg-gradient-to-br from-primary-indigo to-[#014eb3] rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_30px_100px_-20px_rgba(1,108,249,0.4)]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="relative z-10 flex-1 text-center md:text-left">
              <h2 className="text-[2.5rem] md:text-5xl lg:text-[4rem] font-black text-white mb-6 leading-tight tracking-tighter uppercase line-clamp-2 md:line-clamp-none">
                Create Your Own Success Story.
              </h2>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
                Join 15,000+ top-tier professionals building generational remote careers.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto shrink-0">
              <button className="bg-accent-cyber text-navy-900 px-10 py-5 text-lg rounded-2xl font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(202,244,113,0.3)] uppercase tracking-wider text-center">{STRINGS.CTA.btn1}</button>
              <button className="bg-white/10 text-white border-2 border-white/30 px-10 py-5 text-lg rounded-2xl font-black hover:bg-white/20 transition-all uppercase tracking-wider text-center backdrop-blur-md">{STRINGS.CTA.btn2}</button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
