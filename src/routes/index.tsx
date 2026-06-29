import { createFileRoute } from "@tanstack/react-router";

import imgBranding from "../assets/projeto-branding.jpg";
import imgEditorial from "../assets/projeto-editorial.jpg";
import imgDigital from "../assets/projeto-digital.jpg";
import imgPackaging from "../assets/projeto-packaging.jpg";
import imgSocial from "../assets/projeto-social.jpg";
import imgArquitetura from "../assets/projeto-arquitetura.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Designer de Comunicação — Portfolio" },
      { name: "description", content: "Portfolio de um Designer de Comunicação especializado em branding, editorial, digital e social media." },
      { property: "og:title", content: "Designer de Comunicação — Portfolio" },
      { property: "og:description", content: "Portfolio de um Designer de Comunicação especializado em branding, editorial, digital e social media." },
    ],
  }),
  component: Index,
});

const projects = [
  {
    title: "Café Cultura",
    category: "Branding & Identidade Visual",
    image: imgBranding,
    aspect: "landscape",
  },
  {
    title: "Revista Átomo",
    category: "Design Editorial",
    image: imgEditorial,
    aspect: "landscape",
  },
  {
    title: "EcoViva",
    category: "Campanha Digital",
    image: imgDigital,
    aspect: "square",
  },
  {
    title: "Flor de Sal",
    category: "Packaging Design",
    image: imgPackaging,
    aspect: "square",
  },
  {
    title: "TechStart",
    category: "Social Media & Digital",
    image: imgSocial,
    aspect: "landscape",
  },
  {
    title: "Arquitetura Viva",
    category: "Branding & Identidade Visual",
    image: imgArquitetura,
    aspect: "landscape",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
        <h1 className="max-w-4xl text-4xl font-light leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
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
        <div className="masonry md:masonry-md lg:masonry-lg">
          {projects.map((project) => (
            <div key={project.title} className="masonry-item group cursor-pointer">
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
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
