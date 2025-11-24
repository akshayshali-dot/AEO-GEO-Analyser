import React from 'react';
import { PillarAnalysis } from '../types';
import { ScoreRing } from './ScoreRing';
import { CheckCircle2, AlertOctagon, TrendingUp, ArrowRight } from 'lucide-react';

interface PillarDetailProps {
  title: string;
  data: PillarAnalysis;
  description: string;
}

export const PillarDetail: React.FC<PillarDetailProps> = ({ title, data, description }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:border-slate-300 transition-colors duration-300">
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
               <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                  data.score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                  data.score >= 50 ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                  'bg-rose-50 text-rose-700 border-rose-200'
               }`}>
                 {data.label}
               </span>
            </div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">{description}</p>
          </div>
          <div className="shrink-0">
            <ScoreRing score={data.score} size={64} strokeWidth={5} />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Working */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 mb-4">
              <CheckCircle2 className="w-4 h-4" /> What's Working
            </h4>
            <ul className="space-y-3">
              {data.strengths.map((item, i) => (
                <li 
                  key={i} 
                  className="text-sm text-slate-600 leading-relaxed pl-2 border-l-2 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50/50 hover:text-slate-900 transition-all duration-200 rounded-r py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-700 mb-4">
              <AlertOctagon className="w-4 h-4" /> Key Risks
            </h4>
             <ul className="space-y-3">
              {data.gaps.map((item, i) => (
                <li 
                  key={i} 
                  className="text-sm text-slate-600 leading-relaxed pl-2 border-l-2 border-rose-100 hover:border-rose-400 hover:bg-rose-50/50 hover:text-slate-900 transition-all duration-200 rounded-r py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Plan Footer */}
      <div className="bg-slate-50 px-6 sm:px-8 py-6 border-t border-slate-100">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
          <TrendingUp className="w-4 h-4 text-slate-500" /> 30-Day Action Plan
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {data.recommendations.slice(0, 3).map((rec, i) => (
             <div 
                key={i} 
                className="flex items-start gap-3 p-3 bg-white rounded border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group/item cursor-default"
             >
                <div className="mt-0.5 text-xs font-bold text-slate-400 group-hover/item:text-slate-900 transition-colors">{i + 1}</div>
                <div className="flex-1">
                   <p className="text-sm font-medium text-slate-900">{rec.description}</p>
                   <div className="flex gap-2 mt-1.5 opacity-70 group-hover/item:opacity-100 transition-opacity">
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 rounded">{rec.effort} Effort</span>
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 rounded">{rec.impact} Impact</span>
                   </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 self-center group-hover/item:text-slate-600 group-hover/item:translate-x-1 transition-all" />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};