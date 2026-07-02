import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contato — Margarida Ramos Pinto" },
      { name: "description", content: "Entre em contato com Margarida Ramos Pinto para discutir seu próximo projeto de design." },
      { property: "og:title", content: "Contato — Margarida Ramos Pinto" },
      { property: "og:description", content: "Entre em contato com Margarida Ramos Pinto para discutir seu próximo projeto de design." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pt-24">
        <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Vamos <span className="font-semibold text-primary">conversar</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Tem um projeto em mente? Adoraria ouvir sobre ele. Entre em contato
          e vamos explorar as possibilidades juntos.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <a
            href="mailto:geral@margaridaramospinto.com"
            className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center transition-shadow hover:shadow-sm"
          >
            <Mail className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <span className="mt-4 text-sm font-medium text-foreground">Email</span>
            <span className="mt-1 text-sm text-muted-foreground">geral@margaridaramospinto.com</span>
          </a>
          <div className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center">
            <MapPin className="h-8 w-8 text-primary" strokeWidth={1.5} />
            <span className="mt-4 text-sm font-medium text-foreground">Localização</span>
            <span className="mt-1 text-sm text-muted-foreground">Trofa, Porto - Portugal</span>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">Envie uma mensagem</h2>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                Assunto
              </label>
              <input
                id="subject"
                type="text"
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Sobre o que se trata?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={5}
                className="mt-2 block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Conte-me sobre seu projeto..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
