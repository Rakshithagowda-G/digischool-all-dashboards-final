import React, { useState, useRef, useEffect } from "react";

export const ProfileCard = ({ 
  name = "YOUR NAME HERE",
  profileImage = "https://via.placeholder.com/150",
  backgroundImage = "https://via.placeholder.com/400",
  aboutText = "YOUR TAGLINE HERE",
  githubUrl = "#",
  accentColor = "#00BFFF",
  maxTilt = 25,
  glare = true,
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const [transform, setTransform] = useState("");
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [aboutDisplayText, setAboutDisplayText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [glareStyle, setGlareStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x: `${x}px`, y: `${y}px` });
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Use the same tilting calculation as glassmorphism card
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
      
      // Add glare effect like glassmorphism card
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

  const handleToggleAbout = () => {
    const newVisible = !isAboutVisible;
    setIsAboutVisible(newVisible);
    
    if (newVisible) {
      setAboutDisplayText("");
      let i = 0;
      const typeWriterAbout = () => {
        if (i < aboutText.length) {
          setAboutDisplayText(aboutText.substring(0, i + 1));
          i++;
          setTimeout(typeWriterAbout, 120);
        } else {
          setAboutDisplayText(aboutText);
        }
      };
      setTimeout(typeWriterAbout, 500);
    } else {
      setAboutDisplayText("");
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-[380px] rounded-[20px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-2 border-transparent transition-all duration-300"
      style={{ 
        transform,
        transformStyle: "preserve-3d",
        "--mouse-x": mousePosition.x,
        "--mouse-y": mousePosition.y,
      }}
    >
      {/* Chroma border animation */}
      <style>{`
        .profile-card-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          background: linear-gradient(60deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
          background-size: 300% 300%;
          animation: chroma-border 4s linear infinite;
          z-index: 1;
          border-radius: 20px;
        }
        @keyframes chroma-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .profile-card-glow::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.15), transparent 25%);
          z-index: 3;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .profile-card-glow:hover::after {
          opacity: 1;
        }
      `}</style>
      
      <div className="profile-card-border profile-card-glow">
        {/* Glare effect from glassmorphism */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[20px] transition-opacity duration-300 z-[5]"
            style={{
              ...glareStyle,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
        
        {/* Background */}
        <div 
          className="absolute top-0 left-0 w-full h-full z-[2]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.4)",
          }}
        />

        {/* Content */}
        <div className="relative z-[4] px-5 pt-10 pb-5 text-center bg-black/40 backdrop-blur-[2px]">
          <img 
            src={profileImage}
            alt="Profile Picture"
            className="w-[120px] h-[120px] rounded-full border-[3px] border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-6 mx-auto transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_25px_var(--accent-color)]"
            style={{ 
              animation: "fadeIn 0.8s ease-out 0.2s forwards",
              "--accent-color": accentColor,
            }}
          />
          
          <h1 
            className="text-white font-mono text-[2em] font-bold mb-6 mx-auto block h-[1.2em] leading-[1.2em] overflow-hidden whitespace-nowrap border-r-[0.15em] border-solid"
            style={{
              borderColor: accentColor,
              width: "0",
              animation: `typing-name 2s steps(${name.length}, end) 1s forwards, blink-caret 0.75s step-end infinite 1s`,
            }}
          >
            {name}
          </h1>

          <button
            onClick={handleToggleAbout}
            className={`bg-transparent border-2 border-white/50 rounded-full w-[30px] h-[30px] cursor-pointer p-0 relative mt-4 transition-all duration-300 hover:border-[var(--accent-color)] ${
              isAboutVisible ? "rotate-180" : ""
            }`}
            style={{ "--accent-color": accentColor }}
            aria-label="Toggle About Section"
          >
            <span 
              className="absolute w-[10px] h-[2px] bg-white rounded-[1px] top-[13px] left-[6px] transition-transform duration-300"
              style={{ transform: "rotate(45deg)" }}
            />
            <span 
              className="absolute w-[10px] h-[2px] bg-white rounded-[1px] top-[13px] right-[6px] transition-transform duration-300"
              style={{ transform: "rotate(-45deg)" }}
            />
          </button>
          
          <div 
            className={`text-center transition-all duration-700 ease-out overflow-hidden ${
              isAboutVisible 
                ? "max-h-[300px] opacity-100 mt-5" 
                : "max-h-0 opacity-0"
            }`}
          >
            <h3 className="text-base uppercase tracking-[3px] text-[#ddd] mb-2.5 m-0" style={{ textShadow: "0 0 4px #000, 0 0 6px #000" }}>
              ABOUT
            </h3>
            <p 
              className="text-[#ccc] font-mono text-[1.1em] mb-6 mx-auto min-h-[1.5em]"
            >
              {aboutDisplayText}
            </p>
            <div className="github-link-container">
              <a 
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-[1.8em] no-underline transition-all duration-300 hover:text-[var(--accent-color)] hover:scale-125 hover:-translate-y-0.5"
                style={{ 
                  "--accent-color": accentColor,
                  textShadow: isAboutVisible ? `0 0 10px ${accentColor}, 0 0 20px ${accentColor}` : "none",
                }}
                aria-label="GitHub Profile"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing-name {
          from { width: 0; }
          to { width: ${name.length}ch; }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: ${accentColor}; }
        }
      `}</style>
    </div>
  );
};

