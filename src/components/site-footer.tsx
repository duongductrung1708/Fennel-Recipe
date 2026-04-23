export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-display text-foreground text-lg">
          Fennel<span className="text-primary">.</span>
        </p>
        <p>Cooked with care · {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
