import React, { useState, useEffect, useRef } from 'react';
import { AnalysisState, AnalysisReport } from './types';
import { analyzeUrl } from './services/geminiService';
import { Loader2, TrendingUp, ShieldAlert, Lightbulb, Share2, Download, FileText, LayoutGrid } from 'lucide-react';
import { PillarDetail } from './components/PillarDetail';
import { QuickWins } from './components/QuickWins';
import { SkeletonLoader } from './components/SkeletonLoader';
import { AnalysisRadar } from './components/RadarChart';

// Professional Background Pattern
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Subtle Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    {/* Ambient Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-slate-200/40 to-transparent blur-[80px] rounded-[100%] pointer-events-none"></div>
  </div>
);

export default function App() {
  const [urlInput, setUrlInput] = useState('');
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    data: null,
    error: null
  });

  // Handle Sticky Header logic
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interval reference to clear on unmount or completion
  const loadingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    // Engaging loading messages
    const loadingMessages = [
      "Connecting to knowledge graph...",
      "Parsing HTML structure...",
      "Analyzing SEO meta signals...",
      "Simulating ChatGPT extraction...",
      "Evaluating Perplexity readability...",
      "Calculating content density...",
      "Detecting hallucination risks...",
      "Drafting executive summary...",
      "Finalizing McKinsey-style report..."
    ];

    setState({ 
      status: 'loading', 
      data: null, 
      error: null, 
      currentStep: loadingMessages[0] 
    });

    // Cycle through messages
    let stepIndex = 0;
    if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
    
    loadingIntervalRef.current = setInterval(() => {
      stepIndex = (stepIndex + 1) % loadingMessages.length;
      setState(prev => ({ ...prev, currentStep: loadingMessages[stepIndex] }));
    }, 1200);

    try {
      const result = await analyzeUrl(urlInput);
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      setState({ status: 'success', data: result, error: null });
    } catch (err) {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      setState({ 
        status: 'error', 
        data: null, 
        error: err instanceof Error ? err.message : 'An unexpected error occurred' 
      });
    }
  };

  const reset = () => {
    setState({ status: 'idle', data: null, error: null });
    setUrlInput('');
    window.scrollTo(0, 0);
  };

  // ---------------------------------------------------------------------------
  // VIEW: LOADING (SKELETON)
  // ---------------------------------------------------------------------------
  if (state.status === 'loading') {
    return <SkeletonLoader url={urlInput} step={state.currentStep || "Analyzing..."} />;
  }

  // ---------------------------------------------------------------------------
  // VIEW: INPUT (HOME)
  // ---------------------------------------------------------------------------
  if (state.status === 'idle') {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <GridBackground />
        <div className="max-w-xl w-full text-center space-y-8 animate-fade-in relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">AEO • GEO • SEO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Is your site ready for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600">the AI era?</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
              Get a consultant-grade diagnostic report on your website's readiness for ChatGPT, Perplexity, and Gemini.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="w-full max-w-md mx-auto relative group">
            <div className="relative transform transition-all duration-300 focus-within:scale-105">
              <input
                type="url"
                required
                placeholder="https://example.com/page"
                className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 text-slate-900 placeholder-slate-300 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all text-center font-medium"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
            
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                type="submit"
                className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all min-w-[160px] flex justify-center items-center shadow-lg shadow-slate-900/20 hover:translate-y-[-2px]"
              >
                Run Analysis
              </button>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                 <ShieldAlert className="w-3 h-3" />
                 <span>No Auth Required</span>
                 <span>•</span>
                 <span>Free Tier</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VIEW: ERROR
  // ---------------------------------------------------------------------------
  if (state.status === 'error') {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 relative">
         <GridBackground />
         <div className="text-center space-y-4 relative z-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-2">
               <ShieldAlert className="w-6 h-6 text-rose-500" />
            </div>
            <div className="text-rose-600 font-medium">Analysis Failed</div>
            <p className="text-slate-500 max-w-xs mx-auto text-sm">{state.error}</p>
            <button onClick={reset} className="text-sm font-semibold text-slate-900 hover:text-slate-700 underline underline-offset-4">Try again</button>
         </div>
      </div>
    );
  }

  const report = state.data!;

  // ---------------------------------------------------------------------------
  // VIEW: RESULTS
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans pb-24 relative selection:bg-slate-200">
      <GridBackground />
      
      {/* 1. Compact Summary Bar (Sticky) */}
      <div className={`sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-all duration-300 ${isScrolled ? 'shadow-sm py-3' : 'py-5'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
             <div className="flex-1 min-w-0">
               <div className="flex items-center gap-2">
                 <div className="p-1 bg-slate-100 rounded text-slate-500">
                    <FileText className="w-3 h-3" />
                 </div>
                 <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analysis Report</h2>
                 <span className="text-[10px] text-slate-300">|</span>
                 <p className="text-[10px] font-medium text-slate-500 truncate max-w-[200px]">{report.url}</p>
               </div>
               <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm font-semibold text-slate-900">Readiness Score:</span>
                  <span className={`text-sm font-bold ${
                      report.overallScore >= 80 ? 'text-emerald-600' : report.overallScore >= 50 ? 'text-amber-600' : 'text-rose-600'
                   }`}>
                    {report.overallScore}/100
                  </span>
               </div>
             </div>
           </div>

           <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="hidden sm:flex gap-2">
                 <ScorePill label="SEO" score={report.seo.score} />
                 <ScorePill label="AEO" score={report.aeo.score} />
                 <ScorePill label="GEO" score={report.geo.score} />
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex gap-4">
                <button onClick={() => window.print()} className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 group">
                  <Download className="w-4 h-4" />
                  <span className="text-xs font-medium hidden group-hover:block transition-all">Save PDF</span>
                </button>
                <button onClick={reset} className="text-xs font-bold text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800 transition-all shadow-md shadow-slate-200">
                  New Audit
                </button>
              </div>
           </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-16 relative z-10">
        
        {/* 2. Executive Summary & Radar */}
        <section className="animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
            
            {/* Left: Text Summary */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 bg-slate-900 text-white rounded-lg shadow-lg shadow-slate-200">
                      <LayoutGrid className="w-5 h-5" />
                   </div>
                   <h2 className="text-xl font-bold text-slate-900 tracking-tight">Executive Summary</h2>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-slate-900"></div>
                   <div className="text-slate-600 leading-relaxed text-[15px] space-y-4 relative z-10">
                     <p>{report.executiveSummary}</p>
                   </div>
                </div>
              </div>

              {/* Key Takeaways Cards - Professional Graphics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                 {/* Strength Card */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                       <TrendingUp size={80} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <div className="p-1.5 bg-emerald-100 rounded-md text-emerald-700">
                          <TrendingUp size={16} strokeWidth={3} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Core Strength</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed relative z-10">{report.keyTakeaways.working}</p>
                 </div>
                 
                 {/* Risk Card */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                       <ShieldAlert size={80} />
                    </div>
                     <div className="flex items-center gap-2 mb-3">
                       <div className="p-1.5 bg-rose-100 rounded-md text-rose-700">
                          <ShieldAlert size={16} strokeWidth={3} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Major Risk</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed relative z-10">{report.keyTakeaways.risks}</p>
                 </div>

                 {/* Focus Card */}
                 <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                     <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                       <Lightbulb size={80} />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <div className="p-1.5 bg-blue-100 rounded-md text-blue-700">
                          <Lightbulb size={16} strokeWidth={3} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Strategic Focus</span>
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed relative z-10">{report.keyTakeaways.focus}</p>
                 </div>
              </div>
            </div>

            {/* Right: Radar Chart */}
            <div className="lg:col-span-1 flex flex-col h-full">
               <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 flex flex-col justify-between h-full relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-bl-full -mr-16 -mt-16 opacity-50 z-0"></div>
                 
                 <div className="mb-6 relative z-10 text-center">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Balance</h3>
                 </div>
                 <div className="flex-1 min-h-[200px] relative z-10">
                   <AnalysisRadar data={report} />
                 </div>
                 <div className="text-center mt-6 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                       <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                       <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">{report.overallLabel}</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. Detailed Pillars */}
        <section className="space-y-6 animate-fade-in-up delay-100">
           <div className="flex items-center gap-4 mb-8">
             <div className="h-px bg-slate-200 flex-1"></div>
             <div className="flex items-center gap-2 text-slate-400">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <h2 className="text-xs font-bold uppercase tracking-widest">Detailed Analysis Pillars</h2>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
             </div>
             <div className="h-px bg-slate-200 flex-1"></div>
           </div>
           
           <div className="space-y-8">
              <PillarDetail 
                  title="SEO Analysis" 
                  data={report.seo} 
                  description="Evaluates technical foundations, content depth, and traditional ranking signals."
              />
              <PillarDetail 
                  title="AEO Readiness" 
                  data={report.aeo} 
                  description="Assesses how well content directly answers questions for engines like Perplexity & ChatGPT."
              />
              <PillarDetail 
                  title="GEO Optimization" 
                  data={report.geo} 
                  description="Measures content structure, quotability, and summarization potential for LLMs."
              />
           </div>
        </section>

        {/* 4. Quick Wins & Prompts */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm animate-fade-in-up delay-200 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400"></div>
           <QuickWins wins={report.quickWins} prompts={report.suggestedPrompts} />
        </section>

        <footer className="text-center pb-8 pt-12 text-slate-400 border-t border-slate-200/50 mt-16">
           <div className="flex items-center justify-center gap-2 mb-2 opacity-50">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Confidential Analysis</span>
           </div>
           <p className="text-[10px] text-slate-400">Generated by AEO/GEO/SEO Analyzer • Always verify findings before implementation</p>
        </footer>

      </main>
    </div>
  );
}

// Sub-component for small pills in header
const ScorePill = ({ label, score }: { label: string, score: number }) => {
  const color = score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : score >= 50 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100';
  return (
    <div className={`px-3 py-1 rounded-md border text-[10px] font-bold ${color}`}>
      {label} {score}
    </div>
  );
};