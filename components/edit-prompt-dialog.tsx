"use client"

import type React from "react"

import { Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface EditPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prompt?: {
    id: string
    title: string
    content: string
    status: string
  }
  onUpdate: (
    promptId: string,
    updatedPrompt: {
      title: string
      content: string
      status: string
    },
  ) => void
}

export function EditPromptDialog({ open, onOpenChange, prompt, onUpdate }: EditPromptDialogProps) {
  if (!prompt) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedPrompt = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      status: formData.get("active") ? "active" : "draft",
    }
    onUpdate(prompt.id, updatedPrompt)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Pencil className="h-6 w-6" />
            <DialogTitle className="text-xl">Edit prompt</DialogTitle>
          </div>
        </DialogHeader>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-base font-medium">Title</label>
            <Input name="title" defaultValue={prompt.title} />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Content</label>
            <Textarea name="content" defaultValue={prompt.content} className="min-h-[150px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="active" name="active" defaultChecked={prompt.status === "active"} />
            <label
              htmlFor="active"
              className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active prompt
            </label>
          </div>
          <Button type="submit" className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white" size="lg">
            Update prompt
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
