import { TemplateProps } from "@/types/resume"
export function MinimalistTemplate({ personal,education,experiences,skills,custom, sectionOrder }: TemplateProps) {

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  // Flatten skills for minimalist display
  const flattenedSkills = skills.flatMap((category) => category.skills.map((skill:any) => skill.name))


  return (
    <div className="font-sans text-zinc-800 max-w-[800px] mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-normal uppercase tracking-widest mb-1">{personal.fullName}</h1>
        <h2 className="text-base font-light uppercase tracking-wider text-zinc-500 mb-3">{personal.jobTitle}</h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-zinc-600">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.address}</div>
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
        </div>
      </header>

      {/* Render sections based on order */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null

        switch (section.title) {
          case "Personal Infomation":
            return (
              <section key={section.title} className="mb-6">
                <p className="text-sm text-center max-w-2xl mx-auto">{personal.summary}</p>
              </section>
            )
          case "Experience":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">Experience</h3>

                {experiences.map((experience, index) => (
                  <div key={index} className={index < experiences.length - 1 ? "mb-5" : ""}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{experience.position}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current ? "Present" : formatDate(experience.endDate!)}
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
          case "Education":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">Education</h3>

                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{edu.degree}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(edu.startDate)} - {edu.current?"Present":formatDate(edu.endDate!)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">{edu.institution}</h5>
                      {edu.location && <span className="text-xs text-zinc-600">{edu.location}</span>}
                    </div>
                    {edu.description && <p className="text-xs">{edu.description}</p>}
                  </div>
                ))}
              </section>
            )
          case "Skills":
            return (
              <section key={section.title} className="mb-6">
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
          case "Custom Sections":
            return custom.map((section) => (
              <section key={section.id} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">{section.title}</h3>
                <div
                  className="text-xs prose prose-sm max-w-none text-center"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
              </section>
            ))
         
          default:
            return null
        }
      })}
    </div>
  )
}
