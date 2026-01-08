import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LottiePlayer } from './lottie-player';
import kidsStudying from '../../assets/lottie/Kids Studying from Home.json';
import { useTheme } from '../../context/ThemeContext';

export const SuggestedActivities = () => {
    const navigate = useNavigate();
    const { mode } = useTheme();
    const isDark = mode === 'dark';
    const isHomePage = window.location.pathname === '/';
    const activities = [
        {
            title: 'Welcome Rakshitha',
            description: 'Welcome to your student dashboard.',
            color: '#4ECDC4',
            darkGradient: 'linear-gradient(135deg, #155E75 0%, #0E7490 100%)',
            illustration: <LottiePlayer animationData={kidsStudying} />,
            textColor: 'white',
            fullWidth: true,
            showButton: false
        },
        {
            title: 'Assignments',
            description: 'Complete your pending assignments.',
            color: '#A0E7E5',
            darkGradient: 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)',
            illustration: <img src="/img/singing card.png" alt="Assignments" />,
            textColor: 'gray-900',
            showButton: true,
            path: '/assignment'
        },
        {
            title: 'Watch Lessons',
            description: 'Watch video lessons anytime.',
            color: '#5567C9',
            darkGradient: 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)',
            illustration: <img src="/img/reading.png" alt="Watch Lessons" />,
            textColor: 'white',
            showButton: true,
            path: '/courses'
        }
    ];

    return (
        <div className="w-full">
            <h2 className={`
                text-xl font-bold mb-4
                ${isDark && isHomePage ? 'text-[#FFFFFF]' : 'text-gray-900'}
            `}>
                Suggested Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                    <motion.div
                        key={index}
                        className={`relative rounded-2xl p-4 md:p-3 lg:p-6 overflow-hidden flex flex-row items-center gap-3 md:gap-2 lg:gap-4 ${activity.fullWidth ? 'lg:col-span-2' : ''}`}
                        style={{
                            background: isDark && isHomePage ? activity.darkGradient : activity.color
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Text Section */}
                        <div className="flex-1 min-w-0 space-y-1 md:space-y-0.5 lg:space-y-2 z-10">
                            <h3 className={`
                                text-lg md:text-sm lg:text-lg font-bold line-clamp-2 leading-tight
                                ${isDark && isHomePage ? 'text-white' : `text-${activity.textColor}`}
                            `}>
                                {activity.title}
                            </h3>
                            <p className={`
                                text-[11px] md:text-[10px] lg:text-[11px] leading-tight opacity-90 line-clamp-2
                                ${isDark && isHomePage ? 'text-white' : `text-${activity.textColor}`}
                            `}>
                                {activity.description}
                            </p>
                            <button
                                onClick={() => activity.path && navigate(activity.path)}
                                className={`
                                px-4 py-1.5 md:px-3 md:py-1 lg:px-6 lg:py-2 rounded-full text-xs md:text-[10px] lg:text-sm font-semibold transition-all mt-2 md:mt-1 lg:mt-0
                                ${!activity.showButton ? 'invisible pointer-events-none' : ''}
                                ${isDark && isHomePage
                                        ? 'bg-white text-gray-800 hover:bg-opacity-90'
                                        : 'bg-white text-gray-800 hover:bg-opacity-90'
                                    }
                            `}>
                                START
                            </button>
                        </div>

                        {/* Image Section */}
                        <div className="flex-shrink-0 w-20 h-20 md:w-16 md:h-16 lg:w-32 lg:h-32 flex items-center justify-center">
                            {React.cloneElement(activity.illustration, {
                                className: "w-full h-full object-contain"
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
