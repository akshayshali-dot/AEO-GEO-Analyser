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

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    url: { type: Type.STRING },
    overallScore: { type: Type.INTEGER },
    overallLabel: { type: Type.STRING },
    oneLineAssessment: { type: Type.STRING },
    executiveSummary: { type: Type.STRING },
    seo: pillarSchema,
    aeo: pillarSchema,
    geo: pillarSchema,
    quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["url", "overallScore", "overallLabel", "oneLineAssessment", "executiveSummary", "seo", "aeo", "geo", "quickWins", "suggestedPrompts"],
};

export const analyzeUrl = async (url: string): Promise<AnalysisReport> => {
  try {
    // In a real production app with a backend, we would fetch the HTML here.
    // Since this is a client-side demo, we ask Gemini to analyze the URL based on its internal knowledge 
    // or simulate the analysis if it cannot access the live page directly.
    // We frame the prompt to act as a consultant.

    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as a world-class McKinsey consultant and Senior Technical SEO Engineer. 
      Analyze the following URL: ${url}
      
      Conduct a rigorous audit for three pillars:
      1. SEO (Search Engine Optimization): Technical foundations, content depth, meta tags.
      2. AEO (Answer Engine Optimization): How well it answers direct questions for AI like ChatGPT/Perplexity.
      3. GEO (Generative Engine Optimization): How quotable, structured, and summarizable the content is for LLMs.

      If you cannot browse the live URL in real-time, simulate a highly realistic audit based on the typical content structure of such a page or domain, or infer from the URL structure what the content likely is.
      
      Provide a JSON response with:
      - Scores (0-100)
      - Executive summary (consultant tone)
      - Specific lists of strengths, gaps, and recommendations.
      - 5 Quick wins.
      - 3 Suggested prompts to test the page.

      Be critical. Most pages are not optimized for GEO/AEO yet.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.4, // Lower temperature for more analytical/consistent results
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