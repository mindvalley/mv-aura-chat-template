import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border py-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-20 mt-1" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Left panel */}
        <div className="w-1/2 border-r border-border flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <div className="w-1/2 p-4">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="w-1/2 p-4">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/2 flex flex-col">
          {/* Preview header */}
          <div className="p-4 border-b border-border">
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>

          {/* Preview content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col items-center text-center mb-8">
              <Skeleton className="h-16 w-16 rounded-full mb-4" />
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>

          {/* Preview input */}
          <div className="p-4 border-t border-border">
            <Skeleton className="h-12 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
