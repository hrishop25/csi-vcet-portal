import React from 'react';
import { Award, BookOpen, Cpu, Globe, Rocket, CheckCircle2 } from 'lucide-react';

export const WhoWeAre = () => {
  return (
    <div className="bg-[#f1f5f9] dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Distinct Header Tab matching reference "Who We Are" pill */}
        <div className="mb-5">
          <div className="inline-block bg-white dark:bg-slate-800 px-6 py-2.5 rounded-xl shadow-sm border border-slate-200/80 dark:border-slate-700">
            <h2 className="font-collegiate-serif text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-white tracking-tight">
              Who We Are
            </h2>
          </div>
        </div>

        {/* Narrative Text - Grounded, authentic collegiate tone (Not AI-ish!) */}
        <p className="font-collegiate-serif text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
          The <strong>Computer Society of India (CSI) Student Chapter</strong> at{' '}
          <span className="font-semibold text-slate-950 dark:text-white">
            Vidyavardhini's College of Engineering and Technology
          </span>{' '}
          serves as the official premier technical society for the university cohort. Formed under the mentorship of the Department of Computer Engineering and Information Technology, the chapter is founded upon the principles of practical craft, technical leadership, and collaborative integrity.
        </p>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          CSI VCET represents the students across all branches at technical symposia, organizes our annual flagship 36-hour hackathon <em>HackVCET</em>, and conducts intensive workshops on systems programming, web engineering, and machine learning to prepare students for real-world engineering careers.
        </p>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1">
              <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Technical Excellence</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Peer-driven workshops in Full-Stack, Systems Design, AI/ML, and Open Source.
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1">
              <Rocket className="w-4 h-4 text-blue-600 shrink-0" />
              <span>HackVCET Hackathon</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Flagship national hackathon drawing teams from colleges across Maharashtra.
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1">
              <Globe className="w-4 h-4 text-blue-600 shrink-0" />
              <span>CSI Mumbai Region VII</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Recognized student branch operating under the Computer Society of India Mumbai Council.
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/70 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Faculty Mentorship</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Advised by senior professors across COMPS, IT, and CSE-Data Science departments.
            </p>
          </div>
        </div>
      </div>

      {/* Collegiate Footer Tagline */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Vidyavardhini's College of Engineering & Technology
        </span>
        <span className="font-mono text-[11px]">Estd. 2008</span>
      </div>
    </div>
  );
};

export default WhoWeAre;
