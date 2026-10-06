import React, { useState, useEffect } from 'react';
import { Mail, Phone, Users, Award, Shield, GraduationCap, Table, LayoutGrid, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

const categories = [
  'All',
  'Faculty Coordinators',
  'Core Council',
  'Technical Team',
  'Events & Operations',
  'Creatives & PR',
];

// Committee Table Dataset matching Image 3 with Bollywood & Avengers Star Avatars
const committeeTableRows = [
  {
    position: 'Chairperson',
    members: [{ name: 'Siddharth Chakravarty', image: '/actors/rdj.jpg' }],
    dept: 'CSE(DS)',
  },
  {
    position: 'Treasurer',
    members: [{ name: 'Aditya Bawane', image: '/actors/cumberbatch.jpg' }],
    dept: 'IT',
  },
  {
    position: 'Secretary',
    members: [
      { name: 'Pranay Ippakayal', image: '/actors/srk.jpg' },
      { name: 'Sangini Shetty', image: '/actors/alia.jpg' },
    ],
    dept: 'IT',
  },
  {
    position: 'Joint Secretary',
    members: [
      { name: 'Vatsal Makadiya', image: '/actors/chrisevans.jpg' },
      { name: 'Sumit Mali', image: '/actors/hemsworth.jpg' },
    ],
    dept: 'COMPS',
  },
  {
    position: 'Technical Head',
    members: [
      { name: 'Wajiha Kulsum', image: '/actors/zendaya.jpg' },
      { name: 'Shubham Singh', image: '/actors/tomholland.jpg' },
      { name: 'Parth Vasave', image: '/actors/markruffalo.jpg' },
    ],
    dept: 'COMPS / IT / CSE(DS)',
  },
  {
    position: 'Organizing Head',
    members: [
      { name: 'Shreya Kathe', image: '/actors/katrina.jpg' },
      { name: 'Kunal Patil', image: '/actors/hrithik.jpg' },
      { name: 'Aditi Gupta', image: '/actors/kareena.jpg' },
      { name: 'Bhumi Kamble', image: '/actors/anushka.jpg' },
      { name: 'Aditi Rasal', image: '/actors/deepika.jpg' },
    ],
    dept: 'IT & CSE(DS)',
  },
  {
    position: 'PR Head',
    members: [
      { name: 'Meenakshi Kshirsagar', image: '/actors/elizabeth_olsen.jpg' },
      { name: 'Khushi Machhi', image: '/actors/scarlett.jpg' },
      { name: 'Shardul Brid', image: '/actors/ranveer.jpg' },
    ],
    dept: 'IT & CSE(DS)',
  },
  {
    position: 'Admin Head',
    members: [
      { name: 'Gargi Betawadkar', image: '/actors/alia.jpg' },
      { name: 'Shreya Dadhekar', image: '/actors/zendaya.jpg' },
      { name: 'Saivamehi Jilla', image: '/actors/katrina.jpg' },
    ],
    dept: 'COMPS & CSE(DS)',
  },
];

import { defaultMembers } from '../data/fallbackData';

export const MembersPage = ({ onOpenApply }) => {
  const [members, setMembers] = useState(defaultMembers);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.getMembers();
        if (res.success && res.data && res.data.length > 0) {
          setMembers(res.data);
        }
      } catch (err) {
        // Keeps defaultMembers intact if API is offline
        console.warn('Backend unavailable, using bundled council roster:', err.message);
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
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            <span>Chapter Governance & Student Leadership 2025-26</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Faculty Mentors & Executive Council
          </h1>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            The official governing committee of the Computer Society of India Student Chapter at Vidyavardhini's College of Engineering and Technology (VCET).
          </p>

          {/* View Mode Toggle: Grid vs Official Table */}
          <div className="pt-2 flex justify-center items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Council Profiles</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Official VCET Table (2025-26)</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: OFFICIAL TABLE (Matches Image 3) */}
        {viewMode === 'table' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#0f2862] dark:text-blue-400">
                  CSI Committee (2025-26) :
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-400">
                  As certified on the institutional register of VCET Vasai.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Official Roster
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0f2862] text-white">
                    <th className="py-3.5 px-4 sm:px-6 font-bold w-1/4 border-r border-blue-900 text-amber-300">
                      Position
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 font-bold w-1/2 border-r border-blue-900 text-white">
                      Student Leader
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 font-bold w-1/4 text-amber-300">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {committeeTableRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={
                        idx % 2 === 0
                          ? 'bg-white dark:bg-slate-900'
                          : 'bg-slate-50 dark:bg-slate-800/50'
                      }
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-extrabold text-slate-950 dark:text-white border-r border-slate-200 dark:border-slate-800 align-middle">
                        {row.position}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 space-y-2">
                        {row.members.map((m, i) => (
                          <div key={i} className="flex items-center space-x-3 py-0.5">
                            <img
                              src={m.image}
                              alt={m.name}
                              className="w-9 h-9 rounded-full object-cover border-2 border-blue-600/40 shadow-2xs shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-950 dark:text-white">
                                {m.name}
                              </div>
                            </div>
                          </div>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 font-mono text-slate-800 dark:text-slate-300 text-xs font-semibold align-middle">
                        {row.dept}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode 2: PROFILES GRID */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-700 text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Members Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-xs space-y-4 p-5"
                  >
                    <div className="h-52 rounded-2xl skeleton-shimmer w-full" />
                    <div className="h-4 skeleton-shimmer rounded-md w-3/4" />
                    <div className="h-3 skeleton-shimmer rounded-md w-1/2" />
                    <div className="h-3 skeleton-shimmer rounded-md w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id || member._id}
                    className="card-interactive bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Container */}
                      <div className="relative h-60 overflow-hidden bg-slate-900">
                        <img
                          src={member.imageUrl || '/actors/rdj.jpg'}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                            {member.category}
                          </span>
                        </div>
                        {member.department && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-400 text-slate-950 shadow-sm">
                              {member.department}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-5 space-y-1.5">
                        <h3 className="font-heading font-extrabold text-slate-950 dark:text-white text-base group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-bold text-blue-700 dark:text-blue-400">
                          {member.role}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-400">
                          Department of {member.department}
                        </p>

                        {member.bio && (
                          <p className="text-xs text-slate-700 dark:text-slate-300 pt-2 line-clamp-3 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Channels */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                      {member.email ? (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center space-x-1.5 text-slate-800 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 truncate text-[11px] font-medium"
                          title={member.email}
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0 text-blue-700 dark:text-blue-400" />
                          <span className="truncate">{member.email}</span>
                        </a>
                      ) : (
                        <span className="font-medium">VCET Campus</span>
                      )}

                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center space-x-1 text-slate-800 dark:text-slate-300 hover:text-emerald-700 text-[11px] shrink-0 ml-2 font-medium"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Join Council Callout */}
        <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="font-heading text-xl font-bold text-slate-950 dark:text-white">
            Interested in joining the CSI VCET Council?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 max-w-xl mx-auto">
            Student recruitment applications for junior committee associates and technical leads are currently open.
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
