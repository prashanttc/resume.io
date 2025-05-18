import {
  deleteResume,
  getAllResume,
  getResumeById,
  newResume,
  saveResume,
} from "@/actions/resume-actions";
import { ResumeData } from "@/types/resume";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    },
  });
}
