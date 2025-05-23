import { EntryType, TemplateProps } from "@/types/resume";

export function ModernTemplate({
  personal,
  education,
  experiences,
  projects,
  skills,
  custom,
  sectionOrder,
}: TemplateProps) {
  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };
  return (
    <div className="font-sans text-zinc-800 max-w-[800px] mx-auto print-wrapper min-h-[1123px]">
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
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        switch (section.title) {
          case "Personal Information":
            return (
              <section key={section.title} className="mb-6 resume-section">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                  Summary
                </h3>
                <p className="text-sm">{personal.summary}</p>
              </section>
            );
          case "Experience":
            return (
              <section key={section.title} className="mb-6  resume-section">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                  Experience
                </h3>

                {experiences.map((experience, index) => (
                  <div
                    key={index}
                    className={index < experiences.length - 1 ? "mb-4" : ""}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-medium">
                        {experience.company}
                      </h4>
                      <span className="text-sm text-zinc-600">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate || "")}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-sm font-medium text-zinc-600">
                        {experience.company}
                      </h5>
                      {experience.location && (
                        <span className="text-sm text-zinc-600">
                          {experience.location}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1">{experience.description}</p>
                  </div>
                ))}
              </section>
            );
          case "Projects":
            return (
              <section key={section.title} className="mb-6  resume-section">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                  Projects
                </h3>

                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={index < projects.length - 1 ? "mb-4" : ""}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-base font-medium">{project.title}</h4>
                      <span className="text-sm text-zinc-600">
                        {formatDate(project.startDate)} -{" "}
                        {project.current
                          ? "Present"
                          : formatDate(project.endDate || "")}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-sm font-medium text-zinc-600">
                        {project.role}
                      </h5>
                    </div>
                    <p className="text-sm mt-1">{project.description}</p>
                  </div>
                ))}
              </section>
            );
          case "Education":
            return (
              <section key={section.title} className="mb-6  resume-section">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                  Education
                </h3>

                {education.map((edu, index) => (
                  <div key={index} className=" mb-5">
                    <div className="flex justify-between items-baseline ">
                      <h4 className="text-base font-medium">{edu.degree}</h4>
                      <span className="text-sm text-zinc-600">
                        {formatDate(edu.startDate)} -
                        {edu.current ? "present" : formatDate(edu.endDate!)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-sm font-medium text-zinc-600">
                        {edu.institution}
                      </h5>
                      {edu.location && (
                        <span className="text-sm text-zinc-600">
                          {edu.location}
                        </span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </section>
            );
          case "Skills":
            return (
              <section key={section.title} className="mb-6  resume-section">
                <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                  Skills
                </h3>

                {skills.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className={categoryIndex < skills.length - 1 ? "mb-2" : ""}
                  >
                    <h4 className="text-sm font-medium mb-1">
                      {category.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill: any, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="text-xs bg-zinc-100 px-2 py-1 rounded"
                        >
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            );
          case "Custom Sections":
            return custom.length > 0 ? (
              <div key={section.title}>
                {custom.map((customSection) => (
                  <section key={customSection.id} className="mb-6  resume-section">
                    <h3 className="text-lg font-semibold border-b border-zinc-300 pb-1 mb-3">
                      {customSection.title}
                    </h3>
                    <div className="space-y-4">
                      {customSection.entries.map((entry: EntryType) => (
                        <div key={entry.id} className="mb-3">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="text-base font-medium">
                              {entry.title}
                            </h4>
                            {entry.date && (
                              <span className="text-sm text-zinc-600">
                                {entry.date}
                              </span>
                            )}
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
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
}
