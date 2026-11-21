import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { projectsQuery } from "@/lib/projects";
import { HeroDisciplines } from "@/components/editorial/HeroDisciplines";
import { ALL, ProjectGrid } from "@/components/editorial/ProjectGrid";

const DESCRIPTION =
  "Portfólio de Margarida Ramos Pinto, Designer de Comunicação: identidade visual, design editorial, direção de arte e campanhas digitais.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Margarida Ramos Pinto — Designer de Comunicação" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Margarida Ramos Pinto — Designer de Comunicação" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: projects, isLoading, isError, error } = useQuery(projectsQuery());
  const [category, setCategory] = useState<string>(ALL);

  return (
    <div className="min-h-screen">
      <HeroDisciplines projects={projects} onSelectCategory={setCategory} />

      <section id="projetos" className="mx-auto max-w-7xl scroll-mt-28 px-6 pb-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-5xl text-foreground md:text-7xl">
            Trabalho <em className="text-terracotta">selecionado</em>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            Cada projeto é contado do briefing à solução final — o processo importa tanto quanto o
            resultado.
          </p>
        </div>
        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          isError={isError}
          error={error}
          activeCategory={category}
          onCategoryChange={setCategory}
        />
      </section>
    </div>
  );
}
