import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Margarida Ramos Pinto — Portfolio" },
      { name: "description", content: "Portfolio de Margarida Ramos Pinto, Designer de Comunicação especializada em branding, editorial, digital e social media." },
      { property: "og:title", content: "Margarida Ramos Pinto — Portfolio" },
      { property: "og:description", content: "Portfolio de Margarida Ramos Pinto, Designer de Comunicação especializada em branding, editorial, digital e social media." },
    ],
  }),
  component: Index,
});

type ProjectCard = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
};

function Index() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,category,image,link")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ProjectCard[];
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
        <h1 className="max-w-4xl text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Designer de
          <br />
          <span className="font-semibold text-primary">Comunicação</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Crio identidades visuais, experiências editoriais e campanhas digitais
          que conectam marcas &agrave;s suas audi&ecirc;ncias.
        </p>
      </section>

      {/* Projects — Masonry */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        {isLoading && (
          <p className="text-sm text-muted-foreground">A carregar projetos...</p>
        )}
        <div className="masonry md:masonry-md lg:masonry-lg">
          {projects?.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="masonry-item group block"
            >
              <div className="overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    {project.category}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
