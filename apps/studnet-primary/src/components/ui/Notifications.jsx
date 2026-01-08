import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Upload } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Notifications = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const isDarkThemePage = isDark;
  const fileInputRef = useRef(null);

  const handleSubmitClick = (e) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  // All tasks data
  const allTasks = [
    {
      id: 1,
      title: "Mathematics: Fractions and Decimals",
      message: "Finish page 42-45 exercises.",
      time: "Due Today",
      read: false,
    },
    {
      id: 2,
      title: "English: Creative Writing",
      message: "Short story about desert magic.",
      time: "Due Today",
      read: false,
    },
    {
      id: 3,
      title: "Science: Local Flora Research",
      message: "Three plants and animals native to Qatar.",
      time: "Due Today",
      read: false,
    },
    {
      id: 4,
      title: "My Hero: Biography",
      message: "Teacher added new resources for your biography task.",
      time: "2h ago",
      read: false,
    },
    {
      id: 5,
      title: "Favorite Season Reflection",
      message: "Feedback available for your initial draft.",
      time: "5h ago",
      read: false,
    },
  ];

  // Show only latest 3 tasks in preview
  const previewTasks = allTasks.slice(0, 3);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
          rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
          ${isDark && isDarkThemePage
            ? 'bg-[#181B21]'
            : 'bg-white'
          }
        `}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`
            text-lg font-semibold
            ${isDark && isDarkThemePage ? 'text-[#FFFFFF]' : 'text-gray-800'}
          `}>
            Submit Today Assignment
          </h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              text-xs font-medium transition-colors
              ${isDark && isDarkThemePage ? 'text-[#06B6D4] hover:text-[#06B6D4]/80' : 'text-purple-600 hover:text-purple-700'}
            `}
          >
            See All
          </button>
        </div>

        <div className="space-y-4">
          {previewTasks.map((notification) => (
            <div
              key={notification.id}
              className={`
                p-3 rounded-xl transition-colors cursor-pointer
                ${isDark && isDarkThemePage
                  ? 'bg-[#232730] hover:bg-[#2D3342]'
                  : 'bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-start gap-2">
                {!notification.read && (
                  <div className={`
                    w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                    ${isDark && isDarkThemePage ? 'bg-[#06B6D4]' : 'bg-[#CDA3F5]'}
                  `}></div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`
                      text-sm font-semibold mb-1 line-clamp-1
                      ${isDark && isDarkThemePage ? 'text-[#FFFFFF]' : 'text-gray-800'}
                    `}>
                      {notification.title}
                    </h4>
                    <button
                      onClick={handleSubmitClick}
                      className={`
                        p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider
                        ${isDark && isDarkThemePage
                          ? 'bg-[#06B6D4]/10 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white'
                          : 'bg-[#CDA3F5]/10 text-[#CDA3F5] hover:bg-[#CDA3F5] hover:text-white'
                        }
                      `}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Submit</span>
                    </button>
                  </div>
                  <p className={`
                    text-xs mb-1
                    ${isDark && isDarkThemePage ? 'text-[#9CA3AF]' : 'text-gray-600'}
                  `}>
                    {notification.message}
                  </p>
                  <div className={`
                    flex items-center gap-1 text-xs
                    ${isDark && isDarkThemePage ? 'text-[#6B7280]' : 'text-gray-400'}
                  `}>
                    <Clock className="w-3 h-3" />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                w-full max-w-md h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col
                ${isDark && isDarkThemePage ? 'bg-[#181B21]' : 'bg-white'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-6 text-white flex items-center justify-between"
                style={isDark && isDarkThemePage
                  ? { background: 'linear-gradient(to right, #06B6D4, #0891B2)' }
                  : { background: 'linear-gradient(to right, #CDA3F5, #b88de6)' }
                }
              >
                <h3 className="text-lg font-bold text-white">All Tasks</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className={`
                flex-1 overflow-y-auto divide-y
                ${isDark && isDarkThemePage ? 'divide-[#232730]' : 'divide-gray-100'}
              `}>
                {allTasks.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-5 transition-colors cursor-pointer
                      ${isDark && isDarkThemePage
                        ? 'hover:bg-[#232730]'
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      {!notification.read && (
                        <div className={`
                          w-2 h-2 rounded-full mt-2 flex-shrink-0
                          ${isDark && isDarkThemePage ? 'bg-[#06B6D4]' : 'bg-[#CDA3F5]'}
                        `}></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4 mb-1">
                          <h4 className={`
                            text-sm font-semibold
                            ${!notification.read ? 'font-bold' : ''}
                            ${isDark && isDarkThemePage ? 'text-[#FFFFFF]' : 'text-gray-800'}
                          `}>
                            {notification.title}
                          </h4>
                          <button
                            onClick={handleSubmitClick}
                            className={`
                              px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider
                              ${isDark && isDarkThemePage
                                ? 'bg-[#06B6D4] text-white hover:bg-[#06B6D4]/90'
                                : 'bg-[#CDA3F5] text-white hover:bg-[#CDA3F5]/90'
                              }
                            `}
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Submit</span>
                          </button>
                        </div>
                        <p className={`
                          text-xs mb-2 line-clamp-2
                          ${isDark && isDarkThemePage ? 'text-[#9CA3AF]' : 'text-gray-600'}
                        `}>
                          {notification.message}
                        </p>
                        <div className={`
                          flex items-center gap-1 text-xs
                          ${isDark && isDarkThemePage ? 'text-[#6B7280]' : 'text-gray-400'}
                        `}>
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx"
      />
    </div>
  );
};
