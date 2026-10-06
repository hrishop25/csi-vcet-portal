import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import WhoWeAre from '../components/WhoWeAre';
import OurPledge from '../components/OurPledge';
import VcetCsiPortalSection from '../components/VcetCsiPortalSection';
import EventsSection from '../components/EventsSection';
import { Users, Calendar, Award, Code, Sparkles, MapPin, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';

export const HomePage = ({ setActiveView, onOpenApply }) => {
  return (
    <div className="space-y-10 pb-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* 1. Hero Banner Slider (Matching reference image layout & blue photo tint) */}
      <HeroSlider />

      {/* 2. Structured Institutional Layout: "Who We Are" & "Our Pledge" (Matching reference image) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Who We Are Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <WhoWeAre />
          </div>

          {/* Right Column: Framed Our Pledge Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <OurPledge onNavigateConstitution={() => setActiveView('constitution')} />
          </div>
        </div>
      </div>

      {/* 3. Official VCET CSI Portal Section (Directly displaying Faculty from Image 2 & Committee from Image 3!) */}
      <VcetCsiPortalSection />

      {/* 4. Flagship Events Section */}
      <EventsSection onOpenApply={onOpenApply} />

      {/* 5. Collegiate Recruitment CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-slate-950 dark:via-blue-950/80 dark:to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Academic Tenure 2026-27 Selection</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
              Join the Executive Roster of CSI VCET
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Open to undergraduate students across Computer Engineering, IT, CSE(DS), and allied engineering departments. Step into student leadership, lead national hackathons, and contribute to chapter codebases.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenApply}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Apply for Council 2026-27
            </button>
            <button
              onClick={() => setActiveView('members')}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-colors"
            >
              View Full Council Roster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
