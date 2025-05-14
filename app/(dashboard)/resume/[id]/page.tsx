"use client";
import { ResumeEditor } from "@/components/resume/resume-editor";
import { useGetResumebyId } from "@/query/resume/query";
import { useParams } from "next/navigation";

export default function ResumePage() {
  const params = useParams();
  const id = params.id as string;
  const { data, isPending } = useGetResumebyId(id);
  if (isPending) {
    return;
  }
  return (
    <div className="flex flex-col gap-6 animate-in">
      <div>
        <h1 className="text-2xl font-medium">Resume Editor</h1>
        <p className="text-muted-foreground">
          Create and customize your professional <span className="text-white font-semibold">{data?.title}</span>
        </p>
      </div>

      <ResumeEditor />
    </div>
  );
}
