import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImageGallery({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [active, setActive] = React.useState(0);
  const safeImages = images.length > 0 ? images : [];
  const total = safeImages.length;

  if (total === 0) return null;

  const go = (delta: number) => setActive((i) => (i + delta + total) % total);

  const onKey = (e: React.KeyboardEvent) => {
    if (total <= 1) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(total - 1);
    }
  };

  return (
    <section
      className={cn("flex flex-col gap-3", className)}
      onKeyDown={onKey}
      aria-roledescription="carousel"
      aria-label={`${alt} image gallery, ${total} ${total === 1 ? "image" : "images"}`}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-muted aspect-4/3 sm:aspect-16/10 shadow-card"
        role="group"
        aria-roledescription="slide"
        aria-label={`Image ${active + 1} of ${total}`}
      >
        {safeImages.map((src, i) => {
          const isActive = i === active;
          return (
            <img
              key={src}
              src={src}
              alt={isActive ? `${alt} — image ${i + 1} of ${total}` : ""}
              width={1920}
              height={1280}
              loading={i === 0 ? "eager" : "lazy"}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!isActive}
            />
          );
        })}

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/85 backdrop-blur text-foreground hover:bg-background transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-background/85 backdrop-blur text-foreground hover:bg-background transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div
              className="absolute bottom-3 right-3 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-medium tabular-nums"
              aria-hidden="true"
            >
              {active + 1} / {total}
            </div>
          </>
        )}
      </div>

      {total > 1 && (
        <div
          className="-mx-1 flex gap-2 overflow-x-auto pb-1 px-1 snap-x snap-mandatory sm:flex-wrap sm:overflow-visible"
          role="group"
          aria-label="Choose an image"
        >
          {safeImages.map((src, i) => {
            const isActive = i === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${alt} image ${i + 1} of ${total}`}
                aria-pressed={isActive}
                aria-controls={`gallery-slide-${i}`}
                className={cn(
                  "relative shrink-0 snap-start overflow-hidden rounded-lg transition-smooth",
                  "h-16 w-24 sm:h-20 sm:w-28 md:h-24 md:w-32",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  width={256}
                  height={192}
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {total > 1 ? `Showing image ${active + 1} of ${total}` : ""}
      </div>
    </section>
  );
}
