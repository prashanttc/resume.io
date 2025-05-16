import { ResumeManagementClient } from "@/components/resume/resume-management"
import type { Metadata } from "next"
  
export const metadata: Metadata = {
  title: "Resumes - ResumeOS",
  description: "Manage your professional resumes",
}

export default function ResumesPage() {
  return (
    <div className="flex flex-col gap-6 animate-in">
      <div>
        <h1 className="text-2xl font-medium">My Resumes</h1>
        <p className="text-muted-foreground">Manage and edit your professional resumes</p>
      </div>

      <ResumeManagementClient />
    </div>
  )
}
