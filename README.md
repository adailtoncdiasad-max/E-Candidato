<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# E-Candidato

Plataforma de inteligência eleitoral com integração ao catálogo de dados abertos do TSE.

View your app in AI Studio: https://ai.studio/apps/4e55bb8b-4ec3-40e6-acc5-126f6e3b50f0

## Execução local

**Prerequisites:**  Node.js


1. Instale as dependências com `npm install`.
2. Configure `GEMINI_API_KEY` em `.env.local` para habilitar a IA.
3. Execute com `npm run dev`.

## Dados TSE 2026

Os endpoints `/api/tse/candidates-2026` e `/api/tse/polls-2026` aceitam fontes nacionais configuradas no servidor:

- `TSE_CANDIDATES_2026_URL`: JSON em array ou objeto `{ "candidates": [] }`.
- `TSE_POLLS_2026_URL`: JSON em array ou objeto `{ "polls": [] }`.

Quando essas variáveis não estão definidas, a aplicação usa um snapshot local parcial, identificado na resposta como `source: "local-snapshot"` e `stale: true`. O sistema não apresenta esse snapshot como lista completa do TSE. A cobertura retornada pelo endpoint de candidatos informa as UFs disponíveis e ausentes entre as 27 unidades federativas.

O diretório `consulta_cand_2026/` contém os arquivos oficiais `consulta_cand_2026_<UF>.csv` incorporados ao projeto. Na ausência de uma URL live, o backend carrega esses CSVs, normaliza os campos e expõe a base pelo endpoint `/api/tse/candidates-2026` com `source: "local-csv"`. Os arquivos BR/BRASIL são mantidos como referência e os arquivos estaduais são usados para evitar duplicidade.
