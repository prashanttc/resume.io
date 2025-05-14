import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, FileText, Share2 } from "lucide-react"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-sm hover-shadow transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <FileText className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm hover-shadow transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resume Views</CardTitle>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <Eye className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm hover-shadow transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <Download className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm hover-shadow transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Shares</CardTitle>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <Share2 className="h-4 w-4 text-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <div className="flex items-center mt-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5"></div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
