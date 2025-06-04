"use client"

import { useState } from "react"
import {
  Info,
  ChevronDown,
  Check,
  Settings,
  Briefcase,
  Megaphone,
  Cpu,
  Users,
  Box,
  BarChart2,
  GraduationCap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ModelSelector } from "@/components/model-selector/model-selector"

interface Assistant {
  id: string
  name: string
  description: string
  instructions: string
  defaultModel: string
  capabilities: {
    imageGeneration: boolean
    search: boolean
    internetSearch: boolean
  }
  isVisible: boolean
  type: "Built-in" | "Public" | "Shared"
  categories: string[]
}

interface AssistantEditFormProps {
  assistant: Assistant
  onUpdate: (updatedAssistant: Assistant) => void
  onDelete: () => void
}

const categories = [
  { id: "vishen-picks", name: "Vishen Picks", icon: Settings, color: "#3B82F6" },
  { id: "production", name: "Production", icon: Briefcase, color: "#10B981" },
  { id: "marketing", name: "Marketing", icon: Megaphone, color: "#F59E0B" },
  { id: "technology", name: "Technology", icon: Cpu, color: "#6366F1" },
  { id: "hr", name: "HR", icon: Users, color: "#EC4899" },
  { id: "product", name: "Product", icon: Box, color: "#8B5CF6" },
  { id: "operation", name: "Operation", icon: Settings, color: "#14B8A6" },
  { id: "data-analysis", name: "Data Analysis", icon: BarChart2, color: "#EF4444" },
  { id: "coaching-learning", name: "Coaching & Learning", icon: GraduationCap, color: "#F97316" },
  { id: "general-purpose", name: "General Purpose", icon: Globe, color: "#64748B" },
]

export function AssistantEditForm({ assistant, onUpdate, onDelete }: AssistantEditFormProps) {
  const [formData, setFormData] = useState<Assistant>({
    ...assistant,
    categories: assistant.categories || [],
  })
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => {
      const currentCategories = prev.categories
      if (currentCategories.includes(categoryId)) {
        return {
          ...prev,
          categories: currentCategories.filter((id) => id !== categoryId),
        }
      }
      if (currentCategories.length >= 2) {
        return prev
      }
      return {
        ...prev,
        categories: [...currentCategories, categoryId],
      }
    })
  }

  const handleUpdate = () => {
    onUpdate(formData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="name">Name</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>The name of your assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>A brief description of what your assistant does</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="instructions">Instructions</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Detailed instructions for your assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Textarea
          id="instructions"
          value={formData.instructions}
          onChange={(e) => setFormData((prev) => ({ ...prev, instructions: e.target.value }))}
          className="min-h-[200px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="model">Default AI Model</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the default AI model for this assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ModelSelector
          selectedModel={formData.defaultModel}
          onModelChange={(value) => setFormData((prev) => ({ ...prev, defaultModel: value }))}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label>Capabilities</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the capabilities for your assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="link" className="text-xs text-gray-500" onClick={() => setIsAdvancedOpen(true)}>
            Advanced
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="image-gen"
              checked={formData.capabilities.imageGeneration}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  capabilities: { ...prev.capabilities, imageGeneration: checked as boolean },
                }))
              }
            />
            <Label htmlFor="image-gen">Image Generation Tool</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="search"
              checked={formData.capabilities.search}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  capabilities: { ...prev.capabilities, search: checked as boolean },
                }))
              }
            />
            <Label htmlFor="search">Search Tool</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internet-search"
              checked={formData.capabilities.internetSearch}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  capabilities: { ...prev.capabilities, internetSearch: checked as boolean },
                }))
              }
            />
            <Label htmlFor="internet-search">[Beta] Internet Search Tool</Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="visibility">Visibility</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Control whether this assistant is visible to users</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visibility"
            checked={formData.isVisible}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isVisible: checked as boolean }))}
          />
          <Label htmlFor="visibility">Visible</Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="type">Type</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the type of this assistant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          value={formData.type}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, type: value as "Built-in" | "Public" | "Shared" }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Built-in">Built-in</SelectItem>
            <SelectItem value="Public">Public</SelectItem>
            <SelectItem value="Shared">Shared</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 font-medium">
          Categories
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", isCategoriesOpen ? "transform rotate-180" : "")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryToggle(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors",
                    formData.categories.includes(category.id)
                      ? "bg-gray-200 text-gray-800"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                  )}
                  disabled={formData.categories.length === 2 && !formData.categories.includes(category.id)}
                >
                  <Icon className="w-4 h-4" style={{ color: category.color }} />
                  <span>{category.name}</span>
                  {formData.categories.includes(category.id) && <Check className="w-4 h-4 ml-1" />}
                </button>
              )
            })}
          </div>
          <div className="mt-4 text-sm text-gray-600">Selected categories: {formData.categories.length}/2</div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 font-medium">
          Advanced Options
          <ChevronDown
            className={cn("h-5 w-5 transition-transform duration-200", isAdvancedOpen ? "transform rotate-180" : "")}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">{/* Advanced options content */}</CollapsibleContent>
      </Collapsible>

      <Button onClick={handleUpdate} className="w-full bg-green-600 hover:bg-green-700">
        Update!
      </Button>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Delete Assistant</h2>
        <Button onClick={onDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  )
}
