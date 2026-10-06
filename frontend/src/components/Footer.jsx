import React from 'react';
import { Mail, Phone, MapPin, Globe, Shield, ExternalLink } from 'lucide-react';

export const Footer = ({ setActiveView, onOpenApply }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-sm mt-auto">
      {/* Upper Collegiate Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Chapter Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900/60 p-1 flex items-center justify-center border border-blue-600/40">
                <img src="/csi-logo.svg" alt="CSI Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base tracking-wide">CSI VCET CHAPTER</h4>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">Region VII • Mumbai</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official collegiate body of the Computer Society of India at Vidyavardhini's College of Engineering and Technology. Committed to engineering research, student leadership, and high-impact software hackathons.
            </p>
            <div className="pt-1 flex items-center space-x-3 text-xs text-slate-400">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-blue-400 font-semibold">
                Chapter ID: MH-VCET-3200
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('members')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Council & Faculty Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('constitution')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Chapter Constitution & Bylaws
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenApply}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center space-x-1"
                >
                  <span>Student Recruitment 2026-27</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin-login')}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Admin Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Committees & Focus */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Committees & Wings
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Technical & Full-Stack Development Wing</li>
              <li>• HackVCET Organizing Committee</li>
              <li>• AI, Machine Learning & Systems SIG</li>
              <li>• Creative Design & Brand Communications</li>
              <li>• Industry Relations & Corporate Sponsorship</li>
            </ul>
          </div>

          {/* Institutional Affiliation */}
          <div className="space-y-3">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Campus Location
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Vidyavardhini's College of Engineering & Technology, K.T. Marg, Vasai Road (W), Palghar - 401202.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 font-mono">csi@vcet.edu.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href="https://vcet.edu.in"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-blue-400 underline underline-offset-2"
                >
                  vcet.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} CSI VCET Student Chapter. All Rights Reserved.</p>
          <p className="text-[11px] text-slate-500">
            Crafted by CSI VCET Technical Council • Powered by MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
