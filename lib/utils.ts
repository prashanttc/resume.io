import { ResumeData } from "@/types/resume";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod" 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
