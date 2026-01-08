import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultsSection = () => {
  // Example data - can be passed as props
  const userData = {
    name: "Leo George",
    memberSince: "DEC 2023",
    completedTasks: 7,
    totalTasks: 20,
    daysRemaining: 20,
  };

  const dailyTasks = [
    {
      id: 1,
      name: "Complete Task",
      completed: 40,
      total: 40,
      iconBg: "bg-yellow-100",
      icon: "🧪",
      isComplete: true,
    },
    {
      id: 2,
      name: "Task Name",
      completed: 32,
      total: 40,
      iconBg: "bg-orange-100",
      icon: "🎉",
      isComplete: false,
    },
    {
      id: 3,
      name: "Task Name",
      completed: 20,
      total: 40,
      iconBg: "bg-blue-100",
      icon: "🎨",
      isComplete: false,
    },
    {
      id: 4,
      name: "Task Name",
      completed: 10,
      total: 40,
      iconBg: "bg-green-100",
      icon: "📚",
      isComplete: false,
    },
  ];

  const progressPercentage = (userData.completedTasks / userData.totalTasks) * 100;

  return (
    <div className="w-full space-y-6 p-6">
      {/* Level Roadmap Section */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Level Roadmap</h2>

        {/* Lavender Purple Banner */}
        <div className="bg-gradient-to-br from-[#8B7BE8] to-[#A78BFA] rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] relative overflow-hidden">
          {/* Member Since Badge */}
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-white tracking-wide">MEMBER SINCE {userData.memberSince}</span>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            {/* Left Content */}
            <div className="flex-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Welcome, {userData.name}
              </h3>

              {/* White Progress Card */}
              <div className="bg-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-900 font-semibold text-base sm:text-lg">
                    Complete {userData.completedTasks}/{userData.totalTasks} Tasks
                  </p>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-semibold whitespace-nowrap">{userData.daysRemaining} Days</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:flex items-center justify-center flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-32 h-32 lg:w-36 lg:h-36 relative"
              >
                <div className="text-8xl lg:text-9xl">🎓</div>
                <div className="absolute top-0 right-0 text-3xl">📚</div>
                <div className="absolute bottom-0 left-0 text-2xl">✨</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tasks Section */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Daily Tasks</h2>

        <div className="space-y-4">
          {dailyTasks.map((task, index) => {
            const taskProgress = (task.completed / task.total) * 100;
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${task.isComplete
                    ? 'bg-gradient-to-br from-[#E9D5FF] to-[#DDD6FE]'
                    : 'bg-white'
                  } rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 flex items-center gap-4`}
              >
                {/* Task Icon */}
                <div className={`${task.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl sm:text-3xl">{task.icon}</span>
                </div>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2">
                    {task.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${taskProgress}%` }}
                        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                      {task.completed}/{task.total}
                    </span>
                    {task.isComplete && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;




