import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export type GalleryLayout = "full" | "duo" | "arch" | "offset";
export type CoverRatio = "portrait" | "landscape";

export type GalleryItem = {
  url: string;
  layout: GalleryLayout;
  caption?: string;
  alt?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string | null;
  description: string | null;
  sort_order: number;
  client: string | null;
  year: number | null;
  challenge: string | null;
  concept: string | null;
  solution: string | null;
  cover_ratio: CoverRatio;
  gallery: GalleryItem[];
};

export const GALLERY_LAYOUTS: { value: GalleryLayout; label: string; hint: string }[] = [
  { value: "full", label: "Largura total", hint: "Imagem de ponta a ponta" },
  {
    value: "duo",
    label: "Grelha dupla",
    hint: "Junta-se à imagem 'dupla' seguinte, em proporção assimétrica",
  },
  { value: "arch", label: "Recorte em arco", hint: "Imagem recortada em arco sobre fundo de cor" },
  { value: "offset", label: "Desalinhada", hint: "Imagem deslocada com legenda lateral" },
];

const LAYOUT_VALUES = GALLERY_LAYOUTS.map((l) => l.value);

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** Converte o JSON guardado no Supabase numa galeria válida (ignora entradas inválidas). */
export function parseGallery(value: Json | unknown): GalleryItem[] {
  if (!Array.isArray(value)) return [];
  const items: GalleryItem[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const obj = raw as Record<string, unknown>;
    const url = str(obj.url)?.trim();
    if (!url) continue;
    const layout = LAYOUT_VALUES.includes(obj.layout as GalleryLayout)
      ? (obj.layout as GalleryLayout)
      : "full";
    items.push({
      url,
      layout,
      caption: str(obj.caption) ?? undefined,
      alt: str(obj.alt) ?? undefined,
    });
  }
  return items;
}

/**
 * Normaliza uma linha da tabela `projects`. Tolerante a colunas em falta,
 * para que o site continue a funcionar antes de a migração ser aplicada.
 */
export function normalizeProject(row: Record<string, unknown>): Project {
  const year = typeof row.year === "number" ? row.year : null;
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    category: String(row.category ?? ""),
    image: String(row.image ?? ""),
    link: str(row.link),
    description: str(row.description),
    sort_order: typeof row.sort_order === "number" ? row.sort_order : 0,
    client: str(row.client),
    year,
    challenge: str(row.challenge),
    concept: str(row.concept),
    solution: str(row.solution),
    cover_ratio: row.cover_ratio === "landscape" ? "landscape" : "portrait",
    gallery: parseGallery(row.gallery),
  };
}

/** Lista completa (o portfólio é pequeno: uma só query alimenta home, detalhe e admin). */
export const projectsQuery = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((row) => normalizeProject(row as Record<string, unknown>));
    },
    staleTime: 60_000,
  });

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (value: string) => UUID_RE.test(value);

/* ------------------------------------------------------------------ */
/* Áreas de atuação (hero) — ligadas às categorias por palavras-chave  */
/* ------------------------------------------------------------------ */

export type Discipline = {
  key: string;
  label: string;
  italic: string;
  keywords: string[];
};

export const DISCIPLINES: Discipline[] = [
  {
    key: "identidade",
    label: "Identidade",
    italic: "Visual",
    keywords: ["identidade", "branding", "marca", "logo", "brand"],
  },
  {
    key: "editorial",
    label: "Design",
    italic: "Editorial",
    keywords: ["editorial", "livro", "revista", "catalogo", "paginacao", "impresso", "comercial"],
  },
  {
    key: "direcao",
    label: "Direção de",
    italic: "Arte",
    keywords: [
      "direcao de arte",
      "art direction",
      "fotografia",
      "producao",
      "conteudo visual",
      "evento",
    ],
  },
  {
    key: "digital",
    label: "Campanhas",
    italic: "Digitais",
    keywords: ["digital", "social", "campanha", "web", "redes", "newsletter"],
  },
];

export function foldText(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function matchesDiscipline(category: string, discipline: Discipline) {
  const folded = foldText(category);
  return discipline.keywords.some((k) => folded.includes(k));
}
