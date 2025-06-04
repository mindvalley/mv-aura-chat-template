"use client"

import { useRouter, useParams } from "next/navigation"
import { AssistantEditForm } from "@/components/assistant-edit-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

// This would typically come from an API or database
const assistants = {
  "aura-ai": {
    id: "aura-ai",
    name: "Aura AI",
    description:
      "Aura AI is your personal work companion at Mindvalley, designed to streamline your workday. It provides quick answers using vast internal documents and connected sources. Aura AI offers assistance with almost anything, delivering accurate and up-to-date information to help you achieve your goals fast.",
    instructions:
      "You are Aura AI, a personal work companion designed to streamline workdays at Mindvalley. Provide quick answers using vast internal documents and connected sources. Offer assistance with almost anything, delivering accurate and up-to-date information to help users achieve their goals fast.",
    defaultModel: "gemini-pro",
    capabilities: {
      imageGeneration: false,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
  },
  "general-gpt": {
    id: "general-gpt",
    name: "General GPT",
    description:
      "Assistant with no access to documents. Chat with the selected Model, such as Gemini 1.5 Pro or GPT 4.",
    instructions:
      "You are a general-purpose AI assistant. Engage in conversations on a wide range of topics, providing informative and helpful responses based on your training data. You do not have access to external documents or real-time information.",
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: false,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
  },
  "gpt-internet-search": {
    id: "gpt-internet-search",
    name: "GPT Internet Search",
    description: "Use this Assistant to search the Internet for you (via Bing) and getting the answer",
    instructions:
      "You are an AI assistant with internet search capabilities. When asked a question, use your internet search tool to find the most up-to-date and relevant information. Summarize the findings concisely and accurately.",
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: false,
      internetSearch: true,
    },
    isVisible: true,
    type: "Built-in",
  },
  "mindvalley-dashboard-finder": {
    id: "mindvalley-dashboard-finder",
    name: "Mindvalley Dashboard Finder",
    description:
      "To Find a Dashboard, Let me know what you are looking for and I'll find you the right dashboard for that.",
    instructions:
      "You are a specialized assistant designed to help users find the right Mindvalley dashboard. When a user describes what they're looking for, analyze their request and recommend the most appropriate dashboard(s) based on Mindvalley's available options. Provide brief explanations of why each recommended dashboard is relevant to their needs.",
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Public",
  },
  "it-hr-help-desk-bot": {
    id: "it-hr-help-desk-bot",
    name: "IT & HR Help Desk Bot",
    description: "IT & HR Help Desk Bot",
    instructions:
      "You are an AI assistant specializing in IT and HR support for Mindvalley employees. Provide helpful information and guidance on common IT issues, company policies, HR procedures, and employee benefits. When you don't have the specific information, direct users to the appropriate department or resource.",
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: true,
      internetSearch: false,
    },
    isVisible: false,
    type: "Public",
  },
  "data-ai-assistant": {
    id: "data-ai-assistant",
    name: "Data AI Assistant",
    description: "Data Assistant to support Mindvalley teams",
    instructions:
      "You are a data analysis assistant for Mindvalley teams. Help users interpret data, create visualizations, and draw insights from various datasets. Provide step-by-step guidance on data cleaning, statistical analysis, and creating meaningful charts and graphs. When asked about specific Mindvalley data, direct users to the appropriate internal resources or team members.",
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: true,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Shared",
  },
}

export default function AdminEditAssistantPage() {
  const router = useRouter()
  const params = useParams()
  const [assistant, setAssistant] = useState<any>(null)

  useEffect(() => {
    const assistantId = params.id as string
    if (assistantId in assistants) {
      setAssistant(assistants[assistantId as keyof typeof assistants])
    } else {
      router.push("/admin/assistants")
    }
  }, [params.id, router])

  const handleUpdate = (updatedAssistant: typeof assistant) => {
    // Handle update logic
    console.log("Updated assistant:", updatedAssistant)
    router.push("/admin/assistants")
  }

  const handleDelete = () => {
    // Handle delete logic
    console.log("Deleted assistant:", assistant?.id)
    router.push("/admin/assistants")
  }

  if (!assistant) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/admin/assistants")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Assistants
      </Button>
      <h1 className="text-2xl font-semibold mb-8">Edit Assistant: {assistant.name}</h1>
      <AssistantEditForm assistant={assistant} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  )
}
