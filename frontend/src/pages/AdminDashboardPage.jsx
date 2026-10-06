import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
  TrendingUp,
  GraduationCap,
  ChevronRight,
  X,
  Calendar,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  FileSpreadsheet,
  LogOut,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const toast = useToast();

  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('All');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Selected Applicant for Detail Modal
  const [selectedApp, setSelectedApp] = useState(null);
  const [notesInput, setNotesInput] = useState('');
  const [slotInput, setSlotInput] = useState('');
  const [modalUpdating, setModalUpdating] = useState(false);

  // Notification Toast
  const loadData = async () => {
    try {
      const [appsRes, statsRes] = await Promise.all([
        api.getApplications({
          year: filterYear,
          department: filterDept,
          status: filterStatus,
          search: searchTerm,
        }),
        api.getDashboardStats(),
      ]);

      if (appsRes.success) setApplications(appsRes.data);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      toast.error('Load Error', err.message || 'Error loading recruitment data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterYear, filterDept, filterStatus]);

  // Client-side quick filter on search term
  const filteredApps = useMemo(() => {
    if (!searchTerm.trim()) return applications;
    const s = searchTerm.toLowerCase();
    return applications.filter(
      (a) =>
        (a.name && a.name.toLowerCase().includes(s)) ||
        (a.email && a.email.toLowerCase().includes(s)) ||
        (a.rollNumber && a.rollNumber.toLowerCase().includes(s)) ||
        (a.domainPreference && a.domainPreference.toLowerCase().includes(s))
    );
  }, [applications, searchTerm]);

  // Inline Status Change handler
  const handleStatusChange = async (appId, newStatus) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((app) => (app._id === appId || app.id === appId ? { ...app, status: newStatus } : app))
    );

    try {
      await api.updateApplicationStatus(appId, { status: newStatus });
      toast.success('Status Updated', `Candidate review status set to "${newStatus}"`);
      // Refresh stats
      const statsRes = await api.getDashboardStats();
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      toast.error('Status Update Failed', err.message);
      loadData(); // Revert on failure
    }
  };

  // Delete Application
  const handleDelete = async (appId, applicantName) => {
    if (
      !window.confirm(
        `Are you sure you want to permanently delete the application for "${applicantName}"?`
      )
    ) {
      return;
    }

    try {
      await api.deleteApplication(appId);
      setApplications((prev) => prev.filter((a) => a._id !== appId && a.id !== appId));
      toast.info('Application Removed', `Candidate application for ${applicantName} was deleted.`);
      const statsRes = await api.getDashboardStats();
      if (statsRes.success) setStats(statsRes.stats);
    } catch (err) {
      toast.error('Delete Failed', err.message);
    }
  };

  // Open Details Modal
  const openDetails = (app) => {
    setSelectedApp(app);
    setNotesInput(app.adminNotes || '');
    setSlotInput(app.interviewSlot || '');
  };

  // Save Modal Notes / Slot
  const handleSaveModalDetails = async () => {
    if (!selectedApp) return;
    setModalUpdating(true);
    try {
      const id = selectedApp._id || selectedApp.id;
      const res = await api.updateApplicationStatus(id, {
        adminNotes: notesInput,
        interviewSlot: slotInput,
      });

      if (res.success) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id || a.id === id ? { ...a, adminNotes: notesInput, interviewSlot: slotInput } : a))
        );
        setSelectedApp((prev) => ({ ...prev, adminNotes: notesInput, interviewSlot: slotInput }));
        toast.success('Notes & Slot Saved', 'Review remarks and scheduled slot updated successfully.');
      }
    } catch (err) {
      toast.error('Save Failed', err.message);
    } finally {
      setModalUpdating(false);
    }
  };

  // CSV Export handler with JWT token support
  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await api.exportCSV();
      toast.success('Roster Exported', 'Full candidate application roster downloaded successfully.');
    } catch (err) {
      console.error('Export CSV Error:', err);
      // Fallback to direct token URL if blob download is blocked
      window.open(api.getExportCSVUrl(), '_blank');
    } finally {
      setExporting(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    toast.info('Session Ended', 'You have been signed out of the Admin Console.');
    if (onLogout) onLogout();
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Interviewed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Declined':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-emerald-500';
      case 'Interviewed':
        return 'bg-blue-500';
      case 'Declined':
        return 'bg-rose-500';
      case 'Pending':
      default:
        return 'bg-amber-500';
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-950 min-h-screen py-8 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Chapter Administration Console</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recruitment Applications & Candidate Review
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Vidyavardhini's College of Engineering and Technology • CSI Chapter Cycle 2026-27
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400">{user?.chapterDesignation || 'Core Lead'}</p>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={exporting}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs disabled:opacity-50"
              title="Download Applications as CSV"
            >
              <Download className={`w-3.5 h-3.5 ${exporting ? 'animate-bounce text-blue-600' : 'text-blue-700 dark:text-blue-400'}`} />
              <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
            </button>
            <button
              onClick={() => {
                setRefreshing(true);
                loadData();
              }}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200 dark:border-rose-900/60 transition-colors shadow-2xs"
              title="Sign Out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Statistical Summary Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.totalApplications}</p>
              <span className="text-[10px] text-slate-400">Applications</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 shadow-2xs">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Pending
              </span>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats.pending}</p>
              <span className="text-[10px] text-amber-700/80 dark:text-amber-400/80">Awaiting Review</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 shadow-2xs">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" /> Interviewed
              </span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{stats.interviewed}</p>
              <span className="text-[10px] text-blue-700/80 dark:text-blue-400/80">Evaluated</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-2xs">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Accepted
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.accepted}</p>
              <span className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">Council Inductees</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20 shadow-2xs">
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Declined
              </span>
              <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{stats.declined}</p>
              <span className="text-[10px] text-rose-700/80 dark:text-rose-400/80">Not Selected</span>
            </div>

            <div className="bg-slate-900 dark:bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-2xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-amber-400" /> Selectivity
              </span>
              <p className="text-2xl font-black text-white mt-1">{stats.acceptanceRate}%</p>
              <span className="text-[10px] text-slate-400">Acceptance Rate</span>
            </div>
          </div>
        )}

        {/* Interactive Controls & Filters Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input (5 cols) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidates by name, email, roll number, or domain..."
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter: Year (2 cols) */}
            <div className="md:col-span-2">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none font-semibold text-slate-900 dark:text-white"
              >
                <option value="All">All Years</option>
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE)</option>
                <option value="TE">Third Year (TE)</option>
                <option value="BE">Final Year (BE)</option>
              </select>
            </div>

            {/* Filter: Department (3 cols) */}
            <div className="md:col-span-3">
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none font-semibold text-slate-900 dark:text-white"
              >
                <option value="All">All Departments</option>
                <option value="CSE(DS)">CSE(DS)</option>
                <option value="Computer Engineering">Computer Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                <option value="Electronics & Telecommunication">EXTC</option>
                <option value="Mechanical Engineering">Mechanical</option>
                <option value="Civil Engineering">Civil</option>
              </select>
            </div>

            {/* Filter: Status (2 cols) */}
            <div className="md:col-span-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:outline-none font-semibold text-slate-900 dark:text-white"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Declined">Declined</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing <strong>{filteredApps.length}</strong> of{' '}
              <strong>{applications.length}</strong> recruitment applications
            </span>
            {(filterYear !== 'All' || filterDept !== 'All' || filterStatus !== 'All' || searchTerm) && (
              <button
                onClick={() => {
                  setFilterYear('All');
                  setFilterDept('All');
                  setFilterStatus('All');
                  setSearchTerm('');
                }}
                className="text-blue-700 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Interactive Data Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <th className="py-4 px-4 sm:px-6">Candidate / Contact</th>
                  <th className="py-4 px-4">Academic Year & Dept</th>
                  <th className="py-4 px-4">Preferred Domain</th>
                  <th className="py-4 px-4">Date Applied</th>
                  <th className="py-4 px-4">Review Status (Inline)</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                {loading ? (
                  <>
                    {[1, 2, 3, 4].map((n) => (
                      <tr key={n} className="animate-pulse">
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl skeleton-shimmer shrink-0" />
                            <div className="space-y-1.5 w-36">
                              <div className="h-3.5 skeleton-shimmer rounded-md w-full" />
                              <div className="h-2.5 skeleton-shimmer rounded-md w-2/3" />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1.5 w-24">
                            <div className="h-3.5 skeleton-shimmer rounded-md w-12" />
                            <div className="h-2.5 skeleton-shimmer rounded-md w-full" />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-6 skeleton-shimmer rounded-lg w-20" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-3.5 skeleton-shimmer rounded-md w-20" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="h-7 skeleton-shimmer rounded-xl w-28" />
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <div className="h-7 skeleton-shimmer rounded-xl w-16 ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500 dark:text-slate-400">
                      No applications match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => {
                    const appId = app._id || app.id;
                    const initials = app.name
                      ? app.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)
                      : 'ST';

                    return (
                      <tr
                        key={appId}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                      >
                        {/* Candidate Column */}
                        <td className="py-3.5 px-4 sm:px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-extrabold text-slate-900 dark:text-white truncate">
                                {app.name}
                              </p>
                              <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                <span>{app.email}</span>
                                {app.rollNumber && (
                                  <>
                                    <span>•</span>
                                    <span className="font-mono text-slate-600 dark:text-slate-300">{app.rollNumber}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Year & Dept */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                              {app.year}
                            </span>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-[160px]">
                              {app.department}
                            </p>
                          </div>
                        </td>

                        {/* Domain Preference */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {app.domainPreference || 'General'}
                          </span>
                        </td>

                        {/* Date Applied */}
                        <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {app.dateApplied
                            ? new Date(app.dateApplied).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'N/A'}
                        </td>

                        {/* Inline Status Dropdown Selector */}
                        <td className="py-3.5 px-4">
                          <div className="relative inline-block">
                            <select
                              value={app.status || 'Pending'}
                              onChange={(e) => handleStatusChange(appId, e.target.value)}
                              className={`appearance-none pl-6 pr-8 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${getStatusBadge(
                                app.status
                              )}`}
                            >
                              <option value="Pending">Pending Review</option>
                              <option value="Interviewed">Interviewed</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Declined">Declined</option>
                            </select>
                            {/* Color indicator dot */}
                            <span
                              className={`w-2 h-2 rounded-full absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${getStatusDot(
                                app.status
                              )}`}
                            />
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => openDetails(app)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                              title="View Applicant Profile & Notes"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(appId, app.name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Statistical Breakdown Cards & Graphs */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Breakdown Bar Meters */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">
                Applications by Department
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Candidate pool distribution across engineering departments at VCET
              </p>

              <div className="space-y-4">
                {Object.entries(stats.byDepartment || {}).map(([dept, count]) => {
                  const pct = stats.totalApplications > 0
                    ? Math.round((count / stats.totalApplications) * 100)
                    : 0;
                  return (
                    <div key={dept} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{dept}</span>
                        <span className="text-slate-900 dark:text-white font-mono">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Academic Year Distribution & Council Health */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">
                  Distribution by Academic Year
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Participation across Undergrad Classes (FE, SE, TE, BE)
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Object.entries(stats.byYear || {}).map(([yr, count]) => (
                    <div
                      key={yr}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center"
                    >
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        {yr} Year
                      </span>
                      <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{count}</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">Applicants</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Council Quick Status Banner */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-400">Active Chapter Members</p>
                  <p className="text-lg font-black text-white">{stats.membersCount} Council Leads</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-blue-400">Annual Flagship Events</p>
                  <p className="text-lg font-black text-white">{stats.eventsCount} Published</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applicant Detail / Notes Review Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all">
              {/* Header */}
              <div className="bg-[#0f2862] text-white p-6 flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                      {selectedApp.year}
                    </span>
                    <span className="text-xs text-blue-200 font-medium">{selectedApp.department}</span>
                  </div>
                  <h3 className="text-xl font-black text-white mt-1">{selectedApp.name}</h3>
                  <p className="text-xs text-blue-100/90">{selectedApp.email} • {selectedApp.phone || 'No phone'}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs sm:text-sm">
                {/* Domain & Skills */}
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Committee Domain:</span>
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                    {selectedApp.domainPreference}
                  </span>
                </div>

                {selectedApp.skills && selectedApp.skills.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Applicant Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Statement of Purpose */}
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Statement of Purpose / Why Join:</span>
                  <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 leading-relaxed text-xs">
                    {selectedApp.statementOfPurpose || 'No statement provided by candidate.'}
                  </p>
                </div>

                {/* Portfolio URL */}
                {selectedApp.portfolioUrl && (
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Portfolio / Profile Link:</span>
                    <a
                      href={selectedApp.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:underline font-semibold text-xs"
                    >
                      <span>{selectedApp.portfolioUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Admin Interview Slot & Notes Inputs */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Scheduled Interview Slot
                    </label>
                    <input
                      type="text"
                      value={slotInput}
                      onChange={(e) => setSlotInput(e.target.value)}
                      placeholder="e.g. 2026-10-15 03:00 PM, Lab 402"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Internal Committee Notes / Interview Feedback
                    </label>
                    <textarea
                      rows="3"
                      value={notesInput}
                      onChange={(e) => setNotesInput(e.target.value)}
                      placeholder="Add interviewer remarks, live coding score, or notes..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={handleSaveModalDetails}
                  disabled={modalUpdating}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
                >
                  {modalUpdating ? 'Saving...' : 'Save Notes & Slot'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboardPage;
