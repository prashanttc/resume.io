"use client"

import { Textarea } from "@/components/ui/textarea"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const preferenceSchema = z.object({
  experience: z.string().min(1, "Relevant experience is required"),
  preferences: z.string().min(1, "Preferred tone is required"),
})

export type PreferencesValues = z.infer<typeof preferenceSchema>

interface PreferencesFormProps {
  defaultValues: PreferencesValues
  onSubmit: (values: PreferencesValues) => void
}

export default function PreferencesForm({
  defaultValues,
  onSubmit,
}: PreferencesFormProps) {
  const form = useForm<PreferencesValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues,
  })

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "confident", label: "Confident" },
    { value: "friendly", label: "Friendly" },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            Content Preferences
          </h2>
          <p className="text-sm text-muted-foreground">
            Customize the content and tone of your cover letter
          </p>
        </div>

        {/* Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Relevant Experience</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe your relevant experience and key achievements..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Tone */}
        <FormField
          control={form.control}
          name="preferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Preferred Tone</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  {toneOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-2 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={option.value}
                        className="font-normal cursor-pointer"
                      >
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <Button type="submit" className="absolute right-6 bottom-6 bg-white text-black items-center justify-center flex gap-4">
          next
          <ArrowRight/>
        </Button>
      </form>
    </Form>
  )
}
