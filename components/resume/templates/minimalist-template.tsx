import type { ResumeData } from "@/components/resume/resume-editor"
import type { ResumeSection } from "@/components/resume/section-reorder"
import type { ContentBlock } from "@/components/resume/custom-content-block"

interface MinimalistTemplateProps {
  resumeData?: ResumeData
  sectionOrder?: ResumeSection[]
}

export function MinimalistTemplate({ resumeData, sectionOrder }: MinimalistTemplateProps) {
  // Use default data if no resume data is provided
  const personal = resumeData?.personal || {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Proficient in JavaScript, TypeScript, React, and Node.js with a strong focus on creating responsive and user-friendly interfaces.",
  }

  const experiences = resumeData?.experience || [
    {
      jobTitle: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description:
        "Led development of cloud-based applications using React, Node.js, and AWS. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.",
    },
    {
      jobTitle: "Software Engineer",
      company: "Digital Innovations",
      location: "Seattle, WA",
      startDate: "2017-03",
      endDate: "2019-12",
      current: false,
      description:
        "Developed and maintained web applications using JavaScript, React, and Node.js. Collaborated with UX designers to implement responsive designs and improve user experience.",
    },
  ]

  const education = resumeData?.education || [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      description:
        "Graduated with honors. Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering.",
    },
  ]

  const skills = resumeData?.skills || [
    {
      name: "Programming Languages",
      skills: [
        { name: "JavaScript", level: "Expert" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Python", level: "Intermediate" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "React", level: "Expert" },
        { name: "Node.js", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
      ],
    },
  ]

  const customSections = resumeData?.customSections || []
  const contentBlocks = resumeData?.contentBlocks || []

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  // Flatten skills for minimalist display
  const flattenedSkills = skills.flatMap((category) => category.skills.map((skill:any) => skill.name))

  // Get the ordered sections
  const orderedSections = sectionOrder || [
    { id: "personal", title: "Personal Information", type: "core", isActive: true },
    { id: "experience", title: "Experience", type: "core", isActive: true },
    { id: "education", title: "Education", type: "core", isActive: true },
    { id: "skills", title: "Skills", type: "core", isActive: true },
    { id: "custom", title: "Custom Sections", type: "custom", isActive: true },
    { id: "blocks", title: "Content Blocks", type: "blocks", isActive: true },
  ]

  // Render content blocks
  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "text":
        return (
          <div className="prose prose-sm max-w-none text-center" dangerouslySetInnerHTML={{ __html: block.content }} />
        )
      case "image":
        return (
          <div className="space-y-2 text-center">
            {block.imageUrl && (
              <img
                src={block.imageUrl || "/placeholder.svg"}
                alt={block.content}
                className="max-h-[200px] mx-auto object-contain rounded-md"
              />
            )}
            {block.content && <p className="text-xs text-center text-zinc-600">{block.content}</p>}
          </div>
        )
      case "link":
        return (
          <div className="space-y-1 text-center">
            <a
              href={block.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:underline inline-flex items-center"
            >
              {block.linkText || block.linkUrl}
            </a>
            {block.content && <p className="text-xs text-zinc-600">{block.content}</p>}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="font-sans text-zinc-800 max-w-[800px] mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-normal uppercase tracking-widest mb-1">{personal.fullName}</h1>
        <h2 className="text-base font-light uppercase tracking-wider text-zinc-500 mb-3">{personal.jobTitle}</h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-zinc-600">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.location}</div>
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </header>

      {/* Render sections based on order */}
      {orderedSections.map((section) => {
        if (!section.isActive) return null

        switch (section.id) {
          case "personal":
            return (
              <section key={section.id} className="mb-6">
                <p className="text-sm text-center max-w-2xl mx-auto">{personal.summary}</p>
              </section>
            )
          case "experience":
            return (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">Experience</h3>

                {experiences.map((experience, index) => (
                  <div key={index} className={index < experiences.length - 1 ? "mb-5" : ""}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{experience.jobTitle}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current ? "Present" : formatDate(experience.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">{experience.company}</h5>
                      {experience.location && <span className="text-xs text-zinc-600">{experience.location}</span>}
                    </div>
                    <p className="text-xs">{experience.description}</p>
                  </div>
                ))}
              </section>
            )
          case "education":
            return (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">Education</h3>

                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{edu.degree}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">{edu.school}</h5>
                      {edu.location && <span className="text-xs text-zinc-600">{edu.location}</span>}
                    </div>
                    {edu.description && <p className="text-xs">{edu.description}</p>}
                  </div>
                ))}
              </section>
            )
          case "skills":
            return (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">Skills</h3>

                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs">
                  {flattenedSkills.map((skill, index) => (
                    <span key={index} className="border border-zinc-200 px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )
          case "custom":
            return customSections.map((section) => (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">{section.title}</h3>
                <div
                  className="text-xs prose prose-sm max-w-none text-center"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
              </section>
            ))
          case "blocks":
            if (contentBlocks.length === 0) return null
            return (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  {contentBlocks.map((block) => (
                    <div key={block.id} className="mb-3">
                      <h4 className="text-sm font-medium text-center mb-1">{block.title}</h4>
                      {renderContentBlock(block)}
                    </div>
                  ))}
                </div>
              </section>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
