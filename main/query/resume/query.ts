import {
  deleteResume,
  getAllResume,
  getResumeById,
  getresumeBySlug,
  newResume,
  saveResume,
  setSlug,
  updateAiResults,
} from "@/actions/resume-actions";
import { ResumeData } from "@/types/resume";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";

export function useCreateNewResume() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => newResume(name),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
    },
  });
}

export function useGetResumebyId(id: string) {
  return useQuery({
    queryKey: ["getResumeByid", id],
    queryFn: () => getResumeById(id),
  });
}
export function useGetResumeBySlug(url: string) {
  return useQuery({
    queryKey: ["getResumeByurl", url],
    queryFn: () => getresumeBySlug(url),
  });
}

export function useSaveResume() {
  return useMutation({
    mutationFn: ({
      resume,
      resumeId,
    }: {
      resume: ResumeData;
      resumeId: string;
    }) => saveResume(resume, resumeId),
  });
}

export function useGetAllResumes() {
  return useQuery({
    queryKey: ["getallresume"],
    queryFn: getAllResume,
  });
}

export function useDeleteResume() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteResume(id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByid"] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByurl"] });
    },
  });
}

export function useSetSlug() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ url, id }: { url: string; id: string }) =>
      setSlug({ url, id }),
    onSuccess: (_,{id}) => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByid",id] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByurl",id] });
    },
  });
}
export function useUpdateAI() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ cleanJson, id }: { cleanJson: any; id: string }) =>
      updateAiResults({ cleanJson, id }),
    onSuccess: (_,{id}) => {
      queryclient.invalidateQueries({ queryKey: ["getResumeByid",id] });
    },
  });
}
