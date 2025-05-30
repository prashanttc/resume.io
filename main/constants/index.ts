import { Template } from "@/types/resume";

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "A sharp, clean template with a balanced layout—ideal for corporate and modern roles.",
    categories: ["professional", "modern"],
    thumbnail: "/templates/modern.png?height=160&width=120",
  },
  {
    id: "minimalist",
    name: "Minimalist Focus",
    description: "A sleek, no-frills layout emphasizing clarity, whitespace, and easy readability.",
    categories: ["minimal", "modern"],
    thumbnail: "/templates/minimal.png?height=160&width=120",
  },
  {
    id: "creative",
    name: "Creative Split",
    description: "An eye-catching design with a side panel for quick-glance info—great for creative fields.",
    categories: ["creative"],
    thumbnail: "/templates/sidebar2.png?height=160&width=120",
  },
  {
    id: "BoldLine",
    name: "BoldLine",
    description: "A high-impact layout featuring bold headers and strong sectioning—perfect for standing out in competitive fields.",
    categories: ["modern"],
    thumbnail: "/templates/boldline.png?height=160&width=120",
  },
  {
    id: "Clarity",
    name: "Clarity",
    description: "A crisp, ATS-optimized template with a left-aligned sidebar and clean content layout—efficient and professional.",
    categories: ["creative", "professional"],
    thumbnail: "/templates/sidebar.png?height=160&width=120",
  },
  {
    id: "Executive",
    name: "Executive",
    description: "A polished, ATS-friendly layout designed for leadership and executive roles in corporate industries.",
    categories: ["academic", "professional"],
    thumbnail: "/templates/executive.png?height=160&width=120",
  },
  {
    id: "ModernBlock",
    name: "Modern Block",
    description: "A structured, grid-based layout optimized for ATS systems and executive-level readability.",
    categories: ["academic", "professional"],
    thumbnail: "/templates/modernb.png?height=160&width=120",
  },
  {
    id: "SleekAccent",
    name: "Sleek Accent",
    description: "A structured, grid-based layout optimized for ATS systems and executive-level readability.",
    categories: ["technical", "creative"],
    thumbnail: "/templates/modernb.png?height=160&width=120",
  },
  {
    id: "CompactModern",
    name: "Compact Modern",
    description: "A structured, grid-based layout optimized for ATS systems and executive-level readability.",
    categories: ["technical", "creative"],
    thumbnail: "/templates/modernb.png?height=160&width=120",
  },
];
