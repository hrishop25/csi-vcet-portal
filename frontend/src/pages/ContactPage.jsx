import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
            Institutional Liaison
          </span>
          <h1 className="font-collegiate-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact CSI VCET Chapter
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            For academic collaborations, hackathon sponsorships, guest speaker invites, or student membership inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Campus Contact Info (Matching Image 2 VCET website) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="font-collegiate-serif text-xl font-bold text-slate-900 dark:text-white">
                Campus Secretariat
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Department of Computer Engineering & Information Technology
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">College Address</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Vidyavardhini's College of Engineering & Technology, K.T. Marg, Vartak College Campus, Vasai Road (W), Dist-Palghar, Maharashtra 401202.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">College Helpline</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                    +91 7972019446, +91 7558351747
                  </p>
                  <p className="text-slate-500 text-xs">0250 233 8234 (6 Lines)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Official Correspondence</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 font-mono">
                    vcet_inbox@vcet.edu.in
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                    csi@vcet.edu.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 dark:text-white">Working Hours</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                    Monday to Friday: 09:00 AM – 05:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Accreditation Badge */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                Accreditation & Approvals
              </span>
              <span>Autonomous Institute Affiliated to University of Mumbai • Approved by AICTE & DTE • NBA & NAAC 'A' Accredited.</span>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            {sent ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-collegiate-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Message Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. The CSI VCET Secretariat has received your dispatch and will respond promptly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-5 py-2 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-collegiate-serif text-xl font-bold text-slate-900 dark:text-white">
                  Send Chapter Dispatch
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Prof. / Mr. / Ms. Name"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your.email@organization.edu.in"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Department
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Hackathon Sponsorship / Workshop Inquiry"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about your query or proposal..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
