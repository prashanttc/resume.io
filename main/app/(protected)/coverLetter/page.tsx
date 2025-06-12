"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";

import JobDetailsForm from "@/components/cover-letter/forms/job-detail";
import PreferencesForm from "@/components/cover-letter/forms/prefrence";
import TemplateSelectionForm from "@/components/cover-letter/forms/template-section";
import PersonalInfoCoverLetterForm from "@/components/cover-letter/forms/personal-info";
import StepIndicator from "@/components/cover-letter/forms/step-indicator";
import { CoverLetterProps } from "@/types/resume";
import { useGetaiCoverLetter } from "@/query/resume/query";
import { toast } from "sonner";
import Clpreview from "@/components/cover-letter/cl-preview";

export default function CoverLetterBuilder() {
  const { mutateAsync, isPending } = useGetaiCoverLetter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<CoverLetterProps>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    hiringManager: "",
    preferences: "",
    experience: "",
    template: "minimal",
    content:"",
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePersonalSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    }));
    handleNext();
  };

  const handleJobDetailSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      hiringManager: data.hiringManager,
    }));
    handleNext();
  };

  const handlePreferenceSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      experience: data.experience,
      preferences: data.preferences,
    }));
    handleNext();
  };

  const handleTemplateSubmit = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      template: data.template,
    }));
    handleNext();
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    try {
      await mutateAsync({ input: formData }); 
      toast.success("cover letter generated succesfully");
      setShowPreview(true);
    } catch (error) {
      toast.error("failed to generate cover letter");
      console.error("Error generating cover letter:", error);
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return !!formData.fullName && !!formData.email && !!formData.phone;
      case 2:
        return !!formData.companyName && !!formData.jobTitle;
      case 3:
        return !!formData.preferences && !!formData.experience;
      case 4:
        return !!formData.template;
      default:
        return false;
    }
  };

  const canProceed = isStepComplete(currentStep);
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 py-8">
        <div className=" mx-auto px-4 flex flex-col gap-20  ">
          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Form Card */}
       <div className="flex items-start  w-full justify-between gap-20">
           <Card className="flex-1">
            <div className="p-6 relative">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <PersonalInfoCoverLetterForm
                  defaultValues={{
                    fullName: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                  }}
                  onSubmit={handlePersonalSubmit}
                />
              )}

              {/* Step 2: Job Details */}
              {currentStep === 2 && (
                <JobDetailsForm
                  defaultValues={{
                    companyName: formData.companyName,
                    jobTitle: formData.jobTitle,
                    hiringManager: formData.hiringManager,
                  }}
                  onSubmit={handleJobDetailSubmit}
                />
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <PreferencesForm
                  defaultValues={{
                    experience: formData.experience,
                    preferences: formData.preferences,
                  }}
                  onSubmit={handlePreferenceSubmit}
                />
              )}

              {/* Step 4: Template Selection */}
              {currentStep === 4 && (
                <TemplateSelectionForm
                  defaultValues={{
                    template: formData.template,
                  }}
                  onSubmit={handleTemplateSubmit}
                />
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between ">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-gray-300 text-black bg-white flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {currentStep >= totalSteps && (
                  <Button
                    onClick={handleGenerate}
                    disabled={isPending || !canProceed}
                    className="bg-black hover:bg-gray-800 text-white flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Cover Letter
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
         <Clpreview coverLetterData={formData} />
       </div>
        </div>
      </main>
    </div>
  );
}
