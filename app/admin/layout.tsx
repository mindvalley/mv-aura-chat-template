"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Grid,
  PlusCircle,
  FolderClosed,
  Compass,
  MessageSquare,
  Users,
  LayoutGrid,
  MessageSquareMore,
  PenToolIcon as Tool,
  Library,
  Brain,
  Search,
  FileText,
  User,
  UserPlus,
  Key,
  Timer,
  Settings,
} from "lucide-react"

interface SidebarItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

const sidebarSections: SidebarSection[] = [
  {
    title: "Connectors",
    items: [
      { icon: <Grid className="w-4 h-4" />, label: "Existing Connectors", href: "/admin" },
      { icon: <PlusCircle className="w-4 h-4" />, label: "Add Connector", href: "/admin/add-connector" },
    ],
  },
  {
    title: "Document Management",
    items: [
      { icon: <FolderClosed className="w-4 h-4" />, label: "Document Sets", href: "/admin/document-sets" },
      { icon: <Compass className="w-4 h-4" />, label: "Explorer", href: "/admin/explorer" },
      { icon: <MessageSquare className="w-4 h-4" />, label: "Feedback", href: "/admin/feedback" },
    ],
  },
  {
    title: "Custom Assistants",
    items: [
      { icon: <Users className="w-4 h-4" />, label: "Assistants", href: "/admin/assistants" },
      { icon: <LayoutGrid className="w-4 h-4" />, label: "Categories", href: "/admin/categories" },
      { icon: <MessageSquareMore className="w-4 h-4" />, label: "Slack Bots", href: "/admin/slack-bots" },
      { icon: <Tool className="w-4 h-4" />, label: "Tools", href: "/admin/tools" },
      { icon: <Library className="w-4 h-4" />, label: "Prompt Library", href: "/admin/prompt-library" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { icon: <Brain className="w-4 h-4" />, label: "LLM", href: "/admin/llm" },
      { icon: <Search className="w-4 h-4" />, label: "Search Settings", href: "/admin/search-settings" },
      { icon: <FileText className="w-4 h-4" />, label: "Document Processing", href: "/admin/document-processing" },
    ],
  },
  {
    title: "User Management",
    items: [
      { icon: <User className="w-4 h-4" />, label: "Users", href: "/admin/users" },
      { icon: <UserPlus className="w-4 h-4" />, label: "Groups", href: "/admin/groups" },
      { icon: <Key className="w-4 h-4" />, label: "API Keys", href: "/admin/api-keys" },
      { icon: <Timer className="w-4 h-4" />, label: "Token Rate Limits", href: "/admin/token-rate-limits" },
    ],
  },
  {
    title: "Settings",
    items: [{ icon: <Settings className="w-4 h-4" />, label: "Workspace Settings", href: "/admin/workspace-settings" }],
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white border-r">
        {/* Logo and Back Link */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <span className="font-semibold">Aura</span>
            </div>
            <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mt-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Aura
            </Link>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-2">
          <nav className="space-y-6">
            {sidebarSections.map((section) => (
              <div key={section.title}>
                <h2 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{section.title}</h2>
                <div className="mt-2 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm rounded-lg",
                        pathname === item.href
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">{children}</div>
    </div>
  )
}
