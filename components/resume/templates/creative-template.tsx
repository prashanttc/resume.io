import type { ResumeData } from "@/components/resume/resume-editor"
import type { ResumeSection } from "@/components/resume/section-reorder"
import type { ContentBlock } from "@/components/resume/custom-content-block"

interface CreativeTemplateProps {
  resumeData?: ResumeData
  sectionOrder?: ResumeSection[]
}

export function CreativeTemplate({ resumeData, sectionOrder }: CreativeTemplateProps) {
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

  // Calculate skill level percentage
  const getSkillLevelPercentage = (level: string) => {
    switch (level) {
      case "Expert":
        return "90%"
      case "Advanced":
        return "80%"
      case "Intermediate":
        return "60%"
      case "Beginner":
        return "40%"
      default:
        return "50%"
    }
  }

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
        return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
      case "image":
        return (
          <div className="space-y-2">
            {block.imageUrl && (
              <img
                src={block.imageUrl || "/placeholder.svg"}
                alt={block.content}
                className="max-h-[200px] mx-auto object-contain rounded-md"
              />
            )}
            {block.content && <p className="text-sm text-zinc-600">{block.content}</p>}
          </div>
        )
      case "link":
        return (
          <div className="space-y-1">
            <a
              href={block.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:underline inline-flex items-center"
            >
              {block.linkText || block.linkUrl}
            </a>
            {block.content && <p className="text-sm text-zinc-600">{block.content}</p>}
          </div>
        )
      default:
        return null
    }
  }

  // Filter sections for sidebar and main content
  const sidebarSections = ["personal", "skills", "education"]
  const mainSections = ["experience", "custom", "blocks"]

  return (
    <div className="font-sans text-zinc-800 max-w-[800px] mx-auto">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-zinc-100 p-6 h-full">
          <header className="mb-8">
            <h1 className="text-xl font-bold mb-1">{personal.fullName}</h1>
            <h2 className="text-base text-zinc-600 mb-4">{personal.jobTitle}</h2>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-500"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>{personal.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{personal.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-500"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{personal.location}</span>
              </div>
              {personal.website && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-500"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>{personal.website}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-zinc-500"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>{personal.linkedin}</span>
                </div>
              )}
            </div>
          </header>

          {/* Render sidebar sections based on order */}
          {orderedSections
            .filter((section) => section.isActive && sidebarSections.includes(section.id))
            .map((section) => {
              switch (section.id) {
                case "skills":
                  return (
                    <section key={section.id} className="mb-6">
                      <h3 className="text-base font-bold mb-3 border-b border-zinc-300 pb-1">Skills</h3>

                      {skills.map((category, categoryIndex) => (
                        <div key={categoryIndex} className={categoryIndex < skills.length - 1 ? "mb-4" : ""}>
                          <h4 className="text-sm font-medium mb-2">{category.name}</h4>
                          <div className="space-y-1">
                            {category.skills.map((skill:any, skillIndex:number) => (
                              <div key={skillIndex} className="flex items-center justify-between">
                                <span className="text-xs">{skill.name}</span>
                                <div className="w-24 bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className="bg-zinc-600 h-full rounded-full"
                                    style={{ width: getSkillLevelPercentage(skill.level) }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </section>
                  )
                case "education":
                  return (
                    <section key={section.id}>
                      <h3 className="text-base font-bold mb-3 border-b border-zinc-300 pb-1">Education</h3>

                      {education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="text-sm font-medium">{edu.degree}</h4>
                          <h5 className="text-xs text-zinc-600 mb-1">{edu.school}</h5>
                          <p className="text-xs text-zinc-600 mb-2">
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </p>
                          {edu.description && <p className="text-xs">{edu.description}</p>}
                        </div>
                      ))}
                    </section>
                  )
                default:
                  return null
              }
            })}
        </div>

        <div className="col-span-2 p-6">
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3 border-b border-zinc-300 pb-1">Summary</h3>
            <p className="text-sm">{personal.summary}</p>
          </section>

          {/* Render main content sections based on order */}
          {orderedSections
            .filter((section) => section.isActive && mainSections.includes(section.id))
            .map((section) => {
              switch (section.id) {
                case "experience":
                  return (
                    <section key={section.id} className="mb-6">
                      <h3 className="text-lg font-bold mb-3 border-b border-zinc-300 pb-1">Experience</h3>

                      {experiences.map((experience, index) => (
                        <div key={index} className={index < experiences.length - 1 ? "mb-5" : ""}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-medium">{experience.jobTitle}</h4>
                            <span className="text-sm text-zinc-600">
                              {formatDate(experience.startDate)} -{" "}
                              {experience.current ? "Present" : formatDate(experience.endDate)}
                            </span>
                          </div>
                          <h5 className="text-sm font-medium text-zinc-600 mb-2">
                            {experience.company}
                            {experience.location ? `, ${experience.location}` : ""}
                          </h5>
                          <p className="text-sm mb-2">{experience.description}</p>
                        </div>
                      ))}
                    </section>
                  )
                case "custom":
                  return customSections.map((customSection) => (
                    <section key={customSection.id} className="mb-6">
                      <h3 className="text-lg font-bold mb-3 border-b border-zinc-300 pb-1">{customSection.title}</h3>
                      <div
                        className="text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: customSection.title }}
                      />
                    </section>
                  ))
                case "blocks":
                  if (contentBlocks.length === 0) return null
                  return (
                    <section key={section.id} className="mb-6">
                      <h3 className="text-lg font-bold mb-3 border-b border-zinc-300 pb-1">Additional Information</h3>
                      <div className="space-y-4">
                        {contentBlocks.map((block) => (
                          <div key={block.id} className="mb-3">
                            <h4 className="text-base font-medium mb-1">{block.title}</h4>
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
      </div>
    </div>
  )
}
