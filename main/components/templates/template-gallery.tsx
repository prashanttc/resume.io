"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ModernTemplate } from "@/components/templates/modern-template"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
export function TemplateGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "A clean, professional template with a traditional layout and modern styling",
      categories: ["professional", "modern"],
      component: ModernTemplate,
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "A simple, elegant template with minimal styling and clean typography",
      categories: ["minimal", "modern"],
      component: MinimalistTemplate,
    },
    {
      id: "creative",
      name: "Creative Split",
      description: "A creative template with a sidebar for skills and contact information",
      categories: ["creative"],
      component: CreativeTemplate,
    },
  ]

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.categories.includes(selectedCategory))

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="modern">Modern</TabsTrigger>
          <TabsTrigger value="minimal">Minimal</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden border-0 shadow-sm hover-shadow transition-all">
                <div
                  className="relative h-64 overflow-hidden bg-white cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id === selectedTemplate ? null : template.id)}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4 transform scale-[0.4]">
                    {/* <template.component /> */}
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                      <Badge className="bg-white text-black">
                        <Check className="mr-1 h-3 w-3" /> Selected
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex flex-wrap gap-1">
                    {template.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Download className="mr-2 h-3 w-3" />
                    Preview
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button disabled={!selectedTemplate} size="lg" className="hover-lift">
          Use Selected Template
        </Button>
      </div>
    </div>
  )
}
