import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Award, Calendar, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop&q=85',
    tag: 'ANNUAL CHAPTER ASSEMBLY 2025-26',
    title: 'Computer Society of India VCET Chapter',
    subtitle: 'Nurturing the Next Generation of Technologists, Innovators, and Engineers at VCET Vasai.',
    highlight: 'Over 450+ Active Student Members Across Computer, IT & AI-DS',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=85',
    tag: 'FLAGSHIP HACKATHON',
    title: 'HackVCET: Code for India 2026',
    subtitle: '36 Hours of Non-stop Code, Mentorship from Silicon Valley Veterans, and ₹1,00,000+ in Bounties.',
    highlight: '50+ Teams Selected Nationwide • University Recognized',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&fit=crop&q=85',
    tag: 'TECHNICAL EXCELLENCE & HANDS-ON WORKSHOPS',
    title: 'Empowering Student Pioneers in AI, Web3 & Cloud',
    subtitle: 'Peer-led bootcamps, open-source projects, and industry networking tailored for undergraduates.',
    highlight: '100% Student-Led • Mentored by Distinguished VCET Faculty',
  },
];

export const HeroSlider = ({ onOpenApply, onNavigateMembers }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full bg-slate-950 overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Viewport */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Photo with Collegiate Dark Gradient Overlay */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] transform scale-105 transition-transform duration-7000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Slide Content Box */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl text-left space-y-4">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{slide.tag}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                      {slide.title}
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow">
                      {slide.subtitle}
                    </p>

                    {/* Feature Pill */}
                    <div className="pt-1 flex items-center space-x-2 text-xs sm:text-sm text-amber-400 font-semibold">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{slide.highlight}</span>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex flex-wrap gap-3">
                      <button
                        onClick={onOpenApply}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-900/50 hover:shadow-blue-700/50 transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        Join Chapter / Apply Now
                      </button>
                      <button
                        onClick={onNavigateMembers}
                        className="px-5 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 backdrop-blur-sm transition-colors flex items-center space-x-2"
                      >
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>Meet Our Council</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white/80 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white/80 hover:text-white border border-slate-700/60 backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Indicators & Slide Progress */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-8 h-2.5 bg-amber-400'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default HeroSlider;
