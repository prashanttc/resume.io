import { EntryType, TemplateProps } from "@/types/resume";

export function SleekSideAccentTemplate({
  personal,
  education,
  experiences,
  projects,
  skills,
  custom,
  sectionOrder,
}: TemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="font-serif text-gray-900  border-l-8 border-blue-500 p-3" >
      {/* Name & Contact */}
      <header className="">
        <h1 className="text-3xl font-bold">{personal.fullName}</h1>
        {personal.jobTitle && <p className="text-lg text-gray-600 mt-1">{personal.jobTitle}</p>}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && <a href={personal.website} className="text-blue-700 hover:underline">Website</a>}
          {personal.linkedin && <a href={personal.linkedin} className="text-blue-700 hover:underline">LinkedIn</a>}
          {personal.github && <a href={personal.github} className="text-blue-700 hover:underline">GitHub</a>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="pt-8 resume-section">
          <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        switch (section.title) {
          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className="pt-8">
                <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3">Experience</h2>
                <div className="space-y-5">
                  {experiences.map((exp, i) => (
                    <div key={i} className="resume-section">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-bold">{exp.position}</h3>
                          <p className="text-gray-700 text-sm">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate || "")}
                        </span>
                      </div>
                      {exp.description && (
                        <ul className="mt-2 list-disc pl-5 text-gray-700 text-sm space-y-1">
                          {exp.description.split('\n').filter(Boolean).map((line, j) => (
                            <li key={j}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Education":
            return education.length > 0 && (
              <section key={section.title} className="pt-8 resume-section">
                <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-bold">{edu.degree}</h3>
                          <p className="text-gray-700 text-sm">{edu.institution}{edu.location && ` • ${edu.location}`}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate || "")}
                        </span>
                      </div>
                      {edu.description && <p className="mt-1 text-gray-700 text-sm">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Projects":
            return projects.length > 0 && (
              <section key={section.title} className="pt-8 ">
                <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3">Projects</h2>
                <div className="space-y-4">
                  {projects.map((proj, i) => (
                    <div key={i} className="resume-section">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-bold">{proj.title}</h3>
                        {proj.link && (
                          <a href={proj.link} className="text-xs text-blue-700 hover:underline">View</a>
                        )}
                      </div>
                      {proj.role && <p className="text-xs italic text-gray-600">{proj.role}</p>}
                      <span className="text-xs text-gray-500">
                        {formatDate(proj.startDate)} – {proj.current ? "Present" : formatDate(proj.endDate || "")}
                      </span>
                      {proj.description && (
                        <ul className="mt-2 list-disc pl-5 text-gray-700 text-sm space-y-1">
                          {proj.description.split('\n').filter(Boolean).map((line, j) => (
                            <li key={j}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Skills":
            return skills.length > 0 && (
              <section key={section.title} className="pt-8">
                <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3">Skills</h2>
                <div className="space-y-3">
                  {skills.map((category, i) => (
                    <div key={i} className="resume-section">
                      <h3 className="text-sm font-medium text-gray-800">{category.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {category.skills.map((skill, j) => (
                          <span key={j} className="bg-gray-100 px-2 py-0.5 rounded text-xs text-gray-800">
                            {skill.name}{skill.level && ` (${skill.level})`}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Custom Sections":
            return custom.length > 0 && (
              <section key={section.title} className="pt-8">
                {custom.map((customSection) => (
                  customSection.entries.length > 0 && (
                    <div key={customSection.id} className="mb-6">
                      <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3">{customSection.title}</h2>
                      <div className="space-y-4">
                        {customSection.entries.map((entry: EntryType) => (
                          <div key={entry.id} className="resume-section">
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-bold">{entry.title}</h3>
                              {entry.date && (
                                <span className="text-xs text-gray-500">{entry.date}</span>
                              )}
                            </div>
                            {entry.description && (
                              <ul className="mt-2 list-disc pl-5 text-gray-700 text-sm space-y-1">
                                {entry.description.split('\n').filter(Boolean).map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                              </ul>
                            )}
                            {entry.link && (
                              <a href={entry.link} className="text-xs text-blue-700 hover:underline mt-1 inline-block">Learn more</a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}