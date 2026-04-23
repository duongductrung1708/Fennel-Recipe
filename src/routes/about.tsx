import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About — Fennel' },
      {
        name: 'description',
        content:
          'Fennel is a small, considered recipe journal. Learn about the philosophy behind the cooking.',
      },
      { property: 'og:title', content: 'About — Fennel' },
      {
        property: 'og:description',
        content: 'Fennel is a small, considered recipe journal.',
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-19">
      <p className="text-primary uppercase tracking-[0.25em] text-xs mb-3">
        About
      </p>
      <h1 className="font-display text-5xl md:text-6xl mb-8">
        A quieter way to cook.
      </h1>
      <div className="prose prose-lg max-w-none space-y-6 text-foreground/85 leading-relaxed">
        <p>
          Fennel is a small recipe journal built around a simple idea: every
          recipe here should be one you'd actually make on a Tuesday night. No
          three-paragraph backstories, no impossible-to-find ingredients — just
          careful, well-tested cooking.
        </p>
        <p>
          We believe in seasonal produce, sharp knives, and reading a recipe all
          the way through before you start. We believe a single perfect plate of
          pasta can be just as memorable as a tasting menu.
        </p>
        <p>
          Browse the{' '}
          <Link
            to="/recipes"
            className="text-primary underline underline-offset-4"
          >
            collection
          </Link>
          , find something that catches your eye, and cook it tonight.
        </p>
      </div>
    </div>
  )
}
