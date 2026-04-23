import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/ui/sheet'

const links = [
  { to: '/', label: 'Home' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/about', label: 'About' },
]
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg leading-none">
            ƒ
          </span>
          <span className="font-display text-xl tracking-tight">
            Fennel<span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              activeProps={{
                className:
                  "text-foreground after:scale-x-100 after:bg-primary after:opacity-100",
              }}
              className="relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-smooth hover:text-foreground after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-primary after:opacity-60 after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[92vw] max-w-sm">
              <SheetHeader className="mb-6">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to home, recipes, or about.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    to="/"
                    activeOptions={{ exact: true }}
                    activeProps={{ className: 'text-foreground bg-accent/40' }}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-smooth"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/recipes"
                    activeProps={{ className: 'text-foreground bg-accent/40' }}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-smooth"
                  >
                    Recipes
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/about"
                    activeProps={{ className: 'text-foreground bg-accent/40' }}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/20 transition-smooth"
                  >
                    About
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
