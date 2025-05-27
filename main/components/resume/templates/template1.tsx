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
    <div className="font-sans text-zinc-800 max-w-[800px] print-wrapper min-h-[1123px] ">
      {/* Top Header */}
      <header className="text-center mb-8 border-b-4 border-black pb-4">
        <h1 className="text-4xl font-bold tracking-wide">{personal.fullName}</h1>
        <p className="text-lg text-gray-700">{personal.jobTitle}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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
            <p className="text-xs break-words">
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

        switch (section.title) {
          case "Personal Information":
            return personal.summary ? (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                  Summary
                </h2>
                <p className="text-sm text-gray-800 leading-relaxed">{personal.summary}</p>
              </section>
            ) : null;

          case "Experience":
            return (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                  Experience
                </h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="mb-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold">{exp.company}</h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate || "")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 italic mb-1">{exp.location}</p>
                    <p className="text-sm text-gray-800">{exp.description}</p>
                  </div>
                ))}
              </section>
            );

          case "Projects":
            return (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                  Projects
                </h2>
                {projects.map((proj, idx) => (
                  <div key={idx} className="mb-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold">{proj.title}</h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(proj.startDate)} -{" "}
                        {proj.current ? "Present" : formatDate(proj.endDate || "")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 italic mb-1">{proj.role}</p>
                    <p className="text-sm text-gray-800">{proj.description}</p>
                  </div>
                ))}
              </section>
            );

          case "Education":
            return (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                  Education
                </h2>
                {education.map((edu, idx) => (
                  <div key={idx} className="mb-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.endDate!)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 italic mb-1">{edu.institution}</p>
                    {edu.location && (
                      <p className="text-sm text-gray-600">{edu.location}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm text-gray-800">{edu.description}</p>
                    )}
                  </div>
                ))}
              </section>
            );

          case "Skills":
            return (
              <section key={section.title} className="mb-8">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {skills.map((category, catIdx) => (
                    <div key={catIdx}>
                      <h4 className="text-sm font-semibold">{category.name}</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {category.skills.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="bg-gray-200 px-2 py-1 rounded text-xs"
                          >
                            {skill.name} ({skill.level})
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
                  <section key={customSection.id} className="mb-8">
                    <h2 className="text-xl font-bold uppercase border-b border-gray-300 pb-2 mb-3">
                      {customSection.title}
                    </h2>
                    {customSection.entries.map((entry: EntryType) => (
                      <div key={entry.id} className="mb-3">
                        <div className="flex justify-between items-center">
                          <h3 className="text-base font-semibold">{entry.title}</h3>
                          {entry.date && (
                            <span className="text-sm text-gray-600">{entry.date}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800">{entry.description}</p>
                        {entry.link && (
                          <a
                            href={entry.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View more
                          </a>
                        )}
                      </div>
                    ))}
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
