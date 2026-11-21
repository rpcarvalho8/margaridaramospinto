import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Link2, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACCEPT_ATTR, uploadProjectMedia } from "@/lib/media";
import { GALLERY_LAYOUTS, type GalleryItem, type GalleryLayout } from "@/lib/projects";

type GalleryEditorProps = {
  value: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  folder?: string;
};

export function GalleryEditor({ value, onChange, folder = "gallery" }: GalleryEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<{ done: number; total: number } | null>(null);
  const [urlDraft, setUrlDraft] = useState("");
  const [dragging, setDragging] = useState(false);

  async function addFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return;
    setUploading({ done: 0, total: files.length });
    const added: GalleryItem[] = [];
    for (const file of files) {
      try {
        const url = await uploadProjectMedia(file, folder);
        added.push({ url, layout: "full" });
      } catch (err) {
        toast.error(err instanceof Error ? err.message : `Falha ao carregar ${file.name}`);
      }
      setUploading((u) => (u ? { ...u, done: u.done + 1 } : u));
    }
    if (added.length) {
      onChange([...value, ...added]);
      toast.success(`${added.length} imagem(ns) adicionada(s)`);
    }
    setUploading(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function addUrl() {
    const url = urlDraft.trim();
    if (!/^https?:\/\//.test(url)) {
      toast.error("Indica um URL válido (https://...)");
      return;
    }
    onChange([...value, { url, layout: "full" }]);
    setUrlDraft("");
  }

  function update(i: number, patch: Partial<GalleryItem>) {
    onChange(value.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  function move(i: number, delta: number) {
    const j = i + delta;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void addFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center gap-3 rounded-md border border-dashed px-4 py-6 text-center transition-colors ${
          dragging ? "border-terracotta bg-terracotta/5" : "border-input"
        }`}
      >
        <Button type="button" onClick={() => inputRef.current?.click()} disabled={!!uploading}>
          {uploading ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="mr-1 h-4 w-4" />
          )}
          {uploading ? `A carregar ${uploading.done}/${uploading.total}...` : "Adicionar imagens"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Arrasta várias imagens de uma vez · até 10 MB cada
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          multiple
          className="hidden"
          onChange={(e) => void addFiles(e.target.files)}
        />
      </div>

      <div className="flex gap-2">
        <Input
          type="url"
          value={urlDraft}
          placeholder="Ou cola o URL de uma imagem"
          onChange={(e) => setUrlDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addUrl();
            }
          }}
        />
        <Button type="button" variant="outline" onClick={addUrl}>
          <Link2 className="mr-1 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {value.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          A galeria está vazia. As imagens aparecem no case study pela ordem desta lista.
        </p>
      ) : (
        <ol className="space-y-3">
          {value.map((item, i) => (
            <li
              key={`${item.url}-${i}`}
              className="flex gap-3 rounded-md border border-border bg-card p-3"
            >
              <img src={item.url} alt="" className="h-24 w-20 shrink-0 rounded-sm object-cover" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <select
                    aria-label="Formato na galeria"
                    value={item.layout}
                    onChange={(e) => update(i, { layout: e.target.value as GalleryLayout })}
                    className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-sm"
                  >
                    {GALLERY_LAYOUTS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Input
                  value={item.caption ?? ""}
                  placeholder="Legenda (opcional)"
                  onChange={(e) => update(i, { caption: e.target.value || undefined })}
                  className="h-8"
                />
                <p className="text-[11px] text-muted-foreground">
                  {GALLERY_LAYOUTS.find((l) => l.value === item.layout)?.hint}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Subir"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  aria-label="Descer"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-destructive"
                  onClick={() => onChange(value.filter((_, idx) => idx !== i))}
                  aria-label="Remover"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
