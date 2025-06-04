"use client"

import { useRef, useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { CategoriesSection } from "@/components/categories-section"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AssistantsPage() {
  const [isSticky, setIsSticky] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom
        setIsSticky(headerBottom <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    if (categoriesRef.current) {
      const categoryElements = categoriesRef.current.querySelectorAll("[id]")
      categoryElements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header ref={headerRef} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Assistants</h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-4">
            Discover and create custom versions of Assistant that combine instructions, extra knowledge, and any
            combination of skills.
          </p>
          <button
            onClick={() => router.push("/my-assistants/create")}
            className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 bg-neutral-900 border-border hover:bg-neutral-900/90 h-9 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-3xl dark:bg-black dark:text-white dark:hover:bg-gray-900"
          >
            <Sparkles className="h-4 w-4" />
            Create
          </button>
        </header>

        <div className={`sticky top-0 z-10 ${isSticky ? "-mt-8" : ""}`}>
          <Navigation isSticky={isSticky} activeCategory={activeCategory} />
        </div>

        <div ref={categoriesRef}>
          <CategoriesSection />
        </div>
      </div>
    </div>
  )
}
