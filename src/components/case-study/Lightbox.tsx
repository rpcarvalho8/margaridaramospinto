import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/projects";

type LightboxProps = {
  items: GalleryItem[];
  index: number | null;
  title: string;
  onIndexChange: (index: number | null) => void;
};

export function Lightbox({ items, index, title, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const current = index !== null ? items[index] : undefined;
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  // Pré-carrega a imagem seguinte para navegação instantânea
  useEffect(() => {
    if (index === null || items.length < 2) return;
    const next = new Image();
    next.src = items[(index + 1) % items.length].url;
  }, [index, items]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-[#141413]/95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[95] flex flex-col text-[#f8f7f4] outline-none"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <DialogPrimitive.Title className="text-sm">
              <span className="font-serif text-lg italic">{title}</span>
              <span className="ml-3 tabular-nums text-white/50">
                {index !== null ? index + 1 : 0} / {items.length}
              </span>
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Description className="sr-only">
            Galeria de imagens do projeto. Usa as setas do teclado para navegar.
          </DialogPrimitive.Description>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20">
            {current && (
              <img
                key={current.url}
                src={current.url}
                alt={current.alt ?? current.caption ?? title}
                className="max-h-full max-w-full animate-in object-contain fade-in-0 zoom-in-95 duration-300"
              />
            )}
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Imagem anterior"
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:block"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Imagem seguinte"
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full p-3 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:block"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          <p className="min-h-14 px-6 py-4 text-center text-sm text-white/60">{current?.caption}</p>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
