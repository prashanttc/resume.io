import { EntryType, TemplateProps } from "@/types/resume";

export function ModernBlockTemplate({
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
    <div className="font-sans text-gray-800 " >
      {/* Header with accent bar */}
      <header className="mb-6 border-l-4 border-blue-600 pl-4">
        <h1 className="text-2xl font-bold text-gray-900">{personal.fullName}</h1>
        {personal.jobTitle && (
          <p className="text-base text-gray-600 mt-1">{personal.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              Website
            </a>
          )}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a href={personal.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary Section */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 pb-1 border-b border-gray-200">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-snug">{personal.summary}</p>
        </section>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        switch (section.title) {
          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Work Experience</h2>
                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="pl-3 border-l-2 border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-700 text-sm">
                            {exp.company} {exp.location && `• ${exp.location}`}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate || "")}
                        </span>
                      </div>
                      {exp.description && (
                        <ul className="mt-2 space-y-1 text-gray-700 text-sm">
                          {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                            <li key={i} className="flex">
                              <span className="mr-2 text-blue-600">•</span>
                              {line}
                            </li>
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
              <section key={section.title} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Education</h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx} className="pl-3 border-l-2 border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700 text-sm">
                            {edu.institution} {edu.location && `• ${edu.location}`}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate!)}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="mt-1 text-gray-700 text-sm">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Projects":
            return projects.length > 0 && (
              <section key={section.title} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Projects</h2>
                <div className="grid grid-cols-1 gap-3">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="pl-3 border-l-2 border-gray-200">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-semibold text-gray-900">{proj.title}</h3>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs">
                            View
                          </a>
                        )}
                      </div>
                      {proj.role && <p className="text-gray-700 text-xs mt-1">{proj.role}</p>}
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate || "")}
                        </span>
                      </div>
                      {proj.description && (
                        <ul className="mt-1 space-y-1 text-gray-700 text-sm">
                          {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                            <li key={i} className="flex">
                              <span className="mr-2 text-blue-600">•</span>
                              {line}
                            </li>
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
              <section key={section.title} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">Skills</h2>
                <div className="space-y-3">
                  {skills.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h3 className="text-sm font-medium text-gray-800 mb-1">{category.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {category.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                          >
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
              <div key={section.title}>
                {custom.map((customSection) => (
                  customSection.entries.length > 0 && (
                    <section key={customSection.id} className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 border-b border-gray-200">{customSection.title}</h2>
                      <div className="space-y-3">
                        {customSection.entries.map((entry: EntryType) => (
                          <div key={entry.id} className="pl-3 border-l-2 border-gray-200">
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-semibold text-gray-900">{entry.title}</h3>
                              {entry.date && <span className="text-xs text-gray-500">{entry.date}</span>}
                            </div>
                            {entry.description && (
                              <ul className="mt-1 space-y-1 text-gray-700 text-sm">
                                {entry.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                  <li key={i} className="flex">
                                    <span className="mr-2 text-blue-600">•</span>
                                    {line}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {entry.link && (
                              <a href={entry.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs mt-1 inline-block">
                                Learn more
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}