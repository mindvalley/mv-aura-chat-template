"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, MoreHorizontal, Settings, Users, Folder, Search, PlusCircle, Bell, UserCircle, LogOut, ChevronDown, HelpCircle, Menu, X, LayoutDashboard, Bot, Pencil, FileText, Database, MessageCircle, Trash2, Eye, EyeOff, Copy, Check, ExternalLink, UploadCloud, Briefcase, LifeBuoy, Moon, Sun, SlidersHorizontal, MessageSquare, Pin, Users2, MessageSquarePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from "@/components/ui/sidebar"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { SettingsDialog } from "@/components/settings-dialog"

const recentChats = [
  "Mindvalley Design System Onboarding",
  "Mindvalley Health Insurance Discussion",
  "Aura AI Introduction",
  "EVE Assistant Functionality Overview",
  "Mindvalley AIA Health Insurance",
  "Mindvalley Mastery Quests List",
]

const recentAssistants = [
  { id: "general-gpt", name: "General GPT", icon: "G", color: "bg-green-600" },
  { id: "internet-search", name: "Internet Search", icon: "I", color: "bg-orange-600" },
  { id: "data-analyzer", name: "Data Analyzer", icon: "D", color: "bg-purple-600" },
  { id: "code-helper", name: "Code Helper", icon: "C", color: "bg-cyan-600" },
]

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [showAllAssistants, setShowAllAssistants] = React.useState(false)
  const [pinnedAssistants, setPinnedAssistants] = React.useState<string[]>([])
  const [hiddenAssistants, setHiddenAssistants] = React.useState<string[]>([])
  const { open } = useSidebar()

  const handleAssistantClick = (assistantId: string) => {
    router.push(`/chat?assistantId=${assistantId}`)
  }

  const handleNewChat = (assistantId: string) => {
    router.push(`/chat?assistantId=${assistantId}`)
  }

  const pinAssistant = (assistantName: string) => {
    if (!pinnedAssistants.includes(assistantName)) {
      setPinnedAssistants((current) => [...current, assistantName])
    }
  }

  const hideAssistant = (assistantName: string) => {
    // Remove from pinned if it's pinned
    if (pinnedAssistants.includes(assistantName)) {
      setPinnedAssistants((current) => current.filter((name) => name !== assistantName))
    }

    // Add to hidden
    setHiddenAssistants((current) => [...current, assistantName])
  }

  const isPinned = (assistantName: string) => {
    return pinnedAssistants.includes(assistantName)
  }

  const isHidden = (assistantName: string) => {
    return hiddenAssistants.includes(assistantName)
  }

  // Filter out hidden assistants
  const visibleAssistants = recentAssistants.filter((assistant) => !isHidden(assistant.name))

  return (
    <>
      <Sidebar className="border-r border-border bg-card">
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2 px-4 py-2">
            <div className="flex items-center gap-2">
              <svg
                width="64"
                height="64"
                viewBox="0 0 753 293"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 -mt-4"
              >
                <mask
                  id="mask0_1750_4953"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="17"
                  y="17"
                  width="232"
                  height="260"
                >
                  <path
                    d="M144.599 273.304C137.421 277.447 128.579 277.447 121.401 273.304L29.4174 220.196C22.2401 216.053 17.8186 208.395 17.8186 200.107V93.893C17.8186 85.6054 22.2401 77.9473 29.4174 73.8034L121.401 20.6965C128.579 16.5527 137.421 16.5527 144.599 20.6965L236.582 73.8034C243.76 77.9473 248.181 85.6054 248.181 93.8932V200.107C248.181 208.395 243.76 216.053 236.582 220.196L144.599 273.304Z"
                    fill="#D9D9D9"
                  />
                </mask>
                <g mask="url(#mask0_1750_4953)">
                  <path
                    d="M248.215 213.5L133 280L17.7849 213.5L78.884 178.235C112.372 158.906 153.628 158.906 187.116 178.235L248.215 213.5Z"
                    fill="url(#paint0_linear_1750_4953)"
                  />
                  <path
                    d="M133 14V84.4894C133 123.17 153.639 158.912 187.14 178.249L248.215 213.5V80.5L133 14Z"
                    fill="url(#paint1_linear_1750_4953)"
                  />
                  <path
                    d="M133 14V84.4894C133 123.17 112.361 158.912 78.8602 178.249L17.7849 213.5V80.5L133 14Z"
                    fill="url(#paint2_linear_1750_4953)"
                  />
                </g>
                <path
                  d="M316.155 207L367.349 79.731H386.502L439.128 207H420.154L406.908 174.064H348.017L335.308 207H316.155ZM354.103 158.491H400.464L376.836 99.958L354.103 158.491ZM487.749 209.506C460.541 209.506 447.116 192.501 447.116 165.293V104.791H465.553V160.997C465.553 180.508 473.429 193.396 493.656 193.396C513.346 193.396 524.802 178.539 524.802 156.701V104.791H543.239V207H527.666L525.876 184.088C520.327 199.482 507.081 209.506 487.749 209.506ZM567.545 207V104.791H582.76L585.087 131.462C589.741 113.92 601.913 104.075 624.109 104.075H631.269V122.512H622.14C594.216 122.512 585.803 134.684 585.803 161.892V207H567.545ZM673.275 209.685C650.005 209.685 638.191 199.124 638.191 182.477C638.191 171.558 643.203 162.966 651.616 157.954C660.208 152.584 669.516 150.436 692.428 147.572C711.939 145.245 721.605 143.455 721.605 133.968C721.605 123.586 714.087 116.068 693.502 116.068C671.485 116.068 661.103 125.376 659.85 140.233H641.234C643.203 116.784 661.282 101.748 692.428 101.748C725.722 101.748 739.326 114.994 739.326 137.19V207H724.469L722.321 181.224C714.803 197.155 698.156 209.685 673.275 209.685ZM678.824 195.544C704.421 195.544 721.963 175.675 721.963 158.312V151.51C717.488 155.448 708.717 157.596 695.829 159.207C678.645 161.355 671.127 163.145 665.399 167.083C660.208 170.305 658.06 174.422 658.06 180.15V180.329C658.06 189.637 664.504 195.544 678.824 195.544Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1750_4953"
                    x1="133"
                    y1="280"
                    x2="133"
                    y2="24.7422"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#6F7CEE" />
                    <stop offset="1" stopColor="#4B5ADB" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_1750_4953"
                    x1="248.608"
                    y1="79.4769"
                    x2="29.1577"
                    y2="213.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF96B6" />
                    <stop offset="1" stopColor="#ED6891" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_1750_4953"
                    x1="22.5078"
                    y1="85.1038"
                    x2="249.631"
                    y2="213.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#BC8CEC" />
                    <stop offset="1" stopColor="#AC77E2" />
                  </linearGradient>
                  <radialGradient
                    id="paint3_radial_1750_4953"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(506.5 235.5) rotate(-90) scale(124 178.913)"
                  >
                    <stop stopColor="#4C59C6" />
                    <stop offset="1" stopColor="#3E7BF2" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            {/* Show toggle button inside sidebar when expanded */}
            {open && <SidebarTrigger className="text-foreground -mt-4" />}
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* Assistants Section (without label) */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* New Chat button */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => router.push("/")} className="gap-2 hover:bg-accent">
                    <div className="flex items-center gap-2">
                      <MessageSquarePlus className="h-5 w-5" />
                      <span>New Chat</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Other assistants */}
                {visibleAssistants.slice(0, showAllAssistants ? 5 : 3).map((assistant) => (
                  <SidebarMenuItem key={assistant.name} className="group/menu-item">
                    <SidebarMenuButton
                      onClick={() => handleAssistantClick(assistant.id)}
                      className="gap-2 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center text-white",
                            assistant.color,
                          )}
                        >
                          {assistant.icon}
                        </div>
                        <span>{assistant.name}</span>
                        {isPinned(assistant.name) && <Pin className="h-3 w-3 text-muted-foreground ml-1" />}
                      </div>
                    </SidebarMenuButton>

                    {/* New Chat Action */}
                    <SidebarMenuAction
                      onClick={() => handleNewChat(assistant.id)}
                      className="opacity-0 group-hover/menu-item:opacity-100 transition-opacity"
                      title="New Chat"
                    >
                      <MessageSquarePlus className="h-4 w-4" />
                    </SidebarMenuAction>

                    {/* More Options Action with Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction
                          className="opacity-0 group-hover/menu-item:opacity-100 transition-opacity right-7"
                          title="More Options"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center" side="bottom" sideOffset={5} alignOffset={-15}>
                        {!isPinned(assistant.name) && (
                          <DropdownMenuItem onClick={() => pinAssistant(assistant.name)}>
                            <Pin className="mr-2 h-4 w-4" />
                            <span>Pin to sidebar</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => hideAssistant(assistant.name)}>
                          <EyeOff className="mr-2 h-4 w-4" />
                          <span>Hide from sidebar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}

                {visibleAssistants.length > 3 && !showAllAssistants && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setShowAllAssistants(true)}
                      className="text-muted-foreground hover:bg-accent"
                    >
                      Load More
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {showAllAssistants && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setShowAllAssistants(false)}
                      className="text-muted-foreground hover:bg-accent"
                    >
                      Show Less
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="gap-2 hover:bg-accent">
                    <Link href="/assistants">
                      <Users2 className="w-4 h-4" />
                      Assistant Gallery
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Chat History Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground">Chat History</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentChats.map((chat) => (
                  <SidebarMenuItem key={chat}>
                    <SidebarMenuButton asChild className="gap-2 hover:bg-accent">
                      <Link href={`/chat/${encodeURIComponent(chat)}`}>
                        <MessageSquare className="w-4 h-4" />
                        <span className="truncate">{chat}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fixed Sidebar Toggle Button - only show when sidebar is collapsed */}
        {!open && (
          <div className="fixed top-4 left-4 z-50">
            <SidebarTrigger className="text-foreground bg-background border border-border shadow-sm hover:bg-accent" />
          </div>
        )}

        <div className={cn("flex-1 overflow-auto bg-background text-foreground", !open && "pt-16")}>{children}</div>
      </div>

      {/* Notification Icon */}
      <NotificationsDropdown />

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="fixed top-4 right-4 z-50 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
            A
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin Panel
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/my-assistants" className="flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              My Assistants
            </Link>
          </DropdownMenuItem>
          <SettingsDialog />
          <DropdownMenuItem className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex dark">
      <SidebarProvider defaultOpen>
        <MainLayoutContent>{children}</MainLayoutContent>
      </SidebarProvider>
    </div>
  )
}
