"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Check, Database, FileText } from "lucide-react"
import { Slack, Github, Globe } from "lucide-react"

interface ConnectSourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSourceCreated: (source: {
    id: string
    name: string
    connectorTypes: string[]
    selectedConnectors: Array<{
      id: string
      name: string
      type: string
    }>
  }) => void
}

export function ConnectSourceModal({ open, onOpenChange, onSourceCreated }: ConnectSourceModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([])
  const [activeConnectorType, setActiveConnectorType] = useState<string>("all")

  // Reset selections when modal opens
  useEffect(() => {
    if (open) {
      setSelectedConnectors([])
      setSearchQuery("")
      setActiveConnectorType("all")
    }
  }, [open])

  const connectorTypes = [
    { id: "all", name: "All", icon: null },
    { id: "airtable", name: "airtable", icon: Database, color: "#2BBBAD" },
    { id: "confluence", name: "confluence", icon: FileText, color: "#0052CC" },
    { id: "file", name: "file", icon: FileText, color: "#6B7280" },
    { id: "github", name: "github", icon: Github, color: "#181717" },
    { id: "google_cloud_storage", name: "google_cloud_storage", icon: Database, color: "#4285F4" },
    { id: "google_drive", name: "google_drive", icon: Database, color: "#0F9D58" },
    { id: "jira", name: "jira", icon: Database, color: "#0052CC" },
    { id: "slack", name: "slack", icon: Slack, color: "#E01E5A" },
    { id: "web", name: "web", icon: Globe, color: "#4285F4" },
  ]

  const slackChannels = [
    { id: "campaigns-team-updates", name: "#campaigns-team-updates", type: "slack" },
    { id: "checkout-performance", name: "#checkout-performance", type: "slack" },
    { id: "Content-product", name: "#Content-product", type: "slack" },
    { id: "data-ops-martech", name: "#data-ops-martech", type: "slack" },
    { id: "dataops-support", name: "#dataops-support", type: "slack" },
    { id: "engage-data", name: "#engage-data", type: "slack" },
    { id: "gim-ops", name: "#gim-ops", type: "slack" },
    { id: "it-helpdesk", name: "#it-helpdesk", type: "slack" },
    { id: "learning", name: "#learning", type: "slack" },
    { id: "mindvalley-team", name: "#mindvalley-team", type: "slack" },
  ]

  const githubRepos = [
    { id: "frontend-app", name: "frontend-app", type: "github" },
    { id: "backend-api", name: "backend-api", type: "github" },
    { id: "data-pipeline", name: "data-pipeline", type: "github" },
  ]

  const googleDriveFiles = [
    { id: "marketing-docs", name: "Marketing Documents", type: "google_drive" },
    { id: "product-roadmap", name: "Product Roadmap 2023", type: "google_drive" },
    { id: "design-assets", name: "Design Assets", type: "google_drive" },
  ]

  // Combine all connectors
  const allConnectors = [...slackChannels, ...githubRepos, ...googleDriveFiles]

  // Filter connectors based on search and active type
  const filteredConnectors = allConnectors.filter((connector) => {
    const matchesSearch = connector.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = activeConnectorType === "all" || connector.type === activeConnectorType
    return matchesSearch && matchesType
  })

  const handleToggleConnector = (id: string) => {
    if (selectedConnectors.includes(id)) {
      setSelectedConnectors(selectedConnectors.filter((c) => c !== id))
    } else {
      setSelectedConnectors([...selectedConnectors, id])
    }
  }

  const handleCreate = () => {
    if (selectedConnectors.length > 0) {
      // Get the selected connector objects
      const selectedConnectorObjects = selectedConnectors.map((id) => {
        const connector = allConnectors.find((c) => c.id === id)
        return connector ? connector : { id, name: id, type: "unknown" }
      })

      // Get unique connector types
      const uniqueConnectorTypes = Array.from(new Set(selectedConnectorObjects.map((c) => c.type)))

      // Create a new source with the selected connectors
      const newSource = {
        id: Math.random().toString(36).substring(2, 9),
        name: "Connected Source",
        connectorTypes: uniqueConnectorTypes,
        selectedConnectors: selectedConnectorObjects,
      }

      onSourceCreated(newSource)
      onOpenChange(false)
    }
  }

  const getConnectorIcon = (type: string) => {
    switch (type) {
      case "slack":
        return <Slack className="h-4 w-4 text-[#E01E5A]" />
      case "github":
        return <Github className="h-4 w-4 text-[#181717]" />
      case "google_drive":
        return <Database className="h-4 w-4 text-[#0F9D58]" />
      default:
        return <Database className="h-4 w-4 text-[#4285F4]" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create Connected Source</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6 overflow-y-auto max-h-[60vh]">
          <div>
            <h3 className="text-base font-medium mb-1">Pick your connectors:</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All documents indexed by the selected connectors will be a part of this document set.
            </p>

            {/* Connector type buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {connectorTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Button
                    key={type.id}
                    variant={activeConnectorType === type.id ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setActiveConnectorType(type.id)}
                  >
                    {Icon && <Icon className="h-4 w-4 mr-1" style={{ color: type.color }} />}
                    {type.name}
                  </Button>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Left panel - Available connectors */}
              <div className="border rounded-md overflow-hidden">
                <div className="p-2 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search connectors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredConnectors.length > 0 ? (
                    filteredConnectors.map((connector) => (
                      <div
                        key={connector.id}
                        className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-accent/50 cursor-pointer"
                        onClick={() => handleToggleConnector(connector.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getConnectorIcon(connector.type)}
                          <span className="text-sm">{connector.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{connector.type}</span>
                          {selectedConnectors.includes(connector.id) && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No connectors found matching your search
                    </div>
                  )}
                </div>
              </div>

              {/* Right panel - Selected connectors */}
              <div className="border rounded-md overflow-hidden">
                <div className="p-2 border-b">
                  <h4 className="font-medium text-sm">Selected Connectors</h4>
                </div>
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {selectedConnectors.length > 0 ? (
                    selectedConnectors.map((id) => {
                      const connector = allConnectors.find((c) => c.id === id)
                      if (!connector) return null

                      return (
                        <div key={id} className="flex justify-between items-center p-2 bg-muted rounded-md mb-2">
                          <div className="flex items-center gap-2">
                            {getConnectorIcon(connector.type)}
                            <span className="text-sm">{connector.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-background px-2 py-0.5 rounded-full">{connector.type}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleToggleConnector(id)
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                      No selected connectors
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={selectedConnectors.length === 0} className="px-8">
            Create!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
