"use client";
import { ResumeNotFound } from "@/components/error";
import Loader from "@/components/Loader";
import { ModernTemplate } from "@/components/resume/templates/modern-template";
import { templateMap } from "@/components/resume/templates/template-map";
import { useGetResumeBySlug } from "@/query/resume/query";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { data: resumeData, isPending ,isError } = useGetResumeBySlug(slug);
  if (isPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!resumeData||isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ResumeNotFound variant="empty" />
      </div>
    );
  }
  const personal = resumeData.personalInfo!;
  const experience = resumeData.experiences.map((exp) => ({
    ...exp,
    location: exp.location ?? undefined,
    description: exp.description ?? undefined,
    startDate: exp.startDate.toISOString(),
    endDate: exp.endDate ? exp.endDate.toISOString() : undefined,
  }));
  const projects = resumeData.projects.map((project) => ({
    ...project,
    role: project.role ?? undefined,
    startDate: project.startDate.toISOString(),
    endDate: project.endDate ? project.endDate.toISOString() : undefined,
  }));
  const education = resumeData.education.map((edu) => ({
    ...edu,
    location: edu.location ?? undefined,
    startDate: edu.startDate.toISOString(),
    endDate: edu.endDate ? edu.endDate.toISOString() : undefined,
  }));
  const sectionOrder = resumeData.sectionOrder;
  const custom = resumeData.customSections;
  const skills = resumeData.skills;
  const Template = templateMap[resumeData.template] || ModernTemplate;

  return (
    <div className="w-full h-full" >
      <div className="h-full bg-white p-8 max-w-[800px] mx-auto" id="resume">
        <Template
          personal={personal}
          projects={projects}
          education={education}
          experiences={experience}
          sectionOrder={sectionOrder}
          skills={skills}
          custom={custom}
        />
      </div>
    </div>
  );
};

export default page;
