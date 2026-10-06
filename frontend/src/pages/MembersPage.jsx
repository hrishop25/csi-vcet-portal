import React, { useState, useEffect } from 'react';
import { Mail, Users, Award, Shield, GraduationCap, Briefcase } from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.27a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66A1.66 1.66 0 0 0 7.83 6.27Z"/>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
import { api } from '../services/api';

const categories = [
  'All',
  'Faculty Coordinators',
  'Core Council',
  'Technical Team',
  'Events & Operations',
  'Creatives & PR',
];

export const MembersPage = ({ onOpenApply }) => {
  const [members, setMembers] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.getMembers();
        if (res.success) {
          setMembers(res.data);
        }
      } catch (err) {
        console.error('Failed to load members:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = activeCategory === 'All'
    ? members
    : members.filter((m) => m.category === activeCategory);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Chapter Governance & Leadership</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            CSI VCET Executive Council & Faculty Advisors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Meet the faculty mentors and student leaders driving technical workshops, student mentorship, and flagship events for the 2025-2026 academic tenure.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading chapter members...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id || member._id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img
                      src={member.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-md">
                        {member.category}
                      </span>
                    </div>
                    {member.year && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                          {member.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member Details */}
                  <div className="p-5">
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-600 mt-0.5">{member.role}</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-1">
                      {member.department}
                    </p>

                    {member.bio && (
                      <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Social Channels / Contact Footer */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-semibold text-slate-400">Connect</span>
                  <div className="flex items-center space-x-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-700 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        title="GitHub Profile"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join Council Callout */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Want to join this directory?</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            Applications are currently being accepted for council junior executive, technical associate, and domain volunteer roles.
          </p>
          <button
            onClick={onOpenApply}
            className="mt-4 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-md transition-all"
          >
            Submit Application for Council 2026-27
          </button>
        </div>
      </div>
    </div>
  );
};
export default MembersPage;
