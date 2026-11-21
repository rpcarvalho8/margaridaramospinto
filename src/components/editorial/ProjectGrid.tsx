import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { tileClasses } from "./grid-layout";
import { ProjectGridSkeleton } from "./ProjectSkeleton";

export const ALL = "__all__";

type ProjectGridProps = {
  projects: Project[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export function ProjectGrid({
  projects,
  isLoading,
  isError,
  error,
  activeCategory,
  onCategoryChange,
}: ProjectGridProps) {
  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    for (const p of projects ?? []) seen.set(p.category, (seen.get(p.category) ?? 0) + 1);
    return [...seen.entries()];
  }, [projects]);

  const visible = useMemo(
    () =>
      activeCategory === ALL
        ? (projects ?? [])
        : (projects ?? []).filter((p) => p.category === activeCategory),
    [projects, activeCategory],
  );

  return (
    <div>
      {/* Filtros — sem reload, acessíveis por teclado */}
      <div
        role="toolbar"
        aria-label="Filtrar projetos por categoria"
        className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-border py-4"
      >
        <FilterButton
          active={activeCategory === ALL}
          onClick={() => onCategoryChange(ALL)}
          label="Todos"
          count={projects?.length}
        />
        {categories.map(([category, count]) => (
          <FilterButton
            key={category}
            active={activeCategory === category}
            onClick={() => onCategoryChange(category)}
            label={category}
            count={count}
          />
        ))}
      </div>

      <div className="mt-14">
        {isLoading ? (
          <ProjectGridSkeleton />
        ) : isError ? (
          <EmptyState
            title="Os projetos estão a descansar."
            text="Não foi possível carregar o portfólio neste momento. Tente novamente daqui a pouco."
            detail={import.meta.env.DEV ? describeError(error) : undefined}
          />
        ) : visible.length === 0 ? (
          <EmptyState
            title="Em breve, novos projetos."
            text="Esta coleção está a ser preparada com cuidado."
          />
        ) : (
          <ul
            key={activeCategory}
            className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-10"
          >
            {visible.map((project, i) => (
              <li
                key={project.id}
                className={cn("animate-reveal", tileClasses(i, project.cover_ratio))}
                style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}
              >
                <ProjectTile project={project} index={i} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group inline-flex items-baseline gap-1.5 text-sm transition-colors",
        active ? "text-foreground" : "text-stone hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "mr-1 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full transition-all",
          active ? "bg-terracotta" : "bg-transparent group-hover:bg-foreground/30",
        )}
      />
      <span className="link-underline" data-active={active}>
        {label}
      </span>
      {typeof count === "number" && (
        <sup className="text-[10px] tabular-nums text-stone">{count}</sup>
      )}
    </button>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className="group block focus-visible:outline-none"
      preload="intent"
    >
      <figure>
        <div
          className={cn(
            "relative overflow-hidden rounded-sm bg-secondary",
            project.cover_ratio === "portrait" ? "aspect-[4/5]" : "aspect-[16/9]",
          )}
        >
          <img
            src={project.image}
            alt={project.title}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          {/* véu e chamada na passagem do rato */}
          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/10" />
          <span className="absolute bottom-4 right-4 translate-y-2 rounded-full bg-background/90 px-4 py-2 text-xs font-medium opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Ver case study →
          </span>
        </div>
        <figcaption className="mt-5 flex items-start gap-4">
          <span className="pt-2 text-xs tabular-nums text-stone">{number}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-2xl leading-tight text-foreground md:text-3xl">
              <span className="link-underline">{project.title}</span>
            </h3>
            <p className="eyebrow mt-2">
              {project.category}
              {project.client && <> · {project.client}</>}
              {project.year && <> · {project.year}</>}
            </p>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

/** Só em desenvolvimento: mostra a causa real do erro do Supabase. */
function describeError(error: unknown): string {
  if (!error) return "Erro desconhecido";
  if (error instanceof Error) return error.message;
  if (typeof error === "object") {
    const e = error as { message?: string; code?: string; hint?: string };
    return [e.code, e.message, e.hint].filter(Boolean).join(" · ") || JSON.stringify(error);
  }
  return String(error);
}

function EmptyState({ title, text, detail }: { title: string; text: string; detail?: string }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-serif text-3xl italic text-foreground">{title}</p>
      <p className="mt-3 text-sm text-stone">{text}</p>
      {detail && (
        <pre className="mt-6 whitespace-pre-wrap rounded-sm border border-dashed border-terracotta/50 bg-terracotta/5 p-3 text-left font-mono text-xs text-terracotta">
          [dev] {detail}
        </pre>
      )}
    </div>
  );
}
