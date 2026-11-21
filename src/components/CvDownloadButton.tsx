import { useEffect, useState } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { CV_DOWNLOAD_NAME, CV_SRC, SITE_EMAIL } from "@/lib/site";

/**
 * Botão de download do CV/Portfólio. Verifica se `public/cv-margarida-ramos-pinto.pdf`
 * existe; enquanto não existir, mostra um placeholder editorial com pedido por email.
 */
export function CvDownloadButton() {
  const [status, setStatus] = useState<"checking" | "ready" | "missing">("checking");

  useEffect(() => {
    let alive = true;
    fetch(CV_SRC, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (alive) setStatus(res.ok && type.includes("pdf") ? "ready" : "missing");
      })
      .catch(() => alive && setStatus("missing"));
    return () => {
      alive = false;
    };
  }, []);

  if (status === "missing") {
    return (
      <a
        href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent("Pedido de CV / Portfólio")}`}
        className="group flex items-center gap-4 rounded-sm border border-dashed border-foreground/30 px-5 py-4 transition-colors hover:border-terracotta"
      >
        <FileText className="h-5 w-5 shrink-0 text-stone" strokeWidth={1.5} />
        <span className="flex-1">
          <span className="block font-serif text-lg italic leading-tight">
            CV & Portfólio — edição 2026
          </span>
          <span className="eyebrow mt-1 block">Em atualização · pedir por email</span>
        </span>
        <span className="text-stone transition-transform group-hover:translate-x-1">→</span>
      </a>
    );
  }

  return (
    <a
      href={CV_SRC}
      download={CV_DOWNLOAD_NAME}
      aria-busy={status === "checking"}
      className="group flex items-center gap-4 rounded-sm bg-foreground px-5 py-4 text-background transition-colors hover:bg-terracotta"
    >
      <FileText className="h-5 w-5 shrink-0" strokeWidth={1.5} />
      <span className="flex-1">
        <span className="block font-serif text-lg italic leading-tight">CV & Portfólio</span>
        <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-background/60">
          PDF · outubro 2026 · descarregar
        </span>
      </span>
      <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
    </a>
  );
}
