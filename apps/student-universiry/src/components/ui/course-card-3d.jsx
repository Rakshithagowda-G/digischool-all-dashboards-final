import React, { useRef, useEffect, useState } from "react";

export const CourseCard3D = ({ 
  courseName, 
  imageUrl,
  accentColor = "#1D8CF8"
}) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -25;
      const rotateY = ((x - centerX) / centerX) * 25;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform("perspective(1000px) rotateX(0) rotateY(0)");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-[300px] h-[400px] mx-10 my-10 bg-white rounded-[20px] transform-gpu transition-transform duration-300 shadow-lg"
      style={{
        transform: transform || "perspective(1000px) rotateX(0) rotateY(0)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background text - before */}
      <div
        className="absolute top-5 left-5 text-6xl font-black text-gray-300 italic opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.1 : 0,
        }}
      >
        {courseName.substring(0, 4).toUpperCase()}
      </div>
      
      {/* Background text - after */}
      <div
        className="absolute bottom-5 right-5 text-5xl font-black text-gray-300 italic opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 0.1 : 0,
        }}
      >
        COURSE
      </div>

      {/* Course Name */}
      <h2
        className="absolute top-0 left-0 text-center text-gray-800 w-full transform-gpu transition-all duration-500 opacity-0 z-10 pointer-events-none font-semibold"
        style={{
          transform: isHovered ? "translate3d(0, 40px, 75px)" : "translate3d(0, 0, 75px)",
          opacity: isHovered ? 1 : 0,
        }}
      >
        {courseName}
      </h2>

      {/* Buy Now Button */}
      <a
        href="#"
        className="absolute bottom-0 left-1/2 transform-gpu transition-all duration-500 opacity-0 z-10 text-white px-6 py-2.5 rounded-[30px] text-sm font-medium no-underline pointer-events-auto"
        style={{
          backgroundColor: accentColor,
          transform: isHovered ? "translate3d(-50%, 30px, 75px)" : "translate3d(-50%, 0, 75px)",
          opacity: isHovered ? 1 : 0,
        }}
      >
        Enroll Now
      </a>

      {/* Circle */}
      <div
        className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full transform-gpu transition-all duration-500 z-10"
        style={{
          backgroundColor: accentColor,
          transform: "translate3d(-50%, -50%, 50px)",
        }}
      />

      {/* Product Image */}
      <img
        src={imageUrl || "/placeholder-course.png"}
        alt={courseName}
        className="absolute top-1/2 left-1/2 max-w-[300px] z-[11] transform-gpu transition-all duration-500 pointer-events-none"
        style={{
          transform: isHovered 
            ? "translate3d(-50%, -50%, 100px) rotate(1deg)" 
            : "translate3d(-50%, -50%, 50px) rotate(1deg)",
        }}
        draggable="false"
      />
    </div>
  );
};

