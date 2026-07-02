import { createFileRoute } from "@tanstack/react-router";

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

const projects = [
  {
    title: "Street Basket III",
    category: "Projeto Académico",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/45a84d247995725.Y3JvcCwyNjg0LDIxMDAsNTksMA.jpg",
    link: "https://www.behance.net/gallery/247995725/Street-Basket-III-Projeto-Acadmico",
  },
  {
    title: "Matrisousa",
    category: "Gestão de Redes Sociais",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/9aeb63240332339.693c09904d653.jpg",
    link: "https://www.behance.net/gallery/240332339/Matrisousa-Gestao-de-Redes-Sociais",
  },
  {
    title: "1º Aniversário Salvador",
    category: "Identidade Visual e Decoração",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/9fe7c6231400151.Y3JvcCw1Mjc3LDQxMjgsOTAxLDA.jpg",
    link: "https://www.behance.net/gallery/231400151/1-Aniversario-Salvador-Identidade-Visual-e-Decoracao",
  },
  {
    title: "Ilustração Digital",
    category: "Ilustração",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/3694db226516801.Y3JvcCwzMDAwLDIzNDYsMCwxMDc2.jpg",
    link: "https://www.behance.net/gallery/226516801/Ilustracao-Digital",
  },
  {
    title: "Paróquia S. Cristóvão do Muro",
    category: "Cartaz e Redes Sociais",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/8eb398225941103.Y3JvcCwxMjI0LDk1OCw4Nyww.jpg",
    link: "https://www.behance.net/gallery/225941103/Paroquia-S-Cristovao-do-Muro-Cartaz-e-redes-sociais",
  },
  {
    title: "JSF Muro",
    category: "Vídeos Promocionais",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/f0b8ba225760385.Y3JvcCw3NzYsNjA3LDE5LDA.png",
    link: "https://www.behance.net/gallery/225760385/JSF-Muro-Videos-promocionais-para-redes-sociais",
  },
  {
    title: "MADE IN NORTE 2022",
    category: "Merchandising Artístico",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/5ee444225412801.Y3JvcCwxOTIyLDE1MDQsODcxLDA.jpg",
    link: "https://www.behance.net/gallery/225412801/Concurso-Merchandising-Artistico-MADE-IN-NORTE-2022",
  },
  {
    title: "S. Cristóvão e S. Pantaleão 2024",
    category: "Cartaz",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/7982fd225411765.Y3JvcCwzMzMzLDI2MDcsMCwyMzE.jpg",
    link: "https://www.behance.net/gallery/225411765/S-Cristovao-e-S-Pantaleao-2024-Cartaz",
  },
  {
    title: "Associação Cultural Smed",
    category: "Cartazes",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/eca181225344605.Y3JvcCw5OTksNzgyLDAsMTA4.png",
    link: "https://www.behance.net/gallery/225344605/Associacao-Cultural-Smed-Cartazes",
  },
  {
    title: "Hoodie S. Gonçalo",
    category: "Covelas 2025",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/2daa11225344017.Y3JvcCw3NzM5LDYwNTMsMCww.jpg",
    link: "https://www.behance.net/gallery/225344017/Hoodie-S-Goncalo-Covelas-2025",
  },
  {
    title: "JSF Muro",
    category: "Cartazes de Eventos",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/15a679225328691.Y3JvcCwyNDgwLDE5MzksMCw5OA.jpg",
    link: "https://www.behance.net/gallery/225328691/JSF-Muro-Cartazes-de-Eventos",
  },
  {
    title: "OPJ Trofa 2016 | Polo I9",
    category: "Comunicação Digital",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/093b72225327633.Y3JvcCw5OTksNzgyLDAsMTA4.jpg",
    link: "https://www.behance.net/gallery/225327633/OPJ-Trofa-2016-Polo-I9-Comunicacao-digital",
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
          Designer de Comunicação. Crio identidades visuais, experiências editoriais e campanhas digitais
          que conectam marcas &agrave;s suas audi&ecirc;ncias.
        </p>
      </section>

      {/* Projects — Masonry */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="masonry md:masonry-md lg:masonry-lg">
          {projects.map((project) => (
            <a
              key={project.link}
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
