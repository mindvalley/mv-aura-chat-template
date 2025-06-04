"use client"

import * as React from "react"
import { Settings, Monitor, Moon, Sun, Trash2, LogOut, Plus, Copy, Eye, EyeOff, Key, Pencil } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useTheme } from "@/contexts/theme-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateApiKeyDialog } from "@/components/create-api-key-dialog"
import { EditApiKeyDialog } from "@/components/edit-api-key-dialog"
import { showNotification } from "@/lib/notifications"
import { VerticalTabs, VerticalTabsList, VerticalTabsTrigger, VerticalTabsContent } from "@/components/ui/vertical-tabs"

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

export function SettingsDialog() {
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
    {
      id: "1",
      name: "My Test Key",
      key: "sk-...lE4A",
      created: "Feb 28, 2025",
      lastUsed: "Feb 28, 2025",
      createdBy: "Alex Co",
      permissions: "All",
      scopes: ["assistants:read", "assistants:write", "threads:read", "messages:read"],
    },
  ])
  const [showCreateKeyDialog, setShowCreateKeyDialog] = React.useState(false)
  const [showEditKeyDialog, setShowEditKeyDialog] = React.useState(false)
  const [selectedApiKey, setSelectedApiKey] = React.useState<ApiKey | null>(null)
  const [revealKey, setRevealKey] = React.useState<string | null>(null)

  const handleThemeChange = (value: string) => {
    setTheme(value as "light" | "dark" | "system")
  }

  const handleDeleteAllChats = () => {
    // Implement delete all chats functionality
    console.log("Delete all chats")
  }

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logout")
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    showNotification("API key copied to clipboard", { type: "success" })
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    showNotification("API key deleted", { type: "success" })
  }

  const handleEditKey = (id: string) => {
    const keyToEdit = apiKeys.find((key) => key.id === id)
    if (keyToEdit) {
      setSelectedApiKey(keyToEdit)
      setShowEditKeyDialog(true)
    }
  }

  const handleUpdateKey = (id: string, updatedKey: { name: string; scopes: string[] }) => {
    setApiKeys(
      apiKeys.map((key) => {
        if (key.id === id) {
          return {
            ...key,
            name: updatedKey.name,
            scopes: updatedKey.scopes,
            permissions: updatedKey.scopes.length > 0 ? "Custom" : "None",
          }
        }
        return key
      }),
    )
    showNotification("API key updated successfully", { type: "success" })
  }

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id))
    showNotification("API key revoked successfully", { type: "success" })
  }

  const handleCreateKey = (newKey: Omit<ApiKey, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setApiKeys([...apiKeys, { ...newKey, id }])
    setShowCreateKeyDialog(false)
    showNotification("API key created", { type: "success" })
  }

  const toggleRevealKey = (id: string) => {
    if (revealKey === id) {
      setRevealKey(null)
    } else {
      setRevealKey(id)
      // In a real app, this would make an API call to get the full key
    }
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="flex items-center gap-2"
      >
        <Settings className="w-4 h-4" />
        Settings
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-hidden p-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>

          <VerticalTabs defaultValue="general" className="h-[500px]">
            <VerticalTabsList>
              <VerticalTabsTrigger value="general">
                <Settings className="w-4 h-4" />
                General
              </VerticalTabsTrigger>
              <VerticalTabsTrigger value="api-keys">
                <Key className="w-4 h-4" />
                API Keys
              </VerticalTabsTrigger>
            </VerticalTabsList>

            <VerticalTabsContent value="general">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Actions</h3>
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={handleDeleteAllChats}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete All Chats
                    </Button>
                    <Button variant="outline" className="justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </VerticalTabsContent>

            <VerticalTabsContent value="api-keys">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">API Keys</h3>
                  <Button onClick={() => setShowCreateKeyDialog(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create new key
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>API keys allow secure access to the Aura API. Keep your keys private.</p>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">NAME</TableHead>
                        <TableHead className="w-[180px]">SECRET KEY</TableHead>
                        <TableHead className="w-[100px]">CREATED</TableHead>
                        <TableHead className="w-[100px]">LAST USED</TableHead>
                        <TableHead className="text-right w-[100px]">ACTIONS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apiKeys.map((apiKey) => (
                        <TableRow key={apiKey.id}>
                          <TableCell className="font-medium">{apiKey.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-mono">
                                {revealKey === apiKey.id ? "sk-full-key-would-be-here" : apiKey.key}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => toggleRevealKey(apiKey.id)}
                              >
                                {revealKey === apiKey.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleCopyKey(apiKey.key)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{apiKey.created}</TableCell>
                          <TableCell className="text-xs">{apiKey.lastUsed || "Never"}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-blue-500 hover:text-blue-700"
                                onClick={() => handleEditKey(apiKey.id)}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteKey(apiKey.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {apiKeys.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No API keys found. Create one to get started.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </VerticalTabsContent>
          </VerticalTabs>
        </DialogContent>
      </Dialog>

      <CreateApiKeyDialog
        open={showCreateKeyDialog}
        onOpenChange={setShowCreateKeyDialog}
        onCreateKey={handleCreateKey}
      />

      <EditApiKeyDialog
        open={showEditKeyDialog}
        onOpenChange={setShowEditKeyDialog}
        apiKey={selectedApiKey}
        onUpdateKey={handleUpdateKey}
        onRevokeKey={handleRevokeKey}
      />
    </>
  )
}
