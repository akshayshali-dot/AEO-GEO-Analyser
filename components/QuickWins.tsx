import React from 'react';
import { Zap, Copy } from 'lucide-react';

interface Props {
  wins: string[];
  prompts: string[];
}

export const QuickWins: React.FC<Props> = ({ wins, prompts }) => {
  return (
    <div className="space-y-8">
      {/* Wins */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
          <h3 className="font-bold text-lg">Quick Wins</h3>
        </div>
        <ul className="space-y-4">
          {wins.map((win, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed pb-4 border-b border-slate-800 last:border-0 last:pb-0">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[10px] font-bold text-white">
                {i + 1}
              </span>
              {win}
            </li>
          ))}
        </ul>
      </div>

      {/* Prompts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider mb-4">Test this page with AI</h3>
        <div className="space-y-4">
          {prompts.map((prompt, i) => (
            <div key={i} className="group relative bg-slate-50 p-3 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors">
              <p className="text-xs text-slate-600 italic pr-6">"{prompt}"</p>
              <button 
                onClick={() => navigator.clipboard.writeText(prompt)}
                className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"
                title="Copy prompt"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};