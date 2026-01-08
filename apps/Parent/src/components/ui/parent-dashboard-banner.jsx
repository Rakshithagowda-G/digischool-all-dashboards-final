import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ParentDashboardBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full rounded-[20px] overflow-hidden bg-white dark:bg-[#0A1333] border border-gray-200 dark:border-white/10 lg:p-0 lg:h-[320px] lg:flex lg:items-center lg:px-8">

            {/* --- MOBILE/TABLET LAYOUT (< lg) --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8 lg:hidden">
                <div className="flex flex-col gap-2 max-w-full md:max-w-[60%] break-words text-center md:text-left">
                    <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl font-semibold leading-tight">
                        Track Your Child's Progress
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-snug">
                        Monitor academic performance, attendance, and assignments in real-time
                    </p>
                    <div className="pt-2 flex justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/performance')}
                            className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-sm md:text-base hover:gap-3 transition-all cursor-pointer"
                        >
                            View Details
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <img
                    src="/img/illustrations/rocket-white.png"
                    alt="Rocket Illustration"
                    className="w-full max-w-[180px] md:max-w-[240px] mx-auto md:mx-0 shrink-0 object-contain"
                />
            </div>

            {/* --- DESKTOP LAYOUT (lg+) - ORIGINAL RESTORED --- */}
            <div className="hidden lg:flex relative z-10 flex-col justify-center h-full max-w-[50%] xl:max-w-[60%]">
                <h2 className="text-gray-900 dark:text-white text-3xl xl:text-4xl font-bold mb-3 leading-tight">
                    Track Your Child's Progress
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                    Monitor academic performance, attendance, and assignments in real-time
                </p>
                <div className="flex">
                    <button
                        onClick={() => navigate('/performance')}
                        className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-base hover:gap-3 transition-all cursor-pointer"
                    >
                        View Details
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Desktop Background Elements (Hidden on Mobile) */}
            <img
                src="/img/baground.jpg"
                alt="Background"
                className="hidden lg:block absolute right-4 bottom-4 top-4 h-[calc(100%-32px)] object-cover object-left w-[40%] xl:w-[35%] rounded-2xl"
            />
            <img
                src="/img/white-curved.jpeg"
                alt="Curve Overlay"
                className="hidden lg:block absolute right-4 bottom-4 top-4 h-[calc(100%-32px)] object-cover object-left w-[40%] xl:w-[35%] rounded-2xl mix-blend-screen opacity-80"
            />
            <div
                className="hidden lg:block absolute right-4 bottom-4 top-4 h-[calc(100%-32px)] w-[40%] xl:w-[35%] rounded-2xl bg-[#1a1a2e]/40 z-0"
            />
            <img
                src="/img/illustrations/rocket-white.png"
                alt="Rocket Illustration"
                className="hidden lg:block absolute -right-4 xl:-right-8 bottom-4 w-[300px] xl:w-[380px] z-10 object-contain"
            />
        </div>
    );
};
