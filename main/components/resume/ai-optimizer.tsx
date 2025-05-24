"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  FileEdit,
  Loader2,
  CheckCircle,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useUpdateAI } from "@/query/resume/query";

type Optimizations = {
  suggestion: string;
};

interface OptimizationResult {
  cleanJson: {
    atsScore: number;
    aiSuggestions: Optimizations[];
  };
}

export function AIOptimizer({ id }: { id: string }) {
  const { mutate, isPending, error } = useUpdateAI();
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const router = useRouter();

  const analyzeResume = async () => {
    if (!jobDescription.trim()) {
      return;
    }
    setIsAnalyzing(true);
    setResult(null);
    const res = await fetch("/api/ai-optimise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, jobDescription }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API error:", errorData.error || "Unknown error");
      toast.error(errorData.error || "Failed to call AI optimise API");
      throw new Error(errorData.error || "Failed to call AI optimise API");
    }
    const data = await res.json();
      toast.success("optimisation generated");
      setResult(data);
      console.log("data",result?.cleanJson.aiSuggestions)
    setIsAnalyzing(false);
  };

  const goToEditor = () => {
    if (!result) {
      return;
    }
    mutate(
      { cleanJson: result.cleanJson, id },
      {
        onSuccess: () => {
          toast.success("saved");
           router.push(`/resume/${id}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Resume Optimizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  placeholder="Paste the job description here to get personalized optimization suggestions..."
                  className="min-h-[120px] resize-none"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>

              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Optimize My Resume
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              {/* ATS Score */}
              <div className="text-center space-y-4">
                <div className="inline-flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <svg
                      className="w-24 h-24 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${
                          result.cleanJson.atsScore * 2.51
                        }, 251`}
                        className={getScoreColor(result.cleanJson.atsScore)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className={`text-2xl font-bold ${getScoreColor(
                          result.cleanJson.atsScore
                        )}`}
                      >
                        {result.cleanJson.atsScore}
                      </span>
                      <span className="text-xs text-muted-foreground">ATS</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant={
                        result.cleanJson.atsScore >= 80
                          ? "default"
                          : result.cleanJson.atsScore >= 60
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {getScoreLabel(result.cleanJson.atsScore)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    Optimization Suggestions
                  </h3>
                </div>

                <div className="grid gap-3">
                  {result.cleanJson.aiSuggestions.map(
                    (Optimizations, index) => (
                      <Card
                        key={index}
                        className="border-l-4 border-l-primary/20"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <p className="text-sm">
                                {Optimizations.suggestion}
                              </p>
                            </div>
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={goToEditor} className="flex-1">
                  {isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FileEdit className="mr-2 h-4 w-4" />
                      save and view Resume
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setResult(null)}
                  className="flex-1"
                >
                  Analyze Another Job
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
