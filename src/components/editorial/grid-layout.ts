import type { CoverRatio } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Ritmo da grelha editorial (12 colunas):
 * 4:5 ocupa 5 colunas, 16:9 ocupa 7; os itens ímpares descem para criar
 * um alinhamento desencontrado, como numa paginação de revista.
 */
export function tileClasses(index: number, ratio: CoverRatio) {
  return cn(
    ratio === "portrait" ? "md:col-span-5" : "md:col-span-7",
    index % 2 === 1 && "md:mt-28",
    index % 4 === 2 && ratio === "portrait" && "md:col-start-2",
  );
}
