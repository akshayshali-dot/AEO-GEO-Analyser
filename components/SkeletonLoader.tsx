import React from 'react';

interface SkeletonLoaderProps {
  url: string;
  step: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ url, step }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans pb-24">
      {/* 1. Skeleton Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="h-3 w-16 bg-slate-200 rounded mb-1 animate-pulse"></div>
            <div className="h-5 w-48 bg-slate-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
             <div className="flex items-center gap-3">
               <div className="text-right">
                 <div className="h-2 w-12 bg-slate-200 rounded mb-1 ml-auto animate-pulse"></div>
                 <div className="h-6 w-16 bg-slate-300 rounded animate-pulse"></div>
               </div>
               <div className="h-8 w-px bg-slate-200"></div>
               <div className="flex gap-2">
                 <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
                 <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
                 <div className="h-6 w-12 bg-slate-200 rounded animate-pulse"></div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 space-y-16">
        
        {/* Engaging Status Indicator */}
        <div className="flex justify-center mb-8">
           <div className="bg-white border border-slate-200 shadow-sm rounded-full px-6 py-2 flex items-center gap-3 animate-pulse">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              <span className="text-sm font-medium text-slate-600 font-mono tracking-tight">{step}</span>
           </div>
        </div>

        {/* 2. Skeleton Executive Summary */}
        <section className="space-y-4">
          <div className="h-4 w-32 bg-slate-300 rounded animate-pulse mb-6"></div>
          <div className="space-y-3 max-w-3xl">
             <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
             <div className="h-4 w-11/12 bg-slate-200 rounded animate-pulse"></div>
             <div className="h-4 w-full bg-slate-200 rounded animate-pulse"></div>
             <div className="h-4 w-4/5 bg-slate-200 rounded animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-200">
             {[1, 2, 3].map(i => (
               <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-16 w-full bg-slate-100 rounded animate-pulse"></div>
               </div>
             ))}
          </div>
        </section>

        {/* 3. Skeleton Pillars */}
        <section className="space-y-8">
           <div className="h-5 w-40 bg-slate-300 rounded mb-6 animate-pulse"></div>
           {[1, 2, 3].map((i) => (
             <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8">
                <div className="flex justify-between mb-8 pb-6 border-b border-slate-100">
                   <div className="h-6 w-24 bg-slate-300 rounded animate-pulse"></div>
                   <div className="flex gap-2 items-center">
                     <div className="h-8 w-12 bg-slate-200 rounded animate-pulse"></div>
                     <div className="h-4 w-16 bg-slate-100 rounded animate-pulse"></div>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <div className="h-3 w-24 bg-slate-200 rounded mb-4 animate-pulse"></div>
                      {[1, 2, 3].map(j => <div key={j} className="h-4 w-full bg-slate-100 rounded animate-pulse"></div>)}
                   </div>
                   <div className="space-y-3">
                      <div className="h-3 w-24 bg-slate-200 rounded mb-4 animate-pulse"></div>
                      {[1, 2, 3].map(j => <div key={j} className="h-4 w-full bg-slate-100 rounded animate-pulse"></div>)}
                   </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                    <div className="h-3 w-32 bg-slate-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-8 w-full bg-slate-50 rounded animate-pulse"></div>
                    <div className="h-8 w-3/4 bg-slate-50 rounded animate-pulse"></div>
                </div>
             </div>
           ))}
        </section>
      </main>
    </div>
  );
};
