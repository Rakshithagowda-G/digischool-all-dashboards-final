import React from 'react';
import './EventPage.css';
import { Calendar } from '../components/ui/calendar';
import { AnimatedRadialChart } from '../components/AnimatedRadialChart';
import { PageWithSidebar } from '../components/layouts/PageWithSidebar';
import { DashboardNavbar } from '../components/ui/dashboard-navbar';

const EventPage = () => {
  return (
    <PageWithSidebar>
      <div className="flex flex-1 min-w-0 h-full p-2 sm:p-3 md:p-4 lg:p-2 xl:p-6 @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
        <div className="w-full h-full bg-slate-100 rounded-xl shadow-lg flex flex-col overflow-hidden relative">
          {/* Static Navbar at top */}
          <DashboardNavbar />
          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 lg:p-4 xl:p-6 relative scrollbar-hide @[media(min-width:1024px)_and_(max-width:1366px)]:p-4">
            <div className="event-page-container flex flex-col gap-6 lg:gap-4 xl:gap-6 @[media(min-width:1024px)_and_(max-width:1366px)]:gap-4">
              <div className="grid grid-cols-1 @[media(min-width:1367px)]:grid-cols-2 gap-6 lg:gap-4 xl:gap-6 @[media(min-width:1024px)_and_(max-width:1366px)]:gap-4">
                {/* Primary column (Ongoing + Schedule) */}
                <div className="flex flex-col gap-6">
                  <section className="event-ongoing-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5">
                    <h1 className="event-section-title">Ongoing Class</h1>
                    <div className="flex gap-4 lg:gap-3 xl:gap-4 overflow-x-auto no-scrollbar py-2">
                      <div className="event-ongoing-card event-card-ui min-w-[260px] md:min-w-[300px] lg:min-w-[240px] xl:min-w-[300px] flex-shrink-0">
                        <div className="event-ongoing-header">
                          <div className="event-ongoing-percentage">75%</div>
                          <span className="event-ongoing-arrow">›</span>
                        </div>
                        <div className="event-ongoing-name">UI Design Basic</div>
                        <div className="event-ongoing-progress">
                          <div className="event-ongoing-progress-bar event-progress-green"></div>
                        </div>
                      </div>
                      <div className="event-ongoing-card event-card-fullstack min-w-[260px] md:min-w-[300px] lg:min-w-[240px] xl:min-w-[300px] flex-shrink-0">
                        <div className="event-ongoing-header">
                          <div className="event-ongoing-percentage">50%</div>
                          <span className="event-ongoing-arrow">›</span>
                        </div>
                        <div className="event-ongoing-name">Fullstack Developer</div>
                        <div className="event-ongoing-progress">
                          <div className="event-ongoing-progress-bar event-progress-orange"></div>
                        </div>
                      </div>
                      <div className="event-ongoing-card event-card-marketing min-w-[260px] md:min-w-[300px] lg:min-w-[240px] xl:min-w-[300px] flex-shrink-0">
                        <div className="event-ongoing-header">
                          <div className="event-ongoing-percentage">60%</div>
                          <span className="event-ongoing-arrow">›</span>
                        </div>
                        <div className="event-ongoing-name">Marketing Essentials</div>
                        <div className="event-ongoing-progress">
                          <div className="event-ongoing-progress-bar event-progress-blue"></div>
                        </div>
                      </div>
                      <div className="event-ongoing-card event-card-app min-w-[260px] md:min-w-[300px] lg:min-w-[240px] xl:min-w-[300px] flex-shrink-0">
                        <div className="event-ongoing-header">
                          <div className="event-ongoing-percentage">85%</div>
                          <span className="event-ongoing-arrow">›</span>
                        </div>
                        <div className="event-ongoing-name">App UI/UX</div>
                        <div className="event-ongoing-progress">
                          <div className="event-ongoing-progress-bar event-progress-purple"></div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="event-today-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5">
                    <h2 className="event-section-title">Today Schedule</h2>
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
                        {scheduleItems.map((item) => (
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
                  </section>
                </div>

                {/* Secondary column (Calendar + Upcoming) */}
                <div className="flex flex-col gap-6">
                  <section className="event-calendar-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 flex flex-col gap-5 lg:gap-4 xl:gap-5">
                    <h2 className="event-section-title">Calendar</h2>
                    <div className="event-calendar-content grid grid-cols-1 gap-5">
                      <div className="event-calendar-widget">
                        <Calendar
                          mode="single"
                          defaultMonth={new Date(2025, 0, 1)}
                          selected={new Date(2025, 0, 5)}
                          modifiers={{
                            highlighted: [new Date(2025, 0, 5), new Date(2025, 0, 17)],
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
                          Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor
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

                  <section className="event-upcoming-section bg-white rounded-xl shadow-sm p-5 lg:p-4 xl:p-5 flex flex-col gap-5 lg:gap-4 xl:gap-5">
                    <div className="event-upcoming-header">
                      <h2 className="event-section-title">Upcoming Schedule</h2>
                      <button className="event-view-all">View all ›</button>
                    </div>
                    <div className="event-upcoming-list">
                      {upcomingItems.map((item) => (
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

const scheduleItems = [
  {
    id: 'ux-research',
    title: 'UX Research',
    subtitle: 'A/B Testing',
    variant: 'red',
    style: { top: '24px', height: '96px', left: '0px', right: '200px' },
  },
  {
    id: 'ui-design-beginner',
    title: 'UI Design Beginner',
    subtitle: 'Wireframe',
    variant: 'green',
    style: { top: '168px', height: '96px', left: '120px', right: '80px' },
  },
  {
    id: 'fullstack',
    title: 'Fullstack Developer',
    subtitle: 'FormRequest',
    variant: 'orange',
    style: { top: '408px', height: '96px', left: '0px', right: '200px' },
  },
];

const upcomingItems = [
  {
    id: 'up-ux',
    title: 'UX Research',
    teacher: 'Ms. Samantha William',
    date: 'January 5, 2021',
    time: '07.00 - 08.00 AM',
    variant: 'green',
  },
  {
    id: 'up-backend',
    title: 'Back-End Developer',
    teacher: 'Ms. Samantha William',
    date: 'January 5, 2021',
    time: '07.00 - 08.00 AM',
    variant: 'orange',
  },
  {
    id: 'up-icon',
    title: 'Icon Design',
    teacher: 'Ms. Samantha William',
    date: 'January 5, 2021',
    time: '07.00 - 08.00 AM',
    variant: 'red',
  },
  {
    id: 'up-frontend',
    title: 'Front-End Development',
    teacher: 'Mr. John Smith',
    date: 'January 6, 2021',
    time: '09.00 - 10.00 AM',
    variant: 'green',
  },
  {
    id: 'up-mobile',
    title: 'Mobile App Design',
    teacher: 'Ms. Emily Johnson',
    date: 'January 7, 2021',
    time: '02.00 - 03.00 PM',
    variant: 'orange',
  },
  {
    id: 'up-database',
    title: 'Database Management',
    teacher: 'Mr. David Brown',
    date: 'January 8, 2021',
    time: '11.00 - 12.00 PM',
    variant: 'red',
  },
];

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



