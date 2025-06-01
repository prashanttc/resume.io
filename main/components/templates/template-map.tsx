// resume-templates.ts
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalistTemplate } from "@/components/templates/minimalist-template";
import { CreativeTemplate } from "@/components/templates/creative-template";
import { TemplateProps } from "@/types/resume";
import { BoldTemplate } from "./boldline-template";
import { SidebarTemplate } from "./clarity-template";
import { ATSFriendlyTemplate } from "./ats-template";
import { ModernBlockTemplate } from "./modernblock-template";
import { SleekSideAccentTemplate } from "./sleekaccent-template";
import { CompactModernTemplate } from "./compact-template";
// import more templates...

export const templateMap: Record<
  string,
  React.FC<TemplateProps>
> = {
  modern: ModernTemplate,
  BoldLine:BoldTemplate,
  minimalist: MinimalistTemplate,
  Executive: ATSFriendlyTemplate,
  ModernBlock:ModernBlockTemplate,
  Clarity: SidebarTemplate,
  CompactModern:CompactModernTemplate,
  SleekAccent:SleekSideAccentTemplate,
  creative: CreativeTemplate,
};
