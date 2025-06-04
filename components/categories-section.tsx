"use client"

import type React from "react"

import { useState } from "react"
import { AssistantCard } from "./assistant-card"
import { Settings, Briefcase, Megaphone, Cpu, BarChart2, GraduationCap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const capabilities = ["Image Generation", "Search", "Internet Search"]

function getRandomCapabilities() {
  const shuffled = [...capabilities].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1)
}

const categories = [
  {
    id: "vishen-picks",
    name: "Vishen Picks",
    icon: Settings,
    color: "#3B82F6",
    description: "Handpicked assistants by Vishen Lakhiani",
    assistants: [
      {
        title: "Mindvalley AI",
        description:
          "Your personal growth companion. Get personalized advice on health, wealth, relationships, and more.",
        author: "mindvalley.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Superhuman Optimizer",
        description: "Unlock your full potential with cutting-edge biohacking and performance optimization techniques.",
        author: "vishen.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "6 Phase Meditation Guide",
        description: "Experience Vishen's powerful guided meditation technique for personal transformation.",
        author: "sixphasemeditation.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Be Extraordinary",
        description: "Learn how to live an extraordinary life with lessons from Vishen's bestselling book.",
        author: "beextraordinary.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "10x Fitness Coach",
        description: "Achieve your fitness goals faster with scientifically-backed workout and nutrition plans.",
        author: "10xfitness.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Quantum Jumping Guide",
        description: "Explore alternate realities and tap into your infinite potential with guided visualizations.",
        author: "quantumjumping.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Silva Method Trainer",
        description: "Master mind control techniques for improved intuition, creativity, and problem-solving.",
        author: "silvamethod.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Lifebook Creator",
        description: "Design your ideal life across 12 dimensions with personalized goal-setting and action plans.",
        author: "mylifebook.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "WildFit Coach",
        description: "Transform your relationship with food and achieve lasting health with evolutionary nutrition.",
        author: "getwildfit.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Consciousness Engineering",
        description: "Upgrade your models of reality and systems for living with cutting-edge personal growth tools.",
        author: "vishen.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Writing",
    description: "Enhance your writing with tools for creation, editing, and style refinement",
    id: "writing",
    icon: Megaphone,
    color: "#F97316",
    assistants: [
      {
        title: "Write For Me",
        description: "Write tailored, engaging content with a focus on quality, relevance and precise word count.",
        author: "puzzle.today",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "AI Humanizer",
        description:
          "№1 AI humanizer in the world ✨ Get human-like content in seconds. This Assistant humanizes AI-generated text with...",
        author: "mmcdigital.solutions",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Blog Writer Pro",
        description: "Create engaging blog posts optimized for SEO with perfect readability scores.",
        author: "blogwriter.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Academic Writer",
        description: "Professional academic writing assistant for research papers and essays.",
        author: "academicpro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Script Master",
        description: "Create compelling scripts for videos, podcasts, and presentations.",
        author: "scriptmaster.io",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Content Strategist",
        description: "Plan and create content strategies for your brand or business.",
        author: "contentstrategy.pro",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Technical Writer",
        description: "Specialized in creating technical documentation and user guides.",
        author: "techdocs.pro",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Novel Plotter",
        description: "Develop intricate plot structures and character arcs for your next bestseller.",
        author: "novelcraft.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Copywriting Genius",
        description: "Craft persuasive copy that converts for ads, landing pages, and email campaigns.",
        author: "copymasters.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Storyteller's Muse",
        description: "Generate creative writing prompts and story ideas to spark your imagination.",
        author: "storyforge.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Productivity",
    description: "Increase your efficiency and streamline your workflow",
    id: "productivity",
    icon: Briefcase,
    color: "#10B981",
    assistants: [
      {
        title: "Task Master Pro",
        description: "Intelligent task management and prioritization assistant.",
        author: "taskmaster.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Meeting Assistant",
        description: "Schedule, organize, and summarize meetings efficiently.",
        author: "meetingpro.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Time Tracker AI",
        description: "Track and optimize your time usage with smart insights.",
        author: "timetrack.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Project Planner",
        description: "Plan and manage projects with AI-powered insights.",
        author: "projectai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Focus Timer",
        description: "Stay focused and productive with smart work sessions.",
        author: "focusmate.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Workflow Optimizer",
        description: "Optimize your daily workflows and automate repetitive tasks.",
        author: "workflow.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Smart Calendar",
        description: "AI-powered calendar management and scheduling assistant.",
        author: "smartcal.io",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Habit Builder",
        description: "Develop and maintain positive habits with personalized strategies.",
        author: "habitforge.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Email Manager",
        description: "Organize, prioritize, and respond to emails more efficiently.",
        author: "inboxhero.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Decision Maker",
        description: "Make better decisions faster with AI-powered analysis and recommendations.",
        author: "decidesmart.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Research & Analysis",
    description: "Find, evaluate, interpret, and visualize information",
    id: "research",
    icon: BarChart2,
    color: "#FB923C",
    assistants: [
      {
        title: "Research Navigator",
        description: "Navigate through academic papers and research databases efficiently.",
        author: "researchpro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Data Analyzer",
        description: "Analyze and visualize complex datasets with ease.",
        author: "datavis.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Market Research Pro",
        description: "Conduct comprehensive market research and competitor analysis.",
        author: "marketpro.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Citation Assistant",
        description: "Generate and manage citations in various academic formats.",
        author: "citepro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Trend Analyzer",
        description: "Track and analyze market trends and consumer behavior.",
        author: "trendai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Research Summary",
        description: "Generate concise summaries of research papers and articles.",
        author: "summarypro.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Literature Review",
        description: "Comprehensive literature review assistant for academic research.",
        author: "litreview.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Patent Explorer",
        description: "Search and analyze patents for innovation and legal insights.",
        author: "patentai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Survey Designer",
        description: "Create effective surveys and analyze results for actionable insights.",
        author: "surveygenius.io",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Sentiment Analyzer",
        description: "Analyze sentiment in text data for brand monitoring and customer feedback.",
        author: "sentimentai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Education",
    description: "Explore new ideas, revisit existing skills",
    id: "education",
    icon: GraduationCap,
    color: "#22C55E",
    assistants: [
      {
        title: "Math Tutor",
        description: "Step-by-step math problem solving and explanations.",
        author: "mathpro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Language Teacher",
        description: "Learn new languages with personalized lessons and practice.",
        author: "languageai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Science Explorer",
        description: "Interactive science learning and experiment guidance.",
        author: "sciencelab.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "History Guide",
        description: "Explore historical events and contexts interactively.",
        author: "historypro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Study Planner",
        description: "Create effective study plans and track progress.",
        author: "studymate.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Quiz Master",
        description: "Generate and take quizzes on various subjects.",
        author: "quizpro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Concept Explainer",
        description: "Clear explanations of complex concepts across subjects.",
        author: "explainpro.edu",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Literature Analyst",
        description: "Analyze literary works and improve reading comprehension.",
        author: "litgenius.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Coding Mentor",
        description: "Learn programming languages with interactive coding exercises.",
        author: "codebuddy.io",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Art Instructor",
        description: "Learn various art techniques and art history.",
        author: "artacademy.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Lifestyle",
    description: "Enhance your daily life and personal development",
    id: "lifestyle",
    icon: Globe,
    color: "#38A169",
    assistants: [
      {
        title: "Fitness Coach",
        description: "Personalized workout plans and fitness guidance.",
        author: "fitpro.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Meal Planner",
        description: "Create healthy meal plans and recipe suggestions.",
        author: "mealmate.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Meditation Guide",
        description: "Guided meditation and mindfulness exercises.",
        author: "mindful.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Sleep Coach",
        description: "Improve your sleep habits with personalized advice.",
        author: "sleepwell.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Budget Planner",
        description: "Manage personal finances and budget planning.",
        author: "budgetpro.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Habit Tracker",
        description: "Build and maintain positive habits effectively.",
        author: "habitpro.app",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Life Coach",
        description: "Personal development and goal achievement guidance.",
        author: "lifecoach.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Fashion Stylist",
        description: "Personalized fashion advice and outfit recommendations.",
        author: "stylebotai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Travel Planner",
        description: "Plan personalized trips and itineraries based on your preferences.",
        author: "wanderlustai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Relationship Advisor",
        description: "Get advice on improving personal and professional relationships.",
        author: "relationshipguru.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
  {
    name: "Programming",
    description: "Code, debug, and learn programming concepts",
    id: "programming",
    icon: Cpu,
    color: "#6366F1",
    assistants: [
      {
        title: "Code Review",
        description: "Review and improve your code with best practices.",
        author: "codepro.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Debug Helper",
        description: "Identify and fix bugs in your code efficiently.",
        author: "debugpro.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Algorithm Tutor",
        description: "Learn and practice programming algorithms.",
        author: "algomaster.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "API Designer",
        description: "Design and document APIs with best practices.",
        author: "apicraft.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Test Writer",
        description: "Generate comprehensive test cases for your code.",
        author: "testpro.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Code Optimizer",
        description: "Optimize your code for better performance.",
        author: "optimize.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Architecture Guide",
        description: "Software architecture patterns and best practices.",
        author: "archpro.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "DevOps Assistant",
        description: "Streamline your development and deployment processes.",
        author: "devopsai.com",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "Security Auditor",
        description: "Identify and fix security vulnerabilities in your code.",
        author: "securedev.ai",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
      {
        title: "UI/UX Developer",
        description: "Create user-friendly interfaces and improve user experience.",
        author: "uxgenius.dev",
        imageSrc: "/placeholder.svg?height=48&width=48",
        capabilities: getRandomCapabilities(),
      },
    ],
  },
]

interface CategorySectionProps {
  id: string
  name: string
  icon: React.ElementType
  color: string
  description: string
  assistants: Array<{
    title: string
    description: string
    author: string
    imageSrc: string
    capabilities: string[]
  }>
}

function CategorySection({ id, name, icon: Icon, color, description, assistants }: CategorySectionProps) {
  const [expanded, setExpanded] = useState(false)
  const initialAssistants = assistants.slice(0, 6)
  const hasMore = assistants.length > 6

  return (
    <div className="mb-12" id={id}>
      <div className="mb-4 flex items-center gap-2">
        <Icon className="w-6 h-6" style={{ color }} />
        <h2 className="text-white text-xl font-semibold">{name === "Vishen Picks" ? `${name} 🔥` : name}</h2>
      </div>
      <p className="text-gray-300 text-sm mt-1 mb-4">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(expanded ? assistants : initialAssistants).map((assistant, index) => (
          <AssistantCard key={assistant.title} {...assistant} rank={index + 1} />
        ))}
      </div>
      {hasMore && !expanded && (
        <div className="mt-6 text-center">
          <Button
            onClick={() => setExpanded(true)}
            variant="outline"
            className="px-6 py-2 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

export function CategoriesSection() {
  return (
    <section className="mt-12">
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          id={category.id}
          name={category.name}
          icon={category.icon}
          color={category.color}
          description={category.description}
          assistants={category.assistants}
        />
      ))}
    </section>
  )
}
