import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import WhoWeAre from '../components/WhoWeAre';
import OurPledge from '../components/OurPledge';
import EventsSection from '../components/EventsSection';
import { Users, Calendar, Award, Code, ChevronDown, Sparkles, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

export const HomePage = ({ setActiveView, onOpenApply }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { label: 'Active Chapter Members', value: '450+', icon: Users, sub: 'Across 6 Engineering Departments' },
    { label: 'Annual Tech Events & Hackathons', value: '30+', icon: Calendar, sub: 'Hands-on Workshops & Competitions' },
    { label: 'Years of Institutional Legacy', value: '18+', icon: Award, sub: 'Estd. 2008 at VCET Campus' },
    { label: 'Production Projects & Codebases', value: '25+', icon: Code, sub: 'Open-Source & College Software' },
  ];

  const faqs = [
    {
      q: 'Who is eligible to apply for the CSI VCET Student Council?',
      a: 'All enrolled undergraduate students at VCET across FE, SE, TE, and BE from Computer Engineering, Information Technology, AI & Data Science, EXTC, and allied branches are welcome to apply during the official recruitment cycle.',
    },
    {
      q: 'Do I need advanced coding experience to apply for non-technical domains?',
      a: 'Not at all! We recruit across diverse domains including Technical Development, Creatives & Video Editing, Event Operations & Logistics, Corporate Sponsorship, and Public Relations.',
    },
    {
      q: 'What are the benefits of CSI membership?',
      a: 'Members receive discounted passes to national hackathons, access to CSI journals and digital libraries, participation in exclusive member-only project bootcamps, and networking opportunities with senior alumni in tech.',
    },
    {
      q: 'How does the recruitment selection process work?',
      a: 'After you submit your online application, the Core Council shortlists candidates for domain-specific tasks/interviews. Results and interview slots are managed and tracked directly through the Chapter Portal.',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Image Slider */}
      <HeroSlider
        onOpenApply={onOpenApply}
        onNavigateMembers={() => setActiveView('members')}
      />

      {/* Structured Institutional Layout: Who We Are & Our Pledge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Who We Are Overview (7 cols) */}
          <div className="lg:col-span-7 flex">
            <WhoWeAre />
          </div>

          {/* Right Column: Our Pledge / Vision Media Box (5 cols) */}
          <div className="lg:col-span-5 flex">
            <OurPledge onNavigateConstitution={() => setActiveView('constitution')} />
          </div>
        </div>
      </div>

      {/* Chapter Numerical Milestones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Impact at a Glance</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Fostering Collegiate Tech Excellence
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="p-2 rounded-xl bg-blue-600/30 text-blue-400">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-3xl font-black text-white">{s.value}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-200">{s.label}</h4>
                    <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Events Section */}
      <EventsSection onOpenApply={onOpenApply} />

      {/* Recruitment Call To Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-blue-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fall 2026 Selection Window</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to leave your mark on VCET's tech culture?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Step into leadership, gain invaluable hands-on project experience, organize premier hackathons, and become part of a passionate engineering family.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenApply}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Apply for Recruitment 2026-27
            </button>
            <button
              onClick={() => setActiveView('constitution')}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
            >
              View Chapter Code of Ethics
            </button>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Applicant Guidance</span>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
