# Ponto de situação

Atualizado em 2026-11-20.

## Build

- `npm run build` passa (exit 0). O output fica em `.output` (Nitro, preset `node-server`).
- Arranque em produção: `npm start` (`node .output/server/index.mjs`).
- A pasta de output do deploy tem de ser `.output`, não `build`.

## Lint

- `npm run lint` falha: 260 erros `prettier/prettier` (só formatação) e 6 avisos `react-refresh/only-export-components` em `src/components/ui`.
- Não foi corrigido de propósito (`eslint --fix` não foi corrido) para evitar conflitos com o Lovable, que também edita estes ficheiros.

## Variáveis de ambiente na Hostinger

Necessárias para o envio de respostas a mensagens de contacto (Resend):

- `RESEND_API_KEY` (obrigatória; sem ela a resposta falha com "Email não configurado").
- `CONTACT_FROM_EMAIL` (opcional; por omissão `geral@margaridaramospinto.com`).
- `CONTACT_FROM_NAME` (opcional; por omissão `Margarida Ramos Pinto`).

Supabase (URL e chave publishable), já presentes no `.env` commitado:

- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`

As variáveis `VITE_*` são embebidas no build, por isso têm de existir quando se corre `npm run build`.

## Lockfiles

Existem dois lockfiles: `package-lock.json` (npm) e `bun.lock` (bun). Convém escolher um gestor de pacotes e remover o outro, para evitar versões de dependências diferentes entre ambientes. Até haver decisão, não apagar nenhum, já que o Lovable pode depender de um deles.
