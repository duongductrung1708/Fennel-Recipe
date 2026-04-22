import { Link } from "@tanstack/react-router";
import { SearchX, Sparkles, X } from "lucide-react";

const POPULAR_INGREDIENTS = ["tomato", "garlic", "basil", "cheese", "chocolate"];

export function RecipesEmptyState({
  query,
  onClear,
  onPickIngredient,
}: {
  query: string;
  onClear: () => void;
  onPickIngredient: (ingredient: string) => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 sm:py-20 text-center"
      role="region"
      aria-labelledby="empty-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 35%, transparent), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-md">
        <div className="mx-auto mb-5 grid place-items-center h-14 w-14 rounded-full bg-primary/10 text-primary">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 id="empty-title" className="font-display text-3xl mb-2">
          No recipes match{query ? ` "${query}"` : " those filters"}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          Try a different search term, remove a filter, or explore one of these popular ingredients
          instead.
        </p>

        <div className="mb-7 flex flex-wrap justify-center gap-2">
          {POPULAR_INGREDIENTS.map((ing) => (
            <button
              key={ing}
              type="button"
              onClick={() => onPickIngredient(ing)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:text-foreground transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
              {ing}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Clear all filters
          </button>
          <Link
            to="/recipes"
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-primary/40 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Browse everything
          </Link>
        </div>
      </div>
    </div>
  );
}
