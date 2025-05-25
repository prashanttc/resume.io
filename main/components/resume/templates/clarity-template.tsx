import { EntryType, TemplateProps } from "@/types/resume";

export function SidebarTemplate({
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
    <div className="  bg-white print-wrapper border border-gray-300 flex text-gray-900 font-sans shadow-md">
      {/* Left Sidebar */}
      <aside className="w-[250px] bg-gray-100 p-6 flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-extrabold text-center">{personal.fullName}</h1>
        <p className="text-sm font-medium text-gray-600 text-center">{personal.jobTitle}</p>

        <div className="border-t border-gray-300 w-full pt-4">
          {personal.email && <p className="text-xs break-words">{personal.email}</p>}
          {personal.phone && <p className="text-xs">{personal.phone}</p>}
          {personal.website && (
            <p className="text-xs break-words">
              <a href={personal.website} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                Website
              </a>
            </p>
          )}
          {personal.linkedin && (
            <p className="text-xs break-words">
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-blue-600">
                LinkedIn
              </a>
            </p>
          )}
          {personal.address && <p className="text-xs mt-2">{personal.address}</p>}
        </div>

        {personal.summary && (
          <section className="mt-6 text-sm text-gray-700">
            <h2 className="font-semibold mb-1 border-b border-gray-300 pb-1 uppercase">Summary</h2>
            <p>{personal.summary}</p>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mt-auto w-full">
            <h2 className="font-semibold mb-2 uppercase border-b border-gray-300 pb-1 text-sm">Skills</h2>
            {skills.map((cat, idx) => (
              <div key={idx} className="mb-3">
                <h3 className="font-semibold text-xs">{cat.name}</h3>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                  {cat.skills.map((skill, sidx) => (
                    <li key={sidx}>
                      {skill.name} <span className="text-gray-500 text-[10px]">({skill.level})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {sectionOrder.map((section) => {
          if (!section.isActive) return null;

          switch (section.title) {
            case "Experience":
              return (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">{section.title}</h2>
                  {experiences.map((exp, idx) => (
                    <div key={idx} className="mb-6">
                      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                        <span>{exp.company}</span>
                        <span>
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate || "")}
                        </span>
                      </div>
                      <p className="italic text-xs text-gray-600 mb-1">{exp.location}</p>
                      <p className="text-sm">{exp.description}</p>
                    </div>
                  ))}
                </section>
              );

            case "Projects":
              return (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">{section.title}</h2>
                  {projects.map((proj, idx) => (
                    <div key={idx} className="mb-6">
                      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                        <span>{proj.title}</span>
                        <span>
                          {formatDate(proj.startDate)} - {proj.current ? "Present" : formatDate(proj.endDate || "")}
                        </span>
                      </div>
                      <p className="italic text-xs text-gray-600 mb-1">{proj.role}</p>
                      <p className="text-sm">{proj.description}</p>
                    </div>
                  ))}
                </section>
              );

            case "Education":
              return (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">{section.title}</h2>
                  {education.map((edu, idx) => (
                    <div key={idx} className="mb-6">
                      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                        <span>{edu.degree}</span>
                        <span>
                          {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate || "")}
                        </span>
                      </div>
                      <p className="italic text-xs text-gray-600 mb-1">{edu.institution}</p>
                      {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
                      {edu.description && <p className="text-sm">{edu.description}</p>}
                    </div>
                  ))}
                </section>
              );

            case "Custom Sections":
              return custom.length > 0 ? (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4">{section.title}</h2>
                  {custom.map((customSection) => (
                    <div key={customSection.id} className="mb-6">
                      <h3 className="font-semibold text-xl mb-2">{customSection.title}</h3>
                      {customSection.entries.map((entry: EntryType) => (
                        <div key={entry.id} className="mb-3">
                          <div className="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                            <span>{entry.title}</span>
                            {entry.date && <span>{entry.date}</span>}
                          </div>
                          <p className="text-sm mb-1">{entry.description}</p>
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
                    </div>
                  ))}
                </section>
              ) : null;

            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}
