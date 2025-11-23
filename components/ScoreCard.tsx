import React from 'react';

interface ScoreCardProps {
  title: string;
  score: number;
  label: string;
  color?: string;
  size?: 'sm' | 'lg';
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, label, color = "blue", size = "sm" }) => {
  // Determine color class based on score if not overridden
  const getColor = (s: number) => {
    if (s >= 85) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (s >= 70) return 'text-blue-600 border-blue-200 bg-blue-50';
    if (s >= 40) return 'text-amber-500 border-amber-200 bg-amber-50';
    return 'text-red-500 border-red-200 bg-red-50';
  };

  const colorClass = getColor(score);
  
  if (size === 'lg') {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{title}</span>
        <div className={`text-6xl font-bold tracking-tighter ${colorClass.split(' ')[0]}`}>
          {score}
        </div>
        <span className={`mt-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
         <span className={`text-3xl font-bold ${colorClass.split(' ')[0]}`}>{score}</span>
         <span className="text-slate-400 text-xs">/100</span>
      </div>
      <div className="mt-2 text-xs font-medium text-slate-600">
        {label}
      </div>
    </div>
  );
};