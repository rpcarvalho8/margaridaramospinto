import { useEffect, useRef, useState } from "react";
import { PORTRAIT_SRC } from "@/lib/site";
import { cn } from "@/lib/utils";

type PortraitProps = {
  className?: string;
  /** Mostra as formas geométricas de composição à volta do retrato. */
  decorated?: boolean;
  priority?: boolean;
};

/**
 * Retrato editorial em arco. Enquanto `public/margarida-retrato.jpg` não existir,
 * mostra um placeholder composto (papel, formas geométricas e monograma).
 */
export function Portrait({ className, decorated = true, priority = false }: PortraitProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // O erro pode acontecer antes da hidratação (SSR); confirmamos no mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {decorated && (
        <>
          <div
            aria-hidden
            className="absolute -left-6 top-[18%] h-24 w-24 rounded-full bg-terracotta/85 md:-left-10 md:h-32 md:w-32"
          />
          <div
            aria-hidden
            className="absolute -right-4 bottom-[12%] h-40 w-20 bg-sage/70 md:-right-8 md:h-56 md:w-28"
          />
          <div aria-hidden className="absolute -bottom-5 left-[12%] h-px w-2/3 bg-foreground/40" />
        </>
      )}

      <div className="arch relative aspect-[4/5] overflow-hidden bg-[linear-gradient(172deg,#EFEAE1_0%,#EAE5DC_45%,#DCDDD0_100%)] shadow-[0_30px_60px_-30px_rgb(24_24_27/0.35)]">
        {/* luz suave de estúdio por trás do retrato */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[8%] h-2/3 w-[85%] -translate-x-1/2 rounded-full bg-white/45 blur-3xl"
        />
        {!failed ? (
          <img
            ref={imgRef}
            src={PORTRAIT_SRC}
            alt="Retrato de Margarida Ramos Pinto"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            onError={() => setFailed(true)}
            className="relative h-full w-full origin-bottom scale-[1.12] object-cover mix-blend-multiply"
          />
        ) : (
          <PortraitPlaceholder />
        )}
      </div>
    </div>
  );
}

function PortraitPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Retrato de Margarida Ramos Pinto (em breve)"
      className="relative flex h-full w-full items-end justify-center overflow-hidden bg-[linear-gradient(160deg,#efe9df_0%,#e4dccf_55%,#d9cfbf_100%)]"
    >
      {/* luz suave */}
      <div className="absolute -top-1/4 left-1/2 h-3/4 w-3/4 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
      {/* silhueta geométrica */}
      <div className="absolute bottom-0 left-1/2 h-[46%] w-[78%] -translate-x-1/2 rounded-t-[999px] bg-[#cfc3b1]" />
      <div className="absolute bottom-[38%] left-1/2 h-[26%] w-[34%] -translate-x-1/2 rounded-full bg-[#c4b6a2]" />
      <div className="absolute left-[14%] top-[22%] h-16 w-16 rounded-full border border-foreground/25" />
      <div className="relative z-10 mb-8 text-center">
        <p className="display text-6xl text-foreground/80 md:text-7xl">
          M<span className="italic text-terracotta">r</span>P
        </p>
        <p className="eyebrow mt-3">Retrato editorial · em breve</p>
      </div>
    </div>
  );
}
