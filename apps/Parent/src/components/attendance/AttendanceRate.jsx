import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

const monthColors = [
  "#1678FF", "#FF9A2E", "#44C24A", "#FFB86B", "#7CCBFF", "#FF6B9D",
  "#9B59B6", "#E74C3C", "#3498DB", "#F39C12", "#1ABC9C", "#E67E22"
];

export default function AttendanceRate({ data }) {
  const [count, setCount] = useState(0);
  const [pathD, setPathD] = useState("");
  const [svgWidth, setSvgWidth] = useState(720);

  const scrollRef = useRef(null);
  const innerRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    if (data) {
      // Start counter animation
      animateCount(data.attendanceRate || 0);
      // Compute path with slight delay to ensure DOM is ready
      setTimeout(computePath, 100);
    }
  }, [data]);

  const animateCount = (target) => {
    const duration = 1000;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    step();
  };

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
    const ro = new ResizeObserver(() => computePath());
    if (innerRef.current) ro.observe(innerRef.current);
    const sc = scrollRef.current;
    if (sc) sc.addEventListener("scroll", computePath, { passive: true });
    window.addEventListener("resize", computePath);

    return () => {
      ro.disconnect();
      if (sc) sc.removeEventListener("scroll", computePath);
      window.removeEventListener("resize", computePath);
    };
  }, []);


  const safeData = data || {};
  const monthlyRates = Array.isArray(safeData.monthlyRates) ? safeData.monthlyRates : [];

  return (
    <div
      className="rounded-[18px] p-6 min-h-[420px] relative backdrop-blur-lg soft-fade"
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.18)"
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-poppins font-semibold text-[20px] text-slate-800 dark:text-white">Attendance Rate</h3>
          <div className="mt-3">
            <span className="inline-block text-sm bg-[#E7F3FF] dark:bg-blue-900/30 text-[#1678FF] dark:text-blue-300 px-3 py-1 rounded-full font-medium font-poppins">Year {safeData.year || new Date().getFullYear()}</span>
          </div>
        </div>

        <div className="text-[56px] font-normal text-slate-900 dark:text-white leading-none font-poppins">
          {count}<span className="align-top text-[40px] ml-1">%</span>
        </div>
      </div>

      <div className="border-t mt-6 border-gray-200 dark:border-white/10" />

      <div className="mt-6 text-sm text-slate-600 dark:text-slate-300 font-medium font-poppins">Monthly Rate</div>

      <div className="relative mt-6">
        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden no-vertical-scroll"
          style={{ height: 160, paddingBottom: 6 }}
        >
          {monthlyRates.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 italic">No monthly data found</div>
          ) : (
            <div
              ref={innerRef}
              className="relative flex items-center"
              style={{ minWidth: Math.max(720, monthlyRates.length * 180), height: 160, paddingLeft: 36, paddingRight: 36 }}
            >
              <svg
                width={svgWidth}
                height={160}
                className="absolute left-0 top-0 pointer-events-none"
                style={{ overflow: "visible", zIndex: 1 }}
              >
                <path d={pathD} stroke="#1678FF" strokeWidth={3} fill="transparent" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 2px 4px rgba(22, 120, 255, 0.3))' }} />
              </svg>

              <div style={{ width: 12 }} />

              {monthlyRates.map((m, i) => {
                const isUp = i % 2 === 1;
                const verticalOffset = isUp ? "-40px" : "20px";

                return (
                  <div key={i} style={{ marginRight: 36, position: 'relative', zIndex: 2 }}>
                    <div
                      ref={(el) => (nodeRefs.current[i] = el)}
                      className="flex-none rounded-2xl px-6 py-4 text-white font-semibold shadow-md w-[140px] text-center transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                      style={{
                        background: monthColors[i % monthColors.length],
                        marginTop: verticalOffset,
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <div className="text-sm opacity-90 font-poppins">{m.month}</div>
                      <div className="text-xl font-normal mt-1 font-poppins">{m.percentage}%</div>
                    </div>
                  </div>
                );
              })}

              <div style={{ width: 12 }} />
            </div>
          )}
        </div>
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

