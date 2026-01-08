import React from "react";

export const ProgressCard = ({ 
  progress = 75, 
  title = "My Progress",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  buttonText = "More Details",
  onButtonClick
}) => {
  // Calculate the circle properties
  const radius = 58.31; // Increased for taller card
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 w-full max-w-[280px]">
      {/* Circular Progress Indicator */}
      <div className="relative w-40 h-40 mx-auto mb-5">
        {/* Outer dark ring background (85% opacity) */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="rgba(0, 0, 0, 0.85)"
            strokeWidth="10"
          />
        </svg>

        {/* Inner soft blue ring background */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#E8F1FF"
            strokeWidth="10"
          />
        </svg>

        {/* Progress ring (blue) */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          width="160"
          height="160"
          viewBox="0 0 160 160"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#1D8CF8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>

        {/* Small blue circular indicator on top right */}
        <div 
          className="absolute w-3 h-3 bg-[#1D8CF8] rounded-full border-2 border-white shadow-sm"
          style={{
            top: `${80 - radius - 5}px`,
            left: `${80 + radius - 5}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />

        {/* Center text "75%" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{progress}%</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-4 text-center mx-auto">
        {description}
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={onButtonClick}
          className="bg-[#1D8CF8] hover:bg-[#1A7FE6] text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 shadow-sm text-sm"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

