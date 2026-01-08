import React, { useRef, useEffect, useState } from "react";

export const GlassmorphismCard = ({
  number = "01",
  title = "Magic Card",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi obcaecati nostrum a animi quis eveniet voluptate assumenda omnis ducimus, eum incidunt autem laborum magni nam neque ut facilis aliquam recusandae.",
  linkText = "Read More",
  linkUrl = "#",
  backgroundImage = "https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg",
  maxTilt = 25,
  speed = 400,
  glare = true,
}) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      
      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlareStyle({
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3), transparent 70%)`,
        });
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform("perspective(1000px) rotateX(0) rotateY(0)");
      setGlareStyle({});
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [maxTilt, glare]);

  return (
    <div
      ref={cardRef}
      className="relative flex justify-center items-center h-[400px] w-[280px] overflow-hidden rounded-[15px] transition-all duration-300"
      style={{
        transform,
        transformStyle: "preserve-3d",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(2px)",
        backgroundImage: isHovered ? `url(${backgroundImage})` : "none",
        backgroundPosition: "center",
        backgroundSize: "cover",
        animation: isHovered ? "rotate 1.4s linear infinite" : "none",
      }}
    >
      {/* Glare effect */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[15px] transition-opacity duration-300"
          style={{
            ...glareStyle,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Card content */}
      <div
        className={`absolute text-center p-5 transition-all duration-500 ease-in-out ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-[150px] opacity-0"
        }`}
      >
        <h2
          className="absolute text-[9rem] -top-20 right-5 text-white/10 pointer-events-none"
          style={{ fontFamily: "sans-serif" }}
        >
          {number}
        </h2>
        <h3
          className="relative text-[2.2rem] text-white mb-4"
          style={{ fontFamily: "sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="relative text-base font-medium text-white mb-4"
          style={{ fontFamily: "sans-serif" }}
        >
          {description}
        </p>
        <a
          href={linkUrl}
          className="inline-block bg-white px-5 py-2 no-underline text-black rounded-[20px] mt-4 transition-all duration-300 hover:scale-105"
          style={{ fontFamily: "sans-serif" }}
        >
          {linkText}
        </a>
      </div>

      {/* Rotate animation */}
      <style>{`
        @keyframes rotate {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};



