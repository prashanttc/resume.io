"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AIOptimizer() {
  const [jobDescription, setJobDescription] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  function optimizeResume() {
    if (!jobDescription.trim()) return

    setIsOptimizing(true)

    // Simulate AI processing
    setTimeout(() => {
      setSuggestions([
        "Add more quantifiable achievements to your Senior Software Engineer role",
        "Highlight your experience with cloud technologies like AWS to match the job requirements",
        "Include keywords like 'agile methodology' and 'CI/CD' in your experience section",
        "Emphasize your leadership skills by expanding on team management experience",
        "Add React Native to your skills section to better match this position",
      ])
      setIsOptimizing(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Job Description</label>
        <Textarea
          placeholder="Paste the job description here to get AI-powered suggestions to tailor your resume..."
          className="min-h-[100px] resize-none"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <Button onClick={optimizeResume} disabled={!jobDescription.trim() || isOptimizing} className="w-full hover-lift">
        {isOptimizing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Optimizing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Optimize Resume
          </>
        )}
      </Button>

      {suggestions.length > 0 && (
        <Card className="border-0 bg-secondary/50 shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Suggestions
            </h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 shrink-0">
                    Tip {index + 1}
                  </Badge>
                  <span className="text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
