"use client"

import { useSearchParams } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"

// Define available assistants
const assistants = [
  { id: "aura-ai", name: "Aura AI", icon: "A", color: "bg-blue-600" },
  { id: "general-gpt", name: "General GPT", icon: "G", color: "bg-green-600" },
  { id: "internet-search", name: "Internet Search", icon: "I", color: "bg-orange-600" },
  { id: "data-analyzer", name: "Data Analyzer", icon: "D", color: "bg-purple-600" },
  { id: "code-helper", name: "Code Helper", icon: "C", color: "bg-cyan-600" },
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const assistantId = searchParams.get("assistantId")

  // Find the current assistant or default to Aura AI
  const currentAssistant = assistantId
    ? assistants.find((assistant) => assistant.id === assistantId) || assistants[0]
    : assistants[0] // Default to Aura AI

  return <ChatInterface currentAssistant={currentAssistant} />
}
