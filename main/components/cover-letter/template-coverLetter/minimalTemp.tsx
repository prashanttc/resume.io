import { CoverLetterTemplateProps } from "@/types/resume";

const minimalTemp = ({
  fullName,
  companyName,
  hiringManager,
  jobTitle,
  email,
  phone,
  title,
  content,
  experience,
  preferences,
}: CoverLetterTemplateProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6 font-sans text-[14px] text-gray-800 bg-white space-y-6">
      {/* Header */}
      <header className="space-y-1 border-b pb-4 border-gray-300">
        <h1 className="text-[20px] font-bold">{title}</h1>
        <p>{fullName}</p>
        <p className="text-sm text-gray-600">{jobTitle}</p>
        <div className="flex gap-4 text-sm text-gray-600 pt-1 flex-wrap">
          <span>{email}</span>
          <span>{phone}</span>
        </div>
      </header>

      {/* Salutation */}
      <p>Dear {hiringManager || "Hiring Manager"},</p>

      {/* Main Content */}
      <section className="whitespace-pre-line space-y-4">
        {/* 🔽 Main Content Goes Here */}
        <p>{content}</p>

        {/* Optional Outro */}
        <p>
          With {experience}, and a strong preference for {preferences}, I’m
          confident I’ll bring value to your team. Thank you for considering my
          application.
        </p>
      </section>

      {/* Closing */}
      <section className="space-y-2">
        <p>Sincerely,</p>
        <p>{fullName}</p>
      </section>
    </div>
  );
};

export default minimalTemp;
