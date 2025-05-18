"use client";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { QuickStart } from "@/components/dashboard/quick-start";
import { ResumeList } from "@/components/dashboard/resume-list";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { useGetAllResumes } from "@/query/resume/query";
import { CircleX, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { ResumeNotFound } from "@/components/error";

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

      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3 space-y-8">
          <ResumeList resumes={resumes} />
          <RecentActivity />
        </div>
        <div className="md:col-span-1">
          <DashboardOverview resumes={resumes} />
        </div>
      </div>
    </div>
  );
}
