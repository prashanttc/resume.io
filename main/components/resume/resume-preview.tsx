"use client";
import type { ResumeSection } from "@/components/resume/section-reorder";
import { templateMap } from "./templates/template-map";
import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  template: string;
  resumeData?: ResumeData;
  sectionOrder?: ResumeSection[];
}

export function ResumePreview({
  template,
  resumeData,
  sectionOrder,
}: ResumePreviewProps) {
  const personal = resumeData?.personalInfo || {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john@example.com",
    phone: "(123) 456-7890",
    address: "San Francisco, CA",
    website: "johndoe.com",
    github: "github.com",
    linkedin: "linkedin.com/in/johndoe",
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Proficient in JavaScript, TypeScript, React, and Node.js with a strong focus on creating responsive and user-friendly interfaces.",
  };

  const experiences = resumeData?.experiences || [
    {
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description:
        "Led development of cloud-based applications using React, Node.js, and AWS. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.",
    },
    {
      position: "Software Engineer",
      company: "Digital Innovations",
      location: "Seattle, WA",
      startDate: "2017-03",
      endDate: "2019-12",
      current: false,
      description:
        "Developed and maintained web applications using JavaScript, React, and Node.js. Collaborated with UX designers to implement responsive designs and improve user experience.",
    },
  ];
  const projects = resumeData?.projects || [
    {
      role: "Senior Software Engineer",
      title: "Tech Solutions Inc.",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description:
        "Led development of cloud-based applications using React, Node.js, and AWS. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.",
    },

  ];

  const education = resumeData?.education || [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      current:false,
      description:
        "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering.",
    },
  ];

  const skills = resumeData?.skills || [
    {
      name: "Programming Languages",
      skills: [
        { name: "JavaScript", level: "Expert" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "React", level: "Expert" },
        { name: "Node.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
      ],
    },
  ];
  const customSections = resumeData?.customSections ||[];
  const TemplateComponent = templateMap[template];
  if (!TemplateComponent) {

    return <div className="text-red-500">Unknown template selected.</div>;
  }
  return (
    <div className="h-full overflow-auto bg-white">
      <TemplateComponent
        personal={personal}
        experiences={experiences}
        skills={skills}
        projects={projects}
        education={education}
        custom={customSections}
        sectionOrder={sectionOrder!}
      />
    </div>
  );
}
