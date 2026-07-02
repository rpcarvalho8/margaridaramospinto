import { createFileRoute } from "@tanstack/react-router";
import { Palette, Layout, Monitor, PenTool } from "lucide-react";

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

        <p className="mt-6 text-lg font-medium text-primary">
          Designer de Comunicação · Branding, Redes Sociais e Conteúdo Digital · Identidade Visual &amp; Eventos
        </p>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            No ano ido de 1987, o Robocop ditava a sua lei no grande ecrã, os Guns N' Roses, com lenços de cornucópia na cabeça, eram os reis do Rock, enquanto Michael Jackson e Madonna, com danças e ousadias pouco recomendáveis a menores, reinavam no mundo da Pop. No início de junho desse ano, nascia uma menina de seu nome Margarida, na freguesia do Muro. Maria-rapaz quanto baste, como não podia deixar de ser depois de Portugal inteiro se sentir campeão europeu em Viena, com a obra-prima do calcanhar do Madjer.
          </p>
          <p>
            Não tardou a revelar uma aptidão artística inata por instrumentos musicais, artes plásticas, design, ativismo social. E só não ensinou ballet a gatos porque não encontrou nenhum com as unhas aparadas. Culminou este percurso com formação superior em Design de Comunicação na ESAD Matosinhos.
          </p>
          <p>
            Isso deu-lhe asas criativas mais fortes e seguras, permitindo-lhe voar por diversas estradas: desde montar cenários dignos de contos de fadas, a criar cartazes inimagináveis em locais que nem é bom revelar, logótipos indescritíveis, vídeos e websites apelativos e tão intuitivos que até uma criança os usaria com facilidade. Navega entre branding, design editorial, animação e produção audiovisual, sempre a transformar ideias em experiências visuais que comunicam e encantam.
          </p>
          <p>
            Mas foi em 2024 que começou o projeto mais transformador da sua vida: nasceu o Salvador, não o do cubismo, mas o da fralda, sorriso maroto e superpoder de derreter corações. Coincidência ou não, nesse dia nasceu também Hector Berlioz, compositor francês de sinfonias arrebatadoras. E não há dúvida de que, a partir daí, a sua vida passou a tocar noutra frequência: com sonatas de choro, serenatas de embalo e improvisos dignos de uma jam session parental.
          </p>
          <p>
            Dizem que quando nasce uma mãe, nasce também uma nova mulher. E no caso da Margarida, é uma verdadeira edição de luxo: mais empatia no trato, foco nos detalhes, cores nas emoções e um radar afinado para necessidades invisíveis, de bebés ou de clientes, tanto faz. O multitasking virou arte performativa, os briefings ganharam colo e o café passou a saber a noites mal dormidas.
          </p>
          <p>
            A sua centelha criativa continua a brilhar e irradia com a força de quem cria e cuida ao mesmo tempo. Quanto à comunicação? Fala pelos cotovelos, sim, mas agora também embala, canta, conta histórias e, como sempre, resolve problemas com um toque de magia visual.
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
