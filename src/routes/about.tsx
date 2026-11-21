import { createFileRoute, Link } from "@tanstack/react-router";
import { Palette, BookOpen, Monitor, Camera } from "lucide-react";
import { Portrait } from "@/components/editorial/Portrait";
import { CvDownloadButton } from "@/components/CvDownloadButton";

const DESCRIPTION =
  "Conheça o trabalho e o percurso de Margarida Ramos Pinto, Designer de Comunicação licenciada pela ESAD Matosinhos.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Sobre — Margarida Ramos Pinto" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Sobre — Margarida Ramos Pinto" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

const skills = [
  {
    icon: Palette,
    title: "Branding & Identidade Visual",
    description:
      "Criação e desenvolvimento de marcas com personalidade: naming, logotipo, paleta de cores, tipografia, linguagem visual e aplicações gráficas.",
  },
  {
    icon: BookOpen,
    title: "Design Editorial & Comercial",
    description:
      "Paginação de catálogos, brochuras, fichas técnicas, apresentações e materiais impressos, com atenção à hierarquia, clareza e detalhe.",
  },
  {
    icon: Monitor,
    title: "Design Digital & Web",
    description:
      "Criação de conteúdos para redes sociais, newsletters, banners, websites e interfaces digitais, com foco numa comunicação apelativa, funcional e consistente.",
  },
  {
    icon: Camera,
    title: "Fotografia & Conteúdo Visual",
    description:
      "Produção e edição de imagens de produto, composições visuais e conteúdos para campanhas, adaptados a diferentes formatos e canais.",
  },
];

const BIO = [
  "No ano ido de 1987, enquanto Robocop impunha a sua lei no grande ecrã, os Guns N' Roses mandavam no rock e Michael Jackson e Madonna faziam da pop uma arte de alto risco para menores, nascia no início de junho, na freguesia do Muro, uma menina chamada Margarida.",
  "Criativa por defeito de fabrico, curiosa por natureza e maria-rapaz quanto baste, cedo percebeu que tinha mais jeito para transformar ideias em coisas visíveis do que para ficar quieta. Entre música, artes plásticas, comunicação, design e ativismo social, foi construindo uma forma muito própria de olhar para o mundo: com atenção ao detalhe, sentido crítico e uma teimosia saudável em fazer melhor.",
  "Licenciada em Design de Comunicação pela ESAD Matosinhos, desenvolveu um percurso ligado à comunicação visual, à criação de marcas, ao design digital e editorial, à produção de conteúdos e a soluções visuais pensadas para comunicar com clareza. Não acredita em design só para ficar bonito. Acredita em design que resolve, organiza, aproxima e faz sentido. Claro que, se também ficar bonito, ninguém se queixa.",
  'Ao longo do seu caminho profissional, ganhou experiência em ambientes exigentes, onde os prazos têm vida própria, os briefings nem sempre vêm completos e a frase "é só uma alteração rápida" raramente significa isso. Aprendeu a ser autónoma, organizada, flexível e prática, sem perder a criatividade nem o humor, competências essenciais para sobreviver a qualquer projeto, cliente ou pasta chamada "final_final_agora_sim".',
  "Em 2024, começou o projeto mais transformador da sua vida: nasceu o Salvador. Não o do cubismo, mas o da fralda, sorriso maroto e superpoder de derreter corações. A maternidade trouxe-lhe ainda mais foco, empatia, resistência e capacidade de priorizar. Basicamente, uma pós-graduação intensiva em gestão de tempo, emoções e imprevistos.",
  "Hoje, a Margarida junta criatividade, método e sensibilidade para transformar ideias dispersas em comunicação clara, funcional e apelativa. Gosta de pensar, questionar, colaborar e encontrar soluções com propósito. Fala pelos cotovelos, sim, mas também ouve, interpreta, resolve e entrega. E, no fim, deixa sempre qualquer coisa melhor do que encontrou: uma marca, uma ideia, uma equipa ou, pelo menos, uma pasta de ficheiros minimamente organizada.",
];

const FACTS: [string, string][] = [
  ["Formação", "Design de Comunicação, ESAD Matosinhos"],
  ["Base", "Trofa, Porto — Portugal"],
  ["Foco", "Branding, editorial, digital e conteúdo visual"],
];

function AboutPage() {
  const [first, ...rest] = BIO;
  return (
    <div className="min-h-screen">
      {/* Abertura */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 md:pt-20">
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

        {/* Narrativa */}
        <div className="md:col-span-7 md:col-start-6">
          <p className="font-serif text-2xl leading-snug text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-terracotta md:text-3xl">
            {first}
          </p>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/75">
            {rest.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Competências */}
          <div className="mt-24">
            <p className="eyebrow">Competências</p>
            <h2 className="display mt-4 text-5xl text-foreground md:text-6xl">
              O que <em className="text-terracotta">faço</em>
            </h2>
            <ol className="mt-12 border-t border-border">
              {skills.map((skill, i) => (
                <li
                  key={skill.title}
                  className="group grid gap-4 border-b border-border py-8 md:grid-cols-12"
                >
                  <span className="text-xs tabular-nums text-terracotta md:col-span-1 md:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-11">
                    <div className="flex items-center gap-3">
                      <skill.icon className="h-5 w-5 text-stone" strokeWidth={1.5} />
                      <h3 className="font-serif text-3xl leading-tight text-foreground transition-transform duration-500 group-hover:translate-x-1">
                        {skill.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-stone">
                      {skill.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

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
