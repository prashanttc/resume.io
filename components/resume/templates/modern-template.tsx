import type { ResumeData } from "@/components/resume/resume-editor"
import type { ResumeSection } from "@/components/resume/section-reorder"
import { EntryType } from "@/types/resume"

interface ModernTemplateProps {
  resumeData?: ResumeData
  sectionOrder?: ResumeSection[]
}

export function ModernTemplate({ resumeData, sectionOrder }: ModernTemplateProps) {
  const personal = resumeData?.personalInfo || {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john@example.com",
    phone: "(123) 456-7890",
    address: "San Francisco, CA",
    website: "johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    summary:
      "Experienced software engineer with a passion for building scalable web applications and solving complex problems. Proficient in JavaScript, TypeScript, React, and Node.js with a strong focus on creating responsive and user-friendly interfaces.",
  }

  const experiences = resumeData?.experiences || [
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

  const education = [
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

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  // Get the ordered sections
  const orderedSections = sectionOrder || [
    { title: "Personal Information", type: "core", isActive: true },
    {  title: "Experience", type: "core", isActive: true },
    {  title: "Education", type: "core", isActive: true },
    { title: "Skills", type: "core", isActive: true },
    {  title: "Custom Sections", type: "custom", isActive: true },
  ]
 console.log("skols",skills)
  return (
    <div className="font-sans text-zinc-800 max-w-[800px] mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-1">{personal.fullName}</h1>
        <h2 className="text-xl text-zinc-600 mb-3">{personal.jobTitle}</h2>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.address}</div>
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </header>

      {/* Render sections based on order */}
      {orderedSections.map((section) => {
        if (!section.isActive) return null

        switch (section.title) {
          case "Personal Information":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">Summary</h3>
                <p className="text-sm">{personal.summary}</p>
              </section>
            )
          case "Experience":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">Experience</h3>

                {experiences.map((experience, index) => (
                  <div key={index} className={index < experiences.length - 1 ? "mb-4" : ""}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-medium">{experience.company}</h4>
                      <span className="text-sm text-zinc-600">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current ? "Present" : formatDate(experience.endDate||'')}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-sm font-medium text-zinc-600">{experience.company}</h5>
                      {experience.location && <span className="text-sm text-zinc-600">{experience.location}</span>}
                    </div>
                    <p className="text-sm mt-1">{experience.description}</p>
                  </div>
                ))}
              </section>
            )
          case "Education":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">Education</h3>

                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-medium">{edu.degree}</h4>
                      <span className="text-sm text-zinc-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-sm font-medium text-zinc-600">{edu.school}</h5>
                      {edu.location && <span className="text-sm text-zinc-600">{edu.location}</span>}
                    </div>
                    {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </section>
            )
          case "Skills":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">Skills</h3>

                {skills.map((category, categoryIndex) => (
                  <div key={categoryIndex} className={categoryIndex < skills.length - 1 ? "mb-2" : ""}>
                    <h4 className="text-sm font-medium mb-1">{category.name}</h4>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill:any, skillIndex:number) => (
                        <span key={skillIndex} className="text-xs bg-zinc-100 px-2 py-1 rounded">
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )
          case "Custom Section":
            return customSections.length > 0 ? (
              <div key={section.title}>
                {customSections.map((customSection) => (
                  <section key={customSection.id} className="mb-6">
                    <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">{customSection.title}</h3>
                    <div className="space-y-4">
                      {customSection.entries.map((entry: EntryType) => (
                        <div key={entry.id} className="mb-3">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-medium">{entry.title}</h4>
                            {entry.date && <span className="text-sm text-zinc-600">{entry.date}</span>}
                          </div>
                          <p className="text-sm mt-1">{entry.description}</p>
                          {entry.link && (
                            <a
                              href={entry.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                            >
                              View more
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : null
         
          default:
            return null
        }
      })}
    </div>
  )
}
