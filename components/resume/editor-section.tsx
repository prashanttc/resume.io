"use client"

import { useState, useEffect } from "react"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { EducationForm } from "@/components/resume/education-form"
import { SkillsForm } from "@/components/resume/skills-form"
import type { ResumeData, SectionType } from "@/components/resume/resume-editor"

interface EditorSectionsProps {
  activeSection: SectionType
  resumeData: ResumeData
  data:ResumeData
  onSectionComplete: (section: SectionType, data: any) => void
}

export function EditorSections({ activeSection, resumeData, onSectionComplete ,data}: EditorSectionsProps) {
  const data_personal = data.personalInfo;
  const [personalData, setPersonalData] = useState(resumeData.personalInfo ||{})
  const [experienceData, setExperienceData] = useState(resumeData.experiences || [])
  const [educationData, setEducationData] = useState(resumeData.education || [])
  const [skillsData, setSkillsData] = useState(resumeData.skills || [])

  // Update local state when resumeData changes
  useEffect(() => {
    setPersonalData(resumeData.personalInfo || data_personal||{})
    setExperienceData(resumeData.experiences || [])
    setEducationData(resumeData.education || [])
    setSkillsData(resumeData.skills || [])
  }, [resumeData])

  // Handle personal info submission
  const handlePersonalSubmit = (data: any) => {
    setPersonalData(data)
    onSectionComplete("personal", data)
  }

  // Handle experience submission
  const handleExperienceSubmit = (data: any[]) => {
    setExperienceData(data)
    onSectionComplete("experience", data)
  }

  // Handle education submission
  const handleEducationSubmit = (data: any[]) => {
    setEducationData(data)
    onSectionComplete("education", data)
  }

  // Handle skills submission
  const handleSkillsSubmit = (data: any[]) => {
    setSkillsData(data)
    onSectionComplete("skills", data)
  }

  return (
    <div className="animate-in">
      {activeSection === "personal" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <PersonalInfoForm defaultValues={personalData} onSubmit={handlePersonalSubmit} />
        </div>
      )}

      {activeSection === "experience" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Work Experience</h3>
          <ExperienceForm defaultValues={experienceData} onSubmit={handleExperienceSubmit} />
        </div>
      )}

      {activeSection === "education" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Education</h3>
          <EducationForm defaultValues={educationData} onSubmit={handleEducationSubmit} />
        </div>
      )}

      {activeSection === "skills" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Skills</h3>
          <SkillsForm
            defaultValues={
              Array.isArray(skillsData)
                ? skillsData.reduce((acc: any[], skill: any) => {
                    const category = acc.find((cat) => cat.name === skill.category)
                    if (category) {
                      category.skills.push({ name: skill.name, level: skill.level })
                    } else {
                      acc.push({
                        name: skill.category,
                        skills: [{ name: skill.name, level: skill.level }]
                      })
                    }
                    return acc
                  }, [])
                : []
            }
            onSubmit={handleSkillsSubmit}
          />
        </div>
      )}
    </div>
  )
}
