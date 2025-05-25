import { Template } from "@/types/resume";

  export const templates: Template[] = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "A clean, professional template with a traditional layout and modern styling",
      categories: ["professional", "modern"],
      thumbnail: "/templates/modern.png?height=160&width=120",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "A simple, elegant template with minimal styling and clean typography",
      categories: ["minimal", "modern"],
      thumbnail: "/templates/minimal.png?height=160&width=120",
    },
    {
      id: "creative",
      name: "Creative Split",
      description: "A creative template with a sidebar for skills and contact information",
      categories: ["creative"],
      thumbnail: "/templates/sidebar2.png?height=160&width=120",
    },
    {
      id: "BoldLine",
      name: "BoldLine template",
      description: "A high-impact, sectioned resume layout that commands attention with strong headers, clear structure, and no-nonsense readability.",
      categories: ["modern"],
      thumbnail: "/templates/boldline.png?height=160&width=120",
    },
    {
      id: "Clarity",
      name: "Clarity template",
      description: "A crisp, ATS-optimized layout with a left-aligned sidebar for quick-access info (skills, contact, links) and a right-side content flow for detailed sections.",
      categories: ["creative","proffesional"],
      thumbnail: "/templates/sidebar.png?height=160&width=120",
    },
    

  ]
