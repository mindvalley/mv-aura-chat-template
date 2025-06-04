"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info, AlertTriangle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// API Scopes from the RFC document
const apiScopes = [
  { name: "assistants:read", description: "View and list assistants", category: "Assistants" },
  { name: "assistants:write", description: "Create and manage assistants", category: "Assistants" },
  { name: "threads:read", description: "View chat threads", category: "Threads" },
  { name: "threads:write", description: "Create and manage chat threads", category: "Threads" },
  { name: "messages:read", description: "View messages in threads", category: "Messages" },
  { name: "messages:write", description: "Create and send messages", category: "Messages" },
  { name: "runs:execute", description: "Create and manage assistant runs", category: "Runs" },
  { name: "chat", description: "Use chat functionality", category: "General" },
  { name: "query", description: "Execute and manage searches", category: "General" },
  { name: "documents:read", description: "View accessible documents", category: "Documents" },
  { name: "documents:write", description: "Create and manage own documents", category: "Documents" },
  { name: "personalization", description: "Manage personal settings", category: "General" },
  { name: "tools:use", description: "Execute available tools", category: "Tools" },
  { name: "notifications", description: "Manage notifications", category: "General" },
  { name: "admin:system", description: "Core system administration", category: "Admin", adminOnly: true },
  { name: "admin:users", description: "User management", category: "Admin", adminOnly: true },
  { name: "admin:content", description: "Content administration", category: "Admin", adminOnly: true },
  { name: "admin:integrations", description: "Integration management", category: "Admin", adminOnly: true },
  { name: "admin:ai", description: "AI system configuration", category: "Admin", adminOnly: true },
  { name: "admin:audit", description: "Monitoring and audit", category: "Admin", adminOnly: true },
]

// Predefined scope sets
const predefinedScopeSets = [
  {
    name: "readonly",
    description: "Read-only access across the system",
    scopes: ["assistants:read", "threads:read", "messages:read", "documents:read"],
  },
  {
    name: "assistants:full",
    description: "Complete assistant management capabilities",
    scopes: [
      "assistants:read",
      "assistants:write",
      "threads:read",
      "threads:write",
      "messages:read",
      "messages:write",
      "runs:execute",
    ],
  },
  {
    name: "standard",
    description: "Standard user functionality",
    scopes: ["chat", "query", "documents:read", "personalization", "tools:use"],
  },
  {
    name: "content-management",
    description: "Document creation and management",
    scopes: ["documents:read", "documents:write"],
  },
]

interface ApiKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string | null
  createdBy: string
  permissions: string
  scopes?: string[]
}

interface EditApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKey: ApiKey | null
  onUpdateKey: (id: string, updatedKey: { name: string; scopes: string[] }) => void
  onRevokeKey: (id: string) => void
}

export function EditApiKeyDialog({ open, onOpenChange, apiKey, onUpdateKey, onRevokeKey }: EditApiKeyDialogProps) {
  const [name, setName] = React.useState("")
  const [scopeMode, setScopeMode] = React.useState<"predefined" | "custom">("predefined")
  const [selectedPredefinedScope, setSelectedPredefinedScope] = React.useState<string>("standard")
  const [selectedScopes, setSelectedScopes] = React.useState<string[]>([])
  const [showRevokeDialog, setShowRevokeDialog] = React.useState(false)

  // Group scopes by category
  const scopesByCategory = React.useMemo(() => {
    const grouped: Record<string, typeof apiScopes> = {}
    apiScopes.forEach((scope) => {
      if (!grouped[scope.category]) {
        grouped[scope.category] = []
      }
      grouped[scope.category].push(scope)
    })
    return grouped
  }, [])

  // Initialize form when apiKey changes
  React.useEffect(() => {
    if (apiKey) {
      setName(apiKey.name)

      if (apiKey.scopes && apiKey.scopes.length > 0) {
        // Check if the scopes match any predefined set
        const matchingSet = predefinedScopeSets.find(
          (set) =>
            set.scopes.length === apiKey.scopes?.length && set.scopes.every((scope) => apiKey.scopes?.includes(scope)),
        )

        if (matchingSet) {
          setScopeMode("predefined")
          setSelectedPredefinedScope(matchingSet.name)
        } else {
          setScopeMode("custom")
        }

        setSelectedScopes(apiKey.scopes)
      } else {
        setScopeMode("predefined")
        setSelectedPredefinedScope("standard")
        setSelectedScopes(predefinedScopeSets.find((set) => set.name === "standard")?.scopes || [])
      }
    }
  }, [apiKey])

  // Update selected scopes when predefined scope changes
  React.useEffect(() => {
    if (scopeMode === "predefined") {
      const scopeSet = predefinedScopeSets.find((set) => set.name === selectedPredefinedScope)
      if (scopeSet) {
        setSelectedScopes(scopeSet.scopes)
      }
    }
  }, [selectedPredefinedScope, scopeMode])

  const handleScopeToggle = (scope: string) => {
    setSelectedScopes((prev) => (prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!apiKey) return

    onUpdateKey(apiKey.id, {
      name,
      scopes: selectedScopes,
    })

    onOpenChange(false)
  }

  const handleRevoke = () => {
    if (!apiKey) return

    onRevokeKey(apiKey.id)
    setShowRevokeDialog(false)
    onOpenChange(false)
  }

  if (!apiKey) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit API key</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="key-name">Name</Label>
              <Input
                id="key-name"
                placeholder="My API Key"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">A name to help you remember what this API key is used for</p>
            </div>

            <div className="space-y-2">
              <Label>API Scopes</Label>
              <p className="text-xs text-muted-foreground mb-2">Select which operations this API key can perform</p>

              <Tabs value={scopeMode} onValueChange={(value) => setScopeMode(value as "predefined" | "custom")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="predefined">Predefined Scopes</TabsTrigger>
                  <TabsTrigger value="custom">Custom Scopes</TabsTrigger>
                </TabsList>

                <TabsContent value="predefined" className="pt-2">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-2">
                      {predefinedScopeSets.map((scopeSet) => (
                        <div
                          key={scopeSet.name}
                          className={`flex items-start space-x-2 border p-3 rounded-md ${
                            selectedPredefinedScope === scopeSet.name ? "border-primary bg-accent" : ""
                          }`}
                          onClick={() => setSelectedPredefinedScope(scopeSet.name)}
                        >
                          <input
                            type="radio"
                            id={`scope-${scopeSet.name}`}
                            checked={selectedPredefinedScope === scopeSet.name}
                            onChange={() => setSelectedPredefinedScope(scopeSet.name)}
                            className="mt-1"
                          />
                          <div className="space-y-1">
                            <Label htmlFor={`scope-${scopeSet.name}`} className="font-medium">
                              {scopeSet.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{scopeSet.description}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {scopeSet.scopes.map((scope) => (
                                <span key={scope} className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {scope}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="custom" className="pt-2">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-6">
                      {Object.entries(scopesByCategory).map(([category, scopes]) => (
                        <div key={category} className="space-y-2">
                          <h4 className="text-sm font-medium">{category}</h4>
                          <div className="space-y-2">
                            {scopes.map((scope) => (
                              <div key={scope.name} className="flex items-start space-x-2">
                                <Checkbox
                                  id={`scope-${scope.name}`}
                                  checked={selectedScopes.includes(scope.name)}
                                  onCheckedChange={() => handleScopeToggle(scope.name)}
                                  disabled={scope.adminOnly}
                                  className="mt-1"
                                />
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center">
                                    <Label
                                      htmlFor={`scope-${scope.name}`}
                                      className={`text-sm font-medium ${scope.adminOnly ? "text-muted-foreground" : ""}`}
                                    >
                                      {scope.name}
                                    </Label>
                                    {scope.adminOnly && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Info className="h-3 w-3 ml-1 inline-block text-muted-foreground" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="w-[200px] text-xs">
                                              This scope is only available to admin users
                                            </p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">{scope.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="flex justify-between">
              <Button type="button" variant="destructive" onClick={() => setShowRevokeDialog(true)} className="mr-auto">
                Revoke Key
              </Button>
              <div>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Revoke API Key
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently revoke the API key and any applications using it will
              no longer be able to access the API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevoke}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
