import { useMemo, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { DISCIPLINES, matchesDiscipline, type Discipline, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Portrait } from "./Portrait";

type HeroProps = {
  projects: Project[] | undefined;
  onSelectCategory: (category: string) => void;
};

export function HeroDisciplines({ projects, onSelectCategory }: HeroProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  /** Primeiro projeto de cada área (para a pré-visualização flutuante). */
  const previews = useMemo(() => {
    const map = new Map<string, Project | undefined>();
    for (const d of DISCIPLINES) {
      map.set(
        d.key,
        projects?.find((p) => matchesDiscipline(p.category, d)),
      );
    }
    return map;
  }, [projects]);

  const active = activeKey ? previews.get(activeKey) : undefined;

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const { clientX, clientY } = e;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${clientX + 28}px, ${clientY - 120}px, 0)`;
      }
    });
  }

  function choose(d: Discipline) {
    const project = previews.get(d.key);
    if (project) onSelectCategory(project.category);
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:pb-28 md:pt-16">
      <div className="grid items-end gap-14 md:grid-cols-12 md:gap-10">
        {/* Texto */}
        <div className="md:col-span-7">
          <p className="eyebrow animate-reveal">Designer de Comunicação · Porto, Portugal</p>
          <h1
            className="display mt-6 animate-reveal text-[clamp(3.25rem,9vw,7.5rem)] text-foreground"
            style={{ animationDelay: "80ms" }}
          >
            Design que
            <br />
            <em className="text-terracotta">conta</em> histórias.
          </h1>
          <p
            className="mt-8 max-w-md animate-reveal text-base leading-relaxed text-stone md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Margarida Ramos Pinto cria identidades, peças editoriais e campanhas com atenção ao
            detalhe, rigor e uma boa dose de curiosidade.
          </p>

          {/* Áreas de atuação */}
          <ul
            className="mt-12 border-t border-border"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setActiveKey(null)}
            aria-label="Áreas de atuação"
          >
            {DISCIPLINES.map((d, i) => {
              const hasPreview = !!previews.get(d.key);
              return (
                <li key={d.key} className="border-b border-border">
                  <button
                    type="button"
                    onPointerEnter={() => setActiveKey(d.key)}
                    onFocus={() => setActiveKey(d.key)}
                    onBlur={() => setActiveKey(null)}
                    onClick={() => choose(d)}
                    className={cn(
                      "group flex w-full items-baseline gap-5 py-4 text-left transition-colors md:py-5",
                      activeKey && activeKey !== d.key ? "text-foreground/35" : "text-foreground",
                    )}
                  >
                    <span className="w-6 text-xs tabular-nums text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-3xl leading-none transition-transform duration-500 group-hover:translate-x-2 md:text-[2.75rem]">
                      {d.label} <em className="text-terracotta">{d.italic}</em>
                    </span>
                    <ArrowDownRight
                      aria-hidden
                      className={cn(
                        "ml-auto h-5 w-5 shrink-0 self-center text-stone transition-all duration-500",
                        "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                        !hasPreview && "hidden",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Retrato */}
        <div className="md:col-span-5 md:pl-6">
          <Portrait priority className="mx-auto max-w-sm md:max-w-none" />
        </div>
      </div>

      {/* Pré-visualização flutuante (só com rato) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        style={{ transform: "translate3d(-999px,-999px,0)" }}
      >
        <div
          className={cn(
            "w-56 origin-top-left overflow-hidden rounded-sm bg-secondary shadow-[0_24px_50px_-20px_rgb(24_24_27/0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active ? "scale-100 opacity-100" : "scale-90 opacity-0",
          )}
        >
          {active && (
            <>
              <img src={active.image} alt="" className="aspect-[4/5] w-full object-cover" />
              <p className="bg-background px-3 py-2 text-xs text-foreground">{active.title}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
