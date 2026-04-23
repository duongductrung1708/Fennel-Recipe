import { cn } from '@/lib/utils'

export function RecipeCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl bg-card shadow-soft"
      aria-hidden="true"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted skeleton-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-6 w-3/4 rounded skeleton-shimmer" />
        <div className="h-4 w-full rounded skeleton-shimmer" />
        <div className="h-4 w-2/3 rounded skeleton-shimmer" />
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3 w-14 rounded skeleton-shimmer" />
          <div className="h-3 w-20 rounded skeleton-shimmer" />
          <div className="h-3 w-12 rounded skeleton-shimmer ml-auto" />
        </div>
      </div>
    </div>
  )
}

export function RecipeGridSkeleton({
  count = 6,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading recipes"
    >
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading recipes…</span>
    </div>
  )
}
