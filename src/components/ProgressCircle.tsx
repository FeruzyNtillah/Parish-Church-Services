import './ProgressCircle.css';

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
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress * circumference);

  return (
    <div 
      className="progress-circle" 
      style={{ '--size': `${size}px`, '--color': color, '--bg-color': backgroundColor } as React.CSSProperties}
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
