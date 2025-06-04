"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface VerticalTabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

interface VerticalTabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const VerticalTabsContext = React.createContext<VerticalTabsContextValue | undefined>(undefined)

function useVerticalTabsContext() {
  const context = React.useContext(VerticalTabsContext)
  if (!context) {
    throw new Error("useVerticalTabsContext must be used within a VerticalTabs component")
  }
  return context
}

export function VerticalTabs({ defaultValue, value, onValueChange, className, children, ...props }: VerticalTabsProps) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "")

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setTabValue(value)
    }
  }, [value])

  return (
    <VerticalTabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
      <div className={cn("flex", className)} {...props}>
        {children}
      </div>
    </VerticalTabsContext.Provider>
  )
}

interface VerticalTabsListProps {
  className?: string
  children: React.ReactNode
}

export function VerticalTabsList({ className, children, ...props }: VerticalTabsListProps) {
  return (
    <div className={cn("w-40 border-r shrink-0", className)} {...props}>
      <div className="flex flex-col py-4">{children}</div>
    </div>
  )
}

interface VerticalTabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function VerticalTabsTrigger({ value, className, children, ...props }: VerticalTabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useVerticalTabsContext()

  return (
    <button
      className={cn(
        "flex items-center gap-2 px-6 py-2 text-sm font-medium transition-colors",
        selectedValue === value
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

interface VerticalTabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function VerticalTabsContent({ value, className, children, ...props }: VerticalTabsContentProps) {
  const { value: selectedValue } = useVerticalTabsContext()

  if (selectedValue !== value) {
    return null
  }

  return (
    <div className={cn("flex-1 overflow-y-auto p-6", className)} {...props}>
      {children}
    </div>
  )
}
