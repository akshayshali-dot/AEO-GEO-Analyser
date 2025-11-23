import React, { useState } from 'react';
import { AnalysisState, AnalysisReport } from './types';
import { analyzeUrl } from './services/geminiService';
import { Search, ArrowRight, Sparkles, Globe, MessageSquareText, FileText, ChevronRight, Loader2 } from 'lucide-react';
import { ScoreCard } from './components/ScoreCard';
import { PillarDetail } from './components/PillarDetail';
import { AnalysisRadar } from './components/RadarChart';
import { QuickWins } from './components/QuickWins';

export default function App() {
  const [urlInput, setUrlInput] = useState('');
  const [state, setState] = useState<AnalysisState>({
    status: 'idle',
    data: null,
    error: null
  });

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setState({ status: 'loading', data: null, error: null, currentStep: 'Fetching page content...' });

    try {
      // Simulate steps for better UX
      setTimeout(() => setState(prev => ({ ...prev, currentStep: 'Analyzing SEO signals...' })), 1500);
      setTimeout(() => setState(prev => ({ ...prev, currentStep: 'Evaluating AEO & GEO patterns...' })), 3000);
      setTimeout(() => setState(prev => ({ ...prev, currentStep: 'Generating strategic report...' })), 4500);

      const result = await analyzeUrl(urlInput);
      setState({ status: 'success', data: result, error: null });
    } catch (err) {
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
  };

  // -- Hero / Input View --
  if (state.status === 'idle' || state.status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>AEO/GEO<span className="text-slate-400 font-normal">Analyzer</span></span>
          </div>
        </nav>

        <main className="flex-1 flex flex-col justify-center items-center px-4 max-w-2xl mx-auto w-full mb-20">
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Is your site ready for <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Answer Engines?</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto">
              Analyze any page for AEO (Answer Engine Optimization), GEO (Generative Engine Optimization), and SEO readiness.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="url"
              required
              placeholder="https://example.com/your-page"
              className="w-full pl-11 pr-36 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={state.status === 'loading'}
            />
            <button
              type="submit"
              disabled={state.status === 'loading'}
              className="absolute right-2 top-2 bottom-2 bg-slate-900 text-white hover:bg-slate-800 px-6 rounded-xl text-sm font-medium transition-colors disabled:opacity-70 flex items-center gap-2"
            >
              {state.status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Analyze <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          {state.status === 'loading' && (
             <div className="mt-8 flex flex-col items-center gap-3 animate-fade-in">
               <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 animate-progress origin-left w-full"></div>
               </div>
               <p className="text-sm text-slate-500 font-medium">{state.currentStep}</p>
             </div>
          )}

          <div className="mt-12 flex gap-8 justify-center text-xs text-slate-400 uppercase tracking-wider font-medium">
            <span className="flex items-center gap-1.5"><Globe className="w-3 h-3"/> SEO</span>
            <span className="flex items-center gap-1.5"><MessageSquareText className="w-3 h-3"/> AEO</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> GEO</span>
          </div>
        </main>
        
        <footer className="p-6 text-center text-xs text-slate-400">
          Powered by Gemini 2.5 • Generates McKinsey-style diagnostics
        </footer>
      </div>
    );
  }

  // -- Results View --
  if (state.status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
         <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
            <p className="text-slate-600 mb-6">{state.error}</p>
            <button onClick={reset} className="text-sm font-bold text-blue-600 hover:underline">Try another URL</button>
         </div>
      </div>
    );
  }

  const report = state.data!;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
             <Sparkles className="w-5 h-5 text-blue-600" />
             <span className="font-bold text-lg hidden sm:inline">AEO/GEO<span className="text-slate-400 font-normal">Analyzer</span></span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-mono text-slate-500">
              <Globe className="w-3 h-3" />
              <span className="truncate max-w-[150px]">{report.url}</span>
            </div>
            <button onClick={reset} className="text-sm font-medium text-slate-500 hover:text-slate-900">
              New Analysis
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Top Overview Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Score Box */}
            <div className="w-full lg:w-1/3">
               <ScoreCard 
                 title="Overall Readiness" 
                 score={report.overallScore} 
                 label={report.overallLabel} 
                 size="lg"
               />
               <div className="mt-4 grid grid-cols-3 gap-4">
                 <ScoreCard title="SEO" score={report.seo.score} label={report.seo.label} />
                 <ScoreCard title="AEO" score={report.aeo.score} label={report.aeo.label} />
                 <ScoreCard title="GEO" score={report.geo.score} label={report.geo.label} />
               </div>
            </div>

            {/* Exec Summary */}
            <div className="w-full lg:w-2/3 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
               <div className="flex items-center gap-3 mb-6">
                 <div className="h-px flex-1 bg-slate-100"></div>
                 <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Executive Summary</span>
                 <div className="h-px flex-1 bg-slate-100"></div>
               </div>
               
               <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                 {report.oneLineAssessment}
               </h2>
               
               <div className="prose prose-slate prose-sm max-w-none text-slate-600 leading-relaxed">
                 <p className="whitespace-pre-line">{report.executiveSummary}</p>
               </div>
               
               <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Top Priority</h4>
                    <p className="text-sm font-medium text-slate-900 flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      {report.seo.recommendations[0]?.description || "Optimize core technical vitals."}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Strategic Goal</h4>
                    <p className="text-sm font-medium text-slate-900 flex gap-2 items-start">
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                      {report.aeo.longTermOpportunities[0] || "Build entity authority."}
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Columns (Pillars) */}
          <div className="lg:col-span-8">
             <PillarDetail 
               title="SEO Optimization" 
               description="Foundational discoverability and technical health."
               data={report.seo}
               icon={<Globe className="w-6 h-6 text-slate-700" />}
             />
             <PillarDetail 
               title="AEO Optimization" 
               description="Readiness to provide direct answers to user questions (ChatGPT, etc)."
               data={report.aeo}
               icon={<MessageSquareText className="w-6 h-6 text-slate-700" />}
             />
             <PillarDetail 
               title="GEO Optimization" 
               description="Content structure, quoting potential, and summarization ease."
               data={report.geo}
               icon={<Sparkles className="w-6 h-6 text-slate-700" />}
             />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
               <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hidden lg:block">
                 <h3 className="font-bold text-sm text-slate-400 uppercase tracking-wider mb-4 text-center">Balance Check</h3>
                 <AnalysisRadar data={report} />
               </div>
               <QuickWins wins={report.quickWins} prompts={report.suggestedPrompts} />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}