import React from "react";
import { BookOpen, Calendar } from "lucide-react";

export const PromoBanner = () => {
  return (
    <div
      className="relative w-full h-[180px] md:h-[200px] rounded-[20px] overflow-visible flex flex-col md:flex-row items-center justify-between px-4 md:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #1D8CF8 0%, #3358F4 100%)'
      }}
    >
      {/* Background decorative icons - very low opacity, positioned behind text */}
      <BookOpen className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[120px] md:h-[120px] text-white opacity-[0.06]" />
      <Calendar className="absolute left-24 md:left-32 top-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[120px] md:h-[120px] text-white opacity-[0.06]" />

      {/* Book/Learning icon at right bottom edge */}
      <BookOpen
        className="absolute right-4 md:right-6 lg:right-8 bottom-2 md:bottom-4 w-[80px] h-[80px] md:w-[100px] md:h-[100px] text-white opacity-15"
        strokeWidth={2.5}
      />

      {/* Left side - Text content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0 pr-36 md:pr-4 text-left">
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
          Welcome back!
          <br />
          Let's make today awesome!
        </h2>
        <p className="text-[#E8F1FF] text-sm md:text-base leading-relaxed max-w-md mt-1">
          A step towards a bright future. Track your progress, complete assignments, and achieve your academic goals.
        </p>
      </div>

      {/* Calendar icon to the left of girl image */}
      <Calendar
        className="absolute left-[55%] md:left-[58%] -translate-x-1/2 bottom-8 md:bottom-12 w-[60px] h-[60px] md:w-[80px] md:h-[80px] text-white opacity-15 z-20"
        strokeWidth={2.5}
      />

      {/* Right side - Student image (overlapping) */}
      <div className="absolute right-0 translate-x-0 md:right-auto md:left-3/4 md:-translate-x-1/2 bottom-0 z-20">
        <img
          src="/A_digital_photograph_features_a_young_woman_in_her.png.png"
          alt="Student"
          className="h-[160px] sm:h-[180px] md:h-[220px] w-auto object-contain"
          style={{
            maxWidth: 'none',
            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2))',
            objectFit: 'contain'
          }}
          onError={(e) => {
            console.error('Image failed to load:', e);
          }}
        />
      </div>
    </div>
  );
};
