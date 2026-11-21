import { Link } from "@tanstack/react-router";
import type { Project } from "@/lib/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      preload="intent"
      className="group block border-t border-border bg-secondary/60 transition-colors hover:bg-secondary"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <p className="eyebrow">Próximo projeto</p>
          <p className="display mt-5 text-[clamp(2.75rem,7vw,6rem)] text-foreground">
            {project.title}{" "}
            <span className="inline-block text-terracotta transition-transform duration-500 group-hover:translate-x-3">
              →
            </span>
          </p>
          <p className="eyebrow mt-4">{project.category}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <div className="arch aspect-[4/5] overflow-hidden bg-background">
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
