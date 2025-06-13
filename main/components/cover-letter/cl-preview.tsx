import React from "react";
import { CoverLettertemplateMap } from "./cover-letter-template-map";
import { CoverLetterProps } from "@/types/resume";
import { Button } from "../ui/button";
import { FileText, LoaderCircle } from "lucide-react";

interface LetterPreviewProps {
  coverLetterData: CoverLetterProps;
}

export default function Clpreview({ coverLetterData }: LetterPreviewProps) {
  const TemplateComponent = CoverLettertemplateMap[coverLetterData.template];
  return (
      <div className="w-[800px] bg-white p-5 md:p-8 mx-auto h-[1123px]">
        <TemplateComponent
          fullName={coverLetterData.fullName}
          email={coverLetterData.email}
          phone={coverLetterData.phone}
          title={coverLetterData.jobTitle}
          template={coverLetterData.template}
          experience={coverLetterData.experience}
          preferences={coverLetterData.preferences}
          content={coverLetterData.content}
          companyName={coverLetterData.companyName}
          hiringManager={coverLetterData.hiringManager}
          jobTitle={coverLetterData.jobTitle}
        />
      </div>
  );
}
