import { createFileRoute, Link } from '@tanstack/react-router'
import heroImage from '@/assets/hero-kitchen.jpg'
import { recipes } from '@/data/recipes'
import { RecipeCard } from '@/components/recipe-card'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Fennel — Recipes worth cooking' },
      {
        name: 'description',
        content:
          'A small, considered collection of recipes from around the world. Search and cook with confidence.',
      },
      { property: 'og:title', content: 'Fennel — Recipes worth cooking' },
      {
        property: 'og:description',
        content:
          'A small, considered collection of recipes from around the world.',
      },
    ],
  }),
  component: Index,
})

function Index() {
  const featured = recipes.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fresh ingredients on a wooden table"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
          <p className="text-cream/80 uppercase tracking-[0.3em] text-xs mb-6">
            A recipe journal
          </p>
          <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-3xl">
            Cook something
            <span className="italic text-spice"> beautiful</span> tonight.
          </h1>
          <p className="mt-8 text-cream/85 text-lg max-w-xl">
            A small, well-tested collection of recipes — searchable by
            ingredient, cuisine, and course. No life stories, just the cooking.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-6 py-3 text-sm font-medium hover:bg-cream/90 transition-smooth"
            >
              Browse all recipes
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 text-cream px-6 py-3 text-sm font-medium hover:bg-cream/10 transition-smooth"
            >
              About Fennel
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary uppercase tracking-[0.25em] text-xs mb-2">
              This week
            </p>
            <h2 className="font-display text-4xl md:text-5xl">
              Featured recipes
            </h2>
          </div>
          <Link
            to="/recipes"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* Editorial pull quote */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-display italic text-3xl md:text-4xl leading-snug text-foreground">
            “The best recipes are the ones you reach for again and again —
            splattered, smudged, and slightly stained with use.”
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            The Fennel kitchen
          </p>
        </div>
      </section>
    </>
  )
}
