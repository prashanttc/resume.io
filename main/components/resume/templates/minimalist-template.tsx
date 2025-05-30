import { formatDate } from "@/lib/utils";
import { TemplateProps } from "@/types/resume";
export function MinimalistTemplate({
  personal,
  education,
  experiences,
  skills,
  custom,
  projects,
  sectionOrder,
}: TemplateProps) {
  // Flatten skills for minimalist display
  const flattenedSkills = skills.flatMap((category) =>
    category.skills.map((skill: any) => skill.name)
  );

  return (
    <div className="font-sans text-zinc-800 max-w-[800px] print-wrapper min-h-[1123px] ">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-normal uppercase tracking-widest mb-1">
          {personal.fullName}
        </h1>
        <h2 className="text-base font-light uppercase tracking-wider text-zinc-500 mb-3">
          {personal.jobTitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-zinc-600">
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.address}</div>
               {personal.website && (
            <p className="text-xs break-words flex gap-2">

              <a href={personal.website} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                Website
              </a>
            </p>
          )}
          {personal.linkedin && (
            <p className="text-xs break-words flex gap-2">
          
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                LinkedIn
              </a>
            </p>
          )}
          {personal.github && (
            <p className="text-xs break-words">
              <a href={personal.github} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                Github
              </a>
            </p>
          )}
        </div>
      </header>

      {/* Render sections based on order */}
      {sectionOrder.map((section) => {
        if (!section.isActive) return null;

        switch (section.title) {
          case "Personal Information":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Summary
                </h3>

                <h1 className="text-xs font-normal tracking-wide text-center mb-1">
                  {personal.summary}
                </h1>
              </section>
            );
          case "Experience":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Experience
                </h3>

                {experiences.map((experience, index) => (
                  <div
                    key={index}
                    className={index < experiences.length - 1 ? "mb-5" : ""}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">
                        {experience.position}
                      </h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate!)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">
                        {experience.company}
                      </h5>
                      {experience.location && (
                        <span className="text-xs text-zinc-600">
                          {experience.location}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-sm text-gray-800 leading-relaxed mt-1 whitespace-pre-line">{experience.description}</p>
                  </div>
                ))}
              </section>
            );
          case "Projects":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Projects
                </h3>

                {projects.map((project, index) => (
                  <div
                    key={index}
                    className={index < projects.length - 1 ? "mb-5" : ""}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{project.title}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(project.startDate)} -{" "}
                        {project.current
                          ? "Present"
                          : formatDate(project.endDate!)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">
                        {project.role}
                      </h5>
                    </div>
                    <p className="text-sm sm:text-sm text-gray-800 leading-relaxed mt-1 whitespace-pre-line">{project.description}</p>
                  </div>
                ))}
              </section>
            );
          case "Education":
            return (
              <section key={section.title} className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Education
                </h3>

                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-medium">{edu.degree}</h4>
                      <span className="text-xs text-zinc-600">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.endDate!)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-xs font-medium text-zinc-600">
                        {edu.institution}
                      </h5>
                      {edu.location && (
                        <span className="text-xs text-zinc-600">
                          {edu.location}
                        </span>
                      )}
                    </div>
                    {edu.description && (
                      <p className="text-xs">{edu.description}</p>
                    )}
                  </div>
                ))}
              </section>
            );
          case "Skills":
            return (
              <section key="skills" className="mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                  Skills
                </h3>

                {skills.map((category, idx) => (
                  <div key={idx} className="mb-3">
                    <h4 className="text-xs font-semibold text-zinc-600 text-center mb-2">
                      {category.name}
                    </h4>

                    <ul className="flex flex-wrap justify-center gap-2 text-xs list-none p-0 m-0">
                      {category.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="px-3 py-1 border border-zinc-300 rounded-sm"
                        >
                          {skill.name} - {skill.level}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            );

          case "Custom Sections":
            return (
              <section key="Extra Activities" className="mb-6">
                {custom.map((activity, idx) => (
                  <div key={idx} className="mb-2 text-xs text-center">
                    <h3 className="text-sm font-normal uppercase tracking-wider text-center mb-4">
                      {activity.title}{" "}
                    </h3>

                    {activity.entries.map((entry, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-sm font-medium">{entry.title}</h4>
                          <span className="text-xs text-zinc-600">
                            {entry.date && formatDate(entry.date)}
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h5 className="text-xs font-regular text-zinc-600">
                            {entry.description}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
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
