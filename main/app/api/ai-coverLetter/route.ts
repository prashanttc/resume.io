import { getUserIdFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: Request) {
  const userId = await getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 400 });
  }
  const {input,coverLetterId} = await req.json();
  const data = input;
  if (!data) {
    return NextResponse.json({ error: "no data available" }, { status: 400 });
  }
  try {
    const systemPrompt = `You are an expert career coach and professional copywriter. Your task is to write the main content of a personalized cover letter for a job applicant using the information provided. make it look like human created not ai generated.

The letter should be written in a ${data.preferences} tone and should:
- Start with a compelling paragraph that introduces the applicant and their enthusiasm for the role.
- Mention their most relevant experiences and how they align with the job.
- Highlight personal preferences, passions, or values if provided.
- Include a concise bullet list of 2–4 key qualifications or strengths.
- End with a confident and professional closing paragraph that expresses interest and availability.

⚠️ Do NOT include any greeting (like "Dear...") or closing (like "Best regards," or signature).  
⚠️ Do NOT add any extra commentary or explain what you're doing.  
⚠️ ONLY return the body content of the cover letter in clean, ready-to-use form.`;

    const userPrompt = `Full Name: ${data.fullName}Email: ${data.email}Phone: ${
      data.phone
    }Company: ${data.companyName}Hiring Manager: ${
      data.hiringManager || "Not specified"
    }Job Title: ${data.jobTitle}Experience: ${data.experience}Preferences: ${
      data.preferences || "Not specified"
    }
      `;

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
    if (!result) {
      return NextResponse.json(
        { error: "unable to generate ai response" },
        { status: 400 }
      );
    }
    return NextResponse.json({ res: result }, { status: 200 });
  } catch (error: any) {
    console.error(error.message || "internal server error");
    return NextResponse.json(
      { error: error.message || "interal server error" },
      { status: 500 }
    );
  }
}
