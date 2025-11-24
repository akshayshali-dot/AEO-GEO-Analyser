import React from 'react';
import { Check, Copy } from 'lucide-react';

interface Props {
  wins: string[];
  prompts: string[];
}

export const QuickWins: React.FC<Props> = ({ wins, prompts }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-12">
      {/* Quick Wins */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Quick Wins (Fix This Week)</h3>
        <ul className="space-y-3">
          {wins.map((win, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded border border-slate-300 flex items-center justify-center">
                 <Check className="w-3 h-3 text-slate-400" />
              </div>
              <span>{win}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Prompts */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">Test Page in AI</h3>
        <div className="space-y-3">
          {prompts.map((prompt, i) => (
            <div key={i} className="flex items-start gap-3 group">
               <button 
                  onClick={() => copyToClipboard(prompt)}
                  className="mt-0.5 shrink-0 px-2 py-0.5 border border-slate-200 rounded text-[10px] font-medium text-slate-500 hover:border-slate-400 hover:text-slate-900 transition-colors"
               >
                 Copy
               </button>
               <p className="text-sm text-slate-500 italic">"{prompt}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
