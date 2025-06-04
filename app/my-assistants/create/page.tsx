"use client"

import { useEffect } from "react"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  ChevronLeft,
  MoreHorizontal,
  Paperclip,
  ArrowUp,
  HelpCircle,
  Sparkles,
  Maximize2,
  X,
  Database,
  Plus,
  Slack,
  FileText,
  Pencil,
  Trash2,
  Github,
  Globe,
  CalendarIcon,
  Settings,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Check,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// Add the ConnectSourceModal component import
import { ConnectSourceModal } from "@/components/connect-source-modal"

type AIModel = {
  id: string
  name: string
  provider: string
  description: string
}

export default function CreateAssistantPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"create" | "configure">("create")
  const [message, setMessage] = useState("")
  const [assistantName, setAssistantName] = useState("Utah Hiking Guide")
  const [assistantDescription, setAssistantDescription] = useState(
    "Helps plan day hikes throughout Utah with tips and trail info.",
  )
  const [assistantInstruction, setAssistantInstruction] = useState(
    "You are a helpful assistant that specializes in Utah hiking trails. Provide detailed information about hiking trails throughout Utah, including difficulty levels, scenic views, best times to visit, and necessary preparations. Offer personalized recommendations based on user preferences such as difficulty, location, duration, and scenery. Include safety tips and current trail conditions when available.",
  )
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false)
  const [nameCharCount, setNameCharCount] = useState(assistantName.length)
  const [descriptionCharCount, setDescriptionCharCount] = useState(assistantDescription.length)
  const [conversation, setConversation] = useState([
    {
      role: "user",
      content: "Create a bot to help me plan day hikes throughout Utah.",
    },
    {
      role: "assistant",
      content:
        'Let\'s come up with a name for this GPT. How about "Utah Hiking Guide"? Do you like that, or do you have another name in mind?',
    },
    {
      role: "user",
      content: "That sounds good.",
    },
    {
      role: "assistant",
      content:
        "Great! Now let's create a profile picture for Utah Hiking Guide. I'll generate one based on a specific style. Let's start with a nature-inspired style.",
      image: "/utah-red-rocks-hiker.png",
    },
  ])
  const [conversationStep, setConversationStep] = useState(2)
  const [showStepControls, setShowStepControls] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [previewMessage, setPreviewMessage] = useState("")
  const [previewMessages, setPreviewMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([])
  const previewMessagesEndRef = useRef<HTMLDivElement>(null)
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState<"connected" | "files">("connected")
  const [showConnectSourceModal, setShowConnectSourceModal] = useState(false)
  const [isAvatarHovered, setIsAvatarHovered] = useState(false)
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false)

  // Section expand/collapse states
  const [basicInfoExpanded, setBasicInfoExpanded] = useState(true)
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(true)
  const [knowledgeExpanded, setKnowledgeExpanded] = useState(true)
  const [conversationStartersExpanded, setConversationStartersExpanded] = useState(true)
  const [privacyExpanded, setPrivacyExpanded] = useState(true)

  const [isSourceSyncing, setIsSourceSyncing] = useState(false)
  const [isSourceSynced, setIsSourceSynced] = useState(false)
  const [isFilesSyncing, setIsFilesSyncing] = useState(false)
  const [isFilesSynced, setIsFilesSynced] = useState(false)

  // Privacy settings
  const [privacyMode, setPrivacyMode] = useState<"private" | "public" | "share">("private")
  const [shareUserInput, setShareUserInput] = useState("")
  const [sharedUsers, setSharedUsers] = useState<Array<{ id: string; name: string; email: string }>>([])

  // AI Model selection
  const availableModels: AIModel[] = [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Most capable model for complex tasks",
    },
    {
      id: "gemini-2.5",
      name: "Gemini 2.5",
      provider: "Google",
      description: "Advanced model with strong reasoning capabilities",
    },
    {
      id: "o3-mini",
      name: "o3-mini",
      provider: "Anthropic",
      description: "Fast and efficient for simpler tasks",
    },
    {
      id: "llama-3",
      name: "Llama 3",
      provider: "Meta",
      description: "Open model with good general capabilities",
    },
  ]
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[0])

  // Knowledge configuration options
  const [contextDocuments, setContextDocuments] = useState<number>(20)
  const [searchStartDate, setSearchStartDate] = useState<Date | undefined>(undefined)
  const [relevanceFilter, setRelevanceFilter] = useState<boolean>(false)
  const [includeCitation, setIncludeCitation] = useState<boolean>(false)
  const [showKnowledgeConfig, setShowKnowledgeConfig] = useState<boolean>(false)

  const [connectedSource, setConnectedSource] = useState<{
    id: string
    name: string
    connectorTypes: string[]
    selectedConnectors: Array<{
      id: string
      name: string
      type: string
    }>
  } | null>(null)

  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      id: string
      name: string
      type: "pdf" | "txt" | "docx" | "csv"
      size: string
      uploadedAt: string
    }>
  >([
    {
      id: "file1",
      name: "Utah-Hiking-Trails-Guide.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadedAt: "2 days ago",
    },
    {
      id: "file2",
      name: "Zion-National-Park-Map.pdf",
      type: "pdf",
      size: "1.8 MB",
      uploadedAt: "2 days ago",
    },
    {
      id: "file3",
      name: "Bryce-Canyon-Safety-Tips.txt",
      type: "txt",
      size: "45 KB",
      uploadedAt: "3 days ago",
    },
    {
      id: "file4",
      name: "Utah-Weather-Conditions.csv",
      type: "csv",
      size: "128 KB",
      uploadedAt: "1 week ago",
    },
    {
      id: "file5",
      name: "Hiking-Gear-Checklist.docx",
      type: "docx",
      size: "78 KB",
      uploadedAt: "1 week ago",
    },
  ])

  // Check if knowledge configuration should be shown
  const hasKnowledgeSources = connectedSource !== null || uploadedFiles.length > 0

  // Update knowledge config visibility when sources change
  useEffect(() => {
    setShowKnowledgeConfig(hasKnowledgeSources)
  }, [connectedSource, uploadedFiles])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message to conversation
    setConversation([
      ...conversation,
      {
        role: "user",
        content: message,
      },
    ])

    setMessage("")

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const exampleQuestions = [
    "What's a good beginner trail near Salt Lake City?",
    "How's the weather at Zion National Park this weekend?",
    "What gear do I need for hiking in Bryce Canyon?",
    "Are there any permits needed for Angels Landing?",
  ]

  const startSyncingProcess = (type: "source" | "files") => {
    if (type === "source") {
      setIsSourceSyncing(true)
      setIsSourceSynced(false)
      setTimeout(() => {
        setIsSourceSyncing(false)
        setIsSourceSynced(true)
      }, 10000)
    } else {
      setIsFilesSyncing(true)
      setIsFilesSynced(false)
      setTimeout(() => {
        setIsFilesSyncing(false)
        setIsFilesSynced(true)
      }, 10000)
    }
  }

  const handleDeleteSource = () => {
    setConnectedSource(null)
    setIsSourceSyncing(false)
    setIsSourceSynced(false)
  }

  const handleDeleteFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== id)
    setUploadedFiles(updatedFiles)

    if (updatedFiles.length === 0) {
      setIsFilesSyncing(false)
      setIsFilesSynced(false)
    }
  }

  const handleFileUpload = () => {
    // Simulate adding a new file
    const newFile = {
      id: `file${uploadedFiles.length + 1}`,
      name: `New-Upload-${Date.now()}.pdf`,
      type: "pdf" as const,
      size: "1.2 MB",
      uploadedAt: "just now",
    }

    setUploadedFiles([...uploadedFiles, newFile])
    // Start syncing process
    startSyncingProcess("files")
  }

  const getConnectorTypeIcon = (type: string) => {
    switch (type) {
      case "slack":
        return <Slack className="h-4 w-4 text-[#E01E5A]" />
      case "github":
        return <Github className="h-4 w-4 text-[#181717]" />
      case "google_drive":
        return <Database className="h-4 w-4 text-[#0F9D58]" />
      case "confluence":
        return <FileText className="h-4 w-4 text-[#0052CC]" />
      case "jira":
        return <Database className="h-4 w-4 text-[#0052CC]" />
      case "web":
        return <Globe className="h-4 w-4 text-[#4285F4]" />
      default:
        return <Database className="h-4 w-4 text-[#4285F4]" />
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "txt":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "docx":
        return <FileText className="h-4 w-4 text-blue-700" />
      case "csv":
        return <FileText className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const handleSendPreviewMessage = () => {
    if (!previewMessage.trim()) return

    // Add the message to preview messages
    const newMessage = { role: "user" as const, content: previewMessage }
    setPreviewMessages([...previewMessages, newMessage])

    // Clear the input after clicking send
    setPreviewMessage("")

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage = {
        role: "assistant" as const,
        content: `This is a simulated response from ${assistantName} using ${selectedModel.name}. In a real conversation, this would be an AI-generated response.`,
      }
      setPreviewMessages((prev) => [...prev, assistantMessage])

      // Scroll to bottom
      setTimeout(() => {
        previewMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 1000)
  }

  const handleAddUser = () => {
    if (!shareUserInput.trim()) return

    // In a real app, this would search for users from an API
    // For now, we'll simulate adding a user with the input as their name
    const newUser = {
      id: `user-${Date.now()}`,
      name: shareUserInput,
      email: `${shareUserInput.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    }

    setSharedUsers([...sharedUsers, newUser])
    setShareUserInput("")
  }

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter((user) => user.id !== userId))
  }

  // Section header component with collapse/expand functionality
  const SectionHeader = ({
    title,
    isExpanded,
    onToggle,
    rightElement,
  }: {
    title: string
    isExpanded: boolean
    onToggle: () => void
    rightElement?: React.ReactNode
  }) => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onToggle}>
        <h3 className="text-lg font-medium">{title}</h3>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {rightElement}
    </div>
  )

  const handleRegenerateAvatar = () => {
    // In a real implementation, this would call an API to generate a new avatar
    console.log("Regenerating avatar...")
    // Close the menu after action
    setIsAvatarMenuOpen(false)
  }

  const handleUploadAvatar = () => {
    // In a real implementation, this would open a file picker
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        console.log("File selected:", file.name)
        // Process the file upload
      }
    }
    input.click()
    // Close the menu after action
    setIsAvatarMenuOpen(false)
  }

  // Close avatar menu when clicking outside
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleClickOutside = (event: MouseEvent) => {
      if (isAvatarMenuOpen) {
        setIsAvatarMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isAvatarMenuOpen, isMounted])

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground">
      {/* Header - Fixed height */}
      <header className="border-b border-border py-3 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push("/my-assistants")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src="/red-rock-vista.png" alt="Utah Hiking Guide" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-xl font-medium">{assistantName}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground mr-1.5"></span>
                Draft
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6">Create</Button>
        </div>
      </header>

      {/* Main content - Flex grow to fill remaining space */}
      <div className="flex flex-1 min-h-0">
        {/* Left panel */}
        <div className="w-1/2 border-r border-border flex flex-col">
          {/* Tabs header - Fixed height */}
          <div className="border-b border-border shrink-0 sticky top-0 z-10 bg-background">
            <Tabs
              defaultValue="create"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "create" | "configure")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 p-4 bg-transparent">
                <TabsTrigger
                  value="create"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground"
                >
                  Create
                </TabsTrigger>
                <TabsTrigger
                  value="configure"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:border data-[state=active]:border-border data-[state=active]:shadow-sm data-[state=inactive]:bg-background data-[state=inactive]:text-muted-foreground"
                >
                  Configure
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Tab content - Scrollable */}
          <div className="flex-1 min-h-0 relative">
            {/* Create Tab Content */}
            {activeTab === "create" && (
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 pb-20">
                  <div className="space-y-6">
                    {conversation.map((msg, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {msg.role === "assistant" ? (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  className="text-muted-foreground"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">You</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div
                            className={cn(
                              "inline-block rounded-2xl px-4 py-2 text-sm",
                              msg.role === "assistant" ? "bg-secondary" : "bg-muted text-foreground",
                            )}
                          >
                            <p>{msg.content}</p>
                          </div>
                          {msg.image && (
                            <div className="mt-3 flex justify-center">
                              <div className="w-32 h-32 rounded-full overflow-hidden">
                                <Image
                                  src={msg.image || "/placeholder.svg"}
                                  alt="Generated profile picture"
                                  width={128}
                                  height={128}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                  </div>
                </div>

                {/* Input box - Fixed at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
                  <div className="relative bg-secondary rounded-full p-2 pl-4 pr-12 flex items-center">
                    <input
                      type="text"
                      placeholder="Message GPT Builder"
                      className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <div className="absolute right-2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleSendMessage}>
                        <ArrowUp className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Configure Tab Content */}
            {activeTab === "configure" && (
              <div className="absolute inset-0 overflow-y-auto p-6">
                <div className="space-y-8 max-w-3xl mx-auto pb-8">
                  {/* Avatar Display */}
                  <div className="flex flex-col items-center justify-center py-6">
                    <div
                      className="relative group"
                      onMouseEnter={() => setIsAvatarHovered(true)}
                      onMouseLeave={() => setIsAvatarHovered(false)}
                    >
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border">
                        <Image
                          src="/red-rock-vista.png"
                          alt={assistantName}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>

                      {isAvatarHovered && (
                        <div
                          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                          onClick={() => setIsAvatarMenuOpen(true)}
                        >
                          <Pencil className="h-8 w-8 text-white" />
                        </div>
                      )}

                      {isAvatarMenuOpen && (
                        <div className="absolute top-full mt-2 w-48 rounded-md shadow-lg bg-popover border border-border z-50">
                          <div className="py-1">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent"
                              onClick={handleRegenerateAvatar}
                            >
                              <Sparkles className="h-4 w-4 mr-2" />
                              Re-generate
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent"
                              onClick={handleUploadAvatar}
                            >
                              <Paperclip className="h-4 w-4 mr-2" />
                              Upload Picture
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mt-4">{assistantName}</h2>
                    <p className="text-sm text-muted-foreground mt-1 text-center max-w-md">{assistantDescription}</p>
                  </div>

                  {/* Basic Information Section */}
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <SectionHeader
                      title="Basic Information"
                      isExpanded={basicInfoExpanded}
                      onToggle={() => setBasicInfoExpanded(!basicInfoExpanded)}
                    />

                    {basicInfoExpanded && (
                      <div className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="name" className="text-sm font-medium">
                              Name
                            </Label>
                            <span
                              className={cn("text-xs", nameCharCount > 50 ? "text-red-500" : "text-muted-foreground")}
                            >
                              {nameCharCount}/50
                            </span>
                          </div>
                          <Input
                            id="name"
                            value={assistantName}
                            onChange={(e) => {
                              setAssistantName(e.target.value)
                              setNameCharCount(e.target.value.length)
                            }}
                            maxLength={50}
                            className={cn(
                              "bg-secondary border-none",
                              nameCharCount > 50 && "border-red-500 focus-visible:ring-red-500",
                            )}
                            placeholder="Enter assistant name"
                          />
                          {nameCharCount > 50 && (
                            <p className="text-xs text-red-500 mt-1">Name exceeds maximum length of 50 characters</p>
                          )}
                        </div>

                        {/* Description Input */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="description" className="text-sm font-medium">
                              Description
                            </Label>
                            <span
                              className={cn(
                                "text-xs",
                                descriptionCharCount > 200 ? "text-red-500" : "text-muted-foreground",
                              )}
                            >
                              {descriptionCharCount}/200
                            </span>
                          </div>
                          <Textarea
                            id="description"
                            value={assistantDescription}
                            onChange={(e) => {
                              setAssistantDescription(e.target.value)
                              setDescriptionCharCount(e.target.value.length)
                            }}
                            maxLength={200}
                            className={cn(
                              "bg-secondary border-none resize-none h-24",
                              descriptionCharCount > 200 && "border-red-500 focus-visible:ring-red-500",
                            )}
                            placeholder="Enter a brief description of what your assistant does"
                          />
                          {descriptionCharCount > 200 && (
                            <p className="text-xs text-red-500 mt-1">
                              Description exceeds maximum length of 200 characters
                            </p>
                          )}
                        </div>

                        {/* Instructions Input */}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="instructions" className="text-sm font-medium">
                              Instructions
                            </Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs"
                              onClick={() => setIsInstructionModalOpen(true)}
                            >
                              <Maximize2 className="h-3.5 w-3.5 mr-1" />
                              Expand
                            </Button>
                          </div>
                          <div className="relative">
                            <Textarea
                              id="instructions"
                              value={assistantInstruction}
                              onChange={(e) => setAssistantInstruction(e.target.value)}
                              className="bg-secondary border-none resize-none min-h-[200px]"
                              placeholder="Provide detailed instructions for your assistant"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Detailed instructions that determine how your assistant behaves, what it knows, and how it
                            responds to users.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Capabilities Section */}
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <SectionHeader
                      title="Capabilities"
                      isExpanded={capabilitiesExpanded}
                      onToggle={() => setCapabilitiesExpanded(!capabilitiesExpanded)}
                    />

                    {capabilitiesExpanded && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="internet-search" className="text-sm font-medium">
                              Internet Search
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow the assistant to search the internet for information
                            </p>
                          </div>
                          <Switch id="internet-search" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="image-generation" className="text-sm font-medium">
                              Image Generation
                            </Label>
                            <p className="text-xs text-muted-foreground">Allow the assistant to generate images</p>
                          </div>
                          <Switch id="image-generation" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="create-jira" className="text-sm font-medium">
                              Create Jira Ticket
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow the assistant to create Jira tickets based on conversations
                            </p>
                          </div>
                          <Switch id="create-jira" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Knowledge Section */}
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <SectionHeader
                      title="Knowledge"
                      isExpanded={knowledgeExpanded}
                      onToggle={() => setKnowledgeExpanded(!knowledgeExpanded)}
                      rightElement={
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => setShowKnowledgeConfig(!showKnowledgeConfig)}
                          disabled={!hasKnowledgeSources}
                        >
                          <Settings className="h-3.5 w-3.5" />
                          Configure
                        </Button>
                      }
                    />

                    {knowledgeExpanded && (
                      <>
                        {/* Knowledge Configuration Section */}
                        {showKnowledgeConfig && (
                          <div className="border border-border rounded-lg p-4 mb-4 space-y-6">
                            <h4 className="text-sm font-medium mb-2">Knowledge Configuration</h4>

                            {/* Number of context Documents */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label htmlFor="contextDocuments" className="text-sm font-medium">
                                  Number of Context Documents
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Number of top matched documents to feed to the LLM before generating the answer.
                                </p>
                              </div>
                              <div>
                                <Input
                                  id="contextDocuments"
                                  type="number"
                                  min="1"
                                  max="100"
                                  value={contextDocuments}
                                  onChange={(e) => setContextDocuments(Number.parseInt(e.target.value) || 20)}
                                  className="w-full"
                                />
                              </div>
                            </div>

                            {/* Search Start Date with DatePicker */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label htmlFor="searchStartDate" className="text-sm font-medium">
                                  Search Start Date (Optional)
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1 max-w-md break-words">
                                  Limit the search results to prefer newer documents.
                                </p>
                              </div>
                              <div>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="searchStartDate"
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !searchStartDate && "text-muted-foreground",
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {searchStartDate ? format(searchStartDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={searchStartDate}
                                      onSelect={setSearchStartDate}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>

                            {/* Relevance Filter */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label htmlFor="relevanceFilter" className="text-sm font-medium">
                                  Relevance Filter
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1 max-w-md break-words">
                                  Extra filter to remove not useful contents from the search results.
                                </p>
                              </div>
                              <div>
                                <Switch
                                  id="relevanceFilter"
                                  checked={relevanceFilter}
                                  onCheckedChange={(checked) => setRelevanceFilter(checked)}
                                  className="mt-2"
                                />
                              </div>
                            </div>

                            {/* Include Citation */}
                            <div className="grid grid-cols-2 gap-4 items-start">
                              <div>
                                <Label htmlFor="includeCitation" className="text-sm font-medium">
                                  Include Citation
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1 max-w-md break-words">
                                  If set, the response will include bracket citations ([1], [2], etc.) for each document
                                  used by the LLM to help inform the response. We recommend leaving this enabled to
                                  increase trust in the LLM answer.
                                </p>
                              </div>
                              <div>
                                <Switch
                                  id="includeCitation"
                                  checked={includeCitation}
                                  onCheckedChange={(checked) => setIncludeCitation(checked)}
                                  className="mt-2"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="border border-border rounded-lg overflow-hidden">
                          <div className="border-b border-border">
                            <div className="flex">
                              <button
                                className={`px-4 py-3 text-sm font-medium ${activeKnowledgeTab === "connected" ? "bg-secondary border-b-2 border-primary" : "bg-background text-muted-foreground"}`}
                                onClick={() => setActiveKnowledgeTab("connected")}
                              >
                                Connected Sources
                              </button>
                              <button
                                className={`px-4 py-3 text-sm font-medium ${activeKnowledgeTab === "files" ? "bg-secondary border-b-2 border-primary" : "bg-background text-muted-foreground"}`}
                                onClick={() => setActiveKnowledgeTab("files")}
                              >
                                Uploaded Files
                              </button>
                            </div>
                          </div>

                          <div className="p-6">
                            {activeKnowledgeTab === "files" ? (
                              <>
                                {uploadedFiles.length === 0 ? (
                                  // Empty state for Uploaded Files
                                  <div className="p-6 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <h4 className="text-base font-medium mb-1">Add knowledge files</h4>
                                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                                      Upload files to give your assistant additional knowledge to reference when
                                      responding to users.
                                    </p>
                                    <Button variant="outline" className="gap-2" onClick={handleFileUpload}>
                                      <Paperclip className="h-4 w-4" />
                                      Upload files
                                    </Button>
                                  </div>
                                ) : (
                                  // Display uploaded files
                                  <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-medium">Your Files</h4>
                                        {isFilesSyncing && (
                                          <div className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            <span>Syncing</span>
                                          </div>
                                        )}
                                        {isFilesSynced && (
                                          <div className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="h-3 w-3" />
                                            <span>Synced</span>
                                          </div>
                                        )}
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1"
                                        onClick={handleFileUpload}
                                        disabled={isFilesSyncing}
                                        title={isFilesSyncing ? "Cannot upload while syncing" : "Upload more files"}
                                      >
                                        <Paperclip className="h-3.5 w-3.5" />
                                        Upload More
                                      </Button>
                                    </div>

                                    <div className="space-y-3">
                                      {uploadedFiles.map((file) => (
                                        <div
                                          key={file.id}
                                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                                        >
                                          <div className="flex items-center gap-3">
                                            {getFileIcon(file.type)}
                                            <div>
                                              <p className="font-medium text-sm">{file.name}</p>
                                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{file.size}</span>
                                                <span>•</span>
                                                <span>Uploaded {file.uploadedAt}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() => handleDeleteFile(file.id)}
                                            disabled={isFilesSyncing}
                                            title={isFilesSyncing ? "Cannot delete while syncing" : "Delete file"}
                                          >
                                            <Trash2
                                              className={`h-4 w-4 ${isFilesSyncing ? "text-muted-foreground/50" : "text-muted-foreground"}`}
                                            />
                                          </Button>
                                        </div>
                                      ))}
                                      {isFilesSyncing && (
                                        <div className="flex items-center justify-center p-3 border border-border rounded-lg bg-secondary text-muted-foreground">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Syncing files...
                                        </div>
                                      )}
                                      {isFilesSynced && (
                                        <div className="flex items-center justify-center p-3 border border-border rounded-lg bg-secondary text-green-500">
                                          <CheckCircle2 className="mr-2 h-4 w-4" />
                                          Files synced
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {!connectedSource ? (
                                  // Empty state for Connected Sources
                                  <div className="flex flex-col items-center justify-center text-center py-8">
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                                      <Database className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <h4 className="text-base font-medium mb-1">No connected sources</h4>
                                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                                      Connect to external data sources like Slack, Confluence, or Google Drive to give
                                      your assistant access to your organization's knowledge.
                                    </p>
                                    <Button onClick={() => setShowConnectSourceModal(true)} className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Create Connected Source
                                    </Button>
                                  </div>
                                ) : (
                                  // Display connected sources when they exist
                                  <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-4">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-medium">Your Connected Source</h4>
                                        {isSourceSyncing && (
                                          <div className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            <span>Syncing</span>
                                          </div>
                                        )}
                                        {isSourceSynced && (
                                          <div className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                                            <CheckCircle2 className="h-3 w-3" />
                                            <span>Synced</span>
                                          </div>
                                        )}
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowConnectSourceModal(true)}
                                        className="gap-1"
                                        disabled={!!connectedSource || isSourceSyncing}
                                        title={
                                          isSourceSyncing
                                            ? "Cannot add source while syncing"
                                            : !!connectedSource
                                              ? "Only one source allowed"
                                              : "Add source"
                                        }
                                      >
                                        <Plus className="h-3.5 w-3.5" />
                                        Add Source
                                      </Button>
                                    </div>

                                    <div className="space-y-3">
                                      <div className="p-3 border border-border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-3">
                                            <Database className="h-5 w-5 text-primary" />
                                            <div>
                                              <p className="font-medium text-sm">{connectedSource.name}</p>
                                              <p className="text-xs text-muted-foreground">
                                                {connectedSource.selectedConnectors.length} connectors
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2">
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-8 w-8 rounded-full"
                                              onClick={() => {
                                                // Open the modal for editing
                                                setShowConnectSourceModal(true)
                                              }}
                                              disabled={isSourceSyncing}
                                              title={isSourceSyncing ? "Cannot edit while syncing" : "Edit source"}
                                            >
                                              <Pencil
                                                className={`h-4 w-4 ${isSourceSyncing ? "text-muted-foreground/50" : "text-muted-foreground"}`}
                                              />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-8 w-8 rounded-full"
                                              onClick={handleDeleteSource}
                                              disabled={isSourceSyncing}
                                              title={isSourceSyncing ? "Cannot delete while syncing" : "Delete source"}
                                            >
                                              <Trash2
                                                className={`h-4 w-4 ${isSourceSyncing ? "text-muted-foreground/50" : "text-muted-foreground"}`}
                                              />
                                            </Button>
                                          </div>
                                        </div>

                                        {/* Connector type pills */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                          {connectedSource.connectorTypes.map((type) => (
                                            <div
                                              key={type}
                                              className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-xs"
                                            >
                                              {getConnectorTypeIcon(type)}
                                              {type}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      {isSourceSyncing && (
                                        <div className="flex items-center justify-center p-3 border border-border rounded-lg bg-secondary text-muted-foreground">
                                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                          Syncing source...
                                        </div>
                                      )}
                                      {isSourceSynced && (
                                        <div className="flex items-center justify-center p-3 border border-border rounded-lg bg-secondary text-green-500">
                                          <CheckCircle2 className="mr-2 h-4 w-4" />
                                          Source synced
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Conversation Starters Section */}
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <SectionHeader
                      title="Conversation Starters"
                      isExpanded={conversationStartersExpanded}
                      onToggle={() => setConversationStartersExpanded(!conversationStartersExpanded)}
                    />

                    {conversationStartersExpanded && (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Add example prompts to help users understand what they can ask your assistant.
                        </p>
                        <div className="space-y-3">
                          {exampleQuestions.map((question, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <Input
                                value={question}
                                onChange={(e) => {
                                  const newQuestions = [...exampleQuestions]
                                  newQuestions[index] = e.target.value
                                  // Update example questions state here
                                }}
                                className="bg-secondary border-none"
                                placeholder={`Conversation starter ${index + 1}`}
                              />
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full mt-2">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate More Starters
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Privacy Section */}
                  <div className="space-y-4 border border-border rounded-lg p-4">
                    <SectionHeader
                      title="Privacy"
                      isExpanded={privacyExpanded}
                      onToggle={() => setPrivacyExpanded(!privacyExpanded)}
                    />

                    {privacyExpanded && (
                      <>
                        <p className="text-sm text-muted-foreground mb-4">
                          Control who can access and use this assistant.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="privacy-private"
                              name="privacy"
                              checked={privacyMode === "private"}
                              onChange={() => setPrivacyMode("private")}
                              className="h-4 w-4 text-primary"
                            />
                            <div className="grid gap-1.5">
                              <Label htmlFor="privacy-private" className="text-sm font-medium">
                                Private
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Only you can access and use this assistant.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="privacy-public"
                              name="privacy"
                              checked={privacyMode === "public"}
                              onChange={() => setPrivacyMode("public")}
                              className="h-4 w-4 text-primary"
                            />
                            <div className="grid gap-1.5">
                              <Label htmlFor="privacy-public" className="text-sm font-medium">
                                Public
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Anyone in your organization can access and use this assistant.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="privacy-share"
                              name="privacy"
                              checked={privacyMode === "share"}
                              onChange={() => setPrivacyMode("share")}
                              className="h-4 w-4 text-primary"
                            />
                            <div className="grid gap-1.5">
                              <Label htmlFor="privacy-share" className="text-sm font-medium">
                                Share
                              </Label>
                              <p className="text-xs text-muted-foreground">Share this assistant with specific users.</p>
                            </div>
                          </div>

                          {privacyMode === "share" && (
                            <div className="mt-4 space-y-4">
                              <div className="flex gap-2">
                                <div className="relative flex-1">
                                  <Input
                                    placeholder="Search users by name or email"
                                    value={shareUserInput}
                                    onChange={(e) => setShareUserInput(e.target.value)}
                                    className="bg-secondary border-none pr-10"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" && shareUserInput.trim()) {
                                        e.preventDefault()
                                        handleAddUser()
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full rounded-l-none"
                                    onClick={handleAddUser}
                                    disabled={!shareUserInput.trim()}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {sharedUsers.length > 0 && (
                                <div className="space-y-2">
                                  <Label className="text-sm">Shared with:</Label>
                                  <div className="space-y-2">
                                    {sharedUsers.map((user) => (
                                      <div
                                        key={user.id}
                                        className="flex items-center justify-between p-2 bg-secondary rounded-md"
                                      >
                                        <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            {user.name.charAt(0).toUpperCase()}
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium">{user.name}</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 rounded-full"
                                          onClick={() => handleRemoveUser(user.id)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/2 flex flex-col">
          {/* Preview header - Fixed height */}
          <div className="p-4 border-b border-border shrink-0 flex items-center">
            {/* Model selector in top left corner */}
            <div className="flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{selectedModel.name}</span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[220px]">
                  {availableModels.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className="flex items-center justify-between py-2 px-3 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">{model.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{model.description}</span>
                      </div>
                      {selectedModel.id === model.id && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Preview title in center */}
            <h2 className="text-xl font-medium text-center flex-1">Preview</h2>

            {/* Empty div to balance the layout */}
            <div className="flex-1"></div>
          </div>

          {/* Preview content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {previewMessages.length === 0 ? (
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                  <Image src="/red-rock-vista.png" alt="Utah Hiking Guide" width={64} height={64} />
                </div>
                <h3 className="text-2xl font-bold mb-1">{assistantName}</h3>
                <p className="text-muted-foreground text-sm max-w-md">{assistantDescription}</p>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  {exampleQuestions.map((question, index) => (
                    <div
                      key={index}
                      className="bg-secondary rounded-xl p-3 text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => {
                        // Set the question as the preview message and trigger send
                        setPreviewMessage(question)
                        const newMessage = { role: "user" as const, content: question }
                        setPreviewMessages([...previewMessages, newMessage])

                        // Simulate assistant response after a short delay
                        setTimeout(() => {
                          const assistantMessage = {
                            role: "assistant" as const,
                            content: `This is a simulated response from ${assistantName} using ${selectedModel.name}. In a real conversation, this would be an AI-generated response.`,
                          }
                          setPreviewMessages((prev) => [...prev, assistantMessage])

                          // Scroll to bottom
                          setTimeout(() => {
                            previewMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                          }, 100)
                        }, 1000)
                      }}
                    >
                      {question}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {previewMessages.map((msg, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {msg.role === "assistant" ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <Image src="/red-rock-vista.png" alt="Utah Hiking Guide" width={32} height={32} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">You</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={cn(
                          "inline-block rounded-2xl px-4 py-2 text-sm",
                          msg.role === "assistant" ? "bg-secondary" : "bg-muted text-foreground",
                        )}
                      >
                        <p>{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={previewMessagesEndRef}></div>
              </div>
            )}
          </div>

          {/* Preview input - Fixed height */}
          <div className="p-4 border-t border-border shrink-0">
            <div className="relative bg-secondary rounded-full p-2 pl-4 pr-12 flex items-center">
              <input
                type="text"
                placeholder={`Message ${assistantName}`}
                className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
                value={previewMessage}
                onChange={(e) => setPreviewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && previewMessage.trim()) {
                    e.preventDefault()
                    handleSendPreviewMessage()
                  }
                }}
              />
              <div className="absolute right-2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleSendPreviewMessage}>
                  <ArrowUp className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help button */}
      <div className="fixed bottom-4 right-4 z-20">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-border">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Instruction Modal */}
      <Dialog open={isInstructionModalOpen} onOpenChange={setIsInstructionModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Assistant Instructions</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh]">
            <Textarea
              value={assistantInstruction}
              onChange={(e) => setAssistantInstruction(e.target.value)}
              className="min-h-[400px] resize-none border-none focus-visible:ring-0 p-0"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setIsInstructionModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Connect Source Modal */}
      <ConnectSourceModal
        open={showConnectSourceModal}
        onOpenChange={setShowConnectSourceModal}
        onSourceCreated={(source) => {
          // Replace any existing source with the new one
          setConnectedSource(source)
          // Start syncing process
          startSyncingProcess("source")
        }}
      />
    </div>
  )
}
