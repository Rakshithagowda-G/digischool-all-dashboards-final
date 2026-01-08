import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const DueAssignments = () => {
    const { mode } = useTheme();
    const isDark = mode === 'dark';
    const isHomePage = window.location.pathname === '/';
    const navigate = useNavigate();
    const assignments = [
        {
            id: 1,
            title: "Complete Assignment",
            dueTime: "Due Soon • 1 week left",
            description: "For thousands of years, learners have explored new ideas to understand the world. This assignment will help you practice essential concepts in a fun and interactive way.",
            thumbnail: "/img/Monster Solving Maths Problem (1).png"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={`
                w-full h-full flex flex-col p-6 sm:p-[30px] md:p-3 lg:p-[30px] rounded-[20px] transition-colors duration-200
                ${isDark && isHomePage
                    ? 'bg-[#181B21] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                    : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]'
                }
            `}
        >
            {/* Header */}
            <div className="mb-6 md:mb-4 lg:mb-6">
                <h2 className={`
                    text-lg font-bold
                    ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
                `}>
                    Your due Assignments
                </h2>
            </div>

            {/* Assignments List */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 flex-1 overflow-y-auto">
                {assignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="flex flex-col sm:flex-row md:flex-row md:items-center md:gap-0 lg:flex-row items-start gap-0 w-full"
                    >
                        {/* Left Thumbnail - Outside grey card */}
                        <div
                            className="flex-shrink-0 w-full sm:w-[220px] md:w-[140px] lg:w-[220px] h-[200px] sm:h-[390px] md:h-[180px] lg:h-[390px] rounded-[20px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-10"
                        >
                            <img
                                src={assignment.thumbnail}
                                alt={assignment.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Grey Card with Content */}
                        <div
                            className={`
                                p-6 md:p-4 lg:p-6 flex-1 hover:shadow-md transition-shadow w-full sm:w-auto md:w-full lg:w-auto
                                h-auto sm:h-[390px] md:h-[180px] lg:h-[390px]
                                mt-[-20px] sm:mt-0 md:mt-0 lg:mt-0 ml-0 sm:ml-[-20px] md:ml-[-20px] lg:ml-[-20px]
                                rounded-b-[20px] sm:rounded-r-[20px] sm:rounded-l-none md:rounded-r-[20px] md:rounded-l-none lg:rounded-r-[20px] lg:rounded-l-none rounded-t-none sm:rounded-t-[20px] md:rounded-t-[20px] lg:rounded-t-[20px]
                                ${isDark && isHomePage
                                    ? 'bg-[#232730] shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                                    : 'bg-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                                }
                            `}
                        >
                            {/* Content Section */}
                            <div className="flex flex-col md:flex-row xl:flex-col min-[1351px]:flex-row min-[1200px]:max-[1350px]:flex-col gap-3 md:gap-4 min-[1200px]:max-[1350px]:gap-3 h-full md:items-center xl:items-stretch min-[1351px]:items-center min-[1200px]:max-[1350px]:items-start justify-between pt-6 sm:pt-0 md:pt-0 sm:pl-4 md:pl-4 lg:pl-4">
                                <div className="md:flex-1">
                                    {/* Title */}
                                    <h3
                                        className={`
                                        font-bold text-lg md:text-base lg:text-lg mb-2
                                            ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
                                        `}
                                    >
                                        {assignment.title}
                                    </h3>

                                    {/* Due Time */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`
                                            text-xs
                                            ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-500'}
                                        `}>
                                            {assignment.dueTime}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p
                                        className={`
                                            text-sm md:text-xs lg:text-sm leading-relaxed line-clamp-3 md:line-clamp-2 lg:line-clamp-3
                                            ${isDark && isHomePage ? 'text-[#9CA3AF]' : 'text-gray-600'}
                                        `}
                                    >
                                        {assignment.description}
                                    </p>
                                </div>

                                {/* Start Button */}
                                <div className="flex justify-end md:justify-center xl:justify-start min-[1281px]:justify-center md:items-center mt-4 sm:mt-2 md:mt-0 xl:mt-4 min-[1281px]:mt-0 md:flex-shrink-0">
                                    <button
                                        onClick={() => navigate('/assignment')}
                                        className="font-semibold text-white rounded-full transition-all duration-200 hover:shadow-lg px-6 h-10 text-sm due-start-btn"
                                        style={{
                                            background: isDark && isHomePage
                                                ? 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)'
                                                : 'linear-gradient(135deg, #60D5F2 0%, #4FC3F7 100%)',
                                        }}
                                    >
                                        Start
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div >
    );
};


