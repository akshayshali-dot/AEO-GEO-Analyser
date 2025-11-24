export enum Impact {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum Effort {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export interface Recommendation {
  priority: string; // e.g., "P1", "P2"
  impact: Impact;
  effort: Effort;
  description: string;
}

export interface PillarAnalysis {
  score: number; // 0-100
  label: string; // "Poor", "Fair", "Good", "Strong", "Best-in-Class"
  strengths: string[];
  gaps: string[];
  recommendations: Recommendation[];
  longTermOpportunities: string[];
}

export interface KeyTakeaways {
  working: string;
  risks: string;
  focus: string;
}

export interface AnalysisReport {
  url: string;
  overallScore: number;
  overallLabel: string; // e.g., "Solid - Ready but can be improved"
  oneLineAssessment: string;
  executiveSummary: string; // Markdown supported
  keyTakeaways: KeyTakeaways; // High-level bullets
  seo: PillarAnalysis;
  aeo: PillarAnalysis;
  geo: PillarAnalysis;
  quickWins: string[];
  suggestedPrompts: string[];
}

export interface AnalysisState {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: AnalysisReport | null;
  error: string | null;
  currentStep?: string; // For loading progress text
}
