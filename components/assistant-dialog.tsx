"use client"

import { useState } from "react"
import {
  Globe,
  X,
  Check,
  FileText,
  FileSpreadsheet,
  HardDrive,
  PieChart,
  BarChart,
  ImageIcon,
  Search,
  Zap,
  Code,
  Brain,
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DocumentSet {
  title: string
  description: string
  icons: string[]
}

interface AssistantDialogProps {
  isOpen: boolean
  onClose: () => void
  assistant: {
    title: string
    description: string
    author: string
    imageSrc: string
    rating?: number
    conversations?: string
    rank?: string
    capabilities?: string[]
    conversationStarters?: string[]
  }
}

export function AssistantDialog({ isOpen, onClose, assistant }: AssistantDialogProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const documentSets: DocumentSet[] = [
    {
      title: "Product Customer Feedback",
      description: "Customer Feedback Collected on the PF Jira Board",
      icons: ["jira", "confluence"],
    },
    {
      title: "Quest, Outcomes and Quotes",
      description: "Data from Quest Notes, Outcomes and Quotes",
      icons: ["docs", "sheets", "drive"],
    },
    {
      title: "Segment Events",
      description: "Segment Events from BI Hub & Product Analytics Documentation",
      icons: ["segment", "mixpanel"],
    },
    {
      title: "User Interviews",
      description: "Transcripts and notes from user interviews",
      icons: ["docs", "sheets"],
    },
    {
      title: "Product Roadmap",
      description: "Current and future product plans",
      icons: ["jira", "confluence"],
    },
    {
      title: "Marketing Campaigns",
      description: "Data on past and ongoing marketing efforts",
      icons: ["sheets", "drive"],
    },
  ]

  const itemsPerPage = 4
  const totalPages = Math.ceil(documentSets.length / itemsPerPage)
  const currentDocumentSets = documentSets.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const hasSearchTool = assistant.capabilities?.includes("Search")

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl bg-white border-gray-200 p-0 gap-0 shadow-lg">
        <div className="relative p-6 flex flex-col items-center text-center">
          <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>

          <div className="relative h-16 w-16 rounded-full overflow-hidden bg-blue-100 mb-4">
            <Image
              src={assistant.imageSrc || "/placeholder.svg"}
              alt={assistant.title}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{assistant.title}</h2>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>By {assistant.author}</span>
            <a href="#" className="hover:text-blue-600">
              <Globe className="h-4 w-4" />
            </a>
          </div>

          <p className="text-gray-600 max-w-lg">{assistant.description}</p>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-gray-800 font-semibold mb-3">Conversation Starters</h3>
          <div className="grid grid-cols-2 gap-3">
            {assistant.conversationStarters?.map((starter, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-3 px-4 text-sm text-gray-700 bg-gray-50 border-gray-300 hover:bg-gray-100 whitespace-normal break-words"
              >
                {starter}
              </Button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-gray-800 font-semibold mb-3">Capabilities</h3>
          <ul className="space-y-2">
            {assistant.capabilities?.map((capability, index) => {
              let Icon
              let iconColor
              switch (capability.toLowerCase()) {
                case "image generation":
                  Icon = ImageIcon
                  iconColor = "text-indigo-500"
                  break
                case "search":
                  Icon = Search
                  iconColor = "text-blue-500"
                  break
                case "internet search":
                  Icon = Globe
                  iconColor = "text-orange-500"
                  break
                case "code generation":
                  Icon = Code
                  iconColor = "text-green-500"
                  break
                case "data analysis":
                  Icon = BarChart
                  iconColor = "text-purple-500"
                  break
                case "task planning":
                  Icon = Brain
                  iconColor = "text-pink-500"
                  break
                default:
                  Icon = Zap
                  iconColor = "text-yellow-500"
              }
              return (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                  {capability}
                </li>
              )
            })}
          </ul>
        </div>

        {hasSearchTool && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-gray-800 font-semibold mb-3">Document Sets</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentDocumentSets.map((set, index) => (
                <div key={index} className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex flex-col h-full">
                    <h4 className="text-gray-800 text-sm font-medium mb-1">{set.title}</h4>
                    <p className="text-gray-600 text-xs flex-grow mb-3">{set.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {set.icons.map((icon, i) => {
                          let IconComponent
                          switch (icon.toLowerCase()) {
                            case "jira":
                              IconComponent = PieChart
                              break
                            case "confluence":
                              IconComponent = FileText
                              break
                            case "docs":
                              IconComponent = FileText
                              break
                            case "sheets":
                              IconComponent = FileSpreadsheet
                              break
                            case "drive":
                              IconComponent = HardDrive
                              break
                            case "segment":
                              IconComponent = BarChart
                              break
                            case "mixpanel":
                              IconComponent = PieChart
                              break
                            default:
                              IconComponent = FileText
                          }
                          return <IconComponent key={i} className="h-4 w-4 text-gray-600" />
                        })}
                      </div>
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full mx-1 ${index === currentPage ? "bg-blue-500" : "bg-gray-300"}`}
                    onClick={() => setCurrentPage(index)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Start Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
