import { CoverLetterTemplateProps } from "@/types/resume";
import minimalTemp from "./template-coverLetter/minimalTemp";

export const CoverLettertemplateMap: Record<
  string,
  React.FC<CoverLetterTemplateProps>
> = {
minimal:minimalTemp,
};
