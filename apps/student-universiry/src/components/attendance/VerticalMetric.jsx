import { useEffect, useMemo, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

export default function VerticalMetric({
  value,
  label,
  icon,
  bgColor,
  fillColor,
  iconBgColor,
  textColor,
  labelColor,
  className,
  max = 100
}) {
  const count = useCountUp(value, 800);

  const targetHeight = useMemo(() => {
    return Math.max((value / (max || 1)) * 90, 10);
  }, [value, max]);

  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    setFillHeight(0);
    const frame = requestAnimationFrame(() => {
      setFillHeight(targetHeight);
    });
    return () => cancelAnimationFrame(frame);
  }, [targetHeight]);

  return (
    <div className={`${bgColor} rounded-card p-4 flex flex-col items-center justify-between h-[340px] w-[180px] flex-shrink-0 hover:transform hover:-translate-y-1.5 hover:shadow-card-hover transition-all duration-200 ${className ?? ''}`.trim()}>
      <p className={`text-[28px] font-poppins font-bold ${textColor || 'text-text-primary'} mb-2`}>
        {String(count).padStart(2, '0')}
      </p>
      <div className="flex-1 w-full flex items-end justify-center mb-2 relative">
        <div
          className={`w-full ${fillColor} rounded-inner flex items-center justify-center transition-all duration-1000 ease-out`}
          style={{ height: `${fillHeight}%` }}
        >
          <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <div className={`${iconBgColor} rounded-full p-1`}>
          {icon}
        </div>
        <p className={`text-xs ${labelColor || 'text-text-muted'} font-poppins`}>{label}</p>
      </div>
    </div>
  );
}



