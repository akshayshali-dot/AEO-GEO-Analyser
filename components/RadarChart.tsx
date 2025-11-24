import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { AnalysisReport } from '../types';

interface Props {
  data: AnalysisReport;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    const getLabel = (s: number) => {
      if (s >= 80) return 'Strong';
      if (s >= 50) return 'Fair';
      return 'Needs Work';
    };

    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-xs">
        <p className="font-bold text-slate-900 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Score:</span>
          <span className={`font-mono font-bold ${
            score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-rose-600'
          }`}>
            {score}/100
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wide">{getLabel(score)}</p>
      </div>
    );
  }
  return null;
};

export const AnalysisRadar: React.FC<Props> = ({ data }) => {
  const chartData = [
    { subject: 'SEO', A: data.seo.score, fullMark: 100 },
    { subject: 'AEO', A: data.aeo.score, fullMark: 100 },
    { subject: 'GEO', A: data.geo.score, fullMark: 100 },
  ];

  return (
    <div className="h-full w-full min-h-[200px] relative group cursor-crosshair">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#0f172a"
            strokeWidth={2}
            fill="#0f172a"
            fillOpacity={0.15}
            isAnimationActive={true}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeOpacity: 0.2 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};