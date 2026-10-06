import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowUpRight, Sparkles, Tag, Users } from 'lucide-react';
import { api } from '../services/api';
import { defaultEvents } from '../data/fallbackData';

export const EventsSection = ({ onOpenApply }) => {
  const [events, setEvents] = useState(defaultEvents);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        if (res.success && res.data && res.data.length > 0) {
          setEvents(res.data);
        }
      } catch (err) {
        console.warn('Backend unavailable, using bundled flagship events:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = filter === 'All'
    ? events
    : events.filter((e) => e.category === filter || e.status === filter);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Left-Aligned Modular Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div className="space-y-1.5 text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
              <Calendar className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
              <span>Flagship Calendar 2026</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              Events & Technical Sprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans max-w-xl leading-relaxed">
              From our flagship 36-hour national hackathon <em className="font-semibold text-blue-900 dark:text-blue-300">HackVCET</em> to hands-on systems architecture seminars, explore active engineering programs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Hackathon', 'Workshop', 'Technical Seminar'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 font-sans ${
                  filter === cat
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid or Skeleton Loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm space-y-4 p-5"
              >
                <div className="h-44 rounded-2xl skeleton-shimmer w-full" />
                <div className="h-5 skeleton-shimmer rounded-md w-3/4" />
                <div className="h-3 skeleton-shimmer rounded-md w-1/2" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 skeleton-shimmer rounded-md w-full" />
                  <div className="h-3 skeleton-shimmer rounded-md w-5/6" />
                </div>
                <div className="h-10 skeleton-shimmer rounded-xl w-full pt-4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id || item._id}
                className="card-interactive bg-white dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail with Subtle Image Zoom */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3.5 left-3.5 flex gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 shadow-md">
                        {item.category}
                      </span>
                      {item.status === 'Upcoming' ? (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white backdrop-blur-md border border-emerald-400/30 shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Upcoming
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-800 text-slate-300 backdrop-blur-md border border-white/10">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Details with Strict Modular Hierarchy */}
                  <div className="p-6">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-slate-950 dark:text-white leading-snug tracking-tight group-hover:text-blue-700 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mt-1 font-mono">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Metadata List */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400 shrink-0" />
                        <span className="font-semibold text-slate-900 dark:text-slate-200">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-slate-400 dark:text-slate-600">•</span>
                        <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="font-medium">{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="truncate font-medium">{item.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={onOpenApply}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-xs group/btn"
                  >
                    <span>{item.status === 'Upcoming' ? 'Register / Express Interest' : 'View Recap & Archive'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
