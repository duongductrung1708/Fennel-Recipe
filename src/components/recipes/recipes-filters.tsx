import { useId } from 'react'
import { Search, X } from 'lucide-react'

import { highlight } from '#/lib/highlight'
import { cn } from '#/lib/utils'

type Suggestion = {
  type: 'ingredient' | 'recipe'
  value: string
  label: string
  slug?: string
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  const groupId = useId()
  return (
    <div role="group" aria-labelledby={groupId}>
      <p
        id={groupId}
        className="text-xs uppercase tracking-wider text-muted-foreground mb-2"
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              aria-label={`${label}: ${opt}`}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-smooth border focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                active
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-foreground/80 border-border hover:border-primary/40 hover:text-foreground',
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function RecipesFilters({
  labelId,
  listboxId,
  searchInputId,
  dietLabelId,
  wrapRef,
  inputRef,
  query,
  setQuery,
  onFocusSearch,
  suggestions,
  isOpen,
  activeSuggestion,
  setActiveSuggestion,
  applySuggestion,
  onKeyDown,
  cuisine,
  setCuisine,
  cuisines,
  category,
  setCategory,
  categories,
  hasFilters,
  clearAll,
  diets,
  dietaryTags,
  toggleDiet,
}: {
  labelId: string
  listboxId: string
  searchInputId: string
  dietLabelId: string
  wrapRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
  query: string
  setQuery: (v: string) => void
  onFocusSearch: () => void
  suggestions: Suggestion[]
  isOpen: boolean
  activeSuggestion: number
  setActiveSuggestion: (v: number) => void
  applySuggestion: (s: Suggestion) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  cuisine: string
  setCuisine: (v: string) => void
  cuisines: string[]
  category: string
  setCategory: (v: string) => void
  categories: string[]
  hasFilters: boolean
  clearAll: () => void
  diets: string[]
  dietaryTags: string[]
  toggleDiet: (tag: string) => void
}) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-soft">
      <label htmlFor={searchInputId} id={labelId} className="sr-only">
        Search recipes by name or ingredient
      </label>
      <div className="relative" ref={wrapRef}>
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={searchInputId}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          onFocus={onFocusSearch}
          onKeyDown={onKeyDown}
          placeholder="Search by recipe or ingredient (e.g. tomato, ramen, basil)…"
          autoComplete="off"
          spellCheck={false}
          role="combobox"
          aria-labelledby={labelId}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && activeSuggestion >= 0
              ? `${listboxId}-opt-${activeSuggestion}`
              : undefined
          }
          className="w-full rounded-lg border border-border bg-background pl-11 pr-10 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card transition-smooth"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}

        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="Search suggestions"
            className="absolute z-30 left-0 right-0 mt-2 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden"
          >
            {suggestions.map((s, i) => {
              const isActive = i === activeSuggestion
              const a11yLabel =
                s.type === 'recipe'
                  ? `Open recipe: ${s.label}`
                  : `Filter by ingredient: ${s.label}`
              return (
                <li
                  key={`${s.type}-${s.value}`}
                  id={`${listboxId}-opt-${i}`}
                  role="option"
                  aria-selected={isActive}
                  aria-label={a11yLabel}
                  onMouseEnter={() => setActiveSuggestion(i)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    applySuggestion(s)
                  }}
                  className={cn(
                    'flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer text-sm transition-smooth',
                    isActive ? 'bg-accent/40' : 'hover:bg-accent/20',
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <Search
                      className="h-3.5 w-3.5 text-muted-foreground shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate" aria-hidden="true">
                      {highlight(s.label, query)}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0',
                      s.type === 'recipe'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {s.type}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-6">
        <FilterGroup
          label="Cuisine"
          options={['All', ...cuisines]}
          value={cuisine}
          onChange={setCuisine}
        />
        <FilterGroup
          label="Course"
          options={['All', ...categories]}
          value={category}
          onChange={setCategory}
        />
        {hasFilters && (
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-2 py-1"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-5">
        <p
          id={dietLabelId}
          className="text-xs uppercase tracking-wider text-muted-foreground mb-2"
        >
          Dietary & allergens
        </p>
        <div
          role="group"
          aria-labelledby={dietLabelId}
          className="flex flex-wrap gap-2"
        >
          {dietaryTags.map((tag) => {
            const active = diets.includes(tag)
            const isWarning = tag.startsWith('Contains')
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleDiet(tag)}
                aria-pressed={active}
                aria-label={
                  isWarning
                    ? `Show only recipes that contain ${tag.replace('Contains ', '').toLowerCase()}`
                    : `Show only ${tag} recipes`
                }
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium border transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  active
                    ? isWarning
                      ? 'bg-destructive/15 text-destructive border-destructive/40'
                      : 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground/80 border-border hover:border-primary/40 hover:text-foreground',
                )}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
