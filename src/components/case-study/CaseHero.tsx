import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function CaseHero({ project }: { project: Project }) {
  return (
    <header>
      <div className="mx-auto max-w-7xl px-6 pt-10 md:pt-14">
        <Link
          to="/"
          hash="projetos"
          className="inline-flex items-center gap-2 text-sm text-stone transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Todos os projetos
        </Link>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12">
          <p className="eyebrow animate-reveal md:col-span-12">
            {project.category}
            {project.year && <> — {project.year}</>}
          </p>
          <h1
            className="display animate-reveal text-[clamp(3rem,8vw,7rem)] text-foreground md:col-span-10"
            style={{ animationDelay: "80ms" }}
          >
            {project.title}
          </h1>
          {project.client && (
            <p
              className="animate-reveal font-serif text-2xl italic text-stone md:col-span-6 md:text-3xl"
              style={{ animationDelay: "140ms" }}
            >
              para {project.client}
            </p>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-12 animate-reveal md:mt-16",
          project.cover_ratio === "portrait" ? "max-w-3xl px-6" : "max-w-[96rem] md:px-6",
        )}
        style={{ animationDelay: "200ms" }}
      >
        <img
          src={project.image}
          alt={project.title}
          fetchPriority="high"
          className={cn(
            "w-full bg-secondary object-cover md:rounded-sm",
            project.cover_ratio === "portrait" ? "aspect-[4/5] rounded-sm" : "aspect-[16/9]",
          )}
        />
      </div>
    </header>
  );
}
