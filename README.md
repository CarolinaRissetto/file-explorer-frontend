# File Explorer

Explorador de arquivos e pastas com interface moderna.

## Tecnologias

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Pré-requisitos

- **Node.js** 18+
- Backend rodando (veja a pasta `file-explorer-backend`)

## Como executar

```sh
npm install
cp .env.example .env
npm run dev
```

O `.env.example` já aponta para o backend local (`http://localhost:3001`). Se o backend estiver em outra URL, edite o `.env` e altere `VITE_API_URL`.

**Rodar o projeto completo:** primeiro suba o backend (na pasta `file-explorer-backend`, com Docker e PostgreSQL), depois rode o frontend aqui.

### Deploy (Lovable / Vercel)

Configure `VITE_API_URL` nas variáveis de ambiente do projeto com a URL do backend em produção.

## Scripts disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Linter
- `npm run test` - Testes
