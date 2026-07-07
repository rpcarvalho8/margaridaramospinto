import { createFileRoute } from "@tanstack/react-router";
import { Palette, BookOpen, Monitor, Camera } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Margarida Ramos Pinto" },
      { name: "description", content: "Conheça o trabalho e a trajetória de Margarida Ramos Pinto, Designer de Comunicação." },
      { property: "og:title", content: "Sobre — Margarida Ramos Pinto" },
      { property: "og:description", content: "Conheça o trabalho e a trajetória de Margarida Ramos Pinto, Designer de Comunicação." },
    ],
  }),
  component: AboutPage,
});

const skills = [
  {
    icon: Palette,
    title: "Branding & Identidade Visual",
    description: "Criação e desenvolvimento de marcas com personalidade: naming, logotipo, paleta de cores, tipografia, linguagem visual e aplicações gráficas.",
  },
  {
    icon: BookOpen,
    title: "Design Editorial & Comercial",
    description: "Paginação de catálogos, brochuras, fichas técnicas, apresentações e materiais impressos, com atenção à hierarquia, clareza e detalhe.",
  },
  {
    icon: Monitor,
    title: "Design Digital & Web",
    description: "Criação de conteúdos para redes sociais, newsletters, banners, websites e interfaces digitais, com foco numa comunicação apelativa, funcional e consistente.",
  },
  {
    icon: Camera,
    title: "Fotografia & Conteúdo Visual",
    description: "Produção e edição de imagens de produto, composições visuais e conteúdos para campanhas, adaptados a diferentes formatos e canais.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pt-24">
        <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Sobre <span className="font-semibold text-primary">mim</span>
        </h1>

        <p className="mt-6 text-lg font-medium text-primary">
          Designer de Comunicação · Branding, Redes Sociais e Conteúdo Digital · Identidade Visual &amp; Eventos
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            No ano ido de 1987, enquanto Robocop impunha a sua lei no grande ecrã, os Guns N' Roses mandavam no rock e Michael Jackson e Madonna faziam da pop uma arte de alto risco para menores, nascia no início de junho, na freguesia do Muro, uma menina chamada Margarida.
          </p>
          <p>
            Criativa por defeito de fabrico, curiosa por natureza e maria-rapaz quanto baste, cedo percebeu que tinha mais jeito para transformar ideias em coisas visíveis do que para ficar quieta. Entre música, artes plásticas, comunicação, design e ativismo social, foi construindo uma forma muito própria de olhar para o mundo: com atenção ao detalhe, sentido crítico e uma teimosia saudável em fazer melhor.
          </p>
          <p>
            Licenciada em Design de Comunicação pela ESAD Matosinhos, desenvolveu um percurso ligado à comunicação visual, à criação de marcas, ao design digital e editorial, à produção de conteúdos e a soluções visuais pensadas para comunicar com clareza. Não acredita em design só para ficar bonito. Acredita em design que resolve, organiza, aproxima e faz sentido. Claro que, se também ficar bonito, ninguém se queixa.
          </p>
          <p>
            Ao longo do seu caminho profissional, ganhou experiência em ambientes exigentes, onde os prazos têm vida própria, os briefings nem sempre vêm completos e a frase "é só uma alteração rápida" raramente significa isso. Aprendeu a ser autónoma, organizada, flexível e prática, sem perder a criatividade nem o humor, competências essenciais para sobreviver a qualquer projeto, cliente ou pasta chamada "final_final_agora_sim".
          </p>
          <p>
            Em 2024, começou o projeto mais transformador da sua vida: nasceu o Salvador. Não o do cubismo, mas o da fralda, sorriso maroto e superpoder de derreter corações. A maternidade trouxe-lhe ainda mais foco, empatia, resistência e capacidade de priorizar. Basicamente, uma pós-graduação intensiva em gestão de tempo, emoções e imprevistos.
          </p>
          <p>
            Hoje, a Margarida junta criatividade, método e sensibilidade para transformar ideias dispersas em comunicação clara, funcional e apelativa. Gosta de pensar, questionar, colaborar e encontrar soluções com propósito. Fala pelos cotovelos, sim, mas também ouve, interpreta, resolve e entrega. E, no fim, deixa sempre qualquer coisa melhor do que encontrou: uma marca, uma ideia, uma equipa ou, pelo menos, uma pasta de ficheiros minimamente organizada.
          </p>
        </div>

        <div className="mt-20">
          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
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
