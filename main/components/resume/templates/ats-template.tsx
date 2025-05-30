import { EntryType, TemplateProps } from "@/types/resume";

export function ATSFriendlyTemplate({
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
    <div className="font-sans text-gray-800 max-w-[800px] print-wrapper min-h-[1123px] mx-auto px-4 py-6">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{personal.fullName}</h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span className="hidden sm:block">•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span className="hidden sm:block">•</span>}
          {personal.address && <span>{personal.address}</span>}
        </div>
        {personal.jobTitle && (
          <p className="text-sm text-gray-700 mt-2">{personal.jobTitle}</p>
        )}
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        const commonSectionClasses = "mb-6";
        const commonTitleClasses = "text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3 text-gray-900";
        const commonEntryWrapperClasses = "mb-4 last:mb-0";
        const commonEntryTitleClasses = "text-base font-semibold text-gray-900";
        const commonEntryMetaClasses = "text-sm text-gray-600";
        const commonEntryDescriptionClasses = "text-sm text-gray-800 mt-1 whitespace-pre-line";

        switch (section.title) {
          case "Personal Information":
            return personal.summary ? (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Professional Summary</h2>
                <p className={commonEntryDescriptionClasses}>{personal.summary}</p>
              </section>
            ) : null;

          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Professional Experience</h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className={commonEntryWrapperClasses}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={commonEntryTitleClasses}>{exp.position}</h3>
                        <p className={`${commonEntryMetaClasses} font-medium`}>
                          {exp.company} {exp.location && `| ${exp.location}`}
                        </p>
                      </div>
                      <span className={`${commonEntryMetaClasses} whitespace-nowrap`}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate || "")}
                      </span>
                    </div>
                    {exp.description && (
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                          <li key={i} className={commonEntryDescriptionClasses}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            );

          case "Projects":
            return projects.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Projects</h2>
                {projects.map((proj, idx) => (
                  <div key={idx} className={commonEntryWrapperClasses}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={commonEntryTitleClasses}>{proj.title}</h3>
                        {proj.role && <p className={commonEntryMetaClasses}>{proj.role}</p>}
                      </div>
                      <span className={`${commonEntryMetaClasses} whitespace-nowrap`}>
                        {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate || "")}
                      </span>
                    </div>
                    {proj.description && (
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {proj.description.split('\n').filter(line => line.trim()).map((line, i) => (
                          <li key={i} className={commonEntryDescriptionClasses}>{line}</li>
                        ))}
                      </ul>
                    )}
                    {proj.link && (
                      <p className="text-xs mt-1">
                        <span className="font-medium">Project Link:</span>{" "}
                        <a href={proj.link} className="text-blue-600 hover:underline">
                          {proj.link}
                        </a>
                      </p>
                    )}
                  </div>
                ))}
              </section>
            );

          case "Education":
            return education.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Education</h2>
                {education.map((edu, idx) => (
                  <div key={idx} className={commonEntryWrapperClasses}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={commonEntryTitleClasses}>{edu.degree}</h3>
                        <p className={commonEntryMetaClasses}>
                          {edu.institution} {edu.location && `| ${edu.location}`}
                        </p>
                      </div>
                      <span className={`${commonEntryMetaClasses} whitespace-nowrap`}>
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate!)}
                      </span>
                    </div>
                    {edu.description && (
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {edu.description.split('\n').filter(line => line.trim()).map((line, i) => (
                          <li key={i} className={commonEntryDescriptionClasses}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            );

          case "Skills":
            return skills.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{category.name}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {category.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
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
            return custom.length > 0 ? (
              <div key={section.title}>
                {custom.map((customSection) => (
                  customSection.entries.length > 0 && (
                    <section key={customSection.id} className={commonSectionClasses}>
                      <h2 className={commonTitleClasses}>{customSection.title}</h2>
                      {customSection.entries.map((entry: EntryType) => (
                        <div key={entry.id} className={commonEntryWrapperClasses}>
                          <div className="flex justify-between items-start">
                            <h3 className={commonEntryTitleClasses}>{entry.title}</h3>
                            {entry.date && <span className={commonEntryMetaClasses}>{entry.date}</span>}
                          </div>
                          {entry.description && (
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              {entry.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                <li key={i} className={commonEntryDescriptionClasses}>{line}</li>
                              ))}
                            </ul>
                          )}
                          {entry.link && (
                            <p className="text-xs mt-1">
                              <span className="font-medium">Link:</span>{" "}
                              <a href={entry.link} className="text-blue-600 hover:underline">
                                {entry.link}
                              </a>
                            </p>
                          )}
                        </div>
                      ))}
                    </section>
                  )
                ))}
              </div>
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
}