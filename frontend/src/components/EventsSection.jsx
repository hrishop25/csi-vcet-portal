import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowUpRight, CheckCircle, Tag } from 'lucide-react';
import { api } from '../services/api';

export const EventsSection = ({ onOpenApply }) => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        if (res.success) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error('Failed to load events:', err);
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
    <section className="py-12 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">Flagship Calendar</span>
            <h2 className="font-collegiate-serif text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Events & Technical Bootcamps</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              From high-stakes hackathons to in-depth developer bootcamps, explore the events driving tech culture at VCET.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {['All', 'Hackathon', 'Workshop', 'Technical Seminar'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  filter === cat
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400">Loading scheduled events...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id || item._id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-white backdrop-blur-md">
                        {item.category}
                      </span>
                      {item.status === 'Upcoming' ? (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-600 text-white">
                          Upcoming
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-700 text-slate-200">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5">
                    <h3 className="font-collegiate-serif text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">{item.subtitle}</p>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Metadata List */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="text-slate-300 dark:text-slate-600">•</span>
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{item.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={onOpenApply}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-blue-700 dark:bg-slate-800 dark:hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>{item.status === 'Upcoming' ? 'Register / Express Interest' : 'View Recap & Archive'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
