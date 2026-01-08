import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './EventPage.css';
import { Calendar } from '../components/ui/calendar';
import { AnimatedRadialChart } from '../components/AnimatedRadialChart';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';
import { getTodayEvents, getUpcomingEvents, getWelcomeData } from '../lib/api';

const EventPage = () => {
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId') || 'STU002';

  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const [todayData, upcomingData, welcomeData] = await Promise.all([
          getTodayEvents(studentId),
          getUpcomingEvents(studentId),
          getWelcomeData(studentId)
        ]);

        console.log('Today Events:', todayData);
        console.log('Upcoming Events:', upcomingData);

        setTodayEvents(Array.isArray(todayData) ? todayData : []);
        setUpcomingEvents(Array.isArray(upcomingData) ? upcomingData : []);
        setStudentName(welcomeData?.fullName || '');
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [studentId]);

  // Transform backend data to match UI format
  const transformedTodayEvents = todayEvents.map((event, index) => {
    const startHour = event.startTime ? parseInt(event.startTime.split(':')[0]) : 9;
    const endHour = event.endTime ? parseInt(event.endTime.split(':')[0]) : 10;
    const topPosition = (startHour - 7) * 48; // 48px per hour slot
    const height = (endHour - startHour) * 48;

    const variants = ['red', 'green', 'orange'];
    const variant = variants[index % variants.length];

    return {
      id: event.eventId || `event-${index}`,
      title: event.title,
      subtitle: event.subject || event.description || '',
      variant,
      style: {
        top: `${topPosition}px`,
        height: `${height}px`,
        left: `${index * 40}px`,
        right: `${(todayEvents.length - index - 1) * 40 + 80}px`
      }
    };
  });

  const transformedUpcomingEvents = upcomingEvents.map((event, index) => {
    const variants = ['green', 'orange', 'red'];
    const variant = variants[index % variants.length];

    // Format date
    const eventDate = event.date ? new Date(event.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) : 'TBD';

    // Format time
    const timeRange = event.startTime && event.endTime
      ? `${event.startTime} - ${event.endTime}`
      : event.startTime || 'TBD';

    return {
      id: event.eventId || `upcoming-${index}`,
      title: event.title,
      teacher: event.conductedBy || 'Not assigned',
      date: eventDate,
      time: timeRange,
      variant
    };
  });

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  if (error) {
    return (
      <PageWithSidebar>
        <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6">
          <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="font-semibold mb-2">Error loading events</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          {/* Static Navbar at top */}
          <DashboardNavbar studentName={studentName} />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-4 xl:p-6 relative scrollbar-hide @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
            <div className="event-page-container flex flex-col gap-6 lg:gap-4 xl:gap-6 @[media(min-width:1024px)_and_(max-width:1366px)]:gap-4">
              <div className="grid grid-cols-1 @[media(min-width:1367px)]:grid-cols-2 gap-6 lg:gap-4 xl:gap-6 @[media(min-width:1024px)_and_(max-width:1366px)]:gap-4">
                {/* Primary column (Ongoing + Schedule) */}
                <div className="flex flex-col gap-6">

                  <section className="event-today-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5">
                    <h2 className="event-section-title">Today Schedule</h2>
                    {transformedTodayEvents.length > 0 ? (
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
                          {transformedTodayEvents.map((item) => (
                            <div
                              key={item.id}
                              className={`event-schedule-item event-schedule-${item.variant}`}
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
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <p>No events scheduled for today</p>
                      </div>
                    )}
                  </section>
                </div>

                {/* Secondary column (Calendar + Upcoming) */}
                <div className="flex flex-col gap-6">

                  <section className="event-upcoming-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 flex flex-col gap-5 lg:gap-4 xl:gap-5">
                    <div className="event-upcoming-header">
                      <h2 className="event-section-title">Upcoming Schedule</h2>
                      <button className="event-view-all">View all ›</button>
                    </div>
                    {transformedUpcomingEvents.length > 0 ? (
                      <div className="event-upcoming-list">
                        {transformedUpcomingEvents.map((item) => (
                          <div key={item.id} className="event-upcoming-item">
                            <div className={`event-upcoming-marker event-marker-${item.variant}`}></div>
                            <div className="event-upcoming-content">
                              <h3 className="event-upcoming-title">{item.title}</h3>
                              <div className="event-upcoming-teacher">
                                <span>{item.teacher}</span>
                              </div>
                            </div>
                            <div className="event-upcoming-meta">
                              <div className="event-upcoming-date">
                                <CalendarIcon />
                                <span>{item.date}</span>
                              </div>
                              <div className="event-upcoming-time">
                                <ClockIcon />
                                <span>{item.time}</span>
                              </div>
                            </div>
                            <span className="event-upcoming-arrow">›</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <p>No upcoming events available</p>
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
