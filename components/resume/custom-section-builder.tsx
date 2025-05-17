"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Save, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/hooks/use-toast"
import { CustomSections, EntryType } from "@/types/resume"
import { SectionEntries } from "@/components/resume/custom-section-entries"


interface CustomSectionBuilderProps {
  initialSections?: CustomSections[]
  onSave?: (sections: CustomSections[]) => void
  isLoading?: boolean
}

export function CustomSectionBuilder({ initialSections = [], onSave, isLoading = false }: CustomSectionBuilderProps) {
  const [sections, setSections] = useState<CustomSections[]>(initialSections.length > 0 ? initialSections : [])
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const { toast } = useToast()

  // Update sections when initialSections changes
  useEffect(() => {
    if (initialSections.length > 0) {
      setSections(initialSections)
    }
  }, [initialSections])

  const addSection = () => {
    if (!newSectionTitle.trim()) {
      toast({
        title: "Section title required",
        description: "Please enter a title for your new section",
        variant: "destructive",
      })
      return
    }

    const newSection: CustomSections = {
      id: uuidv4(),
      title: newSectionTitle,
      entries: [],
    }

    setSections([...sections, newSection])
    setNewSectionTitle("")

    toast({
      title: "Section added",
      description: `"${newSectionTitle}" section has been added`,
    })
  }

  const updateSectionTitle = (id: string, title: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, title } : section)))
  }

  const deleteSection = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))

    toast({
      title: "Section deleted",
      description: "The section has been removed",
    })
  }

  const addEntry = (sectionId: string, entry: EntryType) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, entries: [...section.entries, entry] } : section,
      ),
    )
  }

  const updateEntry = (sectionId: string, entryId: string, updatedEntry: Partial<EntryType>) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              entries: section.entries.map((entry) => (entry.id === entryId ? { ...entry, ...updatedEntry } : entry)),
            }
          : section,
      ),
    )
  }

  const deleteEntry = (sectionId: string, entryId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              entries: section.entries.filter((entry) => entry.id !== entryId),
            }
          : section,
      ),
    )
  }

  const reorderEntries = (sectionId: string, startIndex: number, endIndex: number) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    const newEntries = Array.from(section.entries)
    const [removed] = newEntries.splice(startIndex, 1)
    newEntries.splice(endIndex, 0, removed)

    setSections(sections.map((s) => (s.id === sectionId ? { ...s, entries: newEntries } : s)))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(sections)
    }

    toast({
      title: "Changes saved",
      description: "Your custom sections have been saved",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight">Custom Sections</h2>
        <Button onClick={handleSave} className="gap-2" disabled={isLoading}>
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="new-section">Add New Section</Label>
          <Input
            id="new-section"
            placeholder="Section title (e.g., Certifications, Awards, Volunteering)"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button onClick={addSection} className="gap-2" disabled={isLoading}>
          <Plus className="h-4 w-4" />
          Add Section
        </Button>
      </div>

      {isLoading ? (
        <LoadingPlaceholder />
      ) : sections.length === 0 ? (
        <Card className="border border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-secondary p-3 mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No custom sections yet</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Add a custom section like "Certifications", "Awards", or "Volunteering" to enhance your resume.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.id} className="border shadow-sm">
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle>
                    <Input
                      value={section.title||''}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      className="font-medium text-base h-7 px-0 py-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                      disabled={isLoading}
                    />
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSection(section.id)}
                  className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete section</span>
                </Button>
              </CardHeader>
              <CardContent>
                <SectionEntries
                  sectionId={section.id}
                  entries={section.entries}
                  onAddEntry={addEntry}
                  onUpdateEntry={updateEntry}
                  onDeleteEntry={deleteEntry}
                  onReorderEntries={reorderEntries}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function LoadingPlaceholder() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <Card key={i} className="border shadow-sm animate-pulse">
          <CardHeader className="pb-3">
            <div className="h-6 bg-secondary rounded-md w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2].map((j) => (
                <div key={j} className="h-24 bg-secondary/50 rounded-md"></div>
              ))}
              <div className="h-10 bg-secondary/30 rounded-md mt-6"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
