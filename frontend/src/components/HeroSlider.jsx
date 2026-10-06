import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1600&auto=format&fit=crop&q=85',
    alt: 'CSI VCET Chapter Assembly Group Photo',
    collegeLine: "Vidyavardhini's College of Engineering & Technology",
    societyLine: 'Computer Society of India Student Chapter',
    caption: 'Annual Assembly of Executive Council & Faculty Advisors',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1600&auto=format&fit=crop&q=85',
    alt: 'HackVCET Hackathon Participants and Mentors',
    collegeLine: 'Department of Computer Engineering, IT & CSE(DS)',
    societyLine: 'HackVCET: National Student Hackathon 2026',
    caption: '36-Hour Flagship Hackathon in Association with CSI Mumbai',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1600&auto=format&fit=crop&q=85',
    alt: 'Technical Seminar and Workshop in VCET Auditorium',
    collegeLine: 'VCET Campus • Vasai Road (W)',
    societyLine: 'Technical Excellence & Student Mentorship',
    caption: 'Hands-on Developer Bootcamps & Systems Architecture Seminars',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=85',
    alt: 'CSI VCET Project Showcase and Committee Meeting',
    collegeLine: 'Autonomous Institute Affiliated to University of Mumbai',
    societyLine: 'Council Induction & Student Leadership 2026-27',
    caption: 'Empowering Student Innovators Since 2008',
  },
];

export const HeroSlider = () => {
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
      className="relative w-full bg-slate-900 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slider Viewport (Exact match to reference collegiate aspect & height) */}
      <div className="relative h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Photo with Luminous Collegiate Blue Tint */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] dark:brightness-[0.78] dark:contrast-[1.12]"
              />

              {/* Collegiate Royal Blue Photo Tint (Matches reference blue color cast) */}
              <div className="absolute inset-0 bg-[#0f2862]/35 dark:bg-[#0a1128]/55 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

              {/* Bottom-Right Overlay Text (Crisp, High-Contrast Typography) */}
              <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-12 z-20 text-right max-w-xl pointer-events-none">
                <p className="font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-tight tracking-tight">
                  {slide.collegeLine}
                </p>
                <p className="font-heading text-base sm:text-xl md:text-2xl font-bold text-amber-300 dark:text-blue-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-1 tracking-tight">
                  {slide.societyLine}
                </p>
                <p className="text-xs sm:text-sm text-slate-100 font-sans tracking-wide mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hidden sm:block leading-relaxed font-medium">
                  {slide.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Thin Navigation Arrows on Left and Right (Exact match to reference '<' and '>') */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/75 hover:text-white transition-all transform hover:scale-125 focus:outline-none drop-shadow-md cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 text-white/75 hover:text-white transition-all transform hover:scale-125 focus:outline-none drop-shadow-md cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]" />
      </button>

      {/* 4 Bottom Center Dots (Exact match to reference dots!) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentSlide
                ? 'w-2.5 h-2.5 bg-white scale-125 shadow-xs'
                : 'w-2 h-2 bg-white/45 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
