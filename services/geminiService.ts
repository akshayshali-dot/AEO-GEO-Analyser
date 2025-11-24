import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisReport } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the response schema for strict JSON output
const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    priority: { type: Type.STRING, description: "Priority level, e.g., P1, P2" },
    impact: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
    effort: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
    description: { type: Type.STRING, description: "Actionable recommendation text" },
  },
  required: ["priority", "impact", "effort", "description"],
};

const pillarSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER, description: "Score from 0 to 100" },
    label: { type: Type.STRING, description: "Qualitative label e.g. Poor, Fair, Good, Strong" },
    strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendations: { type: Type.ARRAY, items: recommendationSchema },
    longTermOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["score", "label", "strengths", "gaps", "recommendations", "longTermOpportunities"],
};

const keyTakeawaysSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    working: { type: Type.STRING, description: "One specific thing that is working well overall." },
    risks: { type: Type.STRING, description: "One major risk identified across pillars." },
    focus: { type: Type.STRING, description: "The single most important area to focus on next." },
  },
  required: ["working", "risks", "focus"],
};

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    url: { type: Type.STRING },
    overallScore: { type: Type.INTEGER },
    overallLabel: { type: Type.STRING },
    oneLineAssessment: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    keyTakeaways: keyTakeawaysSchema,
    seo: pillarSchema,
    aeo: pillarSchema,
    geo: pillarSchema,
    quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["url", "overallScore", "overallLabel", "oneLineAssessment", "executiveSummary", "keyTakeaways", "seo", "aeo", "geo", "quickWins", "suggestedPrompts"],
};

export const analyzeUrl = async (url: string): Promise<AnalysisReport> => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as a world-class McKinsey consultant and Senior Technical SEO Engineer. 
      Analyze the following URL: ${url}
      
      Conduct a rigorous audit for three pillars:
      1. SEO (Search Engine Optimization): Technical foundations, content depth, meta tags.
      2. AEO (Answer Engine Optimization): How well it answers direct questions for AI like ChatGPT/Perplexity.
      3. GEO (Generative Engine Optimization): How quotable, structured, and summarizable the content is for LLMs.

      If you cannot browse the live URL in real-time, simulate a highly realistic audit based on the domain pattern or infer content from the URL structure.
      
      Provide a JSON response with:
      - Scores (0-100)
      - Executive summary (2 short paragraphs, consultant tone)
      - Key Takeaways (One main point for 'Working', 'Risks', 'Focus')
      - Specific lists of strengths, gaps, and recommendations.
      - 5 Quick wins (actionable, fix this week).
      - 3 Suggested prompts to test the page.

      Be critical. Most pages are not optimized for GEO/AEO yet. Use professional, concise language.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, 
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from analysis model.");
    }

    return JSON.parse(jsonText) as AnalysisReport;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
