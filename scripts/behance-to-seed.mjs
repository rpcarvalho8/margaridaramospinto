#!/usr/bin/env node
/**
 * Importa os projetos do Behance para um seed SQL (case studies).
 *
 * PASSO 1 — no browser, abre https://www.behance.net/margaridaramospinto,
 * faz scroll até ver todos os projetos, abre a consola (F12) e cola:
 *
 *   copy(JSON.stringify([...new Map([...document.querySelectorAll('a[href*="/gallery/"]')]
 *     .map(a => {
 *       const card = a.closest('[class*="ProjectCover"], li, div');
 *       const img = card?.querySelector('img');
 *       const src = img?.currentSrc || img?.src || "";
 *       const title = (a.getAttribute('title') || img?.alt || a.textContent || "").trim();
 *       return [a.href.split('?')[0], { title, link: a.href.split('?')[0], image: src }];
 *     })
 *     .filter(([, p]) => p.title && p.image)).values()], null, 2))
 *
 * O JSON fica na área de transferência. Guarda-o em `scripts/behance.json`.
 *
 * PASSO 2 — gera o SQL:
 *
 *   node scripts/behance-to-seed.mjs scripts/behance.json > supabase/seed/behance_import.sql
 *
 * PASSO 3 — revê categoria/cliente/ano/narrativa no SQL (ou depois no /admin)
 * e corre-o no SQL Editor do Supabase. É idempotente (não duplica títulos).
 *
 * Nota: as capas ficam a apontar para o CDN do Behance. Para não depender dele,
 * substitui-as no /admin por upload (vão para o bucket project-media).
 */
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/behance-to-seed.mjs <behance.json>");
  process.exit(1);
}

const projects = JSON.parse(readFileSync(file, "utf8"));
if (!Array.isArray(projects) || projects.length === 0) {
  console.error("O JSON não tem projetos. Confirma o passo 1.");
  process.exit(1);
}

/** Palpite de categoria a partir do título (revê sempre!). */
function guessCategory(title) {
  const t = title.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (/(catalog|brochur|editorial|livro|revista|boletim|paginac)/.test(t)) return "Design Editorial";
  if (/(foto|photo|evento|cenograf|direc)/.test(t)) return "Direção de Arte";
  if (/(social|digital|web|site|campanha|newsletter|ui|ux|app)/.test(t)) return "Campanhas Digitais";
  return "Identidade Visual";
}

const q = (v) => (v == null || v === "" ? "NULL" : `'${String(v).replace(/'/g, "''")}'`);
const tag = "$t$";

const rows = projects.map((p, i) => {
  const title = String(p.title).trim();
  return `  (${q(title)}, ${q(p.category ?? guessCategory(title))}, ${q(p.client)}, ${
    Number.isInteger(p.year) ? p.year : "NULL::integer"
  }, ${q(p.cover_ratio ?? "portrait")}, ${q(p.image)}, ${q(p.link)}, ${tag}${
    p.description ?? ""
  }${tag}, NULL::text, NULL::text, NULL::text, '[]'::jsonb, ${(i + 1) * 10 + 100})`;
});

process.stdout.write(`-- Gerado por scripts/behance-to-seed.mjs em ${new Date().toISOString()}
-- ${projects.length} projeto(s) importado(s) do Behance. Rever antes de correr.
INSERT INTO public.projects
  (title, category, client, year, cover_ratio, image, link, description, challenge, concept, solution, gallery, sort_order)
SELECT * FROM (VALUES
${rows.join(",\n")}
) AS seed (title, category, client, year, cover_ratio, image, link, description, challenge, concept, solution, gallery, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.projects p WHERE lower(p.title) = lower(seed.title));
`);
