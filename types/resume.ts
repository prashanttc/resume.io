import { ResumeSection } from "@/components/resume/section-reorder";

export type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: string;
  }[];
};

export type resume = {
  id: string;
  title: string;
  views: number;
  downloads: number;
  shares: number;
  isDefault: boolean;
  updatedAt: Date;
};

export type ResumeData = {
  personalInfo: PersonalInfo | null;
  experiences: Experiences[];
  education: Education[];
  skills: SkillCategory[];
  customSections: CustomSections[];
  sectionOrder: ResumeSection[];
  template: string;
};

export type EntryType = {
  id: string;
  title: string | null;
  description: string | null;
  date: string | null;
  link: string | null;
};
export type PersonalInfo = {
  fullName: string;
  email: string;
  jobTitle: string; // Optional: Prisma supports it
  phone: string;
  linkedin: string | null;
  github: string | null;
  website: string | null;
  address: string; // Maps to `address` in Prisma
  summary: string; // Optional: included in Prisma
};

export type Experiences = {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location?: string;
  description?: string;
};

export type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  location?: string;
};


export type CustomSections = {
  id: string;
  title: string;
  entries: EntryType[];
};
