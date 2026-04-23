import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { RecipeCard } from '#/components/recipe-card'
import { RecipeGridSkeleton } from '#/components/recipe-card-skeleton'
import {
  categories,
  cuisines,
  dietaryTags,
  ingredientIndex,
  recipes,
} from '#/data/recipes'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'
import { RecipesEmptyState } from '#/components/recipes/recipes-empty-state'
import { RecipesFilters } from '#/components/recipes/recipes-filters'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination'

const PAGE_SIZE = 9

function getPageList(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | 'ellipsis')[] = [1]
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)
  if (left > 2) pages.push('ellipsis')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('ellipsis')
  pages.push(total)
  return pages
}

export const Route = createFileRoute('/recipes/')({
  head: () => ({
    meta: [
      { title: 'All Recipes — Fennel' },
      {
        name: 'description',
        content:
          'Browse every recipe. Search by ingredient or title and filter by cuisine and course.',
      },
      { property: 'og:title', content: 'All Recipes — Fennel' },
      {
        property: 'og:description',
        content:
          'Browse every recipe. Search by ingredient or title and filter by cuisine and course.',
      },
    ],
  }),
  component: RecipesPage,
})

type Suggestion = {
  type: 'ingredient' | 'recipe'
  value: string
  label: string
  slug?: string
}

function RecipesPage() {
  const desktopLabelId = useId()
  const desktopListboxId = useId()
  const desktopSearchInputId = useId()
  const desktopDietLabelId = useId()

  const mobileLabelId = useId()
  const mobileListboxId = useId()
  const mobileSearchInputId = useId()
  const mobileDietLabelId = useId()

  const statusId = useId()
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState<string>('All')
  const [category, setCategory] = useState<string>('All')
  const [diets, setDiets] = useState<string[]>([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(true)

  const desktopInputRef = useRef<HTMLInputElement>(null)
  const desktopWrapRef = useRef<HTMLDivElement>(null)

  const mobileInputRef = useRef<HTMLInputElement>(null)
  const mobileWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 450)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const t = window.setTimeout(() => setIsLoading(false), 250)
    return () => window.clearTimeout(t)
  }, [query, cuisine, category, diets])

  const suggestions = useMemo<Suggestion[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const ing: Suggestion[] = ingredientIndex
      .filter((i) => i.includes(q))
      .slice(0, 6)
      .map((value) => ({ type: 'ingredient', value, label: value }))

    const rec: Suggestion[] = recipes
      .filter((r) => r.title.toLowerCase().includes(q))
      .slice(0, 4)
      .map((r) => ({
        type: 'recipe',
        value: r.title,
        label: r.title,
        slug: r.slug,
      }))

    return [...ing, ...rec]
  }, [query])

  useEffect(() => {
    setActiveSuggestion(-1)
  }, [suggestions.length])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      const inDesktop = !!desktopWrapRef.current?.contains(target)
      const inMobile = !!mobileWrapRef.current?.contains(target)
      if (!inDesktop && !inMobile) setSuggestionsOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return recipes.filter((r) => {
      if (cuisine !== 'All' && r.cuisine !== cuisine) return false
      if (category !== 'All' && r.category !== category) return false
      if (
        diets.length > 0 &&
        !diets.every((d) => r.dietary.includes(d as never))
      )
        return false
      if (!q) return true
      const haystack = [
        r.title,
        r.tagline,
        r.cuisine,
        ...r.ingredients,
        ...r.dietary,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, cuisine, category, diets])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const currentPage = Math.min(page, totalPages)
  const paginated = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  )

  const hasFilters =
    query !== '' || cuisine !== 'All' || category !== 'All' || diets.length > 0
  const isOpen = suggestionsOpen && suggestions.length > 0

  const toggleDiet = (tag: string) =>
    setDiets((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag],
    )

  const clearAll = () => {
    setQuery('')
    setCuisine('All')
    setCategory('All')
    setDiets([])
    setSuggestionsOpen(false)
    desktopInputRef.current?.focus()
    mobileInputRef.current?.focus()
  }

  const applySuggestion = (s: Suggestion) => {
    if (s.type === 'recipe' && s.slug) {
      void navigate({
        to: '/recipes/$slug',
        params: { slug: s.slug },
      })
      return
    }
    setQuery(s.value)
    setSuggestionsOpen(false)
    desktopInputRef.current?.focus()
    mobileInputRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      setSuggestionsOpen(false)
      return
    }
    if (!isOpen) {
      if (
        (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
        suggestions.length > 0
      ) {
        setSuggestionsOpen(true)
        setActiveSuggestion(e.key === 'ArrowDown' ? 0 : suggestions.length - 1)
        e.preventDefault()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActiveSuggestion(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActiveSuggestion(suggestions.length - 1)
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0 && activeSuggestion < suggestions.length) {
        e.preventDefault()
        applySuggestion(suggestions[activeSuggestion])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      if (query) setQuery('')
      setSuggestionsOpen(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <p className="text-primary uppercase tracking-[0.25em] text-xs mb-3">
          The collection
        </p>
        <h1 className="font-display text-5xl md:text-6xl">All recipes</h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Search by ingredient or name. Filter by cuisine or course. Click a
          card to start cooking.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] lg:items-start">
        <aside className="hidden lg:block lg:sticky lg:top-24">
          <RecipesFilters
            labelId={desktopLabelId}
            listboxId={desktopListboxId}
            searchInputId={`recipe-search-${desktopSearchInputId}`}
            dietLabelId={`diet-label-${desktopDietLabelId}`}
            wrapRef={desktopWrapRef}
            inputRef={desktopInputRef}
            query={query}
            setQuery={(v) => {
              setQuery(v)
              setSuggestionsOpen(true)
            }}
            onFocusSearch={() => setSuggestionsOpen(true)}
            suggestions={suggestions}
            isOpen={isOpen}
            activeSuggestion={activeSuggestion}
            setActiveSuggestion={setActiveSuggestion}
            applySuggestion={applySuggestion}
            onKeyDown={onKeyDown}
            cuisine={cuisine}
            setCuisine={setCuisine}
            cuisines={cuisines}
            category={category}
            setCategory={setCategory}
            categories={categories}
            hasFilters={hasFilters}
            clearAll={clearAll}
            diets={diets}
            dietaryTags={dietaryTags}
            toggleDiet={toggleDiet}
          />
        </aside>

        <section>
          <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[92vw] max-w-sm overflow-auto"
              >
                <SheetHeader className="mb-4">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription className="sr-only">
                    Search and filter recipes by cuisine, course, and dietary
                    preferences.
                  </SheetDescription>
                </SheetHeader>
                <RecipesFilters
                  labelId={mobileLabelId}
                  listboxId={mobileListboxId}
                  searchInputId={`recipe-search-${mobileSearchInputId}`}
                  dietLabelId={`diet-label-${mobileDietLabelId}`}
                  wrapRef={mobileWrapRef}
                  inputRef={mobileInputRef}
                  query={query}
                  setQuery={(v) => {
                    setQuery(v)
                    setSuggestionsOpen(true)
                  }}
                  onFocusSearch={() => setSuggestionsOpen(true)}
                  suggestions={suggestions}
                  isOpen={isOpen}
                  activeSuggestion={activeSuggestion}
                  setActiveSuggestion={setActiveSuggestion}
                  applySuggestion={applySuggestion}
                  onKeyDown={onKeyDown}
                  cuisine={cuisine}
                  setCuisine={setCuisine}
                  cuisines={cuisines}
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  hasFilters={hasFilters}
                  clearAll={clearAll}
                  diets={diets}
                  dietaryTags={dietaryTags}
                  toggleDiet={toggleDiet}
                />
              </SheetContent>
            </Sheet>

            {hasFilters && (
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-2"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear
              </button>
            )}
          </div>

          {/* Polite live region announces result counts as the user types/filters */}
          <p
            id={statusId}
            role="status"
            aria-live="polite"
            className="text-sm text-muted-foreground mb-6"
          >
            {isLoading
              ? 'Loading recipes…'
              : `${paginated.length} ${paginated.length === 1 ? 'recipe' : 'recipes'} found`}
          </p>

          {isLoading ? (
            <RecipeGridSkeleton count={6} />
          ) : paginated.length === 0 ? (
            <RecipesEmptyState
              query={query}
              onClear={clearAll}
              onPickIngredient={(ing) => setQuery(ing)}
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {paginated.map((r) => (
                  <RecipeCard key={r.slug} recipe={r} query={query} />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        aria-disabled={currentPage === 1}
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : undefined
                        }
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setPage(currentPage - 1)
                        }}
                      />
                    </PaginationItem>
                    {getPageList(currentPage, totalPages).map((p, i) =>
                      p === 'ellipsis' ? (
                        <PaginationItem key={`e-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === currentPage}
                            onClick={(e) => {
                              e.preventDefault()
                              setPage(p)
                            }}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        aria-disabled={currentPage === totalPages}
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : undefined
                        }
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) setPage(currentPage + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
