"use client"

import { useState } from "react"
import { Search, Settings, Briefcase, Megaphone, Cpu, BarChart2, GraduationCap, Globe } from "lucide-react"

interface NavigationProps {
  isSticky: boolean
  activeCategory: string | null
}

export function Navigation({ isSticky, activeCategory }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "vishen-picks", name: "Vishen Picks", icon: Settings, color: "#3B82F6" },
    { id: "writing", name: "Writing", icon: Megaphone, color: "#F97316" },
    { id: "productivity", name: "Productivity", icon: Briefcase, color: "#10B981" },
    { id: "research", name: "Research & Analysis", icon: BarChart2, color: "#FB923C" },
    { id: "education", name: "Education", icon: GraduationCap, color: "#22C55E" },
    { id: "lifestyle", name: "Lifestyle", icon: Globe, color: "#38A169" },
    { id: "programming", name: "Programming", icon: Cpu, color: "#6366F1" },
  ]

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={`bg-black transition-all duration-300 ${isSticky ? "shadow-md" : ""}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="py-4">
          <div className="relative max-w-2xl mx-auto w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search Assistants"
              className="w-full bg-gray-900 border-gray-800 border rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <nav className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`text-sm whitespace-nowrap flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-gray-100 text-black font-medium shadow-md"
                      : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{
                      color: activeCategory === category.id ? "black" : category.color,
                    }}
                  />
                  <span>{category.name === "Vishen Picks" ? `${category.name} 🔥` : category.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
