import { ChatInterface } from "@/components/chat-interface"

// Default Aura AI assistant
const defaultAssistant = {
  id: "aura-ai",
  name: "Aura AI",
  icon: "A",
  color: "bg-blue-600",
}

export default function Home() {
  return <ChatInterface currentAssistant={defaultAssistant} />
}
