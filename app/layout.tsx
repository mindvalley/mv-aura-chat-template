import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { RootLayoutProvider } from "@/components/root-layout-provider"
import { ThemeProvider } from "@/contexts/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aura",
  description: "AI Assistant Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider>
          <RootLayoutProvider>{children}</RootLayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
