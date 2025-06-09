import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json();

    if (!prompt || !type) {
      return NextResponse.json(
        { error: "Missing 'prompt' or 'type' in request body" },
        { status: 400 }
      );
    }

    let userPrompt = "";

    switch (type) {
      case "summary":
        userPrompt = `Write a professional resume summary based on the following details:\n\n${prompt}`;
        break;
      case "job-desc":
        userPrompt = `Write a short and concise professional resume job description in bullet points (dont add bulletins). Job description:\n\n${prompt}`;
        break;
      case "project":
        userPrompt = `Write a short and concise professional resume project description first small para then in bullet points  (dont add bulletins).. Project description:\n\n${prompt}`;
        break;
      default:
        return NextResponse.json(
          { error: "Invalid type provided" },
          { status: 400 }
        );
    }
    const systemPrompt = `You are a professional AI resume ${type} writer. Respond with only the ${type} content. Do not include any explanations, thoughts, or additional information. Output should be a plain, concise ${type} only. ${type} should be ats friendly`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
      temperature: 0.6,
      top_p: 0.9,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
         {
          role: "user",
          content: userPrompt.trim(),
        },
      ],
    });

    const result = response.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({ res: result }, { status: 200 });
  } catch (error: any) {
    console.error("AI Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
