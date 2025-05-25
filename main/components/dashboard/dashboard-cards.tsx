import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, FileText, Share2 } from "lucide-react"
import { ResumeLimitIndicator } from "./resume-limit-indicator"
import { resume } from "@/types/resume"

export function DashboardStats({resume,premium}:{resume:resume[];premium:boolean}) {
  const isPremium = premium; 
  const resumeCount = resume.length;
  const maxFreeResumes = 3
const totalViews = resume.reduce((acc, res) => acc + (res.views || 0), 0);
const totalDownloads = resume.reduce((acc, res) => acc + (res.downloads || 0), 0);
const totalShares = resume.reduce((acc, res) => acc + (res.shares || 0), 0);

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
              {!isPremium  && (
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
              <h3 className="text-2xl font-semibold">{totalViews}</h3>
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
              <h3 className="text-2xl font-semibold">{totalDownloads}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 jc">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shares</p>
              <h3 className="text-2xl font-semibold">{totalShares}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
