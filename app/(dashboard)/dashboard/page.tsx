"use client";
import { QuickStart } from "@/components/dashboard/quick-start";
import { ResumeList } from "@/components/dashboard/resume-list";
import { useGetAllResumes } from "@/query/resume/query";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { ResumeNotFound } from "@/components/error";
import { PlanOverview } from "@/components/dashboard/plan-overview";
import { DashboardStats } from "@/components/dashboard/dashboard-cards";
import { UpcomingFeatures } from "@/components/dashboard/upcoming-features";

export default function DashboardPage() {
  const { data: resumes, isError, error, isPending } = useGetAllResumes();

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    } else if (!resumes?.length && !isPending) {
      toast.error("No resumes found");
    }
  }, [isError, error, resumes, isPending]);

if (isPending) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );
}
if (!resumes) {
  return (
   <ResumeNotFound variant="error"/>
  );
}
  return (
    <div className="flex flex-col gap-8 animate-in">
      <div>
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your resume workspace</p>
      </div>

      <QuickStart />
      <DashboardStats resume={resumes} />
      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-2 space-y-8">
          <ResumeList resumes={resumes} />
          <UpcomingFeatures/>
       </div>
        <div className="md:col-span-2">
          <PlanOverview resume={resumes} />
        </div>
      </div>
    </div>
  );
}
