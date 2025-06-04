"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "New Assistant Available",
      description: "Try out our new Data Analysis Assistant!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Chat Exported",
      description: "Your chat export is ready for download",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "System Update",
      description: "Aura has been updated to version 1.4",
      time: "1 day ago",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="fixed top-4 right-16 z-50 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-blue-500 hover:text-blue-700"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn("flex flex-col items-start p-3 cursor-pointer", !notification.read && "bg-muted/50")}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between w-full">
                  <span className="font-medium">{notification.title}</span>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
