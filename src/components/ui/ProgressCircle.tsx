import { useEffect, useRef } from 'react';

interface ProgressCircleProps {
  progress?: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const ProgressCircle = ({ 
  progress = 0.75, 
  size = 40,
  color = "#10b981",
  backgroundColor = "#e5e7eb"
}: ProgressCircleProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.setProperty('--size', `${size}px`);
      divRef.current.style.setProperty('--color', color);
      divRef.current.style.setProperty('--bg-color', backgroundColor);
    }
  }, [size, color, backgroundColor]);

  return (
    <div 
      ref={divRef}
      className="progress-circle"
    >
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle 
          cx={radius} 
          cy={radius} 
          r={radius - 2}
          fill="none" 
          stroke={backgroundColor} 
          strokeWidth="4" 
        />
        <circle 
          cx={radius} 
          cy={radius} 
          r={radius - 2}
          fill="none" 
          stroke={color} 
          strokeWidth="4"
          strokeDasharray={circumference} 
          strokeDashoffset={offset}
          strokeLinecap="round" 
        />
      </svg>
      <div className="progress-text">
        {Math.round(progress * 100)}%
      </div>
    </div>
  );
};

export default ProgressCircle;
