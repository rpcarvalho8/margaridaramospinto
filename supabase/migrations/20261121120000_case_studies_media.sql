-- ============================================================
-- Case studies nativos + Supabase Storage para imagens
-- Seguro de correr mais do que uma vez (idempotente).
-- ============================================================

-- 1) Colunas novas em public.projects (todas opcionais / com default)
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS client      text,
  ADD COLUMN IF NOT EXISTS year        integer,
  ADD COLUMN IF NOT EXISTS challenge   text,
  ADD COLUMN IF NOT EXISTS concept     text,
  ADD COLUMN IF NOT EXISTS solution    text,
  ADD COLUMN IF NOT EXISTS cover_ratio text  NOT NULL DEFAULT 'portrait',
  ADD COLUMN IF NOT EXISTS gallery     jsonb NOT NULL DEFAULT '[]'::jsonb;

-- O link do Behance passa a ser opcional (já previsto numa migração anterior)
ALTER TABLE public.projects ALTER COLUMN link DROP NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_cover_ratio_check') THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_cover_ratio_check CHECK (cover_ratio IN ('portrait', 'landscape'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_gallery_is_array') THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_gallery_is_array CHECK (jsonb_typeof(gallery) = 'array');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'projects_year_range') THEN
    ALTER TABLE public.projects
      ADD CONSTRAINT projects_year_range CHECK (year IS NULL OR year BETWEEN 1990 AND 2100);
  END IF;
END $$;

-- 2) has_role tem de ser executável por utilizadores autenticados,
--    porque as políticas RLS de admin (projects, contact_messages, storage)
--    e o RPC usado em contact.functions.ts a chamam com o papel do utilizador.
--    A função só devolve true/false; não expõe dados.
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 3) Bucket público para imagens de projetos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-media',
  'project-media',
  true,
  10485760, -- 10 MB por ficheiro
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 4) Políticas RLS em storage.objects
--    Leitura: o bucket é público, por isso os URLs públicos funcionam sem política.
--    Esta política permite também ler via API (necessária para apagar/substituir).
DROP POLICY IF EXISTS "project-media: leitura pública" ON storage.objects;
CREATE POLICY "project-media: leitura pública"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'project-media');

DROP POLICY IF EXISTS "project-media: admin insere" ON storage.objects;
CREATE POLICY "project-media: admin insere"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "project-media: admin atualiza" ON storage.objects;
CREATE POLICY "project-media: admin atualiza"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "project-media: admin apaga" ON storage.objects;
CREATE POLICY "project-media: admin apaga"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'project-media' AND public.has_role(auth.uid(), 'admin'));
