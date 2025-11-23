export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="h-8 w-20 bg-muted animate-pulse rounded" />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start mb-8">
          <div className="h-24 w-24 md:h-32 md:w-32 bg-muted animate-pulse rounded-full" />
          <div className="flex-1 space-y-4 w-full">
            <div className="space-y-2">
              <div className="h-8 w-48 bg-muted animate-pulse rounded" />
              <div className="h-5 w-32 bg-muted animate-pulse rounded" />
            </div>
            <div className="h-20 w-full bg-muted animate-pulse rounded" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-20 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6">
              <div className="h-6 w-32 bg-muted animate-pulse rounded mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

