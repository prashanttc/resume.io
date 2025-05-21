import type { Metadata } from "next"
import { TemplateGallery } from "@/components/templates/template-gallery"

export const metadata: Metadata = {
  title: "Resume Templates - ResumeOS",
  description: "Browse and select from our collection of professional resume templates",
}

export default function TemplatesPage() {
  return (
    <div className="flex flex-col gap-6 animate-in">
      <div>
        <h1 className="text-2xl font-medium">Resume Templates</h1>
        <p className="text-muted-foreground">Browse and select from our collection of professional resume templates</p>
      </div>

      <TemplateGallery />
    </div>
  )
}
