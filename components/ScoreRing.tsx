import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 60, strokeWidth = 4, label, className = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 80) return 'text-emerald-600 stroke-emerald-600';
    if (s >= 50) return 'text-amber-500 stroke-amber-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getBgColor = (s: number) => {
    if (s >= 80) return 'text-emerald-100 stroke-emerald-100';
    if (s >= 50) return 'text-amber-100 stroke-amber-100';
    return 'text-rose-100 stroke-rose-100';
  };

  const getLabelText = (s: number) => {
    if (s >= 80) return 'Best-in-Class';
    if (s >= 50) return 'Good';
    return 'Poor';
  };

  return (
    <div className={`relative flex flex-col items-center justify-center group cursor-help ${className}`}>
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-max">
        <div className="bg-slate-900 text-white text-[10px] font-medium py-1.5 px-3 rounded shadow-xl flex flex-col items-center">
          <span>Score: {score}/100</span>
          <span className="opacity-70">{getLabelText(score)}</span>
          {/* Arrow */}
          <div className="w-2 h-2 bg-slate-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={getBgColor(score)}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-out ${getColor(score)}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${getColor(score).split(' ')[0]}`}>{score}</span>
      </div>
      {label && <span className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>}
    </div>
  );
};