"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AssistantEditForm } from "@/components/assistant-edit-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// This would typically come from an API or database
const assistants = {
  "1": {
    id: "1",
    name: "Aura AI",
    description: "Aura AI is your personal work companion at Mindvalley, designed to streamline your workday.",
    instructions: `You are Aura AI, a personal work companion designed to streamline workdays at Mindvalley. Provide quick answers using vast internal documents and connected sources. Offer assistance with almost anything, delivering accurate and up-to-date information to help users achieve their goals fast.`,
    defaultModel: "user-default",
    capabilities: {
      imageGeneration: false,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["technology", "business"],
  },
  "2": {
    id: "2",
    name: "General GPT",
    description:
      "Assistant with no access to documents. Chat with the selected Model, such as Gemini 1.5 Pro or GPT 4.",
    instructions: `You are a general-purpose AI assistant. Engage in conversations on a wide range of topics, providing informative and helpful responses based on your training data. You do not have access to external documents or real-time information.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: false,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["general"],
  },
  "3": {
    id: "3",
    name: "GPT Internet Search",
    description: "Use this Assistant to search the Internet for you (via Bing) and getting the answer",
    instructions: `You are an AI assistant with internet search capabilities. When asked a question, use your internet search tool to find the most up-to-date and relevant information. Summarize the findings concisely and accurately.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: false,
      internetSearch: true,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["internet", "search"],
  },
  "4": {
    id: "4",
    name: "Mindvalley Content Builder",
    description: "Assistant for creating and optimizing Mindvalley content",
    instructions: `You are a content creation assistant for Mindvalley. Help users create engaging, informative, and transformative content aligned with Mindvalley's mission and values. Offer suggestions for headlines, outlines, and key points for various content types including blog posts, social media updates, and course materials.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: true,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["content", "writing", "marketing"],
  },
  "5": {
    id: "5",
    name: "Eve In-App Notifications Generator",
    description: "Generate personalized in-app notifications for the Eve app",
    instructions: `You are an AI assistant designed to generate personalized in-app notifications for the Eve app. Create engaging, concise, and relevant notifications that encourage user engagement and provide value. Consider user preferences, app usage patterns, and current events when crafting notifications.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: false,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["notifications", "mobile"],
  },
  "6": {
    id: "6",
    name: "Data Analyzer",
    description: "Assistant for analyzing and visualizing data",
    instructions: `You are a data analysis assistant. Help users interpret data, create visualizations, and draw insights from various datasets. Provide step-by-step guidance on data cleaning, statistical analysis, and creating meaningful charts and graphs.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: true,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["data", "analysis"],
  },
  "7": {
    id: "7",
    name: "Fitness Coach",
    description: "Personal AI fitness coach for workout plans and nutrition advice",
    instructions: `You are an AI fitness coach. Provide personalized workout plans, nutrition advice, and motivation to users based on their fitness goals, current fitness level, and any health constraints. Offer guidance on proper exercise form, meal planning, and healthy lifestyle habits.`,
    defaultModel: "gpt-4",
    capabilities: {
      imageGeneration: true,
      search: true,
      internetSearch: false,
    },
    isVisible: true,
    type: "Built-in",
    categories: ["fitness", "health"],
  },
}

export default function EditAssistantPage() {
  const router = useRouter()
  const params = useParams()
  const [assistant, setAssistant] = useState<any>(null)

  useEffect(() => {
    const assistantId = params.id as string
    if (assistantId in assistants) {
      setAssistant({
        ...assistants[assistantId as keyof typeof assistants],
        categories: assistants[assistantId as keyof typeof assistants].categories || [],
      })
    } else {
      router.push("/my-assistants")
    }
  }, [params.id, router])

  const handleUpdate = (updatedAssistant: typeof assistant) => {
    // Handle update logic
    console.log("Updated assistant:", updatedAssistant)
    router.push("/my-assistants")
  }

  const handleDelete = () => {
    // Handle delete logic
    console.log("Deleted assistant:", assistant?.id)
    router.push("/my-assistants")
  }

  if (!assistant) {
    return <div>Loading...</div>
  }

  return (
    <div className="container max-w-3xl mx-auto p-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.push("/my-assistants")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Assistants
      </Button>
      <h1 className="text-2xl font-semibold mb-8">Edit Assistant: {assistant.name}</h1>
      <AssistantEditForm assistant={assistant} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  )
}
