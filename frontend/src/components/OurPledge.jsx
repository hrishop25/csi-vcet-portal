import React, { useState } from 'react';
import { Target, Play, Shield, Compass, Quote, ArrowRight, Eye } from 'lucide-react';

export const OurPledge = ({ onNavigateConstitution }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between">
      <div>
        {/* Header Accent */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-xl bg-blue-600/30 text-amber-400 border border-blue-400/30">
              <Target className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Guiding Manifesto</span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Our Pledge & Vision</h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            ARTICLE I • BYLAWS
          </span>
        </div>

        {/* Media Box / Showcase Banner */}
        <div className="relative rounded-xl overflow-hidden mb-6 border border-slate-700/80 group">
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
            alt="CSI VCET Innovation Lab"
            className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
          />
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px] flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/90 text-slate-950">
                CAMPUS SPOTLIGHT
              </span>
              <span className="text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded">
                VCET Vasai Lab 402
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">CSI VCET Chapter Documentary</p>
                <p className="text-[11px] text-slate-300">Empowering student builders since 2008</p>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                title="Play Chapter Story"
              >
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quote / Manifesto Text */}
        <div className="relative bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 mb-6">
          <Quote className="w-6 h-6 text-blue-500/40 absolute top-3 right-3" />
          <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            "We, the student body of CSI VCET, pledge to uphold technological curiosity with ethical
            conviction. We commit our resources and teamwork to building software solutions that enrich
            our institution, uplift our peers, and contribute meaningfully to society."
          </p>
          <div className="mt-2 text-right">
            <span className="text-[11px] font-semibold text-amber-400">— Core Committee Charter</span>
          </div>
        </div>

        {/* Core Values Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Ethical Leadership', 'Technical Integrity', 'Peer Collaboration', 'Innovation First'].map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-blue-300 border border-slate-700"
            >
              • {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Navigation Link */}
      <button
        onClick={onNavigateConstitution}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center space-x-2 transition-colors"
      >
        <Shield className="w-3.5 h-3.5 text-amber-400" />
        <span>Read Complete Chapter Constitution & Bylaws</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1" />
      </button>
    </div>
  );
};
export default OurPledge;
