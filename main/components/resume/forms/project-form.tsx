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
import { Plus, Trash2, Check, Sparkles, Grip } from "lucide-react";
import { callResumeAI } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const projectSchema = z.object({
  role: z
    .string()
    .min(2, {
      message: "Job title must be at least 2 characters.",
    })
    .optional(),
  title: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().optional(),
  link: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  defaultValues?: ProjectFormValues[];
  onSubmit: (values: ProjectFormValues[]) => void;
}

export function ProjectForm({
  defaultValues = [],
  onSubmit,
}: ProjectFormProps) {
  const [projects, setProjects] = useState<ProjectFormValues[]>(
    defaultValues.length > 0
      ? defaultValues
      : [
          {
            role: "backend developer",
            title: "social media app.",
            startDate: "2020-01",
            endDate: "",
            link:"",
            current: true,
            description:
              "Led development of cloud-based applications using React, Node.js, and AWS. Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 40%.",
          },
          {
            role: "Software Engineer",
            title: "Digital Innovations",
            startDate: "2017-03",
            endDate: "2019-12",
            current: false,
            link:"",
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
  

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      role: "",
      title: "",
      startDate: "",
      endDate: "",
      link:'',
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

  function handleAddOrUpdate(values: ProjectFormValues) {
    if (editIndex !== null) {
      // Update existing experience
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = values;
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      setProjects([...projects, values]);
    }

    form.reset({
      role: "",
      title: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      link:''
    });

    setIsFormDirty(false);
  }

  function editProjects(index: number) {
    const project = projects[index];
    form.reset(project);
    setEditIndex(index);
    setIsFormDirty(false);
  }

  function deleteProject(index: number) {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    if (editIndex === index) {
      setEditIndex(null);
      form.reset({
        role: "",
        title: "",
        startDate: "",
        link:'',
        endDate: "",
        current: false,
        description: "",
      });
      setIsFormDirty(false);
    }
  }

  function handleSaveAll() {
    onSubmit(projects);
  }
  const handleDragEnd = (result:any) => {
    if (!result.destination) return;
    const reordered = Array.from(projects);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);
    setProjects(reordered);}

  return (
    <div className="space-y-6">
      <div className="space-y-4">
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="projects">
        {(provided:any) => (
          <div
            className="space-y-4"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {projects.map((project, index) => (
              <Draggable
                key={project.title ?? index}
                draggableId={String(project.title ?? index)}
                index={index}
              >
                {(dragProps:any) => (
                  <div
                    ref={dragProps.innerRef}
                    {...dragProps.draggableProps}
                    {...dragProps.dragHandleProps}
                  >
                    <Card className="border-0 bg-secondary/50 shadow-sm hover:bg-secondary/80 transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                  <div className="flex gap-5 items-center justify-center mb-5">
                      <Grip className="h-5 w-5 text-muted-foreground" />

                            <h4 className="font-medium">{project.title}</h4>
                  </div>
                            <p className="text-sm text-muted-foreground">
                              {project.role}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(project.startDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                }
                              )}{" "}
                              -
                              {project.current
                                ? " Present"
                                : project.endDate
                                ? ` ${new Date(
                                    project.endDate
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                  })}`
                                : ""}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => editProjects(index)}
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
                              onClick={() => deleteProject(index)}
                            >
                              <span className="sr-only">Delete</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm mt-2">{project.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddOrUpdate)}
          className="space-y-4 border-t pt-4"
        >
          <h3 className="text-lg font-medium">
            {editIndex !== null ? "Edit Project" : "Add Project"}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                      <FormLabel>currently working</FormLabel>
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
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="live link"
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
                    role: "",
                    title: "",
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
              {editIndex !== null ? "Update Project" : "Add Project"}
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
