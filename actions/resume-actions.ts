"use server";

import { prisma } from "@/lib/prisma";
import { ResumeData } from "@/types/resume";

export async function newResume(name: string) {
  try {
    const newResume = await prisma.resume.create({
      data: {
        userId: "234820380283028",
        title: name,
      },
    });

    if (!newResume) {
      throw new Error("problem creating new resume");
    }
    return newResume.id;
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
}

export async function getResumeById(id: string) {
  try {
    const resume = await prisma.resume.findFirst({
      where: {
        id,
      },
      include:{
        personalInfo:true,
        customSections:{
          include:{
            entries:true
          }
        },
        sectionOrder:true,
        education:true,
        experiences:true,
        skills:{
          include:{
            skills:true
          }
        }
      }
    });
    if (!resume) {
      throw new Error("no resume found");
    }
    return resume;
  } catch (error) {
    console.error(error);
    throw new Error("internal server error");
  }
}

export async function saveResume(resume: ResumeData, resumeId: string) {
  if (!resume || !resumeId) throw new Error("Invalid resume input");
  try {
    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        template: resume.template,
        updatedAt: new Date(),

        // 🧠 Upsert personalInfo (1:1 relation)
        personalInfo: {
          upsert: {
            update: {
              fullName: resume.personalInfo?.fullName,
              email: resume.personalInfo?.email,
              jobTitle:resume.personalInfo?.jobTitle,
              phone: resume.personalInfo?.phone,
              address: resume.personalInfo?.address,
              linkedin: resume.personalInfo?.linkedin, // Optional: fill from UI
              github: resume.personalInfo?.github,
              website: resume.personalInfo?.website,
            },
            create: {
              fullName: resume.personalInfo?.fullName||"",
              email: resume.personalInfo?.email||"",
              phone: resume.personalInfo?.phone||"",
              address: resume.personalInfo?.address||"",
              summary: resume.personalInfo?.summary||"",
              jobTitle: resume.personalInfo?.jobTitle||"",
              linkedin: resume.personalInfo?.linkedin || "", // Optional: fill from UI
              github: resume.personalInfo?.github || "",
              website: resume.personalInfo?.website || "",
            },
          },
        },

        // 🔁 Array fields: nuke and recreate
        experiences: {
          deleteMany: {},
          create: resume.experiences.map((exp) => ({
            company: exp.company,
            position: exp.position,
            startDate: new Date(exp.startDate),
            endDate: exp.current
              ? null
              : exp.endDate
              ? new Date(exp.endDate)
              : null,
            current: exp.current,
            location: exp.location,
            description: exp.description,
          })),
        },
        education: {
          deleteMany: {},
          create: resume.education.map((edu) => ({
            institution: edu.institution,
            degree: edu.degree,
            startDate: new Date(edu.startDate),
            endDate: edu.endDate ? new Date(edu.endDate) : null,
            location: edu.location,
          })),
        },
        skills: {
          deleteMany: {},
          create: resume.skills.map((skill) => ({
            name: skill.name,
            skills: {
              create:skill.skills.map((s)=>({
                name:s.name,
                level:s.level
              }))
            }
          })),
        },
        customSections: {
          deleteMany: {}, // wipe all existing custom sections + entries

          create: resume.customSections.map((section) => ({
            title: section.title,
            entries: {
              create: section.entries.map((entry, entryIndex) => ({
                title: entry.title||'',
                description: entry.description,
                date: entry.date || null,
                link: entry.link || null,
                order: entryIndex,
              })),
            },
          })),
        },
        sectionOrder: {
          deleteMany: {},
          create: resume.sectionOrder.map((order, index) => ({
            order: index,
            title: order.title,
            isActive: order.isActive,
            type: order.type,
          })),
        },
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("💥 Resume save failed:", err);
    throw new Error(err);
  }
}

export async function getAllResume() {
  try {
    const userId = "234820380283028";
    const all = await prisma.resume.findMany({
      where: {
        userId,
      },
    });
    if (all.length < 0 || !all) {
      throw new Error("no resume found for this user");
    }
    return all;
  } catch (error) {
    console.error(error);
    throw new Error("internal server errror");
  }
}
