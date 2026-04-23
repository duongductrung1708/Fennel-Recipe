import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getRecipe } from '#/data/recipes'
import type { DietaryTag } from '#/data/recipes'
import { ImageGallery } from '#/components/image-gallery'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '#/components/ui/tooltip'
import {
  ArrowLeft,
  Clock,
  Users,
  ChefHat,
  Leaf,
  Sprout,
  WheatOff,
  MilkOff,
  Fish,
  Flame,
  Nut,
  Shell,
  Drumstick,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react'

type DietaryMeta = {
  icon: React.ComponentType<{ className?: string }>
  description: string
  kind: 'info' | 'warn'
}

const DIETARY_META: Record<DietaryTag, DietaryMeta> = {
  Vegetarian: {
    icon: Leaf,
    description:
      'Suitable for vegetarians — contains no meat, poultry, or seafood.',
    kind: 'info',
  },
  Vegan: {
    icon: Sprout,
    description:
      'Suitable for vegans — contains no animal products including dairy, eggs, or honey.',
    kind: 'info',
  },
  'Gluten-Free': {
    icon: WheatOff,
    description:
      'Made without gluten-containing grains such as wheat, barley, or rye.',
    kind: 'info',
  },
  'Dairy-Free': {
    icon: MilkOff,
    description:
      'Made without milk, cheese, butter, or other dairy ingredients.',
    kind: 'info',
  },
  Pescatarian: {
    icon: Fish,
    description: 'Contains fish or seafood but no other meat or poultry.',
    kind: 'info',
  },
  Spicy: {
    icon: Flame,
    description:
      'Noticeably spicy — includes chilies or other hot ingredients.',
    kind: 'info',
  },
  'Contains Nuts': {
    icon: Nut,
    description: 'Allergen warning: contains tree nuts or peanuts.',
    kind: 'warn',
  },
  'Contains Shellfish': {
    icon: Shell,
    description:
      'Allergen warning: contains shellfish such as shrimp, crab, or lobster.',
    kind: 'warn',
  },
  'Contains Pork': {
    icon: Drumstick,
    description: 'Contains pork — may not be suitable for all diets.',
    kind: 'warn',
  },
}

function resolveDietaryMeta(tag: string): DietaryMeta {
  const known = (DIETARY_META as Record<string, DietaryMeta | undefined>)[tag]
  if (known) return known

  const isWarning = /^contains\b/i.test(tag)
  if (isWarning) {
    const allergen =
      tag
        .replace(/^contains\s+/i, '')
        .trim()
        .toLowerCase() || 'an allergen'
    return {
      icon: HelpCircle,
      kind: 'warn',
      description: `Allergen warning: this recipe contains ${allergen}. Check the ingredient list before cooking if you have allergies or dietary restrictions.`,
    }
  }
  return {
    icon: HelpCircle,
    kind: 'info',
    description: `Dietary note: ${tag}. Review the full ingredient list to confirm this recipe fits your dietary needs.`,
  }
}

export const Route = createFileRoute('/recipes/$slug')({
  loader: ({ params }) => {
    const recipe = getRecipe(params.slug)
    if (!recipe) throw notFound()
    return { recipe }
  },
  head: ({ loaderData }) => {
    const r = loaderData?.recipe
    if (!r) return { meta: [{ title: 'Recipe — Fennel' }] }
    return {
      meta: [
        { title: `${r.title} — Fennel` },
        { name: 'description', content: r.tagline },
        { property: 'og:title', content: `${r.title} — Fennel` },
        { property: 'og:description', content: r.tagline },
        { property: 'og:image', content: r.image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: r.image },
      ],
    }
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl mb-4">Recipe not found</h1>
      <Link to="/recipes" className="text-primary hover:underline">
        Back to all recipes
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl mb-4">Something went wrong</h1>
      <p className="text-muted-foreground text-sm mb-6">{error.message}</p>
      <Link to="/recipes" className="text-primary hover:underline">
        Back to all recipes
      </Link>
    </div>
  ),
  component: RecipePage,
})

function RecipePage() {
  const { recipe } = Route.useLoaderData()
  const images = recipe.gallery.length ? recipe.gallery : [recipe.image]

  return (
    <article>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-6 transition-smooth"
        >
          <ArrowLeft className="h-4 w-4" /> All recipes
        </Link>

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-3">
              {recipe.cuisine}
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              {recipe.title}
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl">
              {recipe.tagline}
            </p>
            {recipe.dietary.length > 0 && (
              <TooltipProvider delayDuration={150}>
                <ul
                  role="list"
                  aria-label={`Dietary and allergen information: ${recipe.dietary.join(', ')}`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {recipe.dietary.map((tag) => {
                    const meta = resolveDietaryMeta(tag)
                    const Icon = meta.icon
                    const isWarning = meta.kind === 'warn'
                    const StatusIcon = isWarning ? AlertTriangle : CheckCircle2
                    const statusLabel = isWarning
                      ? 'Allergen warning'
                      : 'Dietary suitability'
                    return (
                      <li key={tag} role="listitem">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              tabIndex={0}
                              role="note"
                              aria-label={`${statusLabel}: ${tag}. ${meta.description}`}
                              className={
                                'inline-flex min-h-11 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold border-2 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-help sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-xs sm:font-medium sm:border ' +
                                (isWarning
                                  ? 'bg-destructive/20 text-destructive border-destructive/60 hover:bg-destructive/30'
                                  : 'bg-primary/20 text-primary border-primary/50 hover:bg-primary/30')
                              }
                            >
                              <StatusIcon
                                className="h-4 w-4 shrink-0 sm:h-3 sm:w-3"
                                aria-hidden="true"
                              />
                              <Icon
                                className="h-4 w-4 shrink-0 sm:h-3 sm:w-3"
                                aria-hidden="true"
                              />
                              <span aria-hidden="true">{tag}</span>
                              <span className="sr-only">
                                . {meta.description}
                              </span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="max-w-xs text-xs leading-relaxed"
                          >
                            <p className="font-semibold mb-0.5">
                              {statusLabel}: {tag}
                            </p>
                            <p className="opacity-90">{meta.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    )
                  })}
                </ul>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-8">
        <ImageGallery images={images} alt={recipe.title} />
      </div>

      <div className="border-y border-border bg-card mt-10">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <Stat
            icon={<Clock className="h-4 w-4" />}
            label="Time"
            value={`${recipe.time} min`}
          />
          <Stat
            icon={<Users className="h-4 w-4" />}
            label="Servings"
            value={`${recipe.servings}`}
          />
          <Stat
            icon={<ChefHat className="h-4 w-4" />}
            label="Difficulty"
            value={recipe.difficulty}
          />
          <Stat label="Course" value={recipe.category} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_2fr]">
        <aside>
          <div className="lg:sticky lg:top-24">
            <h2 className="font-display text-3xl mb-5">Ingredients</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing) => (
                <li key={ing} className="flex items-start gap-3 text-sm">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section>
          <h2 className="font-display text-3xl mb-6">Method</h2>
          <ol className="space-y-7">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-3xl text-primary leading-none shrink-0 w-10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-foreground/90 leading-relaxed pt-1">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-primary">{icon}</span>}
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
