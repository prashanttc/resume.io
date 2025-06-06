import { EntryType, TemplateProps } from "@/types/resume";

export function BoldTemplate({
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
    <div className="font-sans text-zinc-800  print-wrapper min-h-[1123px]">
      {/* Top Header */}
      <header className="text-center mb-6 sm:mb-8 border-b-2 sm:border-b-4 border-black pb-3 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-normal sm:tracking-wide">
          {personal.fullName}
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mt-0.5 sm:mt-0">
          {personal.jobTitle}
        </p>
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              {personal.email}
            </a>
          )}
          {personal.phone && (
             <a href={`tel:${personal.phone}`} className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
               {personal.phone}
             </a>
          )}
          {personal.address && <span className="text-xs sm:text-sm text-gray-600 flex items-center gap-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 flex-shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            {personal.address}
            </span>}
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
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        const commonSectionClasses = "pt-8";
        const commonTitleClasses = "text-lg sm:text-xl font-bold uppercase border-b border-gray-300 pb-1.5 mb-2 sm:pb-2 sm:mb-3";
        const commonEntryWrapperClasses = "mb-4 last:mb-0"; // reduce bottom margin for the last entry in a section
        const commonEntryTitleClasses = "text-base sm:text-base font-semibold"; // Kept base same, bold enough
        const commonEntryMetaClasses = "text-xs sm:text-sm text-gray-600";
        const commonEntryDescriptionClasses = "text-sm sm:text-sm text-gray-800 leading-relaxed mt-1 whitespace-pre-line";


        switch (section.title) {
          case "Personal Information": // This template uses it for Summary
            return personal.summary ? (
              <section key={section.title} className={`${commonSectionClasses} resume-section`}>
                <h2 className={commonTitleClasses}>Summary</h2>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">{personal.summary}</p>
              </section>
            ) : null;

          case "Experience":
            return experiences.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Experience</h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className={`${commonEntryWrapperClasses} resume-section`}>
                    <div className="flex justify-between items-center">
                      <h3 className={commonEntryTitleClasses}>{exp.company}</h3> {/* Changed to company first for this style */}
                      <span className={`${commonEntryMetaClasses} mt-0.5 sm:mt-0`}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate || "")}
                      </span>
                    </div>
                <div className="flex justify-between items-center mb-3">
                      <p className={`${commonEntryMetaClasses} italic`}>{exp.position}</p> {/* Position below company */}
                    {exp.location && <p className={`${commonEntryMetaClasses} italic mb-1`}>{exp.location}</p>}
                </div>
                    {exp.description && <p className={commonEntryDescriptionClasses}>{exp.description}</p>}
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
                    <div className="flex  items-center justify-between">
                      <h3 className={commonEntryTitleClasses}>{proj.title}</h3>
                      <span className={`${commonEntryMetaClasses} mt-0.5 sm:mt-0`}>
                        {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate || "")}
                      </span>
                    </div>
                <div className="flex items-center justify-between">
                      {proj.role && <p className={`${commonEntryMetaClasses} italic mb-1`}>{proj.role}</p>}
                      {proj.link && (
                        <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-xs sm:text-sm mt-1 inline-block"
                        >
                        View Project
                        </a>
                    )}
                </div>
                    {proj.description && <p className={commonEntryDescriptionClasses}>{proj.description}</p>}
                   
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h3 className={commonEntryTitleClasses}>{edu.degree}</h3>
                      <span className={`${commonEntryMetaClasses} mt-0.5 sm:mt-0`}>
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate!)}
                      </span>
                    </div>
                    <p className={`${commonEntryMetaClasses} italic`}>{edu.institution}</p>
                    {edu.location && <p className={`${commonEntryMetaClasses} italic mb-1`}>{edu.location}</p>}
                    {edu.description && <p className={commonEntryDescriptionClasses}>{edu.description}</p>}
                  </div>
                ))}
              </section>
            );

          case "Skills":
            return skills.length > 0 && (
              <section key={section.title} className={commonSectionClasses}>
                <h2 className={commonTitleClasses}>Skills</h2>
                <div className="flex flex-wrap gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3"> {/* Main container for all skill categories */}
                  {skills.map((category, catIdx) => (
                    // Each category can be its own block, or skills can flow continuously
                    // This approach makes each category distinct with its title
                    <div key={catIdx} className="w-full sm:w-auto resume-section"> {/* Full width on mobile for category title, auto on larger */}
                      <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-1.5">{category.name}</h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {category.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="bg-gray-200 px-2 py-1 rounded text-[10px] sm:text-xs hover:bg-gray-300 transition-colors"
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <h3 className={commonEntryTitleClasses}>{entry.title}</h3>
                          {entry.date && <span className={`${commonEntryMetaClasses} mt-0.5 sm:mt-0`}>{entry.date}</span>}
                        </div>
                        {entry.description && <p className={commonEntryDescriptionClasses}>{entry.description}</p>}
                        {entry.link && (
                          <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs sm:text-sm mt-1 inline-block"
                          >
                            View More
                          </a>
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