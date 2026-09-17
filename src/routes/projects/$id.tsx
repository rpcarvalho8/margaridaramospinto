import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/projects/$id")({
  head: () => ({
    meta: [
      { title: `Projeto — Margarida Ramos Pinto` },
      { name: "description", content: "Detalhes do projeto no portfolio de Margarida Ramos Pinto." },
      { property: "og:title", content: `Projeto — Margarida Ramos Pinto` },
    ],
  }),
  component: ProjectDetailPage,
});

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string | null;
  description: string | null;
};

function ProjectDetailPage() {
  const { id } = Route.useParams();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,category,image,link,description")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16 text-sm text-muted-foreground">
        A carregar projeto...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Projeto não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Este projeto pode ter sido removido ou o link está incorreto.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <article className="mx-auto max-w-5xl px-6 pb-20 pt-12 md:pt-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-foreground md:text-4xl">
            <span className="font-semibold">{project.title}</span>
          </h1>
          {project.description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          )}
        </header>

        <div className="mt-10 overflow-hidden rounded-xl bg-card shadow-sm">
          <img
            src={project.image}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>

        {project.link && (
          <div className="mt-10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Ver no Behance <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </article>
    </div>
  );
}
