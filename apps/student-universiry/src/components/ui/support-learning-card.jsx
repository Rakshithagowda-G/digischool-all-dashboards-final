import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";

export const SupportLearningCard = () => {
    const { darkMode } = useDarkMode();

    return (
        <div
            className={`relative w-full h-[300px] md:h-full rounded-[20px] overflow-hidden flex flex-col justify-end p-6 md:p-8 ${darkMode ? 'bg-[#111c44]' : 'bg-[#0F172A]'}`}
        >
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.4
                }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                    Support Your Child's Learning
                </h2>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-md">
                    Access resources, communicate with teachers, and stay involved in your child's education
                </p>
            </div>
        </div>
    );
};
