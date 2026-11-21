import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";
import { CopyEmailButton } from "./CopyEmailButton";
import { SOCIAL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">Novo projeto?</p>
            <Link to="/contact" className="group mt-4 block">
              <span className="display block text-[clamp(2.75rem,7vw,5.5rem)] text-foreground">
                Vamos criar algo <em className="text-terracotta">juntos</em>
                <span className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-3">
                  →
                </span>
              </span>
            </Link>
          </div>
          <div className="md:col-span-4 md:text-right">
            <CopyEmailButton variant="inline" className="text-sm" />
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-6 text-xs text-stone md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} Margarida Ramos Pinto. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Instagram size={14} /> Instagram
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
