# Cervejaria — Programação Web

Site institucional de uma cervejaria, desenvolvido com React e Vite. Inclui páginas públicas e painel administrativo.

## Tecnologias

- React 19
- React Router DOM 7
- React Icons
- Vite 8

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (já vem com o Node)

## Como executar

1. Clone o repositório:

```bash
git clone https://github.com/GabriellCabrall/programacao-web.git
cd programacao-web
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Pré-visualiza a build de produção localmente |
| `npm run lint` | Analisa o código com ESLint |

## Estrutura do projeto

```
src/
├── assets/          # Imagens e ícones
├── components/      # Componentes reutilizáveis (Header, Footer, etc.)
├── contexts/        # Context API (autenticação)
├── pages/           # Páginas públicas e painel admin
├── routes/          # Configuração das rotas
└── App.jsx
```

## Páginas

- `/` — Página inicial
- `/sobre` — Sobre a cervejaria
- `/adquira` — Adquira a sua
- `/contatos` — Contatos
- `/admin` — Painel administrativo (requer autenticação)
