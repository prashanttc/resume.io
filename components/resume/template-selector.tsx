"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={onSelectTemplate}
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <div>
        <RadioGroupItem value="modern" id="modern" className="peer sr-only" />
        <Label
          htmlFor="modern"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-800 dark:peer-data-[state=checked]:border-zinc-300 [&:has([data-state=checked])]:border-zinc-800 dark:[&:has([data-state=checked])]:border-zinc-300 transition-all hover-shadow"
        >
          <div className="mb-2 h-24 w-full rounded bg-zinc-100 flex items-center justify-center">
            <div className="w-3/4 h-4/5 flex flex-col">
              <div className="h-3 w-1/2 bg-zinc-300 mb-1"></div>
              <div className="h-2 w-1/3 bg-zinc-200 mb-2"></div>
              <div className="flex-1 flex gap-1">
                <div className="w-1/3 bg-zinc-200"></div>
                <div className="w-2/3 flex flex-col gap-1">
                  <div className="h-2 bg-zinc-300 mb-1"></div>
                  <div className="h-1 bg-zinc-200 mb-1"></div>
                  <div className="h-1 bg-zinc-200 mb-1"></div>
                  <div className="h-1 bg-zinc-200"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm font-medium">Modern</div>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="minimalist" id="minimalist" className="peer sr-only" />
        <Label
          htmlFor="minimalist"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-800 dark:peer-data-[state=checked]:border-zinc-300 [&:has([data-state=checked])]:border-zinc-800 dark:[&:has([data-state=checked])]:border-zinc-300 transition-all hover-shadow"
        >
          <div className="mb-2 h-24 w-full rounded bg-zinc-100 flex items-center justify-center">
            <div className="w-3/4 h-4/5 flex flex-col items-center">
              <div className="h-3 w-1/3 bg-zinc-300 mb-1"></div>
              <div className="h-2 w-1/4 bg-zinc-200 mb-3"></div>
              <div className="w-full flex-1 flex flex-col gap-1">
                <div className="h-1 bg-zinc-200 mb-1"></div>
                <div className="h-1 bg-zinc-200 mb-1"></div>
                <div className="h-1 bg-zinc-200"></div>
              </div>
            </div>
          </div>
          <div className="text-sm font-medium">Minimalist</div>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="creative" id="creative" className="peer sr-only" />
        <Label
          htmlFor="creative"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-800 dark:peer-data-[state=checked]:border-zinc-300 [&:has([data-state=checked])]:border-zinc-800 dark:[&:has([data-state=checked])]:border-zinc-300 transition-all hover-shadow"
        >
          <div className="mb-2 h-24 w-full rounded bg-zinc-100 flex">
            <div className="w-1/3 h-full bg-zinc-200"></div>
            <div className="w-2/3 h-full p-2">
              <div className="h-2 w-1/2 bg-zinc-300 mb-1"></div>
              <div className="h-1 w-full bg-zinc-200 mb-1"></div>
              <div className="h-1 w-full bg-zinc-200 mb-1"></div>
              <div className="h-1 w-3/4 bg-zinc-200"></div>
            </div>
          </div>
          <div className="text-sm font-medium">Creative</div>
        </Label>
      </div>
    </RadioGroup>
  )
}
