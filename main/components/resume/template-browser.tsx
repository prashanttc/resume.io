"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { templates } from "@/constants"

interface TemplateBrowserProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
  onClose?: () => void
  isDialog?: boolean
}

export function TemplateBrowser({
  selectedTemplate,
  onSelectTemplate,
  onClose,
  isDialog = false,
}: TemplateBrowserProps) {
  const [category, setCategory] = useState("all")

  const filteredTemplates =
    category === "all"
      ? templates
      : templates.filter((template) => template.categories.includes(category))

  const content = (
    <div className="space-y-6  w-full">
      <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="w-full">
        <div className="flex flex-wrap w-full justify-between">
          <TabsList className="mb-4 flex flex-wrap">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="minimal">Minimal</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          {isDialog && (
            <div className="flex justify-end sm:my-0 my-10 fixed top-20 right-10">
              <Button onClick={onClose} variant="outline" className="mr-2">
                Cancel
              </Button>
              <Button onClick={onClose} disabled={!selectedTemplate}>
                Apply Template
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value={category} className="mt-20">
          {/* Mobile: Horizontal Scroll */}
          {/* <div className="flex gap-4 overflow-x-auto sm:hidden pb-2 -mx-2 px-2">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`min-w-[180px] max-w-[200px] flex-shrink-0 rounded-xl shadow-sm transition-all cursor-pointer ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <div className="relative aspect-[3/4] bg-muted">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-medium truncate">{template.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div> */}

          {/* Desktop: Grid */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className={`overflow-hidden rounded-xl border-0 shadow hover:shadow-md transition-all cursor-pointer ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <div className="relative aspect-[3/4] bg-muted">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs lowercase">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )

  if (isDialog) return content

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Template</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  )
}
