"use client"

import { Layers, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PromptDialog({ open, onOpenChange }: PromptDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6" />
            <DialogTitle className="text-xl">Add prompt</DialogTitle>
          </div>
        </DialogHeader>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-base font-medium">Title</label>
            <Input placeholder="Title (e.g. 'Reword')" />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Prompt</label>
            <Textarea
              placeholder="Enter a prompt (e.g. 'help me rewrite the following politely and concisely for professional communication')"
              className="min-h-[150px]"
            />
          </div>
        </div>
        <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white" size="lg">
          Add prompt
        </Button>
      </DialogContent>
    </Dialog>
  )
}
