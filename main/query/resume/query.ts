import {
  coverLetterCount,
  getAllCoverLetter,
  getCoverLetterById,
  newCoverLetter,
  saveCoverLetter,
} from "@/actions/coverLetter-action";
import {
  getAllResume,
  getResumeById,
  getresumeBySlug,
  newResume,
  resumeCount,
  saveResume,
  setSlug,
  updateAiResults,
  updateViewCount,
} from "@/actions/resume-actions";
import { generateCoverletter } from "@/lib/utils";
import { CoverLetterProps, ResumeData } from "@/types/resume";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateNewResume() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => newResume(name),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
      queryclient.invalidateQueries({ queryKey: ["resumecount"] });
    },
  });
}

export function useCreateNewCoverLetter() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => newCoverLetter(name),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getallcoverletter"] });
      queryclient.invalidateQueries({ queryKey: ["coverlettercount"] });
    },
  });
}

export function useCoverLetterById(id: string) {
  return useQuery({
    queryFn: () => getCoverLetterById(id),
    queryKey: ["getcoverletterbyid", id],
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
export function useSaveCoverLetter() {
  return useMutation({
    mutationFn: ({
      coverLetter,
      coverLetterId,
    }: {
      coverLetter: CoverLetterProps;
      coverLetterId: string;
    }) => saveCoverLetter(coverLetter, coverLetterId),
  });
}

export function useGetAllResumes() {
  return useQuery({
    queryKey: ["getallresume"],
    queryFn: getAllResume,
  });
}
export function useGetAllCoverLetter() {
  return useQuery({
    queryKey: ["getallcoverletter"],
    queryFn: getAllCoverLetter,
  });
}

export function useSetSlug() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ url, id }: { url: string; id: string }) =>
      setSlug({ url, id }),
    onSuccess: (_, { id }) => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByid", id] });
      queryclient.invalidateQueries({ queryKey: ["getResumeByurl", id] });
    },
  });
}
export function useUpdateAI() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({ cleanJson, id }: { cleanJson: any; id: string }) =>
      updateAiResults({ cleanJson, id }),
    onSuccess: (_, { id }) => {
      queryclient.invalidateQueries({ queryKey: ["getResumeByid", id] });
    },
  });
}

export function useViewUpdate() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (url: string) => updateViewCount(url),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getallresume"] });
    },
  });
}

export function useResumeCount() {
  return useQuery({
    queryKey: ["resumecount"],
    queryFn: resumeCount,
  });
}
export function useCoverLetterCount() {
  return useQuery({
    queryKey: ["coverlettercount"],
    queryFn: coverLetterCount,
  });
}
export function useGetaiCoverLetter() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: ({
      input,
      coverLetterId,
    }: {
      input: CoverLetterProps;
      coverLetterId: string;
    }) => generateCoverletter({ input, coverLetterId }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["getcoverletterbyid"] });
    },
  });
}
