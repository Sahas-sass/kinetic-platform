import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Safely extract whatever the frontend sends
    const safeMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content || '',
    }));

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: `You are an AI Client Simulator for a platform called Kinetic, which trains beginner freelance students in Sri Lanka. 
      You are roleplaying as "Mr. Perera", a local small business owner who needs a logo and a landing page for his new delivery service. 
      You are friendly but have a tight budget (LKR 15,000) and an unrealistic deadline (this Friday). 
      
      Your goal is to test the student's ability to:
      1. Negotiate scope (they should not accept both a logo and a website for that price/timeline).
      2. Maintain a professional, polite tone.
      3. Ask clarifying questions.
      
      Keep your responses short, realistic, and conversational (1-3 sentences maximum). React naturally to whatever the student says. If they give a good counter-offer, be hesitant but eventually agree.`,
      
      // Inject the initial greeting directly into the AI's memory log!
      messages: [
        { role: 'assistant', content: "Hi there! I saw your portfolio. I'm starting a new local delivery business called 'QuickDrop'. I need a logo and a full landing page designed by this Friday. My budget is LKR 15,000 for everything. Can you do this?" },
        ...safeMessages
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("AI API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}