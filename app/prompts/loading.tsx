import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <Skeleton className="h-12 w-[300px] mb-4" />
        <Skeleton className="h-6 w-[600px]" />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-[100px]" />
              ))}
            </div>
            <Skeleton className="h-10 w-[150px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-6 w-[200px]" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
