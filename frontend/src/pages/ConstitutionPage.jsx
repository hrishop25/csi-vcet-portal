import React from 'react';
import { BookOpen, ShieldCheck, Scale, Award, FileText, CheckCircle2, Download, Printer } from 'lucide-react';

export const ConstitutionPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-10 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Document Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-900 p-2 flex items-center justify-center">
                <img src="/csi-logo.svg" alt="CSI Logo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-widest text-blue-700 uppercase">
                  OFFICIAL INSTITUTIONAL BYLAWS
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Chapter Constitution
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Constitution</span>
              </button>
            </div>
          </div>

          {/* Institutional Preamble */}
          <div className="bg-blue-50/60 rounded-2xl p-6 border border-blue-100 space-y-3">
            <div className="flex items-center space-x-2 text-blue-900 font-extrabold text-sm uppercase tracking-wide">
              <Scale className="w-4 h-4 text-blue-700" />
              <span>Preamble</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed italic">
              "We, the student body and faculty coordinators of Vidyavardhini's College of Engineering and Technology (VCET), operating under the charter of the Computer Society of India (CSI), hereby establish this Constitution to foster excellence in computer science and information technology, encourage peer research and collaborative engineering, uphold ethical standards in technological practice, and provide an enduring platform for student leadership."
            </p>
          </div>

          {/* Articles */}
          <div className="space-y-8 text-sm text-slate-700 pt-2">
            {/* Article I */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono">Art. I</span>
                <span>Name, Jurisdiction & Affiliation</span>
              </h2>
              <p className="leading-relaxed">
                The name of this organization shall be the <strong>Computer Society of India - Student Chapter at Vidyavardhini's College of Engineering and Technology</strong> (hereinafter referenced as "CSI VCET"). The chapter functions under the patronage of the Department of Computer Engineering and is recognized by the Computer Society of India Mumbai Chapter (Region VII).
              </p>
            </section>

            {/* Article II */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono">Art. II</span>
                <span>Core Objectives</span>
              </h2>
              <ul className="space-y-2 list-none pl-0">
                {[
                  'Organize state and national level hackathons, competitive programming sprints, and technical symposia.',
                  'Facilitate student workshops in modern software development stacks (Full-Stack MERN, Cloud, AI/ML, DevOps).',
                  'Bridge the academia-industry gap through guest lectures from senior software engineers and VCET alumni.',
                  'Maintain student-led open source repositories and chapter software infrastructure.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Article III */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono">Art. III</span>
                <span>Membership & Eligibility</span>
              </h2>
              <p className="leading-relaxed">
                Membership in CSI VCET is open to all enrolled students at VCET irrespective of branch. Formal membership confers rights to voting in general bodies, priority registration in paid workshops, discount allowances for HackVCET, and eligibility to stand for Executive Council elections.
              </p>
            </section>

            {/* Article IV */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono">Art. IV</span>
                <span>Executive Council Hierarchy</span>
              </h2>
              <p className="leading-relaxed">
                The Chapter is administered by an Executive Council appointed each academic tenure under the guidance of the Branch Counselor:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">Chapter Chairperson</span>
                  <span className="text-xs text-slate-500">Executive head representing the chapter before university and CSI national bodies.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">Vice Chairperson</span>
                  <span className="text-xs text-slate-500">Directs internal operations, committee allocations, and inter-collegiate partnerships.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">General Secretary</span>
                  <span className="text-xs text-slate-500">Maintains official meeting minutes, chapter logs, and annual activity reports.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs block">Technical Head</span>
                  <span className="text-xs text-slate-500">Supervises code repositories, workshop technical curriculum, and software portals.</span>
                </div>
              </div>
            </section>

            {/* Article V */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-xs font-mono">Art. V</span>
                <span>Code of Ethics & Non-Discrimination</span>
              </h2>
              <p className="leading-relaxed">
                All council members and student affiliates shall maintain the highest standards of academic integrity, intellectual honesty, and inclusivity. Harassment, unauthorized code plagiarism, or misuse of chapter finances will result in immediate disqualification and referral to the College Disciplinary Committee.
              </p>
            </section>
          </div>

          {/* Signatures & Certification */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900">Dr. Swapna Borde</p>
              <p>Branch Counselor & HOD, Computer Engineering</p>
              <p className="text-[11px] text-slate-400 mt-1">VCET Vasai • CSI Membership #0019284</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Dr. Harish V. Vankudre</p>
              <p>Principal, VCET Vasai</p>
              <p className="text-[11px] text-slate-400 mt-1">Vidyavardhini's College of Engineering and Technology</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConstitutionPage;
