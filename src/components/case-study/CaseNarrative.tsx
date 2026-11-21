import type { Project } from "@/lib/projects";
import { FactSheet } from "./FactSheet";

const CHAPTERS: { key: "challenge" | "concept" | "solution"; title: string; italic: string }[] = [
  { key: "challenge", title: "O Desafio", italic: "& Briefing" },
  { key: "concept", title: "Conceito &", italic: "Direção de Arte" },
  { key: "solution", title: "Solução", italic: "Visual" },
];

export function CaseNarrative({ project }: { project: Project }) {
  const chapters = CHAPTERS.filter((c) => project[c.key]);

  return (
    <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-12 md:gap-10 md:py-32">
      <div className="md:col-span-3">
        <FactSheet project={project} />
      </div>

      <div className="md:col-span-8 md:col-start-5">
        {project.description && (
          <p className="font-serif text-3xl leading-[1.2] text-foreground md:text-[2.6rem]">
            {project.description}
          </p>
        )}

        {chapters.length > 0 && (
          <div className="mt-16 space-y-16 md:mt-24 md:space-y-20">
            {chapters.map((c, i) => (
              <article key={c.key} className="grid gap-4 md:grid-cols-8 md:gap-8">
                <header className="md:col-span-3">
                  <span className="text-xs tabular-nums text-terracotta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">
                    {c.title} <em className="text-stone">{c.italic}</em>
                  </h2>
                </header>
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/80 md:col-span-5 md:text-lg">
                  {project[c.key]}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
