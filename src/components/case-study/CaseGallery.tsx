import { useMemo, useState } from "react";
import type { GalleryItem } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

type Block =
  | { kind: "single"; item: GalleryItem; index: number }
  | { kind: "duo"; items: { item: GalleryItem; index: number }[] };

/** Agrupa imagens "duo" consecutivas aos pares; as restantes ficam isoladas. */
function toBlocks(items: GalleryItem[]): Block[] {
  const blocks: Block[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.layout === "duo" && items[i + 1]?.layout === "duo") {
      blocks.push({
        kind: "duo",
        items: [
          { item, index: i },
          { item: items[i + 1], index: i + 1 },
        ],
      });
      i++;
    } else {
      blocks.push({ kind: "single", item, index: i });
    }
  }
  return blocks;
}

export function CaseGallery({ items, title }: { items: GalleryItem[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const blocks = useMemo(() => toBlocks(items), [items]);

  if (items.length === 0) return null;

  return (
    <section aria-label="Galeria do projeto" className="space-y-10 md:space-y-20">
      {blocks.map((block, b) =>
        block.kind === "duo" ? (
          <div key={b} className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-12 md:gap-8">
            <Figure
              entry={block.items[0]}
              onOpen={setOpen}
              title={title}
              className="md:col-span-7"
              imgClass="aspect-[4/5] md:aspect-[5/6]"
            />
            <Figure
              entry={block.items[1]}
              onOpen={setOpen}
              title={title}
              className="md:col-span-5 md:mt-32"
              imgClass="aspect-[4/5]"
            />
          </div>
        ) : (
          <SingleBlock key={b} entry={block} onOpen={setOpen} title={title} />
        ),
      )}
      <Lightbox items={items} index={open} title={title} onIndexChange={setOpen} />
    </section>
  );
}

function SingleBlock({
  entry,
  onOpen,
  title,
}: {
  entry: { item: GalleryItem; index: number };
  onOpen: (i: number) => void;
  title: string;
}) {
  switch (entry.item.layout) {
    case "arch":
      return (
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex justify-center overflow-hidden rounded-sm bg-sage/25 px-6 py-14 md:py-24">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-terracotta/15"
            />
            <Figure
              entry={entry}
              onOpen={onOpen}
              title={title}
              className="relative w-full max-w-md"
              imgClass="arch aspect-[3/4]"
            />
          </div>
        </div>
      );
    case "offset":
      return (
        <div className="mx-auto grid max-w-7xl items-end gap-6 px-6 md:grid-cols-12 md:gap-8">
          <p className="order-2 font-serif text-xl italic leading-snug text-stone md:order-1 md:col-span-3 md:pb-4">
            {entry.item.caption}
          </p>
          <Figure
            entry={entry}
            onOpen={onOpen}
            title={title}
            hideCaption
            className="order-1 md:order-2 md:col-span-8 md:col-start-5"
            imgClass="aspect-[4/3]"
          />
        </div>
      );
    case "duo":
    case "full":
    default:
      return (
        <div className="mx-auto max-w-[96rem] md:px-6">
          <Figure entry={entry} onOpen={onOpen} title={title} imgClass="md:rounded-sm" />
        </div>
      );
  }
}

function Figure({
  entry,
  onOpen,
  title,
  className,
  imgClass,
  hideCaption,
}: {
  entry: { item: GalleryItem; index: number };
  onOpen: (i: number) => void;
  title: string;
  className?: string;
  imgClass?: string;
  hideCaption?: boolean;
}) {
  const { item, index } = entry;
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
        aria-label={`Ampliar imagem ${index + 1}${item.caption ? `: ${item.caption}` : ""}`}
      >
        <img
          src={item.url}
          alt={item.alt ?? item.caption ?? `${title} — imagem ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full bg-secondary object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]",
            imgClass,
          )}
        />
      </button>
      {!hideCaption && item.caption && (
        <figcaption className="mt-3 px-6 text-xs text-stone md:px-0">{item.caption}</figcaption>
      )}
    </figure>
  );
}
