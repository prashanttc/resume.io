"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { callResumeAI } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters.",
    })
    .optional(),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({
      message: "Please enter a valid LinkedIn URL.",
    })
    .optional()
    .or(z.literal("")),
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }),
});

export type PersonalInfoFormValues = z.infer<typeof formSchema>;

interface PersonalInfoFormProps {
  defaultValues: Partial<PersonalInfoFormValues>;
  onSubmit: (values: PersonalInfoFormValues) => void;
}

export function PersonalInfoForm({
  defaultValues,
  onSubmit,
}: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      fullName: "John Doe",
      jobTitle: "Software Engineer",
      email: "john@example.com",
      phone: "(123) 456-7890",
      location: "San Francisco, CA",
      website: "https://johndoe.com",
      linkedin: "https://linkedin.com/in/johndoe",
      github:"https://github/johndoe",
      summary:
        "Experienced software engineer with a passion for building scalable web applications and solving complex problems.",
    },
  });

  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlesummary = async () => {
    try {
      setLoading(true);
      const aisummary = await callResumeAI(aiPrompt, "summary");
      form.setValue("summary", aisummary);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.success('generated successfully')
      setIsOpen(false)
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
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
              <FormLabel>Location</FormLabel>
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://johndoe.com" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/johndoe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/in/johndoe"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center">
                Professional Summary
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger className=" p-1 border border-white rounded-xl">
                    <Sparkles className="size-5" />
                  </DialogTrigger>
                  <DialogContent>
                    <p className="text-sm font-medium mb-2">
                      Enter prompt for summary
                    </p>
                    <Textarea
                      placeholder="E.g., I have 2 years experience in frontend with React and Node.js"
                      className="min-h-[100px] resize-none"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                    <Button
                      disabled={loading || !aiPrompt}
                      onClick={handlesummary}
                    >
                      {loading ? "Generating..." : "Generate"}
                    </Button>
                  </DialogContent>
                </Dialog>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief summary of your professional background and key strengths..."
                  className="min-h-[200px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover-lift">
          Save & Continue
        </Button>
      </form>
    </Form>
  );
}
