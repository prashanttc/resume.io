"use client"

import { ModernTemplate } from "@/components/resume/templates/modern-template"
import { MinimalistTemplate } from "@/components/resume/templates/minimalist-template"
import { CreativeTemplate } from "@/components/resume/templates/creative-template"
import type { ResumeData } from "@/components/resume/resume-editor"
import type { ResumeSection } from "@/components/resume/section-reorder"

interface ResumePreviewProps {
  template: string
  resumeData?: ResumeData
  sectionOrder?: ResumeSection[]
}

export function ResumePreview({ template, resumeData, sectionOrder }: ResumePreviewProps) {
  return (
    <div className="h-full overflow-auto bg-white p-8">
      {template === "modern" && <ModernTemplate resumeData={resumeData} sectionOrder={sectionOrder} />}
      {template === "minimalist" && <MinimalistTemplate resumeData={resumeData} sectionOrder={sectionOrder} />}
      {template === "creative" && <CreativeTemplate resumeData={resumeData} sectionOrder={sectionOrder} />}
    </div>
  )
}
