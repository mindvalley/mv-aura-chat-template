"use client"

import { usePathname } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Toaster } from "@/components/ui/sonner"
import type React from "react" // Import React

export function RootLayoutProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // If we're in the admin section, only render the AdminLayout
  if (pathname?.startsWith("/admin")) {
    return (
      <>
        {children}
        <Toaster />
      </>
    )
  }

  // For the create assistant page, render it full-screen without the MainLayout
  if (pathname === "/my-assistants/create") {
    return (
      <>
        {children}
        <Toaster />
      </>
    )
  }

  // For all other routes, use the MainLayout
  return (
    <>
      <MainLayout>{children}</MainLayout>
      <Toaster />
    </>
  )
}
