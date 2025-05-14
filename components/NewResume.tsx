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
import { useCreateNewResume } from "@/query/resume/query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewResume = () => {
  const { mutate, isPending } = useCreateNewResume();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useRouter();

  const handleclick = () => {
    const toastId = toast.loading("Creating resume...");
    mutate(title, {
      onSuccess: (resumeId: string) => {
        toast.success("Resume created!", { id: toastId });
        setOpen(false);
        navigate.push(`/resume/${resumeId}`);
      },
      onError: () => {
        toast.error("Failed to create resume", { id: toastId });
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
          <AlertDialogTitle>create new resume</AlertDialogTitle>
          <Input
            placeholder="enter name of resume"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleclick} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewResume;
