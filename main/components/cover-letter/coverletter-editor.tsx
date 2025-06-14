import { useGetaiCoverLetter, useSaveCoverLetter } from "@/query/resume/query";
import { CoverLetterProps } from "@/types/resume";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader,
  LoaderCircle,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import Clpreview from "./cl-preview";
import PreferencesForm from "./forms/prefrence";
import StepIndicator from "./forms/step-indicator";
import TemplateSelectionForm from "./forms/template-section";
import { Button } from "../ui/button";
import PersonalInfoCoverLetterForm from "./forms/personal-info";
import JobDetailsForm from "./forms/job-detail";
import { downloadCoverLetter } from "@/lib/utils";

type ClEditorProps = {
  data: CoverLetterProps;
  coverLetterId: string;
  refetchData: () => void; // 👈 add this
};
const ClEditor = ({ data, coverLetterId, refetchData }: ClEditorProps) => {
  const { mutateAsync, isPending, error } = useGetaiCoverLetter();
  const { mutate, isPending: isSaving } = useSaveCoverLetter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const totalSteps = 4;
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<CoverLetterProps>({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    companyName: data.companyName,
    jobTitle: data.jobTitle,
    hiringManager: data.hiringManager || "",
    preferences: data.preferences || "friendly",
    experience: data.experience,
    template: data.template,
    content: data.content,
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
      const aicontent = await mutateAsync({ input: formData, coverLetterId });
      toast.success("Cover letter generated successfully");
      setShowPreview(true);
      setFormData((prev) => ({
        ...prev,
        content: aicontent,
      }));
    } catch (error) {
      toast.error("Failed to generate cover letter");
      console.error("Error generating cover letter:", error);
    }
  };
  const handleExport = async () => {
    await downloadCoverLetter({
      coverLetterId,
      title: data.title!,
      onStart: () => setIsDownloading(true),
      onSuccess: () => setIsDownloading(false),
      onError: () => {
        setIsDownloading(false);
        toast.error("Download failed. Try again.");
      },
    });
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

  const handlecoverletterSave = () => {
    mutate(
      { coverLetter: formData, coverLetterId },
      {
        onSuccess: () => {
          toast.success("cover letter saved succesdfully");
        },
        onError: () => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
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
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-medium">Preview</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover-lift"
                  onClick={handleExport}
                >
                  {isDownloading ? (
                    <div className="flex gap-3 items-center">
                      <Loader className="animate-spin h-8 w-8" />
                      dowloading
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Download />
                      <h1>Downlaod</h1>
                    </div>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="hover-lift"
                  onClick={handlecoverletterSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <div className="flex gap-2 justify-center items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Save
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <Clpreview coverLetterData={formData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClEditor;
