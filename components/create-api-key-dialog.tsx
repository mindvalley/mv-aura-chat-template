"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ApiKeyCreatedDialog } from "@/components/api-key-created-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

interface CreateApiKeyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateKey: (key: {
    name: string
    key: string
    created: string
    lastUsed: null
    createdBy: string
    permissions: string
    scopes: string[]
  }) => void
}

export function CreateApiKeyDialog({ open, onOpenChange, onCreateKey }: CreateApiKeyDialogProps) {
  const [name, setName] = React.useState("")
  const [showKeyDialog, setShowKeyDialog] = React.useState(false)
  const [createdKey, setCreatedKey] = React.useState("")
  const [scopeMode, setScopeMode] = React.useState<"predefined" | "custom">("predefined")
  const [selectedPredefinedScope, setSelectedPredefinedScope] = React.useState<string>("standard")
  const [selectedScopes, setSelectedScopes] = React.useState<string[]>([])

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

    // Generate a fake API key for demonstration
    const generatedKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setCreatedKey(generatedKey)

    // In a real app, this would make an API call to create the key
    const newKey = {
      name,
      key: `sk-...${generatedKey.substring(generatedKey.length - 4)}`,
      created: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUsed: null,
      createdBy: "Current User",
      permissions: selectedScopes.length > 0 ? "Custom" : "None", // Derive permissions from scopes
      scopes: selectedScopes,
    }

    onCreateKey(newKey)

    // Show the created key dialog
    setShowKeyDialog(true)

    // Reset form
    setName("")
    setSelectedScopes([])
    setScopeMode("predefined")
    setSelectedPredefinedScope("standard")

    // Close the create dialog
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Create new API key</DialogTitle>
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

              <Tabs defaultValue="predefined" onValueChange={(value) => setScopeMode(value as "predefined" | "custom")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="predefined">Predefined Scopes</TabsTrigger>
                  <TabsTrigger value="custom">Custom Scopes</TabsTrigger>
                </TabsList>

                <TabsContent value="predefined" className="pt-2">
                  <ScrollArea className="h-[300px] pr-4">
                    <RadioGroup
                      value={selectedPredefinedScope}
                      onValueChange={setSelectedPredefinedScope}
                      className="space-y-2"
                    >
                      {predefinedScopeSets.map((scopeSet) => (
                        <div key={scopeSet.name} className="flex items-start space-x-2 border p-3 rounded-md">
                          <RadioGroupItem value={scopeSet.name} id={`scope-${scopeSet.name}`} className="mt-1" />
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
                    </RadioGroup>
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

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create API key</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ApiKeyCreatedDialog open={showKeyDialog} onOpenChange={setShowKeyDialog} apiKey={createdKey} />
    </>
  )
}
