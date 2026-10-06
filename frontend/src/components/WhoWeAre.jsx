import React from 'react';
import { Award, BookOpen, Cpu, Globe, Rocket, CheckCircle2, Shield } from 'lucide-react';

export const WhoWeAre = () => {
  return (
    <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200/90 dark:border-slate-800/80 shadow-[0_4px_24px_rgba(15,23,42,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between transition-all duration-300 hover:border-blue-500/30">
      <div>
        {/* Distinct Header Tab with Academic Chapter Icon */}
        <div className="mb-6 flex items-center space-x-3">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-slate-800/90 px-4 py-2 rounded-2xl border border-blue-200/80 dark:border-slate-700 shadow-2xs">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              Institutional Overview
            </span>
          </div>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
          Who We Are
        </h2>

        {/* Narrative Text - Grounded collegiate tone with strict modular scale & relaxed leading */}
        <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-5 font-sans">
          The <strong>Computer Society of India (CSI) Student Chapter</strong> at{' '}
          <span className="font-semibold text-slate-950 dark:text-white">
            Vidyavardhini's College of Engineering and Technology
          </span>{' '}
          serves as the official premier technical society for the university cohort. Formed under the active patronage of the Department of Computer Engineering, Information Technology, and CSE(DS), our chapter is founded upon the principles of practical craftsmanship, peer mentorship, and ethical leadership.
        </p>

        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-7 font-sans">
          We organize Maharashtra's premier 36-hour hackathon <em>HackVCET</em>, curate semester-long systems development bootcamps, and represent VCET at prestigious inter-collegiate hackathons and CSI national symposia.
        </p>

        {/* Core Pillars Grid with Asymmetric Polish & Hover Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs">
            <div className="flex items-center space-x-2.5 text-slate-900 dark:text-white font-bold text-xs sm:text-sm mb-1.5">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading">Technical Craft</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Peer-driven workshops in full-stack web, cloud architecture, AI/ML, and open-source tooling.
            </p>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs">
            <div className="flex items-center space-x-2.5 text-slate-900 dark:text-white font-bold text-xs sm:text-sm mb-1.5">
              <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 shrink-0">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading">HackVCET 2026</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Flagship national hackathon bringing top student teams together across Maharashtra.
            </p>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs">
            <div className="flex items-center space-x-2.5 text-slate-900 dark:text-white font-bold text-xs sm:text-sm mb-1.5">
              <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading">CSI Region VII</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Autonomous student branch recognized under the Computer Society of India Mumbai Council.
            </p>
          </div>

          <div className="p-4 bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/70 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs">
            <div className="flex items-center space-x-2.5 text-slate-900 dark:text-white font-bold text-xs sm:text-sm mb-1.5">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <span className="font-heading">Faculty Advisory</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Advised by senior faculty from Computer Engineering, IT, and CSE(DS) departments.
            </p>
          </div>
        </div>
      </div>

      {/* Collegiate Footer Strip */}
      <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          Vidyavardhini's College of Engineering & Technology
        </span>
        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          Estd. 2008
        </span>
      </div>
    </div>
  );
};

export default WhoWeAre;
