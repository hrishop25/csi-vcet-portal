import React from 'react';
import { Shield, ArrowRight, BookOpen, Quote } from 'lucide-react';

export const OurPledge = ({ onNavigateConstitution }) => {
  return (
    <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800/80 shadow-[0_4px_24px_rgba(15,23,42,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30">
      <div>
        {/* Framed Collegiate Photograph with Layered Frosted Border */}
        <div className="bg-slate-50 dark:bg-slate-800/70 p-3 sm:p-4 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 shadow-inner mb-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-4/3 max-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=85"
              alt="CSI VCET Induction Ceremony & Official Charter"
              className="w-full h-full object-cover object-center filter contrast-[1.08] hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Overlapping Floating Badge in the Bottom-Right Corner */}
            <div className="absolute bottom-3 right-3 z-10">
              <div className="bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-white/20">
                <span className="font-heading text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Our Pledge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pledge Text below the photograph */}
        <div className="space-y-4 px-1 text-left">
          <div className="flex items-start gap-3">
            <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 opacity-60" />
            <p className="font-sans italic text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
              "I pledge my time, energy, and talents to serve the student fraternity of Vidyavardhini's College of Engineering & Technology, uphold the ethical principles of the Computer Society of India, and advance computing excellence with diligence, humble leadership, and integrity."
            </p>
          </div>

          <p className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans tracking-wide">
            — CSI VCET Student Council Oath of Office
          </p>
        </div>
      </div>

      {/* Action to View Constitution with Subtle Cyan Hover Border Glow */}
      <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-slate-800">
        <button
          onClick={onNavigateConstitution}
          className="w-full py-3 px-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-300/80 dark:border-slate-700 shadow-2xs hover:border-cyan-500/50 hover:shadow-md flex items-center justify-center space-x-2 transition-all duration-300 group"
        >
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
          <span>Read Official Chapter Constitution & Bylaws</span>
          <ArrowRight className="w-4 h-4 ml-1 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default OurPledge;
