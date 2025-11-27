import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client
// API Key is assumed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBardResponse = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not found. Please configure the environment.";
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are the AI Assistant for the BARD ERP system. You help users navigate modules like HRM, Accounts, and Projects. Keep answers concise and professional.",
      }
    });
    
    return response.text || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently unable to process your request.";
  }
};