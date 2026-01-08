import React from "react";
import { motion } from "framer-motion";

export const CourseCard = ({ 
  courseName, 
  grades, 
  description, 
  modelUrl,
  colorScheme = "pink",
  delay = 0 
}) => {
  const colorVariants = {
    pink: {
      bg: "bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100",
      shadow: "shadow-[0_8px_32px_rgba(236,72,153,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(236,72,153,0.3)]",
    },
    mint: {
      bg: "bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-100",
      shadow: "shadow-[0_8px_32px_rgba(16,185,129,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(16,185,129,0.3)]",
    },
    cream: {
      bg: "bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-50",
      shadow: "shadow-[0_8px_32px_rgba(245,158,11,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(245,158,11,0.3)]",
    },
    purple: {
      bg: "bg-gradient-to-br from-purple-200 via-violet-100 to-fuchsia-100",
      shadow: "shadow-[0_8px_32px_rgba(168,85,247,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(168,85,247,0.3)]",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-200 via-indigo-100 to-cyan-100",
      shadow: "shadow-[0_8px_32px_rgba(59,130,246,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(59,130,246,0.3)]",
    },
    green: {
      bg: "bg-gradient-to-br from-green-200 via-emerald-100 to-teal-100",
      shadow: "shadow-[0_8px_32px_rgba(34,197,94,0.2)]",
      hoverShadow: "hover:shadow-[0_12px_48px_rgba(34,197,94,0.3)]",
    },
  };

  const colors = colorVariants[colorScheme] || colorVariants.pink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer"
    >
      <div
        className={`
          ${colors.bg}
          ${colors.shadow}
          ${colors.hoverShadow}
          relative
          rounded-3xl
          p-6
          backdrop-blur-sm
          border border-white/50
          transition-all duration-500
          overflow-hidden
          h-full
          flex flex-col
        `}
        style={{
          background: `linear-gradient(135deg, ${colors.bg.includes('pink') ? 'rgba(251, 207, 232, 0.8)' : colors.bg.includes('mint') ? 'rgba(167, 243, 208, 0.8)' : colors.bg.includes('cream') ? 'rgba(254, 243, 199, 0.8)' : colors.bg.includes('purple') ? 'rgba(221, 214, 254, 0.8)' : colors.bg.includes('blue') ? 'rgba(191, 219, 254, 0.8)' : 'rgba(187, 247, 208, 0.8)'}, rgba(255, 255, 255, 0.6))`,
        }}
      >
        {/* Decorative blob shapes */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>

        {/* 3D Model Container */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-48 mb-4 flex items-center justify-center"
        >
          {modelUrl ? (
            <iframe
              src={modelUrl}
              className="w-full h-full border-0 rounded-2xl"
              title={`${courseName} 3D Model`}
            />
          ) : (
            <div className="w-full h-full bg-white/40 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/50">
              <div className="text-6xl opacity-50">
                {courseName === "English" && "📚"}
                {courseName === "Maths" && "🔢"}
                {courseName === "Science" && "🔬"}
                {courseName === "EVS" && "🌍"}
                {courseName === "Computer" && "💻"}
                {courseName === "Art & Craft" && "🎨"}
              </div>
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {courseName}
          </h3>
          <p className="text-sm font-semibold text-gray-600 mb-3">
            {grades}
          </p>
          <p className="text-gray-700 text-sm leading-relaxed flex-1">
            {description}
          </p>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      </div>
    </motion.div>
  );
};

