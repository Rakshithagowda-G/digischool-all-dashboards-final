// Home Page component 
import React, { useState, useEffect, useRef } from 'react';
import { Users, ClipboardCheck, BarChart3, Star } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../common/StatCard';
import { MOCK_STATS, MOCK_RECENT_ACTIVITY } from '../../data/mockData';
import SubjectPage from './SubjectPage';

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(MOCK_STATS);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Monochromatic Blue Color Palette
  const BLUE_COLORS = {
    darkest: '#1e3a8a',
    darker: '#1e40af',
    dark: '#2563eb',
    primary: '#3b82f6',
    light: '#60a5fa',
    lighter: '#93c5fd',
    lightest: '#bfdbfe',
  };

  // Chart Data
  const attendanceData = [
    { day: 'Mon', present: 28, absent: 2 },
    { day: 'Tue', present: 30, absent: 0 },
    { day: 'Wed', present: 27, absent: 3 },
    { day: 'Thu', present: 29, absent: 1 },
    { day: 'Fri', present: 26, absent: 4 },
  ];

  const subjectPerformanceData = [
    { subject: 'Math', average: 85, fill: BLUE_COLORS.darkest },
    { subject: 'Physics', average: 78, fill: BLUE_COLORS.darker },
    { subject: 'Chemistry', average: 82, fill: BLUE_COLORS.dark },
    { subject: 'Biology', average: 88, fill: BLUE_COLORS.primary },
    { subject: 'English', average: 76, fill: BLUE_COLORS.light },
  ];

  const gradeDistributionData = [
    { name: 'A+', value: 25, color: BLUE_COLORS.darkest },
    { name: 'A', value: 35, color: BLUE_COLORS.dark },
    { name: 'B+', value: 20, color: BLUE_COLORS.primary },
    { name: 'B', value: 15, color: BLUE_COLORS.light },
    { name: 'C', value: 5, color: BLUE_COLORS.lighter },
  ];

  const assignmentStatusData = [
    { name: 'Submitted', value: 68, color: BLUE_COLORS.dark },
    { name: 'Pending', value: 12, color: BLUE_COLORS.primary },
    { name: 'Late', value: 5, color: BLUE_COLORS.lighter },
  ];

  const monthlyTrendData = [
    { month: 'Aug', attendance: 92, performance: 78 },
    { month: 'Sep', attendance: 89, performance: 82 },
    { month: 'Oct', attendance: 93, performance: 85 },
    { month: 'Nov', attendance: 91, performance: 88 },
    { month: 'Dec', attendance: 94, performance: 90 },
  ];

  // Extended Recent Activity with 2 more people
  const extendedRecentActivity = [
    ...MOCK_RECENT_ACTIVITY,
    {
      id: MOCK_RECENT_ACTIVITY.length + 1,
      user: {
        name: 'Michael Chen',
        avatar: 'https://placehold.co/100x100/E8F0FE/505050?text=MC'
      },
      action: 'completed',
      subject: 'Biology Lab Report'
    },
    {
      id: MOCK_RECENT_ACTIVITY.length + 2,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://placehold.co/100x100/E8F0FE/505050?text=EW'
      },
      action: 'submitted',
      subject: 'English Essay Draft'
    }
  ];

  const customTooltipStyle = {
    backgroundColor: '#fff',
    border: '2px solid #3b82f6',
    borderRadius: '12px',
    padding: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
<div 
  ref={(el) => (sectionRefs.current[0] = el)}
  className={`relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 p-6 rounded-3xl h-[130px] md:h-[150px] ${
    visibleSections.has(0) ? 'animate-slide-in-left' : 'opacity-0'
  }`}
>
  {/* Animated gradient background with moving orbs */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 overflow-hidden rounded-3xl">
    {/* Floating gradient orbs */}
    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
    {/* Wave background with enhanced animation */}
    <svg 
      className="absolute bottom-0 left-0 w-full h-full opacity-30" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path 
        fill="#3b82f6" 
        fillOpacity="0.3"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        className="animate-wave"
      >
        <animate attributeName="d" 
          dur="10s" 
          repeatCount="indefinite"
          values="
            M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,128L48,138C96,149,192,171,288,165C384,160,480,128,576,122C672,117,768,139,864,154C960,171,1056,181,1152,170C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
          "
        />
      </path>
      <path 
        fill="#6366f1" 
        fillOpacity="0.2"
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        className="animate-wave-slow"
      >
        <animate attributeName="d" 
          dur="15s" 
          repeatCount="indefinite"
          values="
            M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,192L48,197.3C96,203,192,213,288,218.7C384,224,480,224,576,213.3C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
          "
        />
      </path>
    </svg>
    
    {/* Animated sparkles */}
    <div className="absolute top-8 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-twinkle"></div>
    <div className="absolute top-16 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1000"></div>
    <div className="absolute bottom-12 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-twinkle animation-delay-2000"></div>
  </div>
  
  {/* Left side: Content */}
  <div className="relative z-10 flex-1">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
      Welcome back, Teacher!
    </h2>
    <p className="text-gray-600 text-sm md:text-base animate-fade-in-up">
      Let's make today awesome. A step towards a bright future....
    </p>
  </div>

  {/* Random Floating Icons */}
<div className="absolute inset-0 pointer-events-none">
  
  {/* Book */}
  <svg className="absolute animate-float" style={{ top: "12%", left: "8%" }} width="40" height="40" viewBox="0 0 40 40">
    <rect x="8" y="10" width="24" height="20" rx="2" fill="#3B82F6" opacity="0.8"/>
    <rect x="10" y="12" width="10" height="14" rx="1" fill="#60A5FA" opacity="0.6"/>
  </svg>

  {/* Star */}
  <svg className="absolute animate-twinkle" style={{ top: "30%", left: "70%" }} width="40" height="40" viewBox="0 0 40 40">
    <path d="M20 8L22 16H30L24 22L26 30L20 24L14 30L16 22L10 16H18Z" fill="#FBBF24" opacity="0.85"/>
  </svg>

  {/* Graduation Cap */}
  <svg className="absolute animate-float-delayed" style={{ top: "55%", left: "20%" }} width="40" height="40" viewBox="0 0 40 40">
    <path d="M20 12L8 18L20 24L32 18Z" fill="#8B5CF6" opacity="0.85"/>
  </svg>

  {/* Trophy */}
  <svg className="absolute animate-bounce-slow" style={{ top: "68%", left: "60%" }} width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="18" r="6" fill="#F59E0B"/>
    <rect x="18" y="24" width="4" height="6" fill="#FBBF24"/>
  </svg>

  {/* Classroom */}
  <svg className="absolute animate-float" style={{ top: "22%", left: "45%" }} width="40" height="40" viewBox="0 0 40 40">
    <rect x="6" y="12" width="28" height="18" rx="2" fill="#3B82F6" opacity="0.85"/>
  </svg>

  {/* Checklist */}
  <svg className="absolute animate-twinkle" style={{ top: "72%", left: "10%" }} width="40" height="40" viewBox="0 0 40 40">
    <rect x="10" y="10" width="20" height="20" rx="2" fill="#10B981" opacity="0.85"/>
  </svg>

  {/* Teacher board */}
  <svg className="absolute animate-float-delayed" style={{ top: "40%", left: "82%" }} width="40" height="40" viewBox="0 0 40 40">
    <rect x="8" y="10" width="24" height="14" rx="2" fill="#8B5CF6" opacity="0.85"/>
  </svg>

  {/* Analytics */}
  <svg className="absolute animate-bounce-slow" style={{ top: "10%", left: "60%" }} width="40" height="40" viewBox="0 0 40 40">
    <rect x="10" y="22" width="4" height="8" fill="#F59E0B"/>
  </svg>

</div>


  {/* Right side: Enhanced SVG with stroke animations */}
  <div className="relative z-10 hidden md:block flex-shrink-0">
    <svg 
      width="200" 
      height="140" 
      viewBox="0 0 280 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="animate-float"
    >
      {/* Background circle with pulse */}
      <circle cx="140" cy="100" r="90" fill="#E0E7FF" opacity="0.5" className="animate-pulse-slow"/>
      <circle cx="140" cy="100" r="85" fill="none" stroke="#C7D2FE" strokeWidth="2" opacity="0.3" className="animate-spin-slow"/>
      
      {/* Book/Tablet with glow effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="80" y="120" width="120" height="70" rx="8" fill="#3B82F6" className="drop-shadow-lg" filter="url(#glow)"/>
      <rect x="90" y="130" width="50" height="40" rx="4" fill="#60A5FA" opacity="0.6" className="animate-pulse-slower"/>
      <rect x="150" y="130" width="40" height="40" rx="4" fill="#60A5FA" opacity="0.6" className="animate-pulse-slower animation-delay-1000"/>
      <line x1="90" y1="177" x2="130" y2="177" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="90;130;90" dur="3s" repeatCount="indefinite"/>
      </line>
      <line x1="150" y1="177" x2="180" y2="177" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="x2" values="150;180;150" dur="3s" begin="0.5s" repeatCount="indefinite"/>
      </line>
      
      {/* Teacher figure with bounce */}
      <circle cx="100" cy="60" r="18" fill="#FBBF24" className="animate-bounce-slow">
        <animate attributeName="r" values="18;20;18" dur="2s" repeatCount="indefinite"/>
      </circle>
      <path d="M100 78 L90 100 L90 115" stroke="#1F2937" strokeWidth="6" strokeLinecap="round"/>
      <path d="M100 78 L110 100 L110 115" stroke="#1F2937" strokeWidth="6" strokeLinecap="round"/>
      <path d="M90 85 L70 95" stroke="#1F2937" strokeWidth="5" strokeLinecap="round" className="animate-wave-hand"/>
      <path d="M110 85 L115 100" stroke="#1F2937" strokeWidth="5" strokeLinecap="round"/>
      
      {/* Student figure */}
      <circle cx="180" cy="70" r="15" fill="#F472B6" className="animate-float-delayed">
        <animate attributeName="r" values="15;17;15" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <path d="M180 85 L172 105 L172 118" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>
      <path d="M180 85 L188 105 L188 118" stroke="#374151" strokeWidth="5" strokeLinecap="round"/>
      <path d="M172 90 L160 98" stroke="#374151" strokeWidth="4" strokeLinecap="round"/>
      <path d="M188 90 L200 98" stroke="#374151" strokeWidth="4" strokeLinecap="round" className="animate-wave-hand animation-delay-1000"/>
      
      {/* Floating elements with paths */}
      <circle cx="50" cy="40" r="6" fill="#FCD34D" opacity="0.7" className="animate-float-path"/>
      <circle cx="230" cy="50" r="5" fill="#A78BFA" opacity="0.7" className="animate-float-path animation-delay-2000"/>
      <path d="M220 30 L225 35 L220 40 L215 35 Z" fill="#34D399" opacity="0.6" className="animate-spin-slow"/>
      
      {/* Enhanced sparkles with twinkle */}
      <path d="M60 80 L62 82 L60 84 L58 82 Z" fill="#FBBF24" className="animate-twinkle"/>
      <path d="M210 85 L213 88 L210 91 L207 88 Z" fill="#FBBF24" className="animate-twinkle animation-delay-1000"/>
      <circle cx="120" cy="50" r="2" fill="#FCD34D" className="animate-twinkle animation-delay-2000"/>
    </svg>
  </div>
</div>


      {/* Stats Grid */}
      <div 
        ref={(el) => (sectionRefs.current[1] = el)}
        className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${
          visibleSections.has(1) ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <StatCard
          title="Active Classes"
          value={stats ? stats.activeClasses : "..."}
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Pending Assignments"
          value={stats ? stats.pendingAssignments : "..."}
          icon={ClipboardCheck}
          color="text-blue-500"
        />
        <StatCard
          title="Class Attendance"
          value={stats ? `${stats.classAttendance}%` : "..."}
          icon={BarChart3}
          color="text-blue-500"
        />
        <StatCard
          title="Average Class GPA"
          value={stats ? stats.averageGpa : "..."}
          icon={Star}
          color="text-indigo-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Attendance Bar Chart */}
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            visibleSections.has(2) ? 'animate-slide-in-left' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Weekly Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="day" 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <Tooltip 
                contentStyle={customTooltipStyle}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '500' }} />
              <Bar 
                dataKey="present" 
                fill={BLUE_COLORS.primary}
                radius={[8, 8, 0, 0]} 
                name="Present"
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-in-out"
              />
              <Bar 
                dataKey="absent" 
                fill={BLUE_COLORS.lighter}
                radius={[8, 8, 0, 0]} 
                name="Absent"
                animationDuration={1500}
                animationBegin={200}
                animationEasing="ease-in-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance Bar Chart */}
        <div 
          ref={(el) => (sectionRefs.current[3] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            visibleSections.has(3) ? 'animate-slide-in-right' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Subject-wise Average Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="subject" 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <YAxis 
                stroke="#6b7280"
                style={{ fontSize: '14px', fontWeight: '500' }}
              />
              <Tooltip 
                contentStyle={customTooltipStyle}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar 
                dataKey="average" 
                radius={[8, 8, 0, 0]} 
                name="Average %"
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-in-out"
              >
                {subjectPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution Pie Chart */}
        <div 
          ref={(el) => (sectionRefs.current[4] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            visibleSections.has(4) ? 'animate-slide-in-left' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
                animationDuration={100}
                animationBegin={0}
                animationEasing="ease-out"
              >
                {gradeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {gradeDistributionData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600 font-medium">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Status Pie Chart */}
        <div 
          ref={(el) => (sectionRefs.current[5] = el)}
          className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            visibleSections.has(5) ? 'animate-slide-in-right' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Assignment Submission Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assignmentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
                animationDuration={100}
                animationBegin={0}
                animationEasing="ease-out"
              >
                {assignmentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={customTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {assignmentStatusData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600 font-medium">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend Line Chart */}
      <div 
        ref={(el) => (sectionRefs.current[6] = el)}
        className={`p-6 bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 ${
          visibleSections.has(6) ? 'animate-zoom-in' : 'opacity-0'
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Monthly Attendance & Performance Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              style={{ fontSize: '14px', fontWeight: '500' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '14px', fontWeight: '500' }}
            />
            <Tooltip contentStyle={customTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '500' }} />
            <Line 
              type="monotone" 
              dataKey="attendance" 
              stroke={BLUE_COLORS.primary}
              strokeWidth={3}
              dot={{ r: 6, fill: BLUE_COLORS.primary, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: BLUE_COLORS.dark }}
              name="Attendance %"
              animationDuration={2000}
              animationBegin={0}
              animationEasing="ease-in-out"
            />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke={BLUE_COLORS.dark}
              strokeWidth={3}
              dot={{ r: 6, fill: BLUE_COLORS.dark, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, fill: BLUE_COLORS.darkest }}
              name="Performance %"
              animationDuration={2000}
              animationBegin={300}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div 
          ref={(el) => (sectionRefs.current[7] = el)}
          className={`lg:col-span-2 p-6 bg-white rounded-3xl shadow-sm ${
            visibleSections.has(7) ? 'animate-slide-in-left' : 'opacity-0'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity Feed</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {extendedRecentActivity.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`flex items-center justify-between p-3 rounded-3xl hover:bg-blue-50 transition-all duration-300 ${
                  visibleSections.has(7) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-200"
                    onError={(e) => e.target.src = `https://placehold.co/100x100/E8F0FE/505050?text=${activity.user.name.charAt(0)}`}
                  />
                  <div>
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-500"> {activity.action} </span>
                    <span className="font-medium text-[#2F69FF]">{activity.subject}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">...</button>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements & Quick Links */}
        <div className="space-y-6">
          <div 
            ref={(el) => (sectionRefs.current[8] = el)}
            className={`p-6 bg-white rounded-lg shadow-sm ${
              visibleSections.has(8) ? 'animate-slide-in-right' : 'opacity-0'
            }`}
          >
            <h3 className="text-lg font-semibold mb-4 text-white bg-[#2F69FF] -mx-6 -mt-6 rounded-t-lg px-6 py-3">Announcements</h3>
            <div className="space-y-3 pt-4">
              <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500 animate-pulse-slow">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Parent-Teacher Meeting</p>
                    <p className="text-sm text-gray-600">Scheduled for December 15, 2025 at 3:00 PM. Please ensure all grade reports are updated.</p>
                    <p className="text-xs text-blue-600 mt-2">Posted 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={(el) => (sectionRefs.current[9] = el)}
            className={`p-6 bg-white rounded-3xl shadow-sm ${
              visibleSections.has(9) ? 'animate-slide-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '200ms' }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button className="flex-1 text-white bg-[#2F69FF] hover:bg-blue-700 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Add Notes
              </button>
              <button className="flex-1 text-[#2F69FF] bg-white border border-[#2F69FF] hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Upload Assignment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Section */}
      <div 
        ref={(el) => (sectionRefs.current[10] = el)}
        className={visibleSections.has(10) ? 'animate-fade-in-up' : 'opacity-0'}
      >
        <SubjectPage />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-zoom-in {
          animation: zoom-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: gray-200;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: gray-200;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
