import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const downloadPdf = async ({
  resumeId,
  title,
  onStart,
  onSuccess,
  onError,
}: {
  resumeId: string;
  title: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    onStart?.(); // trigger loading state

    const res = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ resumeId, title }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
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

    onSuccess?.(); // done
  } catch (err) {
    console.error("PDF download failed:", err);
    onError?.();
  }
};


 export  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
