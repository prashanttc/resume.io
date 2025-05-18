import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, FileText, Share2 } from "lucide-react"
import { ResumeLimitIndicator } from "./resume-limit-indicator"
import { resume } from "@/types/resume"

export function DashboardStats({resume}:{resume:resume[]}) {
  const currentPlan = "free"
  const resumeCount = resume.length;
  const maxFreeResumes = 3
  const view = resume.map((res)=>res.views);
  const shares = resume.map((res)=>res.shares);
  const download = resume.map((res)=>res.downloads);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Resumes</p>
              <h3 className="text-2xl font-semibold">{resumeCount}</h3>
              {currentPlan === "free" && (
                <div className="mt-2">
                  <ResumeLimitIndicator currentCount={resumeCount} maxCount={maxFreeResumes} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resume Views</p>
              <h3 className="text-2xl font-semibold">{view}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Downloads</p>
              <h3 className="text-2xl font-semibold">{download}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shares</p>
              <h3 className="text-2xl font-semibold">{shares}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
