import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, FileText, Share2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { resumeProps } from "./resume-list"

export function DashboardOverview({resumes}:resumeProps) {
  const totalViews = resumes.reduce((sum, resume) => sum + resume.views, 0);
  const totalDownloads = resumes.reduce((sum, resume) => sum + resume.downloads, 0);
  const totalShares = resumes.reduce((sum, resume) => sum + resume.shares, 0);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>Total Resumes</span>
            </div>
            <span className="font-medium">{resumes.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>Resume Views</span>
            </div>
            <span className="font-medium">{totalViews}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              <span>Downloads</span>
            </div>
            <span className="font-medium">{totalDownloads}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span>Shares</span>
            </div>
            <span className="font-medium">{totalShares}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Storage</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">2.4 MB used</span>
              <span className="text-muted-foreground">10 MB total</span>
            </div>
            <Progress value={24} className="h-1" />
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Account Status</h4>
          <div className="flex items-center justify-between text-sm">
            <span>Free Plan</span>
            <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">Active</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Upgrade to Pro for unlimited resumes, templates, and AI features.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
