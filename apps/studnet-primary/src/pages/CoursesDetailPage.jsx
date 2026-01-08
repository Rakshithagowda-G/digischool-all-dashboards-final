import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './CoursesDetailPage.css'
import { PageWithSidebar } from '../components/layouts/PageWithSidebar'
import { DashboardNavbar } from '../components/ui/dashboard-navbar'
import { useTheme } from '../context/ThemeContext'
import { getCourseDetails } from '../lib/api'
import { Loader2, AlertCircle } from 'lucide-react'

const CoursesDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCourseDetails(courseId);
        setCourse(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchDetails();
  }, [courseId]);

  if (loading) {
    return (
      <PageWithSidebar>
        <div className="courses-detail-container">
          <DashboardNavbar />
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className={`h-12 w-12 animate-spin mb-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading content...</p>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  if (error || !course) {
    return (
      <PageWithSidebar>
        <div className="courses-detail-container">
          <DashboardNavbar />
          <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{error || 'Course not found'}</p>
          </div>
        </div>
      </PageWithSidebar>
    );
  }

  return (
    <PageWithSidebar>
      <div className="courses-detail-container">
        <DashboardNavbar />
        <div className="courses-detail-content">
          <div className="main-content-wrapper">
            <MainContent course={course} isDark={isDark} />
          </div>
          <div className="sidebar-wrapper">
            <Sidebar course={course} isDark={isDark} />
          </div>
        </div>
      </div>
    </PageWithSidebar>
  )
}

function MainContent({ course, isDark }) {
  const [activeTab, setActiveTab] = useState('about')

  return (
    <div className="space-y-6">
      <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {course?.title}
      </h2>
      <div className="video-placeholder bg-gray-900 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
        <img
          src={course?.thumbnail || '/img/sub1.png'}
          alt={course?.title}
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className={`tabs-container p-6 rounded-lg ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
        <div className="flex gap-6 mb-6 border-b border-gray-700">
          <button onClick={() => setActiveTab('about')} className={`pb-2 font-medium ${activeTab === 'about' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-500'}`}>About</button>
          <button onClick={() => setActiveTab('contents')} className={`pb-2 font-medium ${activeTab === 'contents' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-500'}`}>Contents</button>
          <button onClick={() => setActiveTab('faq')} className={`pb-2 font-medium ${activeTab === 'faq' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-500'}`}>FAQ</button>
        </div>
        {activeTab === 'about' && (
          <div className="space-y-4">
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{course?.description}</p>
            {course.university && (
              <p className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                School: {course.university}
              </p>
            )}
          </div>
        )}
        {activeTab === 'contents' && (
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Course contents will appear here shortly.</p>
        )}
        {activeTab === 'faq' && (
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Common questions about this course.</p>
        )}
      </div>
    </div>
  )
}

function Sidebar({ course, isDark }) {
  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#181B21]' : 'bg-white shadow'}`}>
        <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Progress</h3>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
          <div className="bg-purple-500 h-full w-[0%] transition-all duration-1000"></div>
        </div>
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>0% Complete</p>
      </div>
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#181B21]' : 'bg-white shadow'}`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Modules</h3>
        <div className="space-y-2 text-sm text-center py-4">
          <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>Module list coming soon</p>
        </div>
      </div>
    </div>
  )
}

export default CoursesDetailPage;

