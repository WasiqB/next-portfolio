export default function Loading() {
  return (
    <div className="container py-12 max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 md:py-24">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-9 w-24 bg-muted rounded-md animate-pulse"></div>
        <div className="h-9 w-32 bg-muted rounded-md animate-pulse"></div>
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="h-6 w-full bg-muted rounded-md animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-64 bg-muted rounded-lg animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}
