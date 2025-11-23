import React from 'react';
import { PillarAnalysis, Recommendation, Impact, Effort } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight, Activity, AlertOctagon } from 'lucide-react';

interface PillarDetailProps {
  title: string;
  description: string;
  data: PillarAnalysis;
  icon: React.ReactNode;
}

const Badge: React.FC<{ label: string; type: 'impact' | 'effort' | 'priority'; value: string }> = ({ label, type, value }) => {
  let bg = 'bg-slate-100 text-slate-600';
  
  if (type === 'impact') {
    if (value === Impact.HIGH) bg = 'bg-purple-100 text-purple-700';
    if (value === Impact.MEDIUM) bg = 'bg-blue-100 text-blue-700';
  } else if (type === 'effort') {
    if (value === Effort.HIGH) bg = 'bg-orange-100 text-orange-700';
    if (value === Effort.LOW) bg = 'bg-green-100 text-green-700';
  } else if (type === 'priority') {
    bg = 'bg-slate-800 text-white';
  }

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${bg} border border-transparent`}>
      {label}: {value}
    </span>
  );
};

export const PillarDetail: React.FC<PillarDetailProps> = ({ title, description, data, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-700">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-xl">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</div>
            <div className={`text-3xl font-bold ${data.score >= 70 ? 'text-emerald-600' : data.score >= 40 ? 'text-amber-500' : 'text-red-500'}`}>
              {data.score}
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
             data.score >= 70 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 
             data.score >= 40 ? 'bg-amber-50 border-amber-200 text-amber-700' : 
             'bg-red-50 border-red-200 text-red-700'
          }`}>
            {data.label}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Working & Gaps */}
        <div className="space-y-8">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-4 h-4" />
              What's Working
            </h4>
            <ul className="space-y-3">
              {data.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-rose-600 uppercase tracking-wider mb-4">
              <AlertOctagon className="w-4 h-4" />
              Key Gaps & Risks
            </h4>
            <ul className="space-y-3">
              {data.gaps.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Recommendations */}
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
           <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">
              <Activity className="w-4 h-4 text-blue-600" />
              High-Impact Recommendations (30 Days)
            </h4>
            
            <div className="space-y-4">
              {data.recommendations.map((rec, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge label="Priority" type="priority" value={rec.priority} />
                    <Badge label="Imp" type="impact" value={rec.impact} />
                    <Badge label="Eff" type="effort" value={rec.effort} />
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Long-Term Opportunities</h5>
              <ul className="space-y-2">
                 {data.longTermOpportunities.map((opp, i) => (
                   <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                     <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" />
                     {opp}
                   </li>
                 ))}
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};