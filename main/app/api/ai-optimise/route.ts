import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.studio.nebius.com/v1/",
  apiKey: process.env.NEBIUS_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { id, jobDescription } = await req.json();

    if (!id || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resume ID or job description" },
        { status: 400 }
      );
    }
    const resume = await prisma.resume.findUnique({
      where: { id },
      select: {
        atsScore: true,
        personalInfo: { select: { jobTitle: true, summary: true } },
        experiences: {
          select: { id: true, position: true, description: true },
        },
        projects: {
          select: { id: true, title: true, role: true, description: true },
        },
        skills: { include: { skills: true } },
        customSections: {
          select: {
            id: true,
            title: true,
            entries: true,
          },
        },
      },
    });

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const systemPrompt = `You are an AI assistant for a resume builder platform. When given a user's existing resume and a job description, return an updated resume formatted to match the backend schema.
    add all missing keywords and skills.

Strictly follow this structure. Output valid JSON only — no markdown, no extra text.

Use these model-aligned fields:
{
  "personalInfo": {
    "summary": "string",
    "jobTitle": "string"
  },
  "experiences": [
    {  
      "id":"string",   
      "position": "string",
      "description": "string (optional)"
    }
  ],
  "projects": [
    { 
      "id":"string",
      "title": "string",
      "role": "string (optional)",
      "description": "string"
    }
  ],
  "skills": [
    {
      "name": "Skill Category Name",
      "skills": [
        { "name": "Skill Name", "level": "Beginner" | "Intermediate" | "Advanced" | "Expert" }
      ]
    }
  ],
  "customSections": [
    {
      "id":"string",
      "title": "string",
      "entries": [
        {
          "title": "string (optional)",
          "description": "string (optional)",
        }
      ]
    }
  ],
  "aiSuggestions": [
    {
      "suggestion": "string"
    }
  ],
atsScore:number
 }

Instructions:
- Add or modify data to make the resume better match the job description.
- Use concise, action-oriented language in descriptions.
- Highlight relevant tech and experience first.
- Don’t include unrelated or outdated sections.
- Give 3-4 aiSuggestions.  
- rate ats score out of hundred




`;

    const userPrompt = `Resume: ${JSON.stringify(
      resume
    )} Job Description: ${jobDescription}`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
      max_tokens: 3130,
      temperature: 0.6,
      top_p: 0.9,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const raw = response.choices?.[0]?.message?.content ?? "";
    const jsonMatch = raw.match(/```json([\s\S]*?)```/);
    let cleanJson: any;
    try{
      
    if (jsonMatch && jsonMatch[1]) {
      cleanJson = JSON.parse(jsonMatch[1].trim());
    } 
    else {
    cleanJson = JSON.parse(raw.trim()); // fallback if no code block
  }
} catch (error) {
      console.error("No JSON found in the response.");
    }
   console.log("raw",raw)
    return NextResponse.json({ cleanJson }, { status: 200 });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
