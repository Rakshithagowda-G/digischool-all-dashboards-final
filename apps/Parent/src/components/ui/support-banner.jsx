import React from "react";

export const SupportBanner = () => {
    return (
        <div className="w-full rounded-[20px] overflow-hidden">
            {/* --- MOBILE/TABLET LAYOUT (< lg) --- */}
            <div className="lg:hidden bg-[#1a1a2e] border border-white/10 p-6 md:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-2 max-w-full break-words text-center md:text-left">
                    <h2 className="text-white text-xl sm:text-2xl font-semibold leading-tight">
                        Support Your Child's Learning
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-snug">
                        Access resources, communicate with teachers, and stay involved in your child's education
                    </p>
                </div>
                <img
                    src="/img/support.jpg"
                    alt="Support Learning"
                    className="w-full max-w-[180px] md:max-w-[200px] mx-auto shrink-0 object-contain rounded-xl"
                />
            </div>

            {/* --- DESKTOP LAYOUT (lg+) - ORIGINAL RESTORED --- */}
            <div
                className="hidden lg:flex relative h-[320px] items-center justify-between px-8"
                style={{
                    backgroundImage: 'url(/img/support.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 20%',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                {/* Blue overlay */}
                <div
                    className="absolute inset-0 bg-[#1a1a2e]/75"
                    style={{
                        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.75) 0%, rgba(22, 33, 62, 0.75) 100%)'
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center flex-1">
                    <h2 className="text-white text-3xl font-bold mb-3 leading-tight">
                        Support Your Child's Learning
                    </h2>
                    <p className="text-gray-300 text-base leading-relaxed max-w-md">
                        Access resources, communicate with teachers, and stay involved in your child's education
                    </p>
                </div>
            </div>
        </div>
    );
};
