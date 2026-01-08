import React, { useState, useEffect } from 'react';
import './EventPage.css';
import { Calendar } from '../components/ui/calendar';
import { AnimatedRadialChart } from '../components/AnimatedRadialChart';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useSearchParams } from 'react-router-dom';
import { getTodayEvents, getUpcomingEvents } from '../lib/api';

const EventPage = () => {
  const { darkMode } = useDarkMode();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU001';

  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingToday, setLoadingToday] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [errorToday, setErrorToday] = useState(null);
  const [errorUpcoming, setErrorUpcoming] = useState(null);

  useEffect(() => {
    const fetchTodayEvents = async () => {
      try {
        setLoadingToday(true);
        const data = await getTodayEvents(studentId);
        setTodayEvents(data);
      } catch (err) {
        console.error('Error fetching today events:', err);
        setErrorToday('Failed to load today\'s events');
      } finally {
        setLoadingToday(false);
      }
    };

    const fetchUpcomingEvents = async () => {
      try {
        setLoadingUpcoming(true);
        const data = await getUpcomingEvents(studentId);
        setUpcomingEvents(data);
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
        setErrorUpcoming('Failed to load upcoming events');
      } finally {
        setLoadingUpcoming(false);
      }
    };

    if (studentId) {
      fetchTodayEvents();
      fetchUpcomingEvents();
    }
  }, [studentId]);

  // Helper: Parse time string "HH:MM AM/PM" to numeric hours (0-24)
  const parseTime = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.trim().split(' ');
    if (parts.length < 2) return 0;
    const [time, modifier] = parts;
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours + (minutes || 0) / 60;
  };

  // Helper: Format date string to "January 5, 2021"
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Map Today Events to schedule items for the timeline
  const scheduleItems = todayEvents.map((event, index) => {
    const start = parseTime(event.startTime);
    const end = parseTime(event.endTime);
    // 7 AM is start, each hour is 72px, padding top is 12px
    const top = 12 + (start - 7) * 72;
    const height = Math.max((end - start) * 72, 48); // Min height 48px

    const variants = ['red', 'green', 'orange', 'blue', 'purple'];

    // basic collision avoidance (horizontal shift)
    const left = (index % 2) * 60;
    const right = 100 - (index % 2) * 40;

    return {
      id: `event-${index}`,
      title: event.title,
      subtitle: event.subject,
      variant: variants[index % variants.length],
      style: {
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}px`,
        right: `${right}px`,
        minHeight: '60px'
      }
    };
  });

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div
          className={`w-full h-full rounded-xl shadow-lg flex flex-col overflow-hidden relative ${!darkMode ? 'bg-slate-100' : ''}`}
          style={darkMode ? {
            backgroundImage: "url('/img/body-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {}}
        >
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-4 xl:p-6 relative scrollbar-hide @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
            <div className={`event-page-container flex flex-col gap-6 lg:gap-4 xl:gap-6 @[media(min-width:1024px)_and_(max-width:1366px)]:gap-4 ${darkMode ? 'dark-mode' : ''}`}>

              {/* Ongoing Class Section */}
              <section className={`event-ongoing-section rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 w-full ${darkMode ? 'bg-[#111c44]' : 'bg-white'}`}>
                <h1 className="event-section-title">Ongoing Class</h1>
                <div className="flex gap-4 lg:gap-3 xl:gap-4 overflow-x-auto no-scrollbar py-2">
                  {loadingToday ? (
                    <div className="p-4 text-slate-500">Loading ongoing classes...</div>
                  ) : errorToday ? (
                    <div className="p-4 text-red-500">{errorToday}</div>
                  ) : todayEvents.length === 0 ? (
                    <div className="p-4 text-slate-500">No events scheduled</div>
                  ) : (
                    todayEvents.map((event, index) => {
                      const variants = ['ui', 'fullstack', 'marketing', 'app'];
                      const progressColors = ['green', 'orange', 'blue', 'purple'];
                      return (
                        <div key={index} className={`event-ongoing-card event-card-${variants[index % variants.length]} min-w-[260px] md:min-w-[300px] lg:min-w-[240px] xl:min-w-[300px] flex-shrink-0 ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-50'}`}>
                          <div className="event-ongoing-header">
                            <div className="event-ongoing-percentage">100%</div>
                            <span className="event-ongoing-arrow">›</span>
                          </div>
                          <div className="event-ongoing-name">{event.title}</div>
                          <div className="event-ongoing-progress">
                            <div className={`event-ongoing-progress-bar event-progress-${progressColors[index % progressColors.length]}`}></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              <div className="flex flex-col xl:flex-row gap-6 lg:gap-4 xl:gap-6">
                {/* Today Schedule Section */}
                <section className={`event-today-section rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 w-full xl:w-[65%] ${darkMode ? 'bg-[#141E5A] text-white' : 'bg-white'}`}>
                  <h2 className="event-section-title">Today Schedule</h2>
                  {loadingToday ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : errorToday ? (
                    <div className="text-red-500 py-20 text-center">{errorToday}</div>
                  ) : todayEvents.length === 0 ? (
                    <div className="text-slate-500 py-20 text-center">No events scheduled</div>
                  ) : (
                    <div className="event-today-timeline">
                      <div className="event-time-labels">
                        {timeSlots.map((slot) => (
                          <div key={slot} className="event-time-label">{slot}</div>
                        ))}
                      </div>
                      <div className="event-schedule-items">
                        <div className="event-timeline-grid">
                          {timeSlots.map((slot) => (
                            <div key={slot} className="event-timeline-line"></div>
                          ))}
                        </div>
                        {scheduleItems.map((item) => (
                          <div
                            key={item.id}
                            className={`event-schedule-item event-schedule-${item.variant} ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-50'}`}
                            style={item.style}
                          >
                            <div className="event-schedule-content">
                              <div className="event-schedule-header">
                                <span className="event-schedule-title">{item.title}</span>
                                <span className="event-schedule-menu">⋯</span>
                              </div>
                              <span className="event-schedule-subtitle">{item.subtitle}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>

                <div className="flex flex-col gap-6 lg:gap-4 xl:gap-6 w-full xl:w-[35%]">
                  {/* Calendar Section */}
                  <section className={`event-calendar-section rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 flex flex-col gap-5 lg:gap-4 xl:gap-5 ${darkMode ? 'bg-[#141E5A] text-white' : 'bg-white'}`}>
                    <h2 className="event-section-title">Calendar</h2>
                    <div className="event-calendar-content grid grid-cols-1 gap-5">
                      <div className="event-calendar-widget">
                        <Calendar
                          mode="single"
                          defaultMonth={new Date()}
                          selected={new Date()}
                          className="event-calendar-component"
                        />
                      </div>
                      <div className="event-calendar-progress">
                        <div className="event-progress-title">Your Progress this Month</div>
                        <div className="event-progress-chart">
                          <AnimatedRadialChart value={95} size={150} showLabels={false} />
                        </div>
                        <p className="event-calendar-text">
                          Keep track of your sessions and stay ahead of your schedule.
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

                  {/* Upcoming Schedule Section */}
                  <section className={`event-upcoming-section rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 flex flex-col gap-5 lg:gap-4 xl:gap-5 ${darkMode ? 'bg-[#141E5A] text-white' : 'bg-white'}`}>
                    <div className="event-upcoming-header">
                      <h2 className="event-section-title">Upcoming Schedule</h2>
                    </div>
                    <div className="event-upcoming-list">
                      {loadingUpcoming ? (
                        <div className="p-4 text-slate-500">Loading upcoming events...</div>
                      ) : errorUpcoming ? (
                        <div className="p-4 text-red-500">{errorUpcoming}</div>
                      ) : upcomingEvents.length === 0 ? (
                        <div className="p-4 text-slate-500 text-center">No events scheduled</div>
                      ) : (
                        upcomingEvents.map((event, index) => {
                          const variants = ['green', 'orange', 'red'];
                          return (
                            <div key={index} className={`event-upcoming-item ${darkMode ? 'bg-[#1b254b]' : 'bg-slate-50'}`}>
                              <div className={`event-upcoming-marker event-marker-${variants[index % variants.length]}`}></div>
                              <div className="event-upcoming-content">
                                <h3 className="event-upcoming-title">{event.title}</h3>
                                <div className="event-upcoming-teacher">
                                  <span>{event.conductedBy || 'University Faculty'}</span>
                                </div>
                              </div>
                              <div className="event-upcoming-meta">
                                <div className="event-upcoming-date">
                                  <CalendarIcon />
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                <div className="event-upcoming-time">
                                  <ClockIcon />
                                  <span>{event.startTime} - {event.endTime}</span>
                                </div>
                              </div>
                              <span className="event-upcoming-arrow">›</span>
                            </div>
                          );
                        })
                      )}
                    </div>
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default EventPage;

