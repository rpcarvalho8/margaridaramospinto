import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ACCEPT_ATTR, uploadProjectMedia } from "@/lib/media";

type ImageUploadFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  required?: boolean;
};

/** Campo de imagem: upload direto para o Supabase Storage, com URL como alternativa. */
export function ImageUploadField({
  id,
  label,
  value,
  onChange,
  folder,
  required,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [dragging, setDragging] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadProjectMedia(file, folder));
      toast.success("Imagem carregada");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no upload");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFile(e.dataTransfer.files[0]);
        }}
        className={`flex items-center gap-4 rounded-md border border-dashed p-3 transition-colors ${
          dragging ? "border-terracotta bg-terracotta/5" : "border-input"
        }`}
      >
        <div className="h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-secondary">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-stone">
              <ImagePlus className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="mr-1 h-4 w-4" />
            )}
            {uploading ? "A carregar..." : value ? "Substituir" : "Carregar imagem"}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setShowUrl((s) => !s)}>
            <Link2 className="mr-1 h-4 w-4" /> Usar URL
          </Button>
          <p className="w-full text-xs text-muted-foreground">
            Arrasta uma imagem para aqui · JPG, PNG, WebP ou AVIF até 10 MB
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          className="hidden"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
      </div>
      {(showUrl || (required && !value)) && (
        <Input
          id={id}
          type="url"
          value={value}
          placeholder="https://..."
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
