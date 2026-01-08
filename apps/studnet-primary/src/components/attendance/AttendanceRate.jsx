import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Loader2, AlertCircle } from "lucide-react";

const defaultMonthsTemplate = [
  { id: "jan", name: "January", rate: 0, color: "#1678FF" },
  { id: "feb", name: "February", rate: 0, color: "#FF9A2E" },
  { id: "mar", name: "March", rate: 0, color: "#44C24A" },
  { id: "apr", name: "April", rate: 0, color: "#FFB86B" },
  { id: "may", name: "May", rate: 0, color: "#7CCBFF" },
  { id: "jun", name: "June", rate: 0, color: "#FF6B9D" },
  { id: "jul", name: "July", rate: 0, color: "#9B59B6" },
  { id: "aug", name: "August", rate: 0, color: "#E74C3C" },
  { id: "sep", name: "September", rate: 0, color: "#3498DB" },
  { id: "oct", name: "October", rate: 0, color: "#F39C12" },
  { id: "nov", name: "November", rate: 0, color: "#1ABC9C" },
  { id: "dec", name: "December", rate: 0, color: "#E67E22" },
];

export default function AttendanceRate({ overview, monthlyData, loading, error }) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const months = defaultMonthsTemplate.map((template) => {
    const apiMatch = monthlyData?.monthlyRates?.find(m =>
      m.month.toLowerCase() === template.name.toLowerCase()
    );
    return {
      ...template,
      rate: apiMatch ? apiMatch.percentage : template.rate
    };
  });

  const scrollRef = useRef(null);
  const innerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [pathD, setPathD] = useState("");
  const [svgWidth, setSvgWidth] = useState(720);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loading || error) return;
    const duration = 700;
    const start = Date.now();
    const target = Number(overview ?? 0);
    const step = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    step();
  }, [overview, loading, error]);

  const computePath = () => {
    const inner = innerRef.current;
    if (!inner) return;
    const innerRect = inner.getBoundingClientRect();

    setSvgWidth(Math.max(720, inner.scrollWidth));

    const points = nodeRefs.current
      .map((el) => (el ? el.getBoundingClientRect() : null))
      .filter(Boolean)
      .map((r) => ({
        x: r.left - innerRect.left + r.width / 2,
        y: r.top - innerRect.top + r.height / 2,
      }));

    if (points.length < 2) {
      setPathD("");
      return;
    }

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y} ${cx} ${p1.y} ${p1.x} ${p1.y}`;
    }
    setPathD(d);
  };

  useEffect(() => {
    if (loading || error || (monthlyData?.monthlyRates?.length === 0)) return;
    computePath();
    const ro = new ResizeObserver(() => computePath());
    if (innerRef.current) ro.observe(innerRef.current);
    const sc = scrollRef.current;
    if (sc) sc.addEventListener("scroll", computePath, { passive: true });
    window.addEventListener("resize", computePath);

    const timer = setTimeout(() => computePath(), 120);

    return () => {
      ro.disconnect();
      if (sc) sc.removeEventListener("scroll", computePath);
      window.removeEventListener("resize", computePath);
      clearTimeout(timer);
    };
  }, [loading, error, monthlyData]);

  if (loading) {
    return (
      <div className={`rounded-[18px] p-6 min-h-[420px] flex flex-col items-center justify-center ${isDark ? 'bg-[#181B21]' : 'bg-white'}`}>
        <Loader2 className="w-10 h-10 animate-spin text-p-blue opacity-50" />
        <p className="mt-4 text-sm text-gray-500 font-poppins">Loading rates...</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-[18px] p-6 md:p-4 lg:p-6 min-h-[420px] md:min-h-[300px] lg:min-h-[300px] xl:min-h-[420px] relative backdrop-blur-lg soft-fade soft-fade-delay-1"
      style={isDark ? {
        background: "#181B21",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        border: "1px solid #232730"
      } : {
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.18)"
      }}
      aria-label="Attendance Rate card"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`font-poppins font-semibold text-[20px] ${isDark ? 'text-[#FFFFFF]' : 'text-[#0F172A]'}`}>Attendance Rate</h3>
          <div className="mt-3">
            <span className={`inline-block text-sm px-3 py-1 rounded-full font-medium font-poppins ${isDark ? 'bg-[#232730] text-[#06B6D4]' : 'bg-[#E7F3FF] text-[#1678FF]'
              }`}>{monthlyData?.year || new Date().getFullYear()} Overview</span>
          </div>
        </div>

        <div className={`text-[56px] font-normal leading-none font-poppins ${isDark ? 'text-[#FFFFFF]' : 'text-[#0F172A]'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
          {count}<span className="align-top text-[40px] ml-1">%</span>
        </div>
      </div>

      <div className="border-t mt-6" style={{ borderColor: isDark ? "#232730" : "#E6E9EE" }} />

      <div className={`mt-6 text-sm font-medium font-poppins ${isDark ? 'text-[#9CA3AF]' : 'text-[#343a40]'}`}>Monthly Rate</div>

      <div className="relative mt-6">
        {error || !monthlyData?.monthlyRates?.length ? (
          <div className="flex flex-col items-center justify-center h-[160px] text-gray-400 bg-black/5 rounded-xl">
            <AlertCircle size={24} className="mb-2 opacity-30" />
            <p className="text-sm font-poppins italic">No attendance data available</p>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden no-vertical-scroll"
            style={{ height: 160, paddingBottom: 6 }}
          >
            <div
              ref={innerRef}
              className="relative flex items-center"
              style={{ minWidth: Math.max(720, months.length * 200), height: 160, paddingLeft: 36, paddingRight: 36 }}
            >
              <svg
                width={svgWidth}
                height={160}
                className="absolute left-0 top-0 pointer-events-none"
                style={{ overflow: "visible", zIndex: 1 }}
              >
                <path d={pathD} stroke="#1678FF" strokeWidth={3} fill="transparent" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <div style={{ width: 12 }} />

              {months.map((m, i) => {
                const isUp = i % 2 === 1;
                const verticalOffset = isUp ? "-40px" : "20px";

                return (
                  <div key={m.id} style={{ marginRight: 36, position: 'relative', zIndex: 2 }}>
                    <div
                      ref={(el) => (nodeRefs.current[i] = el)}
                      className="flex-none rounded-2xl px-6 py-4 text-white font-semibold shadow-md w-[140px] text-center transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        background: m.color,
                        marginTop: verticalOffset,
                        position: 'relative',
                        zIndex: 2,
                        opacity: m.rate > 0 ? 1 : 0.3
                      }}
                    >
                      <div className="text-sm opacity-90 font-poppins">{m.name}</div>
                      <div className="text-xl font-normal mt-1 font-poppins" style={{ fontFamily: "'Poppins', sans-serif" }}>{m.rate}%</div>
                    </div>
                  </div>
                );
              })}

              <div style={{ width: 12 }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-vertical-scroll::-webkit-scrollbar { 
          display: none; 
          width: 0;
          height: 0;
        }
        .no-vertical-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}


