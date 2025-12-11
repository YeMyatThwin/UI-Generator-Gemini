import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// We use the pro model for better coding capabilities
const MODEL_NAME = 'gemini-3-pro-preview';

const SYSTEM_INSTRUCTION = `
You are an expert Senior React Developer and UI/UX Designer.
Your task is to generate production-ready, beautiful, and functional React components based on user prompts.

STRICT RULES:
1. Return ONLY raw React code. Do not include markdown backticks (e.g., \`\`\`tsx).
2. Do not explain your code. Output only the code.
3. Use Tailwind CSS for ALL styling. Do not use CSS modules or inline styles.
4. Use 'lucide-react' for icons. Import them as named imports.
5. The component MUST be exported as 'default'.
6. Do NOT use any other external libraries besides 'react' and 'lucide-react'.
7. If the user asks to modify the previous UI, return the FULL updated component code, not just the diff.
8. Ensure the component is responsive and accessible.
9. Assume 'React' is already imported. You can use hooks (useState, useEffect) directly from 'React' or named imports.
10. If the user request is unclear, create a best-guess visually appealing UI.
11. CRITICAL: The root element MUST be self-contained. Use 'max-w-full' and 'w-full' to prevent overflow. Avoid fixed widths on the root element.
12. CRITICAL: For layouts with navigation bars, ensure they are contained within the component using 'relative' positioning, not 'fixed' or 'absolute' on the root level.

EXAMPLE OUTPUT START:
import { useState } from 'react';
import { User, Mail } from 'lucide-react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  return (
    <div className="w-full max-w-full min-h-screen bg-white">
       <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 p-4">
         <User size={20} /> Hello
       </h1>
    </div>
  );
}
EXAMPLE OUTPUT END



`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!API_KEY) {
    console.error("Gemini API Key is missing");
    return;
  }
  genAI = new GoogleGenAI({ apiKey: API_KEY });
  chatSession = genAI.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.5, // Lower temperature for more deterministic code
    },
  });
};

export const generateUI = async (prompt: string, contextFiles?: File[]): Promise<string> => {
  if (!chatSession) {
    initializeGemini();
  }
  if (!chatSession) {
    throw new Error("Failed to initialize Gemini session.");
  }

  try {
    let fullPrompt = prompt;
    
    // If context files are provided, read and append their content
    if (contextFiles && contextFiles.length > 0) {
      const fileContents = await Promise.all(
        contextFiles.map(async (file) => {
          const text = await file.text();
          return `\n\n--- Context from ${file.name} ---\n${text}\n--- End of ${file.name} ---`;
        })
      );
      fullPrompt = prompt + '\n\n' + fileContents.join('\n');
    }
    
    const response = await chatSession.sendMessage({ message: fullPrompt });
    let text = response.text || '';
    
    // Cleanup: Remove markdown code blocks if the model accidentally adds them
    text = text.replace(/^```tsx/gm, '').replace(/^```javascript/gm, '').replace(/^```/gm, '').trim();
    
    return text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};

export const resetSession = () => {
    chatSession = null;
    initializeGemini();
}