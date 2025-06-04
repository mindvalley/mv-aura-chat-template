"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { showNotification } from "@/lib/notifications"

interface ApiKeyCreatedDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKey: string
}

export function ApiKeyCreatedDialog({ open, onOpenChange, apiKey }: ApiKeyCreatedDialogProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    showNotification("API key copied to clipboard", { type: "success" })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>API key created</DialogTitle>
          <DialogDescription>Make sure to copy your API key now. You won't be able to see it again.</DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <div className="bg-muted p-4 rounded-md font-mono text-sm break-all">{apiKey}</div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
          <Button onClick={handleCopy} className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
