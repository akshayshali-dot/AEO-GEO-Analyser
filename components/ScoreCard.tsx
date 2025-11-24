import React from 'react';

// This component is kept minimal as most score display is now handled inline for layout specific needs.
// Useful for future expansion or alternative views.

interface ScoreCardProps {
  title: string;
  score: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score }) => {
  const getColor = (s: number) => {
    if (s >= 85) return 'text-emerald-600';
    if (s >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="flex flex-col items-start p-4 bg-white border border-slate-200 rounded-lg">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{title}</span>
      <span className={`text-2xl font-bold ${getColor(score)}`}>{score}</span>
    </div>
  );
};
