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
    <div className="font-sans text-gray-800  ">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{personal.fullName}</h1>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}

               {personal.website && (
              <p className="text-xs break-words flex gap-2">
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
                <a href={personal.website} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                  Website
                </a>
              </p>
            )}
            {personal.linkedin && (
              <p className="text-xs break-words flex gap-2">
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
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                  LinkedIn
                </a>
              </p>
            )}
            {personal.github && (
              <p className="text-xs break-words flex gap-2">
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
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                <a href={personal.github} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                  Github
                </a>
              </p>
            )}
        </div>
        {personal.jobTitle && (
          <p className="text-sm text-gray-700 mt-2">{personal.jobTitle}</p>
        )}
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        const commonSectionClasses = "mt-6";
        const commonTitleClasses = "text-lg font-bold uppercase border-b border-gray-300 pb-1 mb-3 text-gray-900";
        const commonEntryWrapperClasses = "mb-4 last:mb-0";
        const commonEntryTitleClasses = "text-base font-semibold text-gray-900";
        const commonEntryMetaClasses = "text-sm text-gray-600";
        const commonEntryDescriptionClasses = "text-sm text-gray-800 mt-1 whitespace-pre-line";

        switch (section.title) {
          case "Personal Information":
            return personal.summary ? (
              <section key={section.title} className={`${commonSectionClasses} resume-section`}>
                <h2 className={commonTitleClasses}>Professional Summary</h2>
                <p className={commonEntryDescriptionClasses}>{personal.summary}</p>
              </section>
            ) : null;

          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Professional Experience</h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className={`${commonEntryWrapperClasses} resume-section`}>
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
                  <div key={idx} className={`${commonEntryWrapperClasses} resume-section`}>
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
              <section key={section.title} className={`${commonSectionClasses} resume-section`}>
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
              <section key={section.title} className={`${commonSectionClasses} resume-section`}>
                <h2 className={commonTitleClasses}>Skills</h2>
                <div className="grid grid-cols-2 gap-4">
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
                        <div key={entry.id} className={`${commonEntryWrapperClasses} resume-section`}>
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