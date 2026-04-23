import { Link } from '@tanstack/react-router'
import * as React from 'react'
import type { Recipe } from '@/data/recipes'
import { Clock, Users } from 'lucide-react'
import { highlight } from '@/lib/highlight'
import { cn } from '@/lib/utils'

export function RecipeCard({
  recipe,
  query = '',
}: {
  recipe: Recipe
  query?: string
}) {
  const [activeImage, setActiveImage] = React.useState(0)
  const images = recipe.gallery.length ? recipe.gallery : [recipe.image]

  return (
    <Link
      to="/recipes/$slug"
      params={{ slug: recipe.slug }}
      aria-label={`${recipe.title}. ${recipe.tagline} ${recipe.cuisine} ${recipe.category}, ${recipe.time} minutes, serves ${recipe.servings}, ${recipe.difficulty}.`}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-soft hover:shadow-card transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === activeImage ? recipe.title : ''}
            loading="lazy"
            width={1024}
            height={1024}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105',
              i === activeImage ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={i !== activeImage}
          />
        ))}
        <div className="absolute top-3 left-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium tracking-wide uppercase">
          {recipe.cuisine}
        </div>

        {images.length > 1 && (
          <div
            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 rounded-full bg-background/85 backdrop-blur px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            aria-hidden="true"
          >
            {images.map((_, i) => (
              <span
                key={i}
                onMouseEnter={() => setActiveImage(i)}
                className={cn(
                  'block h-1.5 rounded-full transition-all pointer-events-auto',
                  i === activeImage
                    ? 'w-5 bg-primary'
                    : 'w-1.5 bg-foreground/30',
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-13 font-display text-2xl leading-tight line-clamp-2 group-hover:text-primary transition-smooth">
          {highlight(recipe.title, query)}
        </h3>
        <p className="mt-2 min-h-10 text-sm text-muted-foreground line-clamp-2">
          {highlight(recipe.tagline, query)}
        </p>
        <div
          className="mt-auto flex min-w-0 items-center gap-4 overflow-hidden pt-4 text-xs text-muted-foreground"
          aria-hidden="true"
        >
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <Clock className="h-3.5 w-3.5" />
            {recipe.time} min
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap">
            <Users className="h-3.5 w-3.5" />
            {recipe.servings} servings
          </span>
          <span className="ml-auto min-w-0 truncate text-foreground/70">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}
