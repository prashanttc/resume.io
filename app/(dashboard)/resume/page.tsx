import type { Metadata } from "next"
import { ResumeEditor } from "@/components/resume/resume-editor"

export const metadata: Metadata = {
  title: "Resume Editor - ResumeOS",
  description: "Create and edit your professional resume",
}

export default function ResumePage() {
  return (
    <div className="flex flex-col gap-6 animate-in">
      <div>
        <h1 className="text-2xl font-medium">Resume Editor</h1>
        <p className="text-muted-foreground">Create and customize your professional resume</p>
      </div>

      <ResumeEditor />
    </div>
  )
}
