export function ProjectsSkeleton() {
  return (
    <section className="container py-12 md:py-24">
      <div className="space-y-4 text-center mb-12 animate-pulse">
        <div className="h-10 bg-muted rounded-lg max-w-sm mx-auto"></div>
        <div className="h-6 bg-muted rounded-lg max-w-2xl mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-muted p-4 space-y-4 animate-pulse">
            <div className="h-6 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="h-5 bg-muted rounded-full w-16"></div>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <div className="h-4 bg-muted rounded w-12"></div>
              <div className="h-4 bg-muted rounded w-12"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="h-10 bg-muted rounded-lg w-32 animate-pulse"></div>
      </div>
    </section>
  )
}
