import { useMemo, useState, useEffect } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

export default function StatChip({ icon, value, label, totalClasses, percentage, className }) {
  const count = useCountUp(value, 1000);

  const percent = useMemo(() => (
    percentage !== undefined
      ? percentage
      : totalClasses
        ? Math.round((value / totalClasses) * 100)
        : 0
  ), [percentage, totalClasses, value]);

  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    setFillPercent(0);
    const frame = requestAnimationFrame(() => {
      setFillPercent(percent);
    });
    return () => cancelAnimationFrame(frame);
  }, [percent]);

  return (
    <div
      className={`p-3 rounded-[16px] max-w-[280px] transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${className ?? ''}`.trim()}
      style={{
        backgroundColor: '#e5e7eb'
      }}
    >
      {/* Content Section */}
      <div className="flex items-center justify-between">
        {/* Left Side - Label and Percentage */}
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <span
              className="relative rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: '#1678FF',
                boxShadow: '2px 2px 4px rgb(153, 161, 175)',
                width: '1.25rem',
                height: '1.25rem'
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                style={{
                  height: '0.75rem',
                  width: '0.75rem'
                }}
              >
                {icon}
              </div>
            </span>
            <span
              className="ml-1.5 font-poppins"
              style={{
                color: '#374151',
                fontSize: '14px'
              }}
            >
              {label}
            </span>
          </div>
          <span
            className="font-poppins font-semibold"
            style={{
              color: '#1678FF',
              fontSize: '14px'
            }}
          >
            {percent}%
          </span>
        </div>

        {/* Right Side - Large Number */}
        <p
          className="font-poppins text-right"
          style={{
            color: '#1f2937',
            fontSize: '2.5rem',
            lineHeight: '2.5rem',
            fontWeight: 700
          }}
        >
          {count}
        </p>
      </div>

      {/* Progress Bar */}
      <div
        className="relative rounded mt-3"
        style={{
          backgroundColor: '#e5e7eb',
          boxShadow: '2px 2px 4px rgb(153, 161, 175)',
          width: '100%',
          height: '0.375rem',
          borderRadius: '0.25rem'
        }}
      >
        <div
          className="absolute top-0 left-0 rounded transition-all duration-700 ease-out"
          style={{
            backgroundColor: '#1678FF',
            width: `${fillPercent}%`,
            height: '100%',
            borderRadius: '0.25rem'
          }}
        />
      </div>
    </div>
  );
}



