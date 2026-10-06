import React from 'react';
import { Shield, ArrowRight, BookOpen } from 'lucide-react';

export const OurPledge = ({ onNavigateConstitution }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Framed Photograph Box matching reference image layout */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-4/3 max-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=85"
              alt="CSI VCET Induction Ceremony & Official Charter"
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlapping "Our Pledge" Badge in the Bottom-Right Corner (Matching Reference Screenshot) */}
            <div className="absolute bottom-3 right-3 z-10">
              <div className="bg-white dark:bg-slate-900 px-4 py-1.5 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-[#0f2862] dark:text-white tracking-tight">
                  Our Pledge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pledge Text below the framed photo */}
        <div className="space-y-3 px-1 text-left">
          <p className="font-sans italic text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-relaxed">
            "I pledge my time, energy, and talents to serve the student fraternity of Vidyavardhini's College of Engineering & Technology, uphold the ethical principles of the Computer Society of India, and advance computing excellence with diligence, humble leadership, and integrity."
          </p>

          <p className="text-right text-xs font-semibold text-slate-700 dark:text-slate-400 font-sans tracking-wide">
            — CSI VCET Student Council Oath of Office
          </p>
        </div>
      </div>

      {/* Action to View Constitution */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onNavigateConstitution}
          className="w-full py-3 px-4 rounded-xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-200 text-xs sm:text-sm font-bold border border-blue-200 dark:border-slate-700 shadow-2xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
          <span>Read Official Chapter Constitution & Bylaws</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 text-blue-600 dark:text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default OurPledge;
