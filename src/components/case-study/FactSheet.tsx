import type { Project } from "@/lib/projects";

/** Ficha técnica — o Behance aparece só aqui, de forma discreta. */
export function FactSheet({ project }: { project: Project }) {
  const rows: [string, string | null][] = [
    ["Cliente", project.client],
    ["Ano", project.year ? String(project.year) : null],
    ["Disciplina", project.category],
  ];

  return (
    <aside aria-label="Ficha técnica" className="md:sticky md:top-32">
      <p className="eyebrow">Ficha técnica</p>
      <dl className="mt-6 divide-y divide-border border-y border-border">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-6 py-3 text-sm">
              <dt className="text-stone">{label}</dt>
              <dd className="text-right text-foreground">{value}</dd>
            </div>
          ))}
      </dl>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-5 inline-block text-xs text-stone hover:text-foreground"
        >
          Ver também no Behance ↗
        </a>
      )}
    </aside>
  );
}
