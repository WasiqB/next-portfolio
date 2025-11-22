const BlogsSkeleton = () => {
  return (
    <section className="container py-12 md:py-24">
      <div className="space-y-4 text-center mb-8 animate-pulse">
        <div className="h-10 bg-muted rounded-lg max-w-sm mx-auto"></div>
        <div className="h-6 bg-muted rounded-lg max-w-2xl mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-muted overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="flex gap-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="h-5 bg-muted rounded-full w-20"></div>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-4 bg-muted rounded w-8"></div>
                  ))}
                </div>
              </div>
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

export { BlogsSkeleton }