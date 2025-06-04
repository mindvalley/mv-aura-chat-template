"use client"

import { useState } from "react"
import Image from "next/image"
import { AssistantDialog } from "./assistant-dialog"

interface AssistantCardProps {
  title: string
  description: string
  author: string
  imageSrc: string
  rank?: number
  rating?: number
  conversations?: string
  capabilities?: string[]
  conversationStarters?: string[]
}

export function AssistantCard({
  title,
  description,
  author,
  imageSrc,
  rank,
  rating = 4.2,
  conversations = "9M+",
  capabilities = [],
  conversationStarters = [
    "Find the latest research about AI",
    "I'll provide a research paper link; Please analyze it",
    "I will upload a PDF paper; Use critical skills to read it",
    'Type "LS" to list my built-in critical reading skills',
  ],
}: AssistantCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer shadow-md"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex items-start gap-4">
          {rank && <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{rank}</span>}
          <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} width={48} height={48} className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 dark:text-white font-medium">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">{description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">By {author}</p>
          </div>
        </div>
      </div>

      <AssistantDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        assistant={{
          title,
          description,
          author,
          imageSrc,
          rating,
          conversations,
          rank: rank?.toString(),
          capabilities,
          conversationStarters,
        }}
      />
    </>
  )
}
