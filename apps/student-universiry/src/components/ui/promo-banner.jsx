import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { getWelcomeData } from "@/lib/api";

export const PromoBanner = () => {
  const { darkMode } = useDarkMode();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(window.location.search);
        const studentId = searchParams.get('studentId') || 'STU001';
        const response = await getWelcomeData(studentId);
        setData(response);
      } catch (error) {
        console.error("Error fetching welcome data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const studentName = data?.fullName || "Student";

  return (
    <div
      className={`relative w-full h-[280px] sm:h-[320px] md:h-full rounded-[20px] overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-10 ${darkMode ? 'bg-[#111c44] text-white' : 'bg-white text-slate-900'} shadow-sm`}
    >
      {/* Content - Constrained width to prevent overlap */}
      <div className="relative z-10 w-[70%] sm:w-[65%] md:w-[50%] lg:w-[55%] xl:w-[60%] pr-4">
        {loading ? (
          <div className="animate-pulse">
            <div className={`h-10 w-48 mb-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-6 w-32 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">
              Welcome back, {studentName}
            </h2>
            <p className={`text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed mb-6 md:mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-500'} max-w-md`}>
              Glad to see you again!
            </p>
          </>
        )}
      </div>

      {/* Curved Background Image - Responsive sizing */}
      <div className="hidden md:block absolute right-0 top-0 w-[35%] lg:w-[38%] xl:w-[40%] h-full pointer-events-none p-3 md:p-4">
        <img
          src="/img/white-curved.jpeg"
          alt="Curved background"
          className="w-full h-full object-cover opacity-80 rounded-[20px]"
        />
      </div>

      {/* Rocket Image - Responsive sizing to prevent overlap */}
      <div className="flex absolute right-2 sm:right-4 lg:right-6 xl:right-8 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-60 lg:h-60 xl:w-72 xl:h-72 items-center justify-center pointer-events-none z-20">
        <img
          src="/img/rocket-white.png"
          alt="Rocket"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
};
