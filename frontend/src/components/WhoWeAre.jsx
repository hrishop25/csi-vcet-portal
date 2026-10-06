import React from 'react';
import { BookOpen, Award, CheckCircle2, Cpu, Globe, Rocket } from 'lucide-react';

export const WhoWeAre = () => {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Accent */}
      <div className="flex items-center space-x-3 mb-4">
        <span className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
          <BookOpen className="w-5 h-5" />
        </span>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Institutional Profile</span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Who We Are</h2>
        </div>
      </div>

      {/* Main Narrative */}
      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
        The <strong>Computer Society of India (CSI) Student Chapter</strong> at{' '}
        <span className="text-slate-900 font-semibold">
          Vidyavardhini's College of Engineering and Technology (VCET)
        </span>{' '}
        is a premier technical body dedicated to advancing research, practical engineering skills,
        and collaborative software craft. Established under the patronage of VCET’s Department of
        Computer Engineering, our student branch bridges textbook curriculum with modern industry
        innovations.
      </p>

      {/* Structured Key Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center space-x-2.5 text-blue-800 font-bold text-sm mb-1.5">
            <Cpu className="w-4 h-4 text-blue-600" />
            <span>Technical Excellence</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Hands-on coding bootcamps in Full-Stack Development, Cloud Platforms, Generative AI, and Systems Architecture.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center space-x-2.5 text-blue-800 font-bold text-sm mb-1.5">
            <Rocket className="w-4 h-4 text-blue-600" />
            <span>National Hackathons</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Organizers of HackVCET, drawing talented coders across India for intense 36-hour real-world problem solving.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center space-x-2.5 text-blue-800 font-bold text-sm mb-1.5">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Industry Linkages</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Interactive tech seminars, alumni mentorship panels, and recruitment workshops with top engineers.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
          <div className="flex items-center space-x-2.5 text-blue-800 font-bold text-sm mb-1.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Accredited Impact</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ranked among the most active collegiate chapters under the CSI Mumbai Chapter Region VII jurisdiction.
          </p>
        </div>
      </div>

      {/* Bullet Checklist */}
      <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
        {[
          'Open to Computer, IT, AI & Data Science, EXTC and multidisciplinary cohorts',
          'Access to national CSI publications, digital conferences, and discounts',
          'Peer-led project incubation and GitHub open-source mentorship',
        ].map((item, idx) => (
          <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhoWeAre;
