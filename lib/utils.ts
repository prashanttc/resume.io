import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadPdf = async ({resumeId,title}:{resumeId:string;title:string}) => {
  const res = await fetch("/api/export-pdf", {
    method: "POST",
    body: JSON.stringify({ resumeId,title }),
  });
  if (!res.ok) {
    console.error("something went wrong");
    throw new Error("something went wrong");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
