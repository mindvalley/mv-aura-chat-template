"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GripVertical, Pencil, MoreHorizontal, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Assistant {
  id: string
  name: string
  icon: string
  iconBg: string
  tools: number
  isPublic: boolean
  category: string
}

const assistants: Assistant[] = [
  {
    id: "1",
    name: "Aura AI",
    icon: "A",
    iconBg: "bg-blue-600",
    tools: 1,
    isPublic: true,
    category: "Productivity",
  },
  {
    id: "2",
    name: "General GPT",
    icon: "G",
    iconBg: "bg-green-600",
    tools: 0,
    isPublic: true,
    category: "Writing",
  },
  {
    id: "3",
    name: "GPT Internet Search",
    icon: "S",
    iconBg: "bg-red-600",
    tools: 0,
    isPublic: true,
    category: "Research & Analysis",
  },
  {
    id: "4",
    name: "Mindvalley Content Builder",
    icon: "M",
    iconBg: "bg-purple-600",
    tools: 1,
    isPublic: true,
    category: "Writing",
  },
  {
    id: "5",
    name: "Eve In-App Notifications Generator",
    icon: "E",
    iconBg: "bg-orange-600",
    tools: 0,
    isPublic: false,
    category: "Programming",
  },
  {
    id: "6",
    name: "Data Analyzer",
    icon: "D",
    iconBg: "bg-cyan-600",
    tools: 2,
    isPublic: true,
    category: "Research & Analysis",
  },
  {
    id: "7",
    name: "Fitness Coach",
    icon: "F",
    iconBg: "bg-pink-600",
    tools: 1,
    isPublic: true,
    category: "Lifestyle",
  },
]

function AssistantRow({ assistant }: { assistant: Assistant }) {
  const router = useRouter()

  const handleEdit = (id: string) => {
    router.push(`/assistants/${id}/edit`)
  }

  return (
    <div className="group flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg bg-gray-800">
      <button className="opacity-0 group-hover:opacity-100 cursor-grab">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </button>

      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", assistant.iconBg)}>
        <span className="text-sm font-medium">{assistant.icon}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">{assistant.name}</h3>
      </div>

      {assistant.tools > 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {assistant.tools} tool{assistant.tools > 1 ? "s" : ""}
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-300">{assistant.isPublic ? "Public" : "Private"}</div>

      <button className="opacity-0 group-hover:opacity-100" onClick={() => handleEdit(assistant.id)}>
        <Pencil className="w-4 h-4 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Hide Assistant</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete Assistant</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CategorySection({ name, assistants }: { name: string; assistants: Assistant[] }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="mb-8">
      <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center justify-between w-full mb-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{name}</h2>
        <ChevronRight
          className={cn("w-5 h-5 text-gray-500 transition-transform", isExpanded && "transform rotate-90")}
        />
      </button>
      {isExpanded && (
        <div className="border dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 bg-gray-800">
          {assistants.map((assistant) => (
            <AssistantRow key={assistant.id} assistant={assistant} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function MyAssistantsPage() {
  const router = useRouter()
  const categories = Array.from(new Set(assistants.map((a) => a.category)))

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">My Assistants</h1>

      <div className="flex gap-4 justify-center mb-12">
        <Button
          variant="custom"
          size="sm"
          className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 bg-neutral-900 border-border hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-9 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-3xl"
          onClick={() => router.push("/my-assistants/create")}
        >
          <Sparkles className="h-4 w-4" />
          Create
        </Button>
      </div>

      <div className="mb-12">
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The order of assistants within each category determines their appearance in the Assistants dropdown. The first
          assistant listed will be your default assistant when you start a new chat. Drag and drop to reorder within
          categories.
        </p>

        {categories.map((category) => (
          <CategorySection
            key={category}
            name={category}
            assistants={assistants.filter((a) => a.category === category)}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your Hidden Assistants</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Assistants you've created that aren't currently visible in the Assistants selector.
        </p>

        <div className="border rounded-lg p-8 text-center text-gray-500 dark:text-gray-400">No hidden assistants</div>
      </div>
    </div>
  )
}
