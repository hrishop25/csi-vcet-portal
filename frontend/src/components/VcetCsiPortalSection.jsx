import React, { useState } from 'react';
import { Info, Image, User, Users, Mail, Phone, FileText, Download, CheckCircle, ExternalLink, Calendar } from 'lucide-react';

export const VcetCsiPortalSection = () => {
  const [activeTab, setActiveTab] = useState('faculty');

  // Faculty Coordinators
  const facultyList = [
    {
      name: 'Dr. Swati Varma',
      dept: '(Computer Engg.)',
      email: 'swati.varma@vcet.edu.in',
      phone: '9869775463',
      image: '/actors/deepika.jpg',
      role: 'Associate Professor & Faculty Coordinator',
    },
    {
      name: 'Ms. Maya Varghese',
      dept: '(CSE(DS))',
      email: 'maya.varghese@vcet.edu.in',
      phone: '9699547709',
      image: '/actors/elizabeth_olsen.jpg',
      role: 'Assistant Professor & Faculty Coordinator',
    },
    {
      name: 'Ms. Pragati Patil',
      dept: '(InfoTech.)',
      email: 'pragati.patil@vcet.edu.in',
      phone: '9769990253',
      image: '/actors/scarlett.jpg',
      role: 'Assistant Professor & Faculty Coordinator',
    },
  ];

  // CSI Committee 2025-26
  const committeeData = [
    {
      position: 'Chairperson',
      members: [{ name: 'Siddharth Chakravarty', dept: 'CSE(DS)', image: '/actors/rdj.jpg' }],
    },
    {
      position: 'Treasurer',
      members: [{ name: 'Aditya Bawane', dept: 'IT', image: '/actors/cumberbatch.jpg' }],
    },
    {
      position: 'Secretary',
      members: [
        { name: 'Pranay Ippakayal', dept: 'IT', image: '/actors/srk.jpg' },
        { name: 'Sangini Shetty', dept: 'IT', image: '/actors/alia.jpg' },
      ],
    },
    {
      position: 'Joint Secretary',
      members: [
        { name: 'Vatsal Makadiya', dept: 'COMPS', image: '/actors/chrisevans.jpg' },
        { name: 'Sumit Mali', dept: 'COMPS', image: '/actors/hemsworth.jpg' },
      ],
    },
    {
      position: 'Technical Head',
      members: [
        { name: 'Wajiha Kulsum', dept: 'COMPS', image: '/actors/zendaya.jpg' },
        { name: 'Shubham Singh', dept: 'IT', image: '/actors/tomholland.jpg' },
        { name: 'Parth Vasave', dept: 'CSE(DS)', image: '/actors/markruffalo.jpg' },
      ],
    },
    {
      position: 'Organizing Head',
      members: [
        { name: 'Shreya Kathe', dept: 'IT', image: '/actors/katrina.jpg' },
        { name: 'Kunal Patil', dept: 'IT', image: '/actors/hrithik.jpg' },
        { name: 'Aditi Gupta', dept: 'IT', image: '/actors/kareena.jpg' },
        { name: 'Bhumi Kamble', dept: 'IT', image: '/actors/anushka.jpg' },
        { name: 'Aditi Rasal', dept: 'CSE(DS)', image: '/actors/deepika.jpg' },
      ],
    },
    {
      position: 'PR Head',
      members: [
        { name: 'Meenakshi Kshirsagar', dept: 'IT', image: '/actors/elizabeth_olsen.jpg' },
        { name: 'Khushi Machhi', dept: 'IT', image: '/actors/scarlett.jpg' },
        { name: 'Shardul Brid', dept: 'CSE(DS)', image: '/actors/ranveer.jpg' },
      ],
    },
    {
      position: 'Admin Head',
      members: [
        { name: 'Gargi Betawadkar', dept: 'COMPS', image: '/actors/alia.jpg' },
        { name: 'Shreya Dadhekar', dept: 'CSE(DS)', image: '/actors/zendaya.jpg' },
        { name: 'Saivamehi Jilla', dept: 'COMPS', image: '/actors/katrina.jpg' },
      ],
    },
  ];

  // Annual Reports Archive matching Image 3
  const annualReports = [
    { year: '2022-2023', code: 'REP-22-23' },
    { year: '2021-2022', code: 'REP-21-22' },
    { year: '2020-2021', code: 'REP-20-21' },
    { year: '2019-2020', code: 'REP-19-20' },
    { year: '2018-2019', code: 'REP-18-19' },
    { year: '2017-2018', code: 'REP-17-18' },
  ];

  // Gallery items for the Gallery tab
  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=80',
      title: 'Annual Council Induction Assembly',
      desc: 'Welcoming the new core committee and domain associates.',
    },
    {
      url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
      title: 'HackVCET 36-Hour Hackathon',
      desc: 'Over 50 teams building high-impact tech solutions.',
    },
    {
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      title: 'Hands-on Full Stack Bootcamp',
      desc: 'Interactive software development in Computer Engg Lab 402.',
    },
    {
      url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
      title: 'Industry Tech Seminar on AI Systems',
      desc: 'Guest speakers from top software firms in VCET Auditorium.',
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Institutional Section Banner (Matching vcet.edu.in header style) */}
        <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="relative z-10 space-y-1">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center space-x-2">
              <span>Home</span>
              <span>»</span>
              <span>CSI VCET Chapter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
              Computer Society of India
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Departmental Student Body • Vidyavardhini's College of Engineering and Technology
            </p>
          </div>
        </div>

        {/* 2-Column Institutional Portal Layout (Matching Images 2 & 3) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Navigation Sidebar (Matching VCET Portal Sidebar) */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs divide-y divide-slate-200/80 dark:divide-slate-800">
              <button
                onClick={() => setActiveTab('about')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 text-xs sm:text-sm font-semibold text-left transition-colors ${
                  activeTab === 'about'
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Info className="w-4 h-4 shrink-0" />
                <span>About</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 text-xs sm:text-sm font-semibold text-left transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Image className="w-4 h-4 shrink-0" />
                <span>Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('faculty')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 text-xs sm:text-sm font-semibold text-left transition-colors ${
                  activeTab === 'faculty'
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Faculty</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 text-xs sm:text-sm font-semibold text-left transition-colors ${
                  activeTab === 'students'
                    ? 'bg-blue-700 text-white shadow-xs font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Student Details</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            {/* TAB 1: FACULTY (Matches Image 2) */}
            {activeTab === 'faculty' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Faculty Coordinators
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Distinguished faculty mentors guiding CSI VCET chapter initiatives.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facultyList.map((fac, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="p-4 flex flex-col items-center text-center">
                        {/* Portrait Photo (Bollywood / Avengers Star) */}
                        <div className="w-28 h-32 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 mb-3 shadow-inner relative group">
                          <img
                            src={fac.image}
                            alt={fac.name}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Name in Golden / Amber Hue as in Image 2 */}
                        <h4 className="font-heading font-bold text-base text-amber-700 dark:text-amber-400">
                          {fac.name}
                        </h4>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                          {fac.dept}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                          {fac.role}
                        </p>
                      </div>

                      {/* Contact Info (Matching Image 2 email & phone) */}
                      <div className="p-3.5 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
                        <a
                          href={`mailto:${fac.email}`}
                          className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 truncate"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">{fac.email}</span>
                        </a>
                        <a
                          href={`tel:${fac.phone}`}
                          className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{fac.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: STUDENT DETAILS (Matches Image 3) */}
            {activeTab === 'students' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-400">
                    CSI Committee (2025-26) :
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Official executive council roster for the current academic tenure.
                  </p>
                </div>

                {/* Structured Institutional Table (Matching Image 3 Navy Header Table) */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#0f2862] text-white">
                        <th className="py-3 px-4 sm:px-6 font-bold w-1/4 border-r border-blue-900">
                          Position
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold w-1/2 border-r border-blue-900">
                          Student Leader
                        </th>
                        <th className="py-3 px-4 sm:px-6 font-bold w-1/4">
                          Department
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {committeeData.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={
                            rIdx % 2 === 0
                              ? 'bg-white dark:bg-slate-900'
                              : 'bg-slate-50/70 dark:bg-slate-800/50'
                          }
                        >
                          {/* Position Column */}
                          <td className="py-3 px-4 sm:px-6 font-bold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 align-middle">
                            {row.position}
                          </td>

                          {/* Name & Photo Column */}
                          <td className="py-2.5 px-4 sm:px-6 text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 space-y-2">
                            {row.members.map((m, mIdx) => (
                              <div key={mIdx} className="flex items-center space-x-3 py-1">
                                <img
                                  src={m.image}
                                  alt={m.name}
                                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/40 shadow-xs shrink-0"
                                />
                                <div>
                                  <div className="font-semibold text-slate-900 dark:text-white leading-tight">
                                    {m.name}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </td>

                          {/* Department Column */}
                          <td className="py-3 px-4 sm:px-6 font-mono text-slate-600 dark:text-slate-400 space-y-1 align-middle">
                            {row.members.map((m, mIdx) => (
                              <div key={mIdx} className="text-xs font-semibold">
                                {m.dept}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Annual Reports Archive (Matching Image 3) */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <h4 className="font-heading text-lg font-bold text-blue-900 dark:text-blue-400">
                    Reports - Events and Committee Details :
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Official annual activity documentation submitted to the University and CSI National Body.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {annualReports.map((rep, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center space-y-2 hover:border-amber-400 transition-colors shadow-2xs group cursor-pointer"
                      >
                        {/* Golden Report Booklet Icon matching Image 3 */}
                        <div className="w-10 h-10 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                          <FileText className="w-5 h-5 text-slate-900" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {rep.year}
                        </span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                          View Report
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    About CSI VCET Chapter
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Official history and charter at Vidyavardhini's College of Engineering and Technology.
                  </p>
                </div>

                <div className="prose dark:prose-invert text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed">
                  <p>
                    The <strong>Computer Society of India (CSI)</strong> is the first and largest body of computer professionals in India. The Student Chapter at <strong>Vidyavardhini's College of Engineering and Technology (VCET)</strong> was instituted in 2008 to cultivate technical intellect, foster research aptitude, and empower aspiring engineers with practical software engineering skills.
                  </p>
                  <p>
                    Functioning under the collective mentorship of the Department of <strong>Computer Engineering</strong>, <strong>Information Technology</strong>, and <strong>CSE(DS)</strong> (Computer Science & Engineering - Data Science), the chapter conducts state-level technical symposia, national 36-hour hackathons, coding sprints, and industry guest lectures.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-900 dark:text-white text-xs block">CSE(DS) Department</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Pioneering Big Data, Machine Learning, and Cloud Systems innovations.</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-900 dark:text-white text-xs block">COMPS & IT Depts</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Foundational engineering in Full-Stack, Cyber Security & Systems.</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="font-bold text-slate-900 dark:text-white text-xs block">CSI Region VII & VCET</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Autonomous Institute (NAAC 'A' Accredited), premier Mumbai student chapter.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Chapter Photo Gallery
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Moments from student hackathons, coding contests, and induction ceremonies.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryPhotos.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs group bg-slate-50 dark:bg-slate-800"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VcetCsiPortalSection;
