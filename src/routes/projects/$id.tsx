import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { isUuid, projectsQuery } from "@/lib/projects";
import { CaseHero } from "@/components/case-study/CaseHero";
import { CaseNarrative } from "@/components/case-study/CaseNarrative";
import { CaseGallery } from "@/components/case-study/CaseGallery";
import { NextProject } from "@/components/case-study/NextProject";
import { CaseStudySkeleton } from "@/components/editorial/ProjectSkeleton";

export const Route = createFileRoute("/projects/$id")({
  loader: async ({ params, context }) => {
    if (!isUuid(params.id)) throw notFound();
    // Uma só query partilhada com a homepage (cache do React Query)
    const projects = await context.queryClient.ensureQueryData(projectsQuery());
    const index = projects.findIndex((p) => p.id === params.id);
    if (index === -1) throw notFound();
    const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;
    return { project: projects[index], next };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    const title = project
      ? `${project.title} — Margarida Ramos Pinto`
      : "Projeto — Margarida Ramos Pinto";
    const description =
      project?.description?.slice(0, 160) ??
      "Case study do portfólio de Margarida Ramos Pinto, Designer de Comunicação.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...(project?.image ? [{ property: "og:image", content: project.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  pendingComponent: CaseStudySkeleton,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectLoadError,
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project, next } = Route.useLoaderData();

  return (
    <article key={project.id} className="min-h-screen">
      <CaseHero project={project} />
      <CaseNarrative project={project} />
      <div className="pb-24 md:pb-32">
        <CaseGallery items={project.gallery} title={project.title} />
      </div>
      {next && <NextProject project={next} />}
    </article>
  );
}

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-md px-6 py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-5xl text-foreground">
        Projeto <em className="text-terracotta">não encontrado</em>
      </h1>
      <p className="mt-4 text-sm text-stone">
        Este projeto pode ter sido removido ou o link está incorreto.
      </p>
      <Link
        to="/"
        hash="projetos"
        className="mt-8 inline-flex items-center gap-2 text-sm text-foreground link-underline"
      >
        <ArrowLeft className="h-4 w-4" /> Ver todos os projetos
      </Link>
    </div>
  );
}

function ProjectLoadError() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-md px-6 py-28 text-center">
      <p className="eyebrow">Ligação interrompida</p>
      <h1 className="display mt-4 text-5xl text-foreground">
        Este projeto está a <em className="text-terracotta">descansar</em>
      </h1>
      <p className="mt-4 text-sm text-stone">
        Não foi possível carregar o case study neste momento. Tente novamente daqui a pouco.
      </p>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => router.invalidate()}
          className="rounded-full bg-foreground px-6 py-3 text-sm text-background transition-colors hover:bg-terracotta"
        >
          Tentar novamente
        </button>
        <Link to="/" hash="projetos" className="link-underline text-sm text-foreground">
          Ver todos os projetos
        </Link>
      </div>
    </div>
  );
}
