import { GoogleGenAI } from "@google/genai";

// Pull API key from env: NEXT_PUBLIC_GEMINI_API_KEY
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();



export async function generateContent(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `write a script to generate a 30 second video on the following topic: ${contents}`,
    config: {
      responseMimeType: "application/json",
    },
  });
  return response;
}
