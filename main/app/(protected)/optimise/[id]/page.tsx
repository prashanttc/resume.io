"use client"
import { AIOptimizer } from "@/components/resume/ai-optimizer"
import { redirect, useParams } from "next/navigation"

export default function OptimizePage() {
  const params = useParams();
  const id = params.id as string;
  if(!id){
    redirect('/dashboard')
  }
  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Resume Optimization</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered suggestions to improve your resume's ATS compatibility and increase your chances of landing
          interviews.
        </p>
      </div>
      <AIOptimizer id={id}/>
    </div>
  )
}
