import { createFileRoute } from "@tanstack/react-router";
import { Palette, Layout, Monitor, PenTool } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Designer de Comunicação" },
      { name: "description", content: "Conheça o trabalho e a trajetória deste Designer de Comunicação." },
      { property: "og:title", content: "Sobre — Designer de Comunicação" },
      { property: "og:description", content: "Conheça o trabalho e a trajetória deste Designer de Comunicação." },
    ],
  }),
  component: AboutPage,
});

const skills = [
  {
    icon: Palette,
    title: "Branding & Identidade",
    description: "Criação de marcas completas: naming, logotipo, paleta de cores, tipografia e diretrizes de uso.",
  },
  {
    icon: Layout,
    title: "Design Editorial",
    description: "Diagramação de revistas, livros e materiais impressos com atenção à hierarquia tipográfica.",
  },
  {
    icon: Monitor,
    title: "Design Digital",
    description: "Interfaces web, campanhas digitais e peças para redes sociais com foco em conversão.",
  },
  {
    icon: PenTool,
    title: "Ilustração & Iconografia",
    description: "Criação de ilustrações personalizadas e sistemas de ícones para projetos específicos.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pt-24">
        <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
          Sobre <span className="font-semibold text-primary">mim</span>
        </h1>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Sou um Designer de Comunicação com paixão por transformar ideias em
            experiências visuais memoráveis. Ao longo da minha carreira, tive o
            privilégio de colaborar com marcas de diferentes setores — desde
            cafeterias artesanais até startups de tecnologia.
          </p>
          <p>
            Meu trabalho é guiado pela crença de que o bom design não é apenas
            sobre estética, mas sobre resolver problemas e criar conexões
            significativas entre marcas e pessoas. Cada projeto é uma
            oportunidade de contar uma história única.
          </p>
          <p>
            Acredito na simplicidade intencional, na tipografia como voz visual
            e na cor como emoção. Estou sempre em busca de novos desafios que
            me permitam expandir os limites da comunicação visual.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            O que faço
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-sm"
              >
                <skill.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {skill.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
