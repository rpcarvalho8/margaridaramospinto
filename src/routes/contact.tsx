import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Instagram, Linkedin } from "lucide-react";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { SITE_EMAIL, SOCIAL } from "@/lib/site";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contacto — Margarida Ramos Pinto" },
      {
        name: "description",
        content: "Fale com Margarida Ramos Pinto sobre o seu próximo projeto de design.",
      },
      { property: "og:title", content: "Contacto — Margarida Ramos Pinto" },
      {
        property: "og:description",
        content: "Fale com Margarida Ramos Pinto sobre o seu próximo projeto de design.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      if (error) throw error;
      toast.success("Mensagem enviada com sucesso. Obrigada pelo contacto!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-14 md:pt-20">
        <p className="eyebrow animate-reveal">Contacto</p>
        <h1
          className="display mt-6 animate-reveal text-[clamp(3rem,9vw,7.5rem)] text-foreground"
          style={{ animationDelay: "80ms" }}
        >
          Vamos <em className="text-terracotta">conversar</em>.
        </h1>

        <div className="mt-16 grid gap-16 md:grid-cols-12 md:gap-10">
          {/* Contacto direto */}
          <aside className="space-y-10 md:col-span-4">
            <p className="max-w-sm text-lg leading-relaxed text-stone">
              Tem um projeto em mente, uma marca para construir ou uma ideia por arrumar? A forma
              mais rápida é por email.
            </p>
            <div className="space-y-3">
              <CopyEmailButton />
              <p className="text-xs text-stone">
                Um clique copia o endereço ·{" "}
                <a href={`mailto:${SITE_EMAIL}`} className="link-underline text-foreground">
                  ou abrir no email
                </a>
              </p>
            </div>
            <dl className="divide-y divide-border border-y border-border text-sm">
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-stone">Localização</dt>
                <dd className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-terracotta" /> Trofa, Porto — Portugal
                </dd>
              </div>
              <div className="flex items-center justify-between gap-6 py-3">
                <dt className="text-stone">Redes</dt>
                <dd className="flex items-center gap-4">
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-terracotta"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="hover:text-terracotta"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </dd>
              </div>
            </dl>
          </aside>

          {/* Formulário */}
          <div className="md:col-span-7 md:col-start-6">
            <h2 className="font-serif text-3xl text-foreground">
              Ou deixe uma <em className="text-stone">mensagem</em>
            </h2>
            <form className="mt-8 space-y-8" onSubmit={onSubmit}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow block">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 block w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-stone/60 focus:border-foreground"
                    placeholder="O seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow block">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-stone/60 focus:border-foreground"
                    placeholder="nome@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="eyebrow block">
                  Assunto
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-2 block w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-stone/60 focus:border-foreground"
                  placeholder="Identidade visual, editorial, campanha..."
                />
              </div>
              <div>
                <label htmlFor="message" className="eyebrow block">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 block w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-stone/60 focus:border-foreground resize-none"
                  placeholder="Conte-me sobre o seu projeto..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-3.5 text-sm text-background transition-colors hover:bg-terracotta disabled:opacity-60"
              >
                {loading ? "A enviar..." : "Enviar mensagem →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
