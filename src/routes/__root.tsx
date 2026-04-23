import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import appCss from '../styles.css?url'
import faviconPng from '../assets/logo-fennels.png?url'
import { SiteHeader } from '#/components/site-header'
import { SiteFooter } from '#/components/site-footer'
import { ScrollToTop } from '#/components/ScrollToTop'

function NotFoundComponent() {
  return (
    <div className="flex min-h-[65vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-display text-2xl text-foreground">
          Recipe not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This dish seems to have left the kitchen.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-smooth"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Fennel — Recipes worth cooking' },
      {
        name: 'description',
        content:
          'Discover beautifully crafted recipes from around the world. Search by ingredient, cuisine, or course.',
      },
      { property: 'og:title', content: 'Fennel — Recipes worth cooking' },
      {
        property: 'og:description',
        content: 'Discover beautifully crafted recipes from around the world.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', type: 'image/png', href: faviconPng },
      { rel: 'apple-touch-icon', href: faviconPng },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  )
}
