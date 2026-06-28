import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const { text } = await generateText({
      model: google('gemini-3.5-flash'),
      system: `You are a Senior Project Manager and Mentor. 
      Analyze the following negotiation between a student and a client.
      Provide:
      1. A score (out of 10) for Negotiation Strategy.
      2. Specific praise for what they handled well.
      3. Constructive criticism for where they lost leverage (timeline/budget).
      Keep it concise and supportive.`,
      prompt: JSON.stringify(messages),
    });

    return Response.json({ analysis: text });
  } catch (error) {
    console.error("Evaluation API Error:", error);
    return Response.json({ error: "Failed to evaluate" }, { status: 500 });
  }
}