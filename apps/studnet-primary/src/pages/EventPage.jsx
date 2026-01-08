import React, { useState, useEffect } from 'react';
import './EventPage.css';
import { Calendar } from '../components/ui/calendar';
import { AnimatedRadialChart } from '../components/AnimatedRadialChart';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useTheme } from '../context/ThemeContext';
import { getEventsToday, getEventsUpcoming } from '../lib/api';
import { Loader2, Calendar as CalendarIconLucide, Clock, AlertCircle, Info } from 'lucide-react';

const EventPage = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const [todaySchedule, setTodaySchedule] = useState([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState([]);
  const [loadingToday, setLoadingToday] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [errorToday, setErrorToday] = useState(null);
  const [errorUpcoming, setErrorUpcoming] = useState(null);

  const variants = ['red', 'green', 'orange'];

  useEffect(() => {
    const fetchEvents = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const studentId = searchParams.get('studentId') || 'STU003';

      try {
        setLoadingToday(true);
        const todayData = await getEventsToday(studentId);
        setTodaySchedule(Array.isArray(todayData) ? todayData : []);
        setErrorToday(null);
      } catch (err) {
        console.error("Error fetching today's events:", err);
        setErrorToday("Failed to load today's schedule");
      } finally {
        setLoadingToday(false);
      }

      try {
        setLoadingUpcoming(true);
        const upcomingData = await getEventsUpcoming(studentId);
        setUpcomingSchedule(Array.isArray(upcomingData) ? upcomingData : []);
        setErrorUpcoming(null);
      } catch (err) {
        console.error("Error fetching upcoming events:", err);
        setErrorUpcoming("Failed to load upcoming schedule");
      } finally {
        setLoadingUpcoming(false);
      }
    };

    fetchEvents();
  }, []);

  const calculatePosition = (startTime, endTime) => {
    if (!startTime || !endTime) return { top: '0px', height: '48px' };

    // Assume format HH:MM
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startDecimal = startH + startM / 60;
    const endDecimal = endH + endM / 60;

    // Timeline starts at 7 AM
    const top = Math.max(0, (startDecimal - 7) * 48);
    const height = Math.max(24, (endDecimal - startDecimal) * 48);

    return { top: `${top}px`, height: `${height}px` };
  };

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-6">
        <div className={`
          w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative transition-colors duration-200
          ${isDark ? 'bg-[#0F1115]' : 'bg-slate-100'}
        `}>
          <DashboardNavbar />
          <div className={`
            flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 relative scrollbar-hide transition-colors duration-200
            ${isDark ? 'bg-[#0F1115]' : ''}
          `}>
            <div className="event-page-container flex flex-col gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary column (Ongoing + Schedule) */}
                <div className="flex flex-col gap-6">
                  <section className={`event-ongoing-section rounded-xl shadow-sm p-5 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                    <h1 className={`event-section-title ${isDark ? 'text-[#FFFFFF]' : ''}`}>Ongoing Class</h1>
                    <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide snap-x">
                      {/* Using first few today items as placeholder for ongoing since there's no specific ongoing API */}
                      {loadingToday ? (
                        <div className="w-full flex justify-center py-4"><Loader2 className="animate-spin text-purple-600" /></div>
                      ) : todaySchedule.length > 0 ? (
                        todaySchedule.slice(0, 3).map((item, idx) => (
                          <div key={idx} className={`event-ongoing-card event-card-${variants[idx % variants.length]} min-w-[280px] md:min-w-[300px] flex-shrink-0 snap-center`}>
                            <div className="event-ongoing-header">
                              <div className="event-ongoing-percentage">{80 - idx * 20}%</div>
                              <span className="event-ongoing-arrow">›</span>
                            </div>
                            <div className="event-ongoing-name">{item.title}</div>
                            <div className="event-ongoing-progress">
                              <div className={`event-ongoing-progress-bar event-progress-${variants[idx % variants.length]}`} style={{ width: `${80 - idx * 20}%` }}></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-gray-500 italic">No ongoing classes right now.</div>
                      )}
                    </div>
                  </section>

                  <section className={`event-today-section rounded-xl shadow-sm p-5 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                    <h2 className="event-section-title">Today Schedule</h2>

                    {loadingToday ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
                        <p className="text-sm text-gray-400">Loading schedule...</p>
                      </div>
                    ) : errorToday ? (
                      <div className="flex flex-col items-center justify-center py-20 text-red-500">
                        <AlertCircle className="w-10 h-10 mb-2" />
                        <p className="text-sm">{errorToday}</p>
                      </div>
                    ) : (
                      <div className="event-today-timeline">
                        <div className="event-time-labels">
                          {timeSlots.map((slot) => (
                            <div key={slot} className="event-time-label">
                              {slot}
                            </div>
                          ))}
                        </div>
                        <div className="event-schedule-items">
                          {/* Timeline grid lines */}
                          <div className="event-timeline-grid">
                            {timeSlots.map((slot) => (
                              <div key={slot} className="event-timeline-line"></div>
                            ))}
                          </div>
                          {/* Schedule cards */}
                          {todaySchedule.length === 0 ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                              <Info className="w-8 h-8 mb-2 opacity-20" />
                              <p className="text-sm italic opacity-50">No classes scheduled for today.</p>
                            </div>
                          ) : (
                            todaySchedule.map((item, index) => {
                              const pos = calculatePosition(item.startTime, item.endTime);
                              const variant = variants[index % variants.length];
                              return (
                                <div
                                  key={index}
                                  className={`event-schedule-item event-schedule-${variant}`}
                                  style={{
                                    ...pos,
                                    left: `${(index % 3) * 40}px`, // Slight stagger
                                    right: `${80 + (index % 2) * 40}px`,
                                  }}
                                >
                                  <div className="event-schedule-content">
                                    <div className="event-schedule-header">
                                      <span className="event-schedule-title">{item.title}</span>
                                      <span className="event-schedule-menu">⋯</span>
                                    </div>
                                    <span className="event-schedule-subtitle">{item.subject} • {item.conductedBy}</span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                {/* Secondary column (Calendar + Upcoming) */}
                <div className="flex flex-col gap-6">
                  <section className={`event-calendar-section rounded-xl shadow-sm p-5 flex flex-col gap-5 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                    <h2 className="event-section-title">Calendar</h2>
                    <div className="event-calendar-content grid grid-cols-1 gap-5">
                      <div className="event-calendar-widget">
                        <Calendar
                          mode="single"
                          defaultMonth={new Date(2026, 0, 7)}
                          selected={new Date(2026, 0, 7)}
                          modifiers={{
                            highlighted: [new Date(2026, 0, 7)],
                          }}
                          modifiersClassNames={{
                            highlighted: 'event-highlighted-date',
                          }}
                          className="event-calendar-component"
                        />
                      </div>
                      <div className="event-calendar-progress">
                        <div className="event-progress-title">Your Progress this Month</div>
                        <div className="event-progress-chart">
                          <AnimatedRadialChart value={95} size={150} showLabels={false} />
                        </div>
                        <p className="event-calendar-text">
                          Excellent work! You've attended 95% of your classes this month.
                        </p>
                        <ul className="event-calendar-legend">
                          {legendItems.map((item) => (
                            <li key={item.label}>
                              <span className="event-legend-dot" style={{ backgroundColor: item.color }}></span>
                              <span>{item.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className={`event-upcoming-section rounded-xl shadow-sm p-5 flex flex-col gap-5 ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
                    <div className="event-upcoming-header">
                      <h2 className="event-section-title">Upcoming Schedule</h2>
                    </div>

                    {loadingUpcoming ? (
                      <div className="flex flex-col items-center justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-purple-600 mb-2" />
                        <p className="text-sm text-gray-400">Checking upcoming events...</p>
                      </div>
                    ) : errorUpcoming ? (
                      <div className="text-center py-10 text-red-500 text-sm">
                        {errorUpcoming}
                      </div>
                    ) : upcomingSchedule.length === 0 ? (
                      <div className="text-center py-10 text-gray-400 italic text-sm">
                        No upcoming events found.
                      </div>
                    ) : (
                      <div className="event-upcoming-list">
                        {upcomingSchedule.map((item, index) => {
                          const variant = variants[index % variants.length];
                          const eventDate = new Date(item.date).toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          });
                          return (
                            <div key={index} className="event-upcoming-item">
                              <div className={`event-upcoming-marker event-marker-${variant}`}></div>
                              <div className="event-upcoming-content">
                                <h3 className="event-upcoming-title">{item.title}</h3>
                                <div className="event-upcoming-teacher">
                                  <img src={`https://i.pravatar.cc/150?u=${item.conductedBy}`} alt={item.conductedBy} />
                                  <span>{item.conductedBy}</span>
                                </div>
                              </div>
                              <div className="event-upcoming-meta">
                                <div className="event-upcoming-date">
                                  <CalendarIconLucide size={14} />
                                  <span>{eventDate}</span>
                                </div>
                                <div className="event-upcoming-time">
                                  <Clock size={14} />
                                  <span>{item.startTime} - {item.endTime}</span>
                                </div>
                              </div>
                              <span className="event-upcoming-arrow">›</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

const timeSlots = ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

const legendItems = [
  { label: 'Design', color: '#0bb885' },
  { label: 'Developer', color: '#f59e0b' },
  { label: 'Soft Skill', color: '#f97316' },
  { label: 'Science', color: '#ef4444' },
];

export default EventPage;




