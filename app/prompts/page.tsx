"use client"

import { useState } from "react"
import { Search, Mic, FileText, ImageIcon, Type, Video, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Prompt {
  id: string
  title: string
  description: string
  type: "audio" | "document" | "image" | "text" | "video"
  category: string
}

const prompts: Prompt[] = [
  {
    id: "1",
    title: "Ad copy from video",
    description: "Write a creative ad copy based on a video.",
    type: "video",
    category: "marketing",
  },
  {
    id: "2",
    title: "Advertising Campaign",
    description: "The AI is tasked to create advertising campaigns for its clients.",
    type: "text",
    category: "marketing",
  },
  {
    id: "3",
    title: "Airline reviews",
    description: "The prompt asks the model to write a summary based on customer reviews of an airline company.",
    type: "text",
    category: "analysis",
  },
  {
    id: "4",
    title: "Animal Information Chatbot",
    description: "The animal assistant chatbot answers questions about animals.",
    type: "text",
    category: "education",
  },
  {
    id: "5",
    title: "Audio Summarization",
    description: "Summarize an audio file",
    type: "audio",
    category: "transcription",
  },
  // Add more prompts as needed
]

const mediaTypes = [
  { id: "audio", label: "Audio", icon: Mic, color: "text-orange-500" },
  { id: "document", label: "Document", icon: FileText, color: "text-purple-500" },
  { id: "image", label: "Image", icon: ImageIcon, color: "text-pink-500" },
  { id: "text", label: "Text", icon: Type, color: "text-teal-500" },
  { id: "video", label: "Video", icon: Video, color: "text-blue-500" },
] as const

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [selectedFeatures, setSelectedFeatures] = useState<string>("")
  const [selectedPromptTypes, setSelectedPromptTypes] = useState<string>("")

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(prompt.type)
    return matchesSearch && matchesType
  })

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((current) => (current.includes(type) ? current.filter((t) => t !== type) : [...current, type]))
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setSelectedTask("")
    setSelectedFeatures("")
    setSelectedPromptTypes("")
  }

  return (
    <div className="container max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Prompt gallery</h1>
        <p className="text-lg text-muted-foreground">
          Browse prompts across media types and models to help you get started.
        </p>
      </div>

      <div className="space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sample prompts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-4">
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedFeatures} onValueChange={setSelectedFeatures}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Features" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="experimental">Experimental</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPromptTypes} onValueChange={setSelectedPromptTypes}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Prompt types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="assistant">Assistant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {mediaTypes.map(({ id, label, icon: Icon, color }) => (
                <Button
                  key={id}
                  variant="outline"
                  className={cn("gap-2", selectedTypes.includes(id) && "bg-secondary")}
                  onClick={() => handleTypeToggle(id)}
                >
                  <Icon className={cn("h-4 w-4", color)} />
                  {label}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPrompts.map((prompt) => {
            const mediaType = mediaTypes.find((type) => type.id === prompt.type)
            const Icon = mediaType?.icon || Type

            return (
              <div
                key={prompt.id}
                className="relative bg-card rounded-lg border p-6 hover:border-foreground/50 transition-colors h-[180px] flex flex-col"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      prompt.type === "audio" && "bg-orange-50",
                      prompt.type === "document" && "bg-purple-50",
                      prompt.type === "image" && "bg-pink-50",
                      prompt.type === "text" && "bg-teal-50",
                      prompt.type === "video" && "bg-blue-50",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", mediaType?.color)} />
                  </div>
                  <h3 className="font-semibold text-base truncate">{prompt.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{prompt.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
