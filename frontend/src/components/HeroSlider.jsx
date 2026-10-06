import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Users, Calendar, Award, ArrowUpRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop&q=85',
    alt: 'CSI VCET Chapter Assembly Group Photo',
    badge: 'Official Student Chapter • Estd. 2008',
    heading: 'Engineering Excellence & Technical Leadership',
    societyLine: 'Computer Society of India • VCET Student Chapter',
    caption: 'Premier technical society fostering software craftsmanship, collaborative research, and engineering leadership across all academic departments at VCET.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=85',
    alt: 'HackVCET Hackathon Participants and Mentors',
    badge: 'Flagship Event 2026',
    heading: 'HackVCET: Maharashtra 36-Hour Hackathon',
    societyLine: 'CSI Mumbai Region VII Collaboration',
    caption: 'Bringing together 50+ student teams to solve real-world industry problems in cloud systems, AI/ML, and web infrastructure with faculty and alumni mentorship.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&fit=crop&q=85',
    alt: 'Technical Seminar and Workshop in VCET Auditorium',
    badge: 'Hands-on Technical Sprints',
    heading: 'Developer Bootcamps & System Design Workshops',
    societyLine: 'Full-Stack, DevOps & Machine Learning',
    caption: 'Curated by student leads in Computer Engineering, IT, and CSE(DS) to bridge classroom curriculum with modern industry tech stacks.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=85',
    alt: 'CSI VCET Project Showcase and Committee Meeting',
    badge: 'Tenure 2026-27 Selection',
    heading: 'Join the Executive Student Council',
    societyLine: 'Leadership, Organizing & Technical Domains',
    caption: 'Step into collegiate responsibility, organize state symposia, and gain invaluable leadership experience alongside an active alumni network.',
  },
];

export const HeroSlider = ({ onOpenApply, onNavigateMembers }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const activeData = slides[currentSlide];

  return (
    <div
      className="relative w-full bg-slate-950 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Viewport with Generous Height */}
      <div className="relative min-h-[520px] sm:min-h-[560px] lg:min-h-[620px] w-full flex items-center">
        {/* Background Image Carousel with Crossfade */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.15] transform scale-100 transition-transform duration-10000 ease-out"
              />
              {/* Collegiate Royal Blue & Dark Indigo Atmospheric Vignette */}
              <div className="absolute inset-0 bg-[#0f172a]/50 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
            </div>
          );
        })}

        {/* Asymmetrical Left-Aligned Hero Composition Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16">
          <div className="max-w-2xl">
            {/* Layered Glassmorphic Hero Card with Subtle Border Glow */}
            <div className="bg-slate-950/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-5 text-left transition-all duration-300">
              {/* Institutional Badge Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  {activeData.badge}
                </span>
                <span className="hidden sm:inline text-xs text-slate-400 font-mono">
                  VCET Vasai • Region VII
                </span>
              </div>

              {/* High-Impact Modular Headline */}
              <div className="space-y-1">
                <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                  {activeData.heading}
                </h1>
                <p className="font-heading text-sm sm:text-base font-semibold text-blue-300/90 tracking-normal pt-1">
                  {activeData.societyLine}
                </p>
              </div>

              {/* Modular Narrative Body Subtext */}
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {activeData.caption}
              </p>

              {/* Quick Interactive Triggers */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {onOpenApply && (
                  <button
                    onClick={onOpenApply}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-cyan-500/20 transition-all duration-300 flex items-center space-x-2 border border-blue-400/30 hover:border-cyan-400"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Apply for Council 2026-27</span>
                  </button>
                )}

                {onNavigateMembers && (
                  <button
                    onClick={onNavigateMembers}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all duration-300 flex items-center space-x-1.5"
                  >
                    <span>Council Directory</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300" />
                  </button>
                )}
              </div>

              {/* Surface Layering Stats Strip */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-left">
                <div>
                  <span className="block font-heading text-base sm:text-lg font-extrabold text-white">
                    1,200+
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    Chapter Alumni
                  </span>
                </div>
                <div>
                  <span className="block font-heading text-base sm:text-lg font-extrabold text-white">
                    36-Hr
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    HackVCET Sprint
                  </span>
                </div>
                <div>
                  <span className="block font-heading text-base sm:text-lg font-extrabold text-white">
                    18+
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium">
                    Annual Workshops
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-Right Glass Control Panel with Slide Counter & Arrows */}
        <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/70 backdrop-blur-md border border-white/15 text-xs text-slate-300 font-mono flex items-center gap-2">
            <span className="font-bold text-white">0{currentSlide + 1}</span>
            <span className="text-slate-500">/</span>
            <span>0{slides.length}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-md border border-white/15 rounded-xl p-1">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Bottom Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide
                  ? 'w-6 h-1.5 bg-blue-500 shadow-xs'
                  : 'w-2 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
