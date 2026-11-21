import { cn } from "@/lib/utils";
import { tileClasses } from "./grid-layout";

/** Skeleton que respeita o ritmo da grelha assimétrica (sem texto "A carregar..."). */
export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  const ratios = [
    "landscape",
    "portrait",
    "portrait",
    "landscape",
    "landscape",
    "portrait",
  ] as const;
  return (
    <div
      className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12"
      aria-busy="true"
      aria-label="A carregar projetos"
    >
      {Array.from({ length: count }).map((_, i) => {
        const ratio = ratios[i % ratios.length];
        return (
          <div key={i} className={tileClasses(i, ratio)}>
            <div
              className={cn(
                "skeleton-paper w-full rounded-sm",
                ratio === "portrait" ? "aspect-[4/5]" : "aspect-[16/9]",
              )}
            />
            <div className="mt-5 flex items-baseline gap-4">
              <div className="skeleton-paper h-3 w-6 rounded-sm" />
              <div className="skeleton-paper h-6 w-1/2 rounded-sm" />
            </div>
            <div className="skeleton-paper mt-3 h-3 w-1/3 rounded-sm" />
          </div>
        );
      })}
    </div>
  );
}

export function CaseStudySkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:pt-20" aria-busy="true">
      <div className="skeleton-paper h-3 w-40 rounded-sm" />
      <div className="skeleton-paper mt-8 h-16 w-3/4 rounded-sm md:h-24" />
      <div className="skeleton-paper mt-4 h-16 w-1/2 rounded-sm md:h-24" />
      <div className="skeleton-paper mt-14 aspect-[16/9] w-full rounded-sm" />
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <div className="space-y-3 md:col-span-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton-paper h-4 w-2/3 rounded-sm" />
          ))}
        </div>
        <div className="space-y-3 md:col-span-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="skeleton-paper h-4 rounded-sm"
              style={{ width: `${92 - i * 7}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
