import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Portrait } from "@/components/editorial/Portrait";
import { CvDownloadButton } from "@/components/CvDownloadButton";
import { POSITIONING } from "@/lib/site";

const DESCRIPTION =
  "Margarida Ramos Pinto, Designer de Comunicação com +15 anos de experiência em design editorial, branding, fotografia de produto, UX/UI e soluções No-Code.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Margarida Ramos Pinto" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Sobre — Margarida Ramos Pinto" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: "/margarida-retrato.jpg" },
    ],
  }),
  component: AboutPage,
});

const PROFILE =
  "Experiência em branding, design editorial, web design, fotografia de produto, vídeo, marketing digital e UX/UI. Nos últimos anos tem expandido o perfil para Product Design, ferramentas No-Code e automação de processos digitais.";

type Role = { period: string; role: string; org: string; points: string[]; current?: boolean };

const EXPERIENCE: Role[] = [
  {
    period: "2015 — hoje",
    role: "Designer de Comunicação",
    org: "ElectrumTrofa, Iluminação",
    current: true,
    points: [
      "Catálogos, brochuras, fichas técnicas e materiais de apoio comercial",
      "Fotografia de produto, vídeo e conteúdos para campanhas digitais",
      "Gestão do website e conteúdos de e-commerce em WordPress/Elementor",
      "Desenhos técnicos e comunicação visual de eventos",
    ],
  },
  {
    period: "2025 — hoje",
    role: "Criativa & Produção de Eventos",
    org: "Doce Sopro – Eventos",
    current: true,
    points: [
      "Conceção visual de eventos e materiais gráficos para espaços físicos",
      "Adaptação de propostas a medidas, suportes e materiais reais",
    ],
  },
  {
    period: "2014 — 2017",
    role: "Designer Freelancer",
    org: "Junta de Freguesia do Muro",
    points: [
      "Design e produção do boletim informativo institucional",
      "Comunicação para iniciativas locais e eventos",
    ],
  },
  {
    period: "2012 — 2014",
    role: "Designer de Comunicação Freelancer",
    org: "Atelier TRÊS PONTO",
    points: ["Identidade visual, web e comunicação para eventos, com coordenação de conteúdos"],
  },
];

const EDUCATION: [string, string, string][] = [
  ["Licenciatura em Design de Comunicação", "ESAD Matosinhos", "2005 — 2009"],
  ["Design UX/UI", "CESAE", "2025"],
  ["Figma", "EISNT", "2025"],
  ["Sistemas Gráficos e Multimédia", "ISEP · UC de Mestrado", "2016"],
];

const PILLARS: { title: string; italic: string; items: string[] }[] = [
  {
    title: "Design &",
    italic: "Editorial",
    items: [
      "Editorial",
      "Branding",
      "Packaging",
      "Ilustração",
      "Storytelling visual",
      "Design thinking",
      "Produção de eventos",
    ],
  },
  {
    title: "UX/UI &",
    italic: "Digital",
    items: [
      "UX/UI",
      "Web design",
      "WordPress",
      "Elementor",
      "E-commerce",
      "Email marketing",
      "Google Analytics",
    ],
  },
  {
    title: "Adobe",
    italic: "Creative Cloud",
    items: ["InDesign", "Illustrator", "Photoshop", "Premiere", "After Effects", "Lightroom"],
  },
  {
    title: "No-Code &",
    italic: "Automação",
    items: ["Figma", "Framer", "Airtable", "Make", "Zapier", "Softr", "Tally"],
  },
];

const FACTS: [string, string][] = [
  ["Experiência", "+15 anos"],
  ["Base", "Trofa, Porto — Portugal"],
  ["Línguas", "PT · EN (B2) · ES (B1) · FR (A2)"],
];

const BIO = [
  "No ano ido de 1987, enquanto Robocop impunha a sua lei no grande ecrã, os Guns N' Roses mandavam no rock e Michael Jackson e Madonna faziam da pop uma arte de alto risco para menores, nascia no início de junho, na freguesia do Muro, uma menina chamada Margarida.",
  "Criativa por defeito de fabrico, curiosa por natureza e maria-rapaz quanto baste, cedo percebeu que tinha mais jeito para transformar ideias em coisas visíveis do que para ficar quieta. Entre música, artes plásticas, comunicação, design e ativismo social, foi construindo uma forma muito própria de olhar para o mundo: com atenção ao detalhe, sentido crítico e uma teimosia saudável em fazer melhor.",
  "Licenciada em Design de Comunicação pela ESAD Matosinhos, desenvolveu um percurso ligado à comunicação visual, à criação de marcas, ao design digital e editorial, à produção de conteúdos e a soluções visuais pensadas para comunicar com clareza. Não acredita em design só para ficar bonito. Acredita em design que resolve, organiza, aproxima e faz sentido. Claro que, se também ficar bonito, ninguém se queixa.",
  'Ao longo do seu caminho profissional, ganhou experiência em ambientes exigentes, onde os prazos têm vida própria, os briefings nem sempre vêm completos e a frase "é só uma alteração rápida" raramente significa isso. Aprendeu a ser autónoma, organizada, flexível e prática, sem perder a criatividade nem o humor, competências essenciais para sobreviver a qualquer projeto, cliente ou pasta chamada "final_final_agora_sim".',
  "Em 2024, começou o projeto mais transformador da sua vida: nasceu o Salvador. Não o do cubismo, mas o da fralda, sorriso maroto e superpoder de derreter corações. A maternidade trouxe-lhe ainda mais foco, empatia, resistência e capacidade de priorizar. Basicamente, uma pós-graduação intensiva em gestão de tempo, emoções e imprevistos.",
  "Hoje, a Margarida junta criatividade, método e sensibilidade para transformar ideias dispersas em comunicação clara, funcional e apelativa. Gosta de pensar, questionar, colaborar e encontrar soluções com propósito. Fala pelos cotovelos, sim, mas também ouve, interpreta, resolve e entrega. E, no fim, deixa sempre qualquer coisa melhor do que encontrou: uma marca, uma ideia, uma equipa ou, pelo menos, uma pasta de ficheiros minimamente organizada.",
];

function SectionTitle({
  eyebrow,
  title,
  italic,
}: {
  eyebrow: string;
  title: string;
  italic: string;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-4 text-5xl text-foreground md:text-6xl">
        {title} <em className="text-terracotta">{italic}</em>
      </h2>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Abertura */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:pt-28">
        <p className="eyebrow animate-reveal">Sobre</p>
        <h1
          className="display mt-6 max-w-5xl animate-reveal text-[clamp(3rem,8vw,6.5rem)] text-foreground"
          style={{ animationDelay: "80ms" }}
        >
          Design que <em className="text-terracotta">resolve</em>, organiza
          <br className="hidden md:block" /> e faz sentido.
        </h1>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 md:grid-cols-12 md:gap-10">
        {/* Coluna do retrato */}
        <aside className="md:col-span-4">
          <div className="space-y-10 md:sticky md:top-32">
            <Portrait className="mx-auto max-w-xs md:max-w-none" decorated={false} />
            <dl className="divide-y divide-border border-y border-border text-sm">
              {FACTS.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-3">
                  <dt className="text-stone">{label}</dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <CvDownloadButton />
          </div>
        </aside>

        <div className="md:col-span-7 md:col-start-6">
          {/* Posicionamento */}
          <p className="font-serif text-3xl leading-[1.2] text-foreground md:text-[2.6rem]">
            {POSITIONING}
          </p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/75">{PROFILE}</p>

          {/* Percurso */}
          <div className="mt-24">
            <SectionTitle eyebrow="Experiência" title="Percurso" italic="profissional" />
            <ol className="mt-12 border-t border-border">
              {EXPERIENCE.map((job) => (
                <li
                  key={job.org}
                  className="grid gap-3 border-b border-border py-8 md:grid-cols-12 md:gap-6"
                >
                  <p className="text-sm tabular-nums text-stone md:col-span-3 md:pt-2">
                    {job.period}
                    {job.current && (
                      <span className="ml-2 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-terracotta" />
                    )}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-3xl leading-tight text-foreground">
                      {job.role}
                    </h3>
                    <p className="eyebrow mt-2">{job.org}</p>
                    <ul className="mt-4 space-y-1.5 text-base leading-relaxed text-foreground/75">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-3 h-px w-3 shrink-0 bg-stone/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Competências */}
          <div className="mt-24">
            <SectionTitle eyebrow="Competências" title="Quatro" italic="pilares" />
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <div
                  key={pillar.italic}
                  className="group bg-background p-7 transition-colors hover:bg-card"
                >
                  <span className="text-xs tabular-nums text-terracotta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl leading-tight text-foreground">
                    {pillar.title} <em className="text-stone">{pillar.italic}</em>
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80 transition-colors group-hover:border-foreground/25"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Formação */}
          <div className="mt-24">
            <SectionTitle eyebrow="Formação" title="Aprender" italic="sempre" />
            <dl className="mt-12 divide-y divide-border border-y border-border">
              {EDUCATION.map(([course, school, year]) => (
                <div
                  key={course}
                  className="grid gap-1 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
                >
                  <dt className="font-serif text-2xl leading-tight text-foreground md:col-span-7">
                    {course}
                  </dt>
                  <dd className="text-sm text-stone md:col-span-3">{school}</dd>
                  <dd className="text-sm tabular-nums text-stone md:col-span-2 md:text-right">
                    {year}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* A versão longa — o texto de autor da Margarida */}
          <details className="group mt-24 border-y border-border">
            <summary className="flex cursor-pointer list-none items-center justify-between py-6 [&::-webkit-details-marker]:hidden">
              <span className="font-serif text-3xl text-foreground">
                A versão longa <em className="text-terracotta">(e com humor)</em>
              </span>
              <Plus className="h-5 w-5 text-stone transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <div className="space-y-6 pb-10 text-lg leading-relaxed text-foreground/75">
              {BIO.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </details>

          <div className="mt-20 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="rounded-full bg-foreground px-6 py-3.5 text-sm text-background transition-colors hover:bg-terracotta"
            >
              Vamos trabalhar juntos →
            </Link>
            <Link to="/" hash="projetos" className="link-underline text-sm text-foreground">
              Ver projetos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
