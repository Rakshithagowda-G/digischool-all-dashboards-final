import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Calendar, Clock } from "lucide-react";

export const UpcomingWebinarCard = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`w-full h-full rounded-[20px] p-6 flex flex-col ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}>
      {/* Illustration Area */}
      <div className={`w-full h-32 rounded-xl mb-6 relative overflow-hidden ${darkMode ? 'bg-[#1b254b]' : 'bg-[#F4F7FE]'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Abstract shapes mimicking the image */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Green circle */}
            <div className="absolute left-[20%] top-[40%] w-12 h-12 rounded-full bg-[#4ADE80] opacity-80 blur-[1px]"></div>

            {/* Center Person Icon/Shape */}
            <div className="flex flex-col items-center z-10">
              <div className="w-12 h-12 rounded-full bg-[#344767] mb-[-10px] z-20"></div>
              <div className="w-20 h-16 rounded-t-2xl bg-[#585CE5] flex items-end justify-center pb-2">
                <div className="w-14 h-10 bg-[#344767] rounded-t-lg"></div>
              </div>
            </div>

            {/* Checkmark bubble */}
            <div className="absolute right-[25%] top-[30%] bg-[#01B574] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
              ✓✓
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2">Upcoming Webinar</h3>
        <p className={`text-sm mb-6 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Next Generation Frontend Architecture Using Layout Engine And React Native Web.
        </p>

        {/* Date and Duration */}
        <div className="flex items-center gap-8 mb-auto">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-[#1b254b] text-white' : 'bg-[#F4F7FE] text-[#585CE5]'}`}>
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">17 Nov 23</span>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Date</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-[#1b254b] text-white' : 'bg-[#F4F7FE] text-[#585CE5]'}`}>
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">32 minutes</span>
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Duration</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-6 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-3 rounded-xl transition-colors">
          Join the event
        </button>
      </div>
    </div>
  );
};
