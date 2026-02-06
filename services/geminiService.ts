
import { GoogleGenAI, Type } from "@google/genai";

export const generateLoveLetter = async (color: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  if (!process.env.API_KEY) {
    return `My love, this ${color} rose represents my deepest affection for you. Every petal is a testament to the joy you bring into my life.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heart-melting, 2-sentence love letter based on a ${color} rose for Rose Day of Valentine's Week.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text || "Your presence makes my world bloom.";
  } catch (error) {
    console.error("Gemini failed:", error);
    return "My heart beats only for you.";
  }
};
