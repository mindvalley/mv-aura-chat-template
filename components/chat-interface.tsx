"use client"

import type * as React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Mic,
  Send,
  HelpCircle,
  Search,
  ImageIcon,
  Database,
  ChevronDown,
  Plus,
  Info,
  Globe,
  FileText,
  Brain,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/ui/sidebar"
import { ModelSelector } from "@/components/model-selector/model-selector"
import { type Model as AIModel, models } from "@/lib/models"
import { ThinkingModeToggle } from "@/components/thinking-mode-toggle"
import { StreamingMessage } from "@/components/streaming-message"
import { useThinkingMode } from "@/hooks/use-thinking-mode"
import { type Message, type Assistant, type ModelCapability } from "@/lib/types"

interface ChatInterfaceProps {
  currentAssistant?: Assistant
}

// SVG icons for providers

// Get conversation starters based on assistant type
const getConversationStarters = (assistantId: string): string[] => {
  switch (assistantId) {
    case "general-gpt":
      return [
        "Help me write a professional email",
        "Explain quantum computing in simple terms",
        "Create a workout plan for beginners",
        "Suggest ideas for a weekend project",
      ]
    case "internet-search":
      return [
        "What's the latest news about AI developments?",
        "Find current weather in my location",
        "Search for recent scientific discoveries",
        "What are the trending topics today?",
      ]
    case "data-analyzer":
      return [
        "Analyze my sales data trends",
        "Create a visualization for my dataset",
        "Help me understand statistical significance",
        "Generate insights from my CSV file",
      ]
    case "code-helper":
      return [
        "Review my Python code for optimization",
        "Help me debug this JavaScript function",
        "Explain this algorithm step by step",
        "Write unit tests for my code",
      ]
    default:
      return [
        "How can you help me today?",
        "What are your capabilities?",
        "Show me what you can do",
        "Let's start a conversation",
      ]
  }
}

export function ChatInterface({ currentAssistant }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [hasSubmittedMessage, setHasSubmittedMessage] = useState(false)
  const { open } = useSidebar()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedTool, setSelectedTool] = useState<"kb-search" | "web-search" | "create-image" | null>(null)
  const [currentModel, setCurrentModel] = useState<AIModel | null>(models[0] || null)

  // Thinking mode state
  const { thinkingEnabled, thinkingAvailable, setThinkingEnabled } = useThinkingMode(currentModel)

  // Default to Aura AI if no current assistant is provided
  const assistant = currentAssistant || {
    id: "aura-ai",
    name: "Aura AI",
    icon: "A",
    color: "bg-blue-600",
  }

  const isAuraAI = assistant.id === "aura-ai"

  // Determine if the input area (and thus ModelSelector) is at the bottom
  // const isInputAreaAtBottom = isAuraAI && hasSubmittedMessage;
  // Determine if the input area is at the center
  // const isInputAtCenter = isAuraAI && !hasSubmittedMessage;

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Re-focus input after position transition
  useEffect(() => {
    if (hasSubmittedMessage) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 500) // Wait for transition to complete
    }
  }, [hasSubmittedMessage])

  const handleToolSelect = (tool: "kb-search" | "web-search" | "create-image") => {
    if (selectedTool === tool) {
      // If the same tool is clicked again, deselect it
      setSelectedTool(null)
    } else {
      // Otherwise, select the new tool
      setSelectedTool(tool)
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Set flag for layout transition if this is the first message
    if (!hasSubmittedMessage && messages.length === 0) {
      setHasSubmittedMessage(true)
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate assistant response with thinking mode support
    setIsTyping(true)

    const assistantMessageId = (Date.now() + 1).toString()
    const hasThinking = thinkingEnabled && thinkingAvailable

    if (hasThinking) {
      // Start with thinking phase
      const thinkingStartTime = new Date()
      const thinkingMessage: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        thinkingContent: "",
        isThinking: true,
        isStreaming: true,
        streamingType: "thinking",
        hasThinkingContent: true,
        thinkingStartTime: thinkingStartTime,
      }
      setMessages((prev) => [...prev, thinkingMessage])

      // Simulate thinking content streaming
      let thinkingText = ""
      const fullThinkingText = `I need to analyze this request carefully. Let me think through this step by step:

1. First, I should understand what the user is asking for
2. Consider the context and any relevant information
3. Think about the best approach to provide a helpful response
4. Structure my response clearly and comprehensively

This appears to be a request that I should handle with care and attention to detail.`

      const thinkingInterval = setInterval(() => {
        if (thinkingText.length < fullThinkingText.length) {
          thinkingText += fullThinkingText[thinkingText.length]
          setMessages((prev) => prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, thinkingContent: thinkingText }
              : msg
          ))
        } else {
          clearInterval(thinkingInterval)
          // Calculate thinking duration
          const thinkingEndTime = new Date()
          const duration = Math.round((thinkingEndTime.getTime() - thinkingStartTime.getTime()) / 1000)

          // Switch to response phase
          setTimeout(() => {
            setMessages((prev) => prev.map(msg =>
              msg.id === assistantMessageId
                ? {
                  ...msg,
                  isStreaming: true,
                  streamingType: "response" as const,
                  isThinking: false,
                  thinkingDuration: duration
                }
                : msg
            ))

            // Simulate response streaming
            let responseText = ""
            const fullResponseText = `This is a simulated response from ${assistant.name} using ${currentModel?.name || 'default model'}. Since thinking mode is enabled, you can see my reasoning process above. In a real application, this would be replaced with an actual response from an AI model that supports thinking mode.`

            const responseInterval = setInterval(() => {
              if (responseText.length < fullResponseText.length) {
                responseText += fullResponseText[responseText.length]
                setMessages((prev) => prev.map(msg =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: responseText }
                    : msg
                ))
              } else {
                clearInterval(responseInterval)
                setMessages((prev) => prev.map(msg =>
                  msg.id === assistantMessageId
                    ? {
                      ...msg,
                      isStreaming: false,
                      // Ensure duration is set if not already
                      thinkingDuration: msg.thinkingDuration || duration
                    }
                    : msg
                ))
                setIsTyping(false)
              }
            }, 10)
          }, 100)
        }
      }, 15)
    } else {
      // Standard response without thinking
      setTimeout(() => {
        const assistantMessage: Message = {
          id: assistantMessageId,
          role: "assistant",
          content: `This is a simulated response from ${assistant.name} using ${currentModel?.name || 'default model'}. In a real application, this would be replaced with an actual response from an AI model.`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      }, 200)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-background text-foreground relative">
      {/* Add CSS for tooltip */}
      <style jsx global>{`
  .tooltip {
    position: relative;
    display: inline-block;
  }
  
  .tooltip .tooltip-text {
    visibility: hidden;
    width: 200px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1000;
    bottom: 125%; /* Position above the icon */
    left: 50%;
    transform: translateX(-50%); /* Center horizontally */
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
    line-height: 1.4;
    white-space: normal; /* Ensure text wraps normally */
    writing-mode: horizontal-tb; /* Force horizontal text direction */
  }
  
  /* Add arrow pointing down */
  .tooltip .tooltip-text::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
  
  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  /* Fix dropdown positioning */
  .model-dropdown-content {
    position: absolute !important;
    width: 280px !important;
    height: auto !important;
    max-height: none !important;
    overflow-y: visible !important;
    z-index: 50 !important;
    top: 100% !important; /* Changed from bottom to top */
    margin-top: 5px !important; /* Changed from margin-bottom to margin-top */
    right: 0 !important; /* This might need adjustment depending on desired alignment of dropdown relative to selector */
  }
`}</style>

      {/* Assistant Name Display & Model Selector - Horizontally aligned */}
      <div
        className={cn(
          "fixed z-10 h-8 flex items-center gap-4 px-2 transition-all duration-200", // Increased gap for ModelSelector
          open ? "left-[272px] top-[16px]" : "left-14 top-[14px]",
        )}
      >
        <div
          className={cn(
            "w-4 h-4 rounded-sm flex items-center justify-center text-white font-semibold text-xs",
            assistant.color,
          )}
        >
          {assistant.icon}
        </div>
        <span className="text-sm font-medium text-foreground">{assistant.name}</span>
        {/* ModelSelector moved here, now always visible */}
        <ModelSelector
          selectedModel={currentModel?.id ?? ""}
          onModelChange={(modelId) => {
            const newSelectedModel = models.find(m => m.id === modelId) || null;
            setCurrentModel(newSelectedModel);
          }}
          isInputAtBottom={hasSubmittedMessage}
          isInputAtCenter={!hasSubmittedMessage}
        />
      </div>

      {/* Chat Messages Area */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 overflow-y-auto p-4 space-y-6 transition-all duration-500 ease-in-out",
          !hasSubmittedMessage
            ? "bottom-0" // Input is centered, messages fill space above it
            : isAuraAI
              ? "bottom-32" // Aura AI: input bar + footer
              : "bottom-24", // Custom Assistant: input bar (no tools, no footer)
        )}
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            {isAuraAI ? (
              /* Aura AI - Show "What can I help with?" */
              <h1 className="text-3xl font-semibold" style={{ marginTop: "-25vh" }}>
                What can I help with?
              </h1>
            ) : (
              /* Custom Assistant - Show assistant info */
              <div
                className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-6"
                style={{ marginTop: "-15vh" }}
              >
                {/* Assistant Logo */}
                <div
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl",
                    assistant.color,
                  )}
                >
                  {assistant.icon}
                </div>

                {/* Assistant Name */}
                <h1 className="text-3xl font-semibold">{assistant.name}</h1>

                {/* Assistant Description */}
                <p className="text-lg text-muted-foreground max-w-lg">
                  {assistant.id === "general-gpt" &&
                    "A versatile AI assistant capable of helping with a wide range of tasks including writing, analysis, coding, and creative projects."}
                  {assistant.id === "internet-search" &&
                    "An AI assistant with real-time web search capabilities to find current information and answer questions about recent events."}
                  {assistant.id === "data-analyzer" &&
                    "Specialized in data analysis, visualization, and statistical insights. Upload your data files for comprehensive analysis."}
                  {assistant.id === "code-helper" &&
                    "A programming-focused assistant that can help with coding, debugging, code reviews, and technical documentation."}
                </p>

                {/* Conversation Starters */}
                <div className="w-full max-w-2xl">
                  <h3 className="text-lg font-medium mb-4">Conversation Starters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getConversationStarters(assistant.id).map((starter, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start text-left h-auto py-3 px-4 text-sm bg-card hover:bg-accent whitespace-normal break-words"
                        onClick={() => {
                          setMessage(starter)
                          setTimeout(() => handleSendMessage(), 100)
                        }}
                      >
                        {starter}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Show messages when conversation has started */
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex max-w-3xl mx-auto w-full",
                  msg.role === "assistant" ? "justify-start" : "justify-end",
                )}
              >
                <StreamingMessage
                  message={msg}
                  showThinking={thinkingEnabled}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex max-w-3xl mx-auto w-full justify-start">
                <div className="bg-secondary rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-4" />
          </>
        )}
      </div>

      {/* Dynamic Input Area */}
      <div
        className={cn(
          "absolute left-0 right-0 pointer-events-none transition-all duration-500 ease-in-out",
          isAuraAI
            ? hasSubmittedMessage
              ? "bottom-16 flex items-start justify-center"
              : "inset-0 flex items-center justify-center"
            : "bottom-4 flex items-start justify-center", // Always at bottom for custom assistants
        )}
      >
        <div className="w-full max-w-2xl px-4 pointer-events-auto">
          <div className="relative bg-card border border-border rounded-xl shadow-lg overflow-hidden">
            {/* Input Field with Send Button */}
            <div className="relative">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isAuraAI
                    ? selectedTool === "kb-search"
                      ? "Search knowledge base..."
                      : selectedTool === "web-search"
                        ? "Search the web..."
                        : selectedTool === "create-image"
                          ? "Describe the image you want to create..."
                          : "Ask anything"
                    : `Message ${assistant.name}...`
                }
                className="bg-transparent border-0 text-foreground py-6 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 w-full pr-14"
                style={{ textIndent: "0" }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-transparent hover:bg-accent disabled:opacity-50"
                variant="ghost"
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {/* Action Buttons (Pills) & File Upload (Plus) now inside the main input bar */}
            <div className="flex flex-col p-2 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    disabled={isAuraAI && (selectedTool === "kb-search" || selectedTool === "create-image")}
                  >
                    <Plus
                      className={cn(
                        "h-5 w-5",
                        isAuraAI && (selectedTool === "kb-search" || selectedTool === "create-image")
                          ? "text-muted-foreground/40"
                          : "text-muted-foreground",
                      )}
                    />
                  </Button>
                  {isAuraAI && (
                    <>
                      <Button
                        variant={selectedTool === "kb-search" ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "rounded-full h-8 px-3 flex items-center gap-1.5",
                          selectedTool === "kb-search" ? "bg-primary text-primary-foreground" : "",
                        )}
                        onClick={() => handleToolSelect("kb-search")}
                      >
                        <Database className="h-4 w-4" />
                        <span>KB Search</span>
                      </Button>
                      <Button
                        variant={selectedTool === "web-search" ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "rounded-full h-8 px-3 flex items-center gap-1.5",
                          selectedTool === "web-search" ? "bg-primary text-primary-foreground" : "",
                        )}
                        onClick={() => handleToolSelect("web-search")}
                      >
                        <Search className="h-4 w-4" />
                        <span>Web Search</span>
                      </Button>
                      <Button
                        variant={selectedTool === "create-image" ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          "rounded-full h-8 px-3 flex items-center gap-1.5",
                          selectedTool === "create-image" ? "bg-primary text-primary-foreground" : "",
                        )}
                        onClick={() => handleToolSelect("create-image")}
                      >
                        <ImageIcon className="h-4 w-4" />
                        <span>Create Image</span>
                      </Button>
                    </>
                  )}
                </div>
                {/* Thinking Mode Toggle - positioned at the farthest right */}
                {thinkingAvailable && (
                  <ThinkingModeToggle
                    enabled={thinkingEnabled}
                    available={thinkingAvailable}
                    onToggle={setThinkingEnabled}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Only visible after first message and for Aura AI */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 border-t border-border bg-background p-4 transition-opacity duration-500",
          hasSubmittedMessage && isAuraAI ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="max-w-3xl mx-auto flex justify-between items-center text-xs text-muted-foreground">
          <p>ChatGPT can make mistakes. Check important info.</p>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
