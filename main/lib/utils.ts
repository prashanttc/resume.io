import { CoverLetterProps } from "@/types/resume";
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_RENDER_URL!}generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeId, title }),
    });
    if (!res.ok) {
      console.log("res", res);
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
export const downloadCoverLetter = async ({
  coverLetterId,
  title,
  onStart,
  onSuccess,
  onError,
}: {
  coverLetterId: string;
  title: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  try {
    onStart?.(); // trigger loading state
    const res = await fetch(
      `http://localhost:5000/generateCl`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverLetterId, title }),
      }
    );
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
    console.error("cover letter download failed:", err);
    onError?.();
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// helper.ts
export async function callResumeAI(
  prompt: string,
  type: "summary" | "job-desc" | "project"
) {
  try {
    const res = await fetch("/api/ai-generate-res", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, type }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch AI response");
    }

    const data = await res.json();
    return data.res;
  } catch (err: any) {
    console.error("callResumeAI error:", err.message);
    throw err;
  }
}
export async function generateCoverletter({
  input,
  coverLetterId,
}: {
  input: CoverLetterProps;
  coverLetterId: string;
}) {
  try {
    const res = await fetch("/api/ai-coverLetter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input, coverLetterId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch AI response");
    }

    const data = await res.json();
    return data.res;
  } catch (err: any) {
    console.error("callResumeAI error:", err.message);
    throw err;
  }
}
