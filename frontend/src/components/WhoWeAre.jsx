import React from 'react';
import { Award, BookOpen, Cpu, Globe, Rocket, CheckCircle2 } from 'lucide-react';

export const WhoWeAre = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-7 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Distinct Header Tab matching reference "Who We Are" pill */}
        <div className="mb-6">
          <div className="inline-block bg-slate-100 dark:bg-slate-800 px-6 py-2.5 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f2862] dark:text-white tracking-tight">
              Who We Are
            </h2>
          </div>
        </div>

        {/* Narrative Text - High contrast in both light and dark modes */}
        <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-5 font-sans">
          The <strong className="font-bold text-slate-950 dark:text-white">Computer Society of India (CSI) Student Chapter</strong> at{' '}
          <span className="font-bold text-slate-950 dark:text-white">
            Vidyavardhini's College of Engineering and Technology
          </span>{' '}
          serves as the official premier technical society for the university cohort. Formed under the mentorship of the Department of Computer Engineering, Information Technology, and CSE(DS), the chapter is founded upon the principles of practical craft, technical leadership, and collaborative integrity.
        </p>

        <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          CSI VCET represents the students across all branches at technical symposia, organizes our annual flagship 36-hour hackathon <em className="font-semibold text-blue-900 dark:text-blue-300">HackVCET</em>, and conducts intensive workshops on systems programming, web engineering, and machine learning to prepare students for real-world engineering careers.
        </p>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1.5">
              <Cpu className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
              <span className="font-heading">Technical Excellence</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Peer-driven workshops in Full-Stack, Systems Design, AI/ML, and Open Source.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1.5">
              <Rocket className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
              <span className="font-heading">HackVCET Hackathon</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Flagship national hackathon drawing teams from colleges across Maharashtra.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1.5">
              <Globe className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
              <span className="font-heading">CSI Mumbai Region VII</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Recognized student branch operating under the Computer Society of India Mumbai Council.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-400 font-bold text-xs sm:text-sm mb-1.5">
              <Award className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
              <span className="font-heading">Faculty Mentorship</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              Advised by senior professors across Computer Engineering, IT, and CSE(DS) departments.
            </p>
          </div>
        </div>
      </div>

      {/* Collegiate Footer Strip */}
      <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-800 dark:text-slate-200">
          Vidyavardhini's College of Engineering & Technology
        </span>
        <span className="font-mono text-[11px] font-semibold">Estd. 2008</span>
      </div>
    </div>
  );
};

export default WhoWeAre;
