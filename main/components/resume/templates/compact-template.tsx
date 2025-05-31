import { EntryType, TemplateProps } from "@/types/resume";

export function CompactModernTemplate({
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
    <div className="font-sans text-[12px] text-gray-800 max-w-[800px] mx-auto p-4 bg-white">
      {/* Header */}
      <header className="mb-5 border-b border-gray-300 pb-2">
        <h1 className="text-[22px] font-bold text-gray-900">{personal.fullName}</h1>
        {personal.jobTitle && (
          <p className="text-[13px] text-gray-600">{personal.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-gray-600">
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

      {/* Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="text-[14px] font-semibold mb-1 text-gray-800">Summary</h2>
          <p className="leading-snug text-gray-700">{personal.summary}</p>
        </section>
      )}

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        switch (section.title) {
          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className="mb-5 page-break">
                <h2 className="text-[14px] font-semibold mb-1 text-gray-800">Experience</h2>
                <div className="space-y-3">
                  {experiences.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[13px]">{exp.position}</p>
                          <p className="text-gray-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                        </div>
                        <span className="text-gray-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate || "")}
                        </span>
                      </div>
                      {exp.description && (
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i}>{line}</li>
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
              <section key={section.title} className="mb-5 page-break">
                <h2 className="text-[14px] font-semibold mb-1 text-gray-800">Education</h2>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[13px]">{edu.degree}</p>
                          <p className="text-gray-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                        </div>
                        <span className="text-gray-500 whitespace-nowrap">
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate!)}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-gray-700 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );

          case "Projects":
            return projects.length > 0 && (
              <section key={section.title} className="mb-5 page-break">
                <h2 className="text-[14px] font-semibold mb-1 text-gray-800">Projects</h2>
                <div className="space-y-3">
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-[13px]">{proj.title}</p>
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className="text-blue-600 text-[11px] hover:underline">
                            View
                          </a>
                        )}
                      </div>
                      {proj.role && <p className="text-gray-600">{proj.role}</p>}
                      <span className="text-gray-500 text-[11px] block">
                        {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate || "")}
                      </span>
                      {proj.description && (
                        <ul className="mt-1 list-disc list-inside text-gray-700">
                          {proj.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i}>{line}</li>
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
              <section key={section.title} className="mb-5 page-break">
                <h2 className="text-[14px] font-semibold mb-1 text-gray-800">Skills</h2>
                <div className="space-y-2">
                  {skills.map((category, idx) => (
                    <div key={idx}>
                      <p className="font-medium text-[12px]">{category.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {category.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 px-2 py-[1px] rounded-full text-[11px]"
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
                    <section key={customSection.id} className="mb-5 page-break">
                      <h2 className="text-[14px] font-semibold mb-1 text-gray-800">{customSection.title}</h2>
                      <div className="space-y-3">
                        {customSection.entries.map((entry: EntryType) => (
                          <div key={entry.id}>
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-[13px]">{entry.title}</p>
                              {entry.date && <span className="text-gray-500 text-[11px]">{entry.date}</span>}
                            </div>
                            {entry.description && (
                              <ul className="mt-1 list-disc list-inside text-gray-700">
                                {entry.description.split('\n').filter(Boolean).map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                              </ul>
                            )}
                            {entry.link && (
                              <a href={entry.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-[11px] mt-1 inline-block">
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
