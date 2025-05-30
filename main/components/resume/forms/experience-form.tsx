"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Check, Sparkles } from "lucide-react";
import { callResumeAI } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const experienceSchema = z.object({
  position: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  location: z.string().optional(),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  defaultValues?: ExperienceFormValues[];
  onSubmit: (values: ExperienceFormValues[]) => void;
}

export function ExperienceForm({
  defaultValues = [],
  onSubmit,
}: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<ExperienceFormValues[]>(
    defaultValues.length > 0
      ? defaultValues
      : [
          {
            position: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            location: "San Francisco, CA",
            startDate: "2020-01",
            endDate: "",
            current: true,
            description:
              "Led development of cloud-based applications using React, Node.js, and AWS. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.",
          },
          {
            position: "Software Engineer",
            company: "Digital Innovations",
            location: "Seattle, WA",
            startDate: "2017-03",
            endDate: "2019-12",
            current: false,
            description:
              "Developed and maintained web applications using JavaScript, React, and Node.js. Collaborated with UX designers to implement responsive designs and improve user experience.",
          },
        ]
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const haandleDescription = async () => {
    try {
      setLoading(true);
      const aidescription = await callResumeAI(aiPrompt, "job-desc");
      form.setValue("description", aidescription);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.success("generated successfully");
      setIsOpen(false);
    }
  };

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  // Watch for form changes to track if it's dirty
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch, form.formState.isDirty]);

  function handleAddOrUpdate(values: ExperienceFormValues) {
    if (editIndex !== null) {
      // Update existing experience
      const updatedExperiences = [...experiences];
      updatedExperiences[editIndex] = values;
      setExperiences(updatedExperiences);
      setEditIndex(null);
    } else {
      // Add new experience
      setExperiences([...experiences, values]);
    }

    form.reset({
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });

    setIsFormDirty(false);
  }

  function editExperience(index: number) {
    const experience = experiences[index];
    form.reset(experience);
    setEditIndex(index);
    setIsFormDirty(false);
  }

  function deleteExperience(index: number) {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    if (editIndex === index) {
      setEditIndex(null);
      form.reset({
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      setIsFormDirty(false);
    }
  }

  function handleSaveAll() {
    onSubmit(experiences);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Card
            key={index}
            className="border-0 bg-secondary/50 shadow-sm hover:bg-secondary/80 transition-all"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{experience.position}</h4>
                  <p className="text-sm text-muted-foreground">
                    {experience.company}{" "}
                    {experience.location ? `• ${experience.location}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(experience.startDate).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short" }
                    )}{" "}
                    -
                    {experience.current
                      ? " Present"
                      : experience.endDate
                      ? ` ${new Date(experience.endDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short" }
                        )}`
                      : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => editExperience(index)}
                  >
                    <span className="sr-only">Edit</span>
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
                    >
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full text-destructive"
                    onClick={() => deleteExperience(index)}
                  >
                    <span className="sr-only">Delete</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm mt-2">{experience.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddOrUpdate)}
          className="space-y-4 border-t pt-4"
        >
          <h3 className="text-lg font-medium">
            {editIndex !== null ? "Edit Experience" : "Add Experience"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              {!form.watch("current") && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="current"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (checked) {
                            form.setValue("endDate", "");
                          }
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I currently work here</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">Description
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger className=" p-1 border border-white rounded-xl">
                    <Sparkles className="size-5" />
                  </DialogTrigger>
                  <DialogContent>
                    <p className="text-sm font-medium mb-2">
                      Enter prompt for description
                    </p>
                    <Textarea
                      placeholder="worked for xyz company as xyz intern"
                      className="min-h-[100px] resize-none"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                    <Button
                      disabled={loading || !aiPrompt}
                      onClick={haandleDescription}
                    >
                      {loading ? "Generating..." : "Generate"}
                    </Button>
                  </DialogContent>
                </Dialog></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2">
            {editIndex !== null && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditIndex(null);
                  form.reset({
                    position: "",
                    company: "",
                    location: "",
                    startDate: "",
                    endDate: "",
                    current: false,
                    description: "",
                  });
                  setIsFormDirty(false);
                }}
                className="hover-lift"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              className="hover-lift"
              disabled={!isFormDirty}
            >
              <Plus className="mr-2 h-4 w-4" />
              {editIndex !== null ? "Update Experience" : "Add Experience"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSaveAll} className="hover-lift">
          <Check className="mr-2 h-4 w-4" />
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
