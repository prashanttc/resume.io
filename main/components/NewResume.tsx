"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Plus, LoaderCircle } from "lucide-react";
import { Input } from "./ui/input";
import { useCreateNewResume, useResumeCount } from "@/query/resume/query"; 
import { isPremium } from "@/query/user/query"; 
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PremiumButton from "./SubscriptionButton";

const NewResume = () => {
  const { mutate, isPending } = useCreateNewResume();
  const { data: resumeCount=0 } = useResumeCount();
  const { data: ispremium } = isPremium();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const maxFreeResumes = 3;

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Resume title can't be empty");
      return;
    }
    if (!ispremium?.isPremium && resumeCount >= maxFreeResumes) {
      toast.error("Free users can create up to 3 resumes only. Upgrade to premium for unlimited!");
      return;
    }

    const toastId = toast.loading("Creating resume...");
    mutate(title, {
      onSuccess: (resumeId: string) => {
        toast.success("Resume created!", { id: toastId });
        setOpen(false);
        navigate.push(`/resume/${resumeId}`);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong", { id: toastId });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <div className="gap-1 hover-lift bg-white rounded-md text-black flex p-2 items-center font-semibold justify-center">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline-flex">New Resume</span>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {(!ispremium?.isPremium && resumeCount >= maxFreeResumes)
              ? "Resume Limit Reached"
              : "Create New Resume"}
          </AlertDialogTitle>

          {(!ispremium?.isPremium && resumeCount >= maxFreeResumes) ? (
            <div className="text-center p-4">
              <p>You have reached your free resume limit of {maxFreeResumes}.</p>
              <p className="mt-2 font-semibold">Upgrade to premium for unlimited resumes.</p>
              <div
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                onClick={() => {
                  setOpen(false);
                }}
              >
<PremiumButton/>              </div>
            </div>
          ) : (
            <Input
              placeholder="Enter name of resume"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
            />
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          {(!ispremium?.isPremium && resumeCount >= maxFreeResumes) ? null : (
            <AlertDialogAction onClick={handleCreate} disabled={isPending}>
              {isPending ? <LoaderCircle className="animate-spin" /> : "Continue"}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewResume;
