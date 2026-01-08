import React, { useState, useEffect } from 'react';
import { Search, Loader2, User } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { getWelcomeData, getStudentProfile } from '../../lib/api';

export const DashboardNavbar = ({ onProfileClick }) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Temporary development fallback to Primary Student-3 (STU003)
  const studentId = searchParams.get('studentId') || 'STU003';

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const [welcome, profile] = await Promise.all([
          getWelcomeData(studentId),
          getStudentProfile(studentId)
        ]);
        setStudentData({
          firstName: welcome.fullName ? welcome.fullName.split(' ')[0] : 'Student',
          profileImage: profile.profileImage
        });
      } catch (err) {
        console.error("Error fetching navbar data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, [studentId]);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      const targetQuery = studentId ? `?studentId=${studentId}` : '';
      navigate(`/profile${targetQuery}`);
    }
  };

  return (
    <div className={`
      px-4 sm:px-6 py-4 flex flex-wrap md:flex-nowrap items-center justify-between border-b transition-colors duration-200 gap-4
      ${isDark
        ? 'bg-[#181B21] border-[#232730]'
        : 'bg-white border-gray-200'
      }
    `}>
      {/* Left side - Greeting */}
      <div className="order-1 md:min-w-0 flex-shrink">
        {loading ? (
          <div className="flex flex-col gap-2">
            <div className={`h-6 w-32 rounded animate-pulse ${isDark ? 'bg-[#232730]' : 'bg-gray-200'}`} />
            <div className={`h-4 w-24 rounded animate-pulse ${isDark ? 'bg-[#232730]' : 'bg-gray-100'}`} />
          </div>
        ) : (
          <>
            <h1 className={`
              text-xl sm:text-2xl font-bold transition-colors duration-200 truncate
              ${isDark ? 'text-[#FFFFFF]' : 'text-gray-900'}
            `}>
              Good Morning, {studentData?.firstName || 'Student'}
            </h1>
            <p className={`
              text-sm transition-colors duration-200 truncate
              ${isDark ? 'text-[#9CA3AF]' : 'text-gray-500'}
            `}>
              Have a nice day!
            </p>
          </>
        )}
      </div>

      {/* Search Bar */}
      <div className="order-3 sm:order-2 w-full sm:w-auto md:flex-grow lg:flex-grow-0 md:mx-4 lg:mx-0 relative">
        <Search className={`
          absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200
          ${isDark
            ? 'text-[#9CA3AF]'
            : 'text-gray-400'
          }
        `} />
        <input
          type="text"
          placeholder="Search..."
          className={`
            pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent w-full sm:w-64 md:w-full lg:w-64 transition-colors duration-200
            ${isDark
              ? 'bg-[#232730] border-[#232730] text-[#FFFFFF] placeholder-[#6B7280] focus:ring-[#06B6D4]'
              : 'border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-purple-500'
            }
          `}
        />
      </div>

      {/* Right side - Icons */}
      <div className="order-2 sm:order-3 flex items-center gap-4 flex-shrink-0">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Picture */}
        <button
          onClick={handleProfileClick}
          className={`
            w-10 h-10 rounded-full overflow-hidden transition-all flex-shrink-0 bg-gray-100 dark:bg-[#232730] flex items-center justify-center
            ${isDark
              ? 'hover:ring-2 hover:ring-[#06B6D4]'
              : 'hover:ring-2 hover:ring-purple-500'
            }
          `}
        >
          {studentData?.profileImage ? (
            <img
              src={studentData.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className={isDark ? 'text-[#9CA3AF]' : 'text-gray-400'} size={24} />
          )}
        </button>
      </div>
    </div>
  );
};


