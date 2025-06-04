"use client"

import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Assistant {
  id: string
  name: string
  description: string
  type: "Built-in" | "Public" | "Shared"
  isVisible: boolean
  hasActions?: boolean
}

const assistants: Assistant[] = [
  {
    id: "aura-ai",
    name: "Aura AI",
    description:
      "Aura AI is your personal work companion at Mindvalley, designed to streamline your workday. It provides quick answers using vast internal documents and connected sources. Aura AI offers assistance with almost anything, delivering accurate and up-to-date information to help you achieve your goals fast.",
    type: "Built-in",
    isVisible: true,
  },
  {
    id: "general-gpt",
    name: "General GPT",
    description:
      "Assistant with no access to documents. Chat with the selected Model, such as Gemini 1.5 Pro or GPT 4.",
    type: "Built-in",
    isVisible: true,
  },
  {
    id: "gpt-internet-search",
    name: "GPT Internet Search",
    description: "Use this Assistant to search the Internet for you (via Bing) and getting the answer",
    type: "Built-in",
    isVisible: true,
  },
  {
    id: "art",
    name: "Art",
    description: "Assistant for generating images based on descriptions.",
    type: "Built-in",
    isVisible: false,
  },
  {
    id: "mindvalley-dashboard-finder",
    name: "Mindvalley Dashboard Finder",
    description:
      "To Find a Dashboard, Let me know what you are looking for and I'll find you the right dashboard for that.",
    type: "Public",
    isVisible: true,
    hasActions: true,
  },
  {
    id: "it-hr-help-desk-bot",
    name: "IT & HR Help Desk Bot",
    description: "IT & HR Help Desk Bot",
    type: "Public",
    isVisible: false,
    hasActions: true,
  },
  {
    id: "data-ai-assistant",
    name: "Data AI Assistant",
    description: "Data Assistant to support Mindvalley teams",
    type: "Shared",
    isVisible: true,
    hasActions: true,
  },
]

export default function AssistantsPage() {
  const router = useRouter()

  const handleEdit = (id: string) => {
    router.push(`/admin/assistants/${id}/edit`)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Assistants</h1>
        <p className="text-gray-600 mb-4">
          Assistants are a way to build custom search/question-answering experiences for different use cases.
        </p>
        <p className="text-gray-600 mb-2">They allow you to customize:</p>
        <ul className="list-disc pl-6 text-gray-600 space-y-1">
          <li>The prompt used by your LLM of choice to respond to the user query</li>
          <li>The documents that are used as context</li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create an Assistant</h2>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Assistant
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Assistants</h2>
        <p className="text-gray-600 mb-4">
          Assistants will be displayed as options on the Chat / Search interfaces in the order they are displayed below.
          Assistants marked as hidden will not be displayed. Editable assistants are shown at the top.
        </p>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[400px]">Description</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Is Visible</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assistants.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell className="font-medium">{assistant.name}</TableCell>
                  <TableCell>{assistant.description}</TableCell>
                  <TableCell>
                    {assistant.type === "Built-in" ? (
                      <span className="text-sm text-gray-600">Built-in</span>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-900 hover:bg-gray-100">
                        {assistant.type}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch checked={assistant.isVisible} />
                  </TableCell>
                  <TableCell>
                    {assistant.hasActions && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(assistant.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
