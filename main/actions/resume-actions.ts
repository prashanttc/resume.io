"use server";

import { getUserIdFromSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResumeData } from "@/types/resume";

export async function newResume(name: string) {
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  try {
    const newResume = await prisma.resume.create({
      data: {
        userId: user,
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
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  try {
    const resume = await prisma.resume.findFirst({
      where: {
        id,
      },
      include: {
        personalInfo: true,
        customSections: {
          include: {
            entries: true,
          },
        },
        sectionOrder: true,
        education: true,
        experiences: true,
        projects: true,
        skills: {
          include: {
            skills: true,
          },
        },
      },
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
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  if (!resume || !resumeId) throw new Error("Invalid resume input");
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL!;
    const slug = `${url}preview/${resumeId}`;
    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        slug: resume.slug || slug,
        template: resume.template,
        updatedAt: new Date(),

        personalInfo: {
          upsert: {
            update: {
              fullName: resume.personalInfo?.fullName,
              email: resume.personalInfo?.email,
              jobTitle: resume.personalInfo?.jobTitle,
              phone: resume.personalInfo?.phone,
              address: resume.personalInfo?.address,
              linkedin: resume.personalInfo?.linkedin, // Optional: fill from UI
              github: resume.personalInfo?.github,
              website: resume.personalInfo?.website,
              summary: resume.personalInfo?.summary,
            },
            create: {
              fullName: resume.personalInfo?.fullName || "",
              email: resume.personalInfo?.email || "",
              phone: resume.personalInfo?.phone || "",
              address: resume.personalInfo?.address || "",
              summary: resume.personalInfo?.summary || "",
              jobTitle: resume.personalInfo?.jobTitle || "",
              linkedin: resume.personalInfo?.linkedin || "", // Optional: fill from UI
              github: resume.personalInfo?.github || "",
              website: resume.personalInfo?.website || "",
            },
          },
        },
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
        projects: {
          deleteMany: {},
          create: resume.projects.map((project) => ({
            title: project.title,
            role: project.role,
            startDate: new Date(project.startDate),
            endDate: project.current
              ? null
              : project.endDate
              ? new Date(project.endDate)
              : null,
            current: project.current,
            description: project.description,
          })),
        },
        education: {
          deleteMany: {},
          create: resume.education.map((edu) => ({
            institution: edu.institution,
            degree: edu.degree,
            startDate: new Date(edu.startDate),
            endDate: edu.current
              ? null
              : edu.endDate
              ? new Date(edu.endDate)
              : null,
            current: edu.current,
            description: edu.description,
            location: edu.location,
          })),
        },
        skills: {
          deleteMany: {},
          create: resume.skills.map((skill) => ({
            name: skill.name,
            skills: {
              create: skill.skills.map((s) => ({
                name: s.name,
                level: s.level,
              })),
            },
          })),
        },
        customSections: {
          deleteMany: {}, // wipe all existing custom sections + entries

          create: resume.customSections.map((section) => ({
            title: section.title,
            entries: {
              create: section.entries.map((entry) => ({
                title: entry.title || "",
                description: entry.description,
                date: entry.date || null,
                link: entry.link || null,
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
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  try {
    const userId = user;
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

export async function deleteResume(id: string) {
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  if (!id) throw new Error("invalid resume id!");
  try {
    const deleteResume = await prisma.resume.delete({
      where: {
        id,
      },
    });
    if (!deleteResume) {
      throw new Error("unable to delete resume");
    }
    return { success: true };
  } catch (error: any) {
    console.log("something went wrong");
    throw new Error("something went wrong", error.message);
  }
}

export async function setSlug({ url, id }: { url: string; id: string }) {
  const user = await getUserIdFromSession();
  if (!user) {
    throw new Error("unauthorized");
  }
  try {
    console.log("url", url);
    const set = await prisma.resume.update({
      where: {
        id,
      },
      data: {
        slug: url,
      },
    });
    console.log("set", set);
    if (!set) {
      throw new Error("error updating url");
    }
    return { success: true };
  } catch (error: any) {
    console.log("someting went wrong!", error.message);
    throw new Error("internal server error");
  }
}

export async function getresumeBySlug(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const completeUrl = `${baseUrl}preview/${url}`;
  try {
    if (!url) {
      throw new Error("no url found");
    }
    const update = await prisma.resume.findFirst({
      where: {
        slug: completeUrl,
      },
      include: {
        personalInfo: true,
        customSections: {
          include: {
            entries: true,
          },
        },
        sectionOrder: true,
        education: true,
        experiences: true,
        projects: true,
        skills: {
          include: {
            skills: true,
          },
        },
      },
    });
    if (!update) {
      console.log("update", update);
      throw new Error("no resume found by this url");
    }
    console.log("update", update);
    return update;
  } catch (error: any) {
    console.log("something went wrong");
    throw new Error(error.message);
  }
}

export async function updateAiResults({
  cleanJson,
  id,
}: {
  cleanJson: any;
  id: string;
}) {
  try {
    if (!cleanJson || !id) {
      throw new Error("resume id is needed");
    }
    console.log("hahahaha",cleanJson)
    const update = await prisma.resume.update({
      where: {
        id,
      },
      data: {
        atsScore: cleanJson.atsScore,
        personalInfo: {
          update: {
            jobTitle: cleanJson.personalInfo.jobTitle,
            summary: cleanJson.personalInfo.summary,
          },
        },
        experiences: {
          update: cleanJson.experiences.map((exp: any) => ({
            where: { id: exp.id },
            data: {
              position: exp.position,
              description: exp.description,
            },
          })),
        },
        projects: {
          update: cleanJson.projects.map((prj: any) => ({
            where: { id: prj.id },
            data: {
              title: prj.title,
              role: prj.role,
              description: prj.description,
            },
          })),
        },
        skills: {
          deleteMany: {},
          create: cleanJson.skills.map((skillCategory: any) => ({
            name: skillCategory.name,
            skills: {
              create: skillCategory.skills.map((s: any) => ({
                name: s.name,
                level: s.level,
              })),
            },
          })),
        },
        customSections: {
          update: cleanJson.customSections.map((cs: any) => ({
            where: { id: cs.id },
            data: {
              title: cs.title,
              entries: {
                deleteMany: {}, // nuke old entries
                create: cs.entries.map((entry: any) => ({
                  title: entry.title,
                  description: entry.description,
                })),
              },
            },
          })),
        },
        aiOptimizations: {
          deleteMany: {},
          create: cleanJson.aiSuggestions.map((ai: any) => ({
            suggestion: ai.suggestion,
          })),
        },
      },
    });
    if (!update) {
      throw new Error("failed to update resume");
    }
    return { success: true };
  } catch (error: any) {
    console.error("soemthing went wrong");
    throw new Error("internal server error", error.message);
  }
}
