import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "project-media";
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10 MB (igual ao limite do bucket)
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
export const ACCEPT_ATTR = ACCEPTED.join(",");

function slugify(name: string) {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "imagem"
  );
}

/** Envia uma imagem para o bucket `project-media` e devolve o URL público. */
export async function uploadProjectMedia(file: File, folder = "projects"): Promise<string> {
  if (!ACCEPTED.includes(file.type)) {
    throw new Error(
      `Formato não suportado (${file.type || "desconhecido"}). Usa JPG, PNG, WebP, AVIF ou GIF.`,
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`"${file.name}" tem mais de 10 MB. Exporta a imagem com menor peso.`);
  }
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${slugify(file.name)}.${ext}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    throw new Error(
      error.message.includes("Bucket not found")
        ? "O bucket 'project-media' ainda não existe. Corre a migração SQL no Supabase."
        : error.message,
    );
  }
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
