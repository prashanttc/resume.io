import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Download, Edit, Eye, FileText, Share2 } from "lucide-react"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={cn("border-0 shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex group">
              <div className="relative mr-4 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-secondary/50 group-hover:bg-secondary/80 transition-colors">
                <activity.icon className="h-4 w-4 text-foreground" />
                {index !== activities.length - 1 && (
                  <span className="absolute bottom-0 left-1/2 top-8 w-px -translate-x-1/2 bg-border" />
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const activities = [
  {
    icon: Edit,
    title: "Updated 'Software Developer Resume'",
    description: "You made changes to your experience section",
    time: "Today at 2:30 PM",
  },
  {
    icon: Eye,
    title: "Resume viewed by a recruiter",
    description: "Someone from Tech Solutions Inc. viewed your resume",
    time: "Yesterday at 11:15 AM",
  },
  {
    icon: Download,
    title: "Downloaded resume as PDF",
    description: "You downloaded 'Software Developer Resume'",
    time: "2 days ago at 4:45 PM",
  },
  {
    icon: Share2,
    title: "Shared resume via link",
    description: "You created a shareable link for 'Software Developer Resume'",
    time: "3 days ago at 10:20 AM",
  },
  {
    icon: FileText,
    title: "Created 'UX Designer Resume'",
    description: "You created a new resume from the Minimalist template",
    time: "3 weeks ago at 9:30 AM",
  },
]
