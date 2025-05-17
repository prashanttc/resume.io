// resume-templates.ts
import { ModernTemplate } from "@/components/resume/templates/modern-template";
import { MinimalistTemplate } from "@/components/resume/templates/minimalist-template";
import { CreativeTemplate } from "@/components/resume/templates/creative-template";
// import more templates...

export const templateMap: Record<
  string,
  React.FC<any>
> = {
  modern: ModernTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
};
