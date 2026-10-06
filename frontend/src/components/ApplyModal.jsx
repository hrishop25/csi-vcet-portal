import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, AlertCircle, User, Mail, Phone, BookOpen, Layers, Loader2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const ApplyModal = ({ isOpen, onClose, onSuccess }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    year: 'SE',
    department: 'Computer Engineering',
    domainPreference: 'Technical',
    skills: '',
    statementOfPurpose: '',
    portfolioUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [appRefId, setAppRefId] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.year || !formData.department) {
      setError('Please fill in all mandatory fields (Name, Email, Year, Department).');
      return;
    }

    setLoading(true);
    try {
      const skillsArray = formData.skills
        ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const res = await api.apply({
        ...formData,
        skills: skillsArray,
      });

      const refId = 'CSI-VCET-2026-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      setAppRefId(refId);
      setSuccess(true);
      toast.success('Application Received!', `Your application (${refId}) is logged for Council Tenure 2026-27.`);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
      toast.error('Submission Failed', err.message || 'Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      year: 'SE',
      department: 'Computer Engineering',
      domainPreference: 'Technical',
      skills: '',
      statementOfPurpose: '',
      portfolioUrl: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6 sm:p-7 flex justify-between items-start">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/30 text-amber-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recruitment 2026-27</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight">
              Join the CSI VCET Student Council
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Fill out this official membership & recruitment application to join the premier student tech chapter.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {success ? (
            <div className="py-6 space-y-6 text-left">
              <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    Application Successfully Logged
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                    Vidyavardhini's College of Engineering & Technology • CSI Council 2026-27
                  </p>
                </div>
              </div>

              {/* Receipt Reference Card */}
              <div className="p-5 bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 space-y-3 font-sans text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/70 dark:border-slate-700/70">
                  <span className="text-slate-500 dark:text-slate-400">Application Reference ID:</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm tracking-wider">
                    {appRefId}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Candidate:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Department:</span>
                    <span className="font-semibold">{formData.department} ({formData.year})</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Target Domain:</span>
                    <span className="font-semibold">{formData.domainPreference}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 text-[10px] uppercase font-bold">Confirmation Sent:</span>
                    <span className="font-semibold truncate block">{formData.email}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Progress Steps */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Next Steps in Selection:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block text-[11px]">1. Form Verified</span>
                    <span className="text-[10px] opacity-80">Application received in admin queue.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300">
                    <span className="font-bold block text-[11px]">2. Interview Shortlist</span>
                    <span className="text-[10px] opacity-80">Notification via email within 5 days.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                    <span className="font-bold block text-[11px]">3. Core Induction</span>
                    <span className="text-[10px] opacity-80">Formal tenure oath and onboarding.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all"
                >
                  Return to Chapter Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 rounded-xl text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ronit Sharma"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    College / Personal Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ronit.sharma@vcet.edu.in"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone and Roll Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98200 XXXXX"
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number / UID
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="e.g. 24CMP042"
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Row 3: Year and Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Academic Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 dark:text-white"
                  >
                    <option value="FE">First Year (FE)</option>
                    <option value="SE">Second Year (SE)</option>
                    <option value="TE">Third Year (TE)</option>
                    <option value="BE">Final Year (BE)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Department / Branch <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="CSE(DS)">CSE(DS)</option>
                    <option value="Electronics & Telecommunication">EXTC</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Preferred Council Domain */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Committee Domain <span className="text-rose-500">*</span>
                </label>
                <select
                  name="domainPreference"
                  value={formData.domainPreference}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-900 dark:text-white"
                >
                  <option value="Technical">Technical & Development (Full-Stack, AI, Cloud)</option>
                  <option value="Web & App">Web & Chapter Portal Infrastructure</option>
                  <option value="Creatives & Design">Creatives, UI/UX & Video Editing</option>
                  <option value="Public Relations & Marketing">PR, Social Media & Outreach</option>
                  <option value="Event Management">Event Logistics & Operations</option>
                  <option value="Sponsorship">Corporate Sponsorship & Industry Relations</option>
                </select>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Technical or Organizational Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, Python, Figma, Public Speaking, Video Editing"
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Statement of Purpose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Why do you wish to join the CSI VCET Chapter?
                </label>
                <textarea
                  name="statementOfPurpose"
                  rows="3"
                  value={formData.statementOfPurpose}
                  onChange={handleChange}
                  placeholder="Tell us about your motivation, prior project experience, or what you hope to achieve with the chapter..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                ></textarea>
              </div>

              {/* Portfolio / GitHub URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Portfolio / GitHub / LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username or https://linkedin.com/in/username"
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl shadow-md flex items-center space-x-2 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Official Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default ApplyModal;
