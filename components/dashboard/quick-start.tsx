"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import NewResume from "../NewResume"

export function QuickStart() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  return (
    <Card className="border-0 shadow-sm bg-secondary/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Get started with ResumeOS</h2>
            <p className="text-muted-foreground">Create your first resume or explore templates</p>
          </div>
          <div className="flex flex-wrap gap-3">
          <NewResume/>
            <Link href="/templates">
              <Button variant="outline" className="hover-lift">
                <FileText className="mr-2 h-4 w-4" />
                Templates
              </Button>
            </Link>
            <Link href="/resume/optimize">
              <Button variant="outline" className="hover-lift">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Optimize
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setDismissed(true)} className="ml-2">
              Dismiss
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
