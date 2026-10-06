import React from 'react';
import { Shield, ArrowRight, BookOpen } from 'lucide-react';

export const OurPledge = ({ onNavigateConstitution }) => {
  return (
    <div className="bg-[#f1f5f9] dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Framed Photograph Box matching reference image layout */}
        <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-2xl shadow-md border border-slate-200/90 dark:border-slate-700 mb-5">
          <div className="relative rounded-xl overflow-hidden aspect-video sm:aspect-4/3 max-h-[300px]">
            {/* Collegiate ceremony photo - student holding charter/constitution */}
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=85"
              alt="CSI VCET Induction Ceremony & Official Charter"
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlapping "Our Pledge" Badge in the Bottom-Right Corner */}
            <div className="absolute bottom-3 right-3 z-10">
              <div className="bg-white dark:bg-slate-900 px-4 py-1.5 rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-700">
                <span className="font-heading text-lg sm:text-xl font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                  Our Pledge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pledge Text below the framed photo */}
        <div className="space-y-3 px-1">
          <p className="font-sans italic text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
            "I pledge my time, energy, and talents to serve the student fraternity of Vidyavardhini's College of Engineering & Technology, uphold the ethical principles of the Computer Society of India, and advance computing excellence with diligence, humble leadership, and integrity."
          </p>

          <p className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans">
            — CSI VCET Student Council Oath of Office
          </p>
        </div>
      </div>

      {/* Action to View Constitution */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
        <button
          onClick={onNavigateConstitution}
          className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 shadow-2xs flex items-center justify-center space-x-2 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Read Official Chapter Constitution & Bylaws</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
        </button>
      </div>
    </div>
  );
};

export default OurPledge;
