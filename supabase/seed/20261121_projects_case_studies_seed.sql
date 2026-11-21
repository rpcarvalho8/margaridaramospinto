-- ============================================================
-- Seed de demonstração: 6 case studies da Margarida Ramos Pinto
--
-- • Corre DEPOIS da migração 20261121120000_case_studies_media.sql.
-- • Idempotente: não duplica projetos com o mesmo título.
-- • Os textos são RASCUNHOS baseados no CV (out. 2026) — a Margarida
--   deve revê-los no /admin. As capas são provisórias (public/placeholders):
--   substitui-as no /admin por upload, e acrescenta a galeria de cada projeto.
-- • O Behance não pôde ser lido automaticamente; para importar títulos,
--   capas e links reais usa scripts/behance-to-seed.mjs (ver README no script).
-- ============================================================

INSERT INTO public.projects
  (title, category, client, year, cover_ratio, image, link, description, challenge, concept, solution, gallery, sort_order)
SELECT * FROM (VALUES
  (
    'Catálogo de Iluminação',
    'Design Editorial',
    'ElectrumTrofa, Iluminação',
    NULL::integer,
    'portrait',
    '/placeholders/electrumtrofa-catalogo.svg',
    NULL::text,
    $t$Um catálogo técnico que precisa de ser tão claro para um instalador como apelativo para um arquiteto.$t$,
    $t$Organizar dezenas de referências de iluminação, cada uma com especificações técnicas, variantes e acabamentos, num documento que funcione em papel e em PDF, para equipas comerciais e clientes profissionais.$t$,
    $t$Uma grelha editorial rigorosa, com hierarquia tipográfica pensada para leitura rápida: fotografia de produto em destaque, fichas técnicas normalizadas e ícones para as características-chave. A luz do próprio produto é a protagonista visual.$t$,
    $t$Catálogos, brochuras e fichas técnicas com sistema gráfico consistente, fáceis de atualizar a cada nova coleção e reaproveitáveis em conteúdos web e materiais de apoio comercial.$t$,
    '[]'::jsonb,
    10
  ),
  (
    'Fotografia de Produto',
    'Direção de Arte',
    'ElectrumTrofa, Iluminação',
    NULL,
    'landscape',
    '/placeholders/electrumtrofa-fotografia.svg',
    NULL,
    $t$Fotografar luz é fotografar o invisível: o desafio está no brilho, no reflexo e na sombra.$t$,
    $t$Produzir imagens de produto consistentes para catálogo, website, e-commerce e campanhas, com recursos internos e prazos curtos.$t$,
    $t$Direção de arte com fundos neutros, iluminação suave e enquadramentos que revelam materiais e acabamentos; vídeo curto para mostrar o produto em funcionamento.$t$,
    $t$Uma biblioteca de fotografia e vídeo de produto com linguagem visual unificada, editada para cada canal: impresso, web, e-commerce e redes sociais.$t$,
    '[]'::jsonb,
    20
  ),
  (
    'Website & E-commerce',
    'Campanhas Digitais',
    'ElectrumTrofa, Iluminação',
    NULL,
    'landscape',
    '/placeholders/electrumtrofa-ecommerce.svg',
    NULL,
    $t$Levar o catálogo físico para o digital, sem perder clareza técnica.$t$,
    $t$Manter o website e a loja online atualizados com novos produtos, conteúdos e campanhas, garantindo coerência com a comunicação impressa.$t$,
    $t$Conteúdos modulares em WordPress/Elementor, reaproveitando fotografia e fichas técnicas; campanhas digitais pensadas em série para newsletter e redes sociais.$t$,
    $t$Um ecossistema digital gerido de forma autónoma: páginas de produto, conteúdos de e-commerce e peças de campanha alinhadas com a marca.$t$,
    '[]'::jsonb,
    30
  ),
  (
    'Doce Sopro — Eventos',
    'Direção de Arte',
    'Doce Sopro – Eventos',
    2025,
    'portrait',
    '/placeholders/doce-sopro-eventos.svg',
    NULL,
    $t$Design que sai do ecrã e passa a ocupar espaço: mesas, painéis, sinalética e detalhes que se tocam.$t$,
    $t$Conceber a identidade visual de cada evento e adaptá-la a medidas, suportes e materiais reais, em ambientes efémeros e com orçamentos variados.$t$,
    $t$Uma linguagem visual adaptável por evento, com paleta, tipografia e elementos gráficos que se transformam em cenografia, papelaria e sinalética.$t$,
    $t$Materiais gráficos para espaços físicos com coerência visual do convite ao último detalhe da decoração.$t$,
    '[]'::jsonb,
    40
  ),
  (
    'Boletim Informativo',
    'Design Editorial',
    'Junta de Freguesia do Muro',
    2017,
    'portrait',
    '/placeholders/boletim-muro.svg',
    NULL,
    $t$Comunicação institucional que se lê com gosto, de porta em porta.$t$,
    $t$Desenhar e produzir o boletim informativo da freguesia (2014–2017), tornando acessível informação institucional a um público muito diverso.$t$,
    $t$Paginação clara, com hierarquia forte, fotografia local e uma identidade editorial reconhecível de edição para edição.$t$,
    $t$Um boletim periódico consistente e materiais de comunicação para iniciativas e eventos locais.$t$,
    '[]'::jsonb,
    50
  ),
  (
    'Identidade & Eventos',
    'Identidade Visual',
    'Atelier TRÊS PONTO',
    2014,
    'landscape',
    '/placeholders/tres-ponto.svg',
    NULL,
    $t$Anos de atelier: muitas marcas, muitos formatos, uma mesma atenção ao detalhe.$t$,
    $t$Desenvolver identidade visual, web e comunicação de eventos para diferentes clientes do atelier (2012–2014), coordenando conteúdos entre equipas.$t$,
    $t$Sistemas de identidade pensados para crescer: logótipo, paleta e tipografia que se estendem com naturalidade ao digital e ao impresso.$t$,
    $t$Identidades visuais, peças web e campanhas para eventos entregues de ponta a ponta.$t$,
    '[]'::jsonb,
    60
  )
) AS seed (title, category, client, year, cover_ratio, image, link, description, challenge, concept, solution, gallery, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM public.projects p WHERE lower(p.title) = lower(seed.title)
);
