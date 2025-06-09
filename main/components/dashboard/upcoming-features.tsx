import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, FileCheck, Share } from "lucide-react"

export function UpcomingFeatures() {
  return (
    <Card className="border-0 shadow-sm flex-1 ">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Coming Soon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">AI Resume Optimization</h4>
              <Badge variant="outline" className="text-xs">
                Soon
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get AI-powered suggestions to improve your resume content and formatting.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Job Match Analysis</h4>
              <Badge variant="outline" className="text-xs">
                Coming
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              See how well your resume matches specific job descriptions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <FileCheck className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Version History</h4>
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Track changes and restore previous versions of your resume.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Share className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">Collaborative Editing</h4>
              <Badge variant="outline" className="text-xs">
                Planned
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Invite others to review and edit your resume in real-time.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
