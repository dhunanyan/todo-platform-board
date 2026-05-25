# Task Flow Board

![OG image](./public/og-image.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![Electron](https://img.shields.io/badge/Electron-30-47848f)](https://www.electronjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org)

Production-ready draggable Kanban app built with Next.js App Router + Electron.

## 🚀 Quick Start

```bash
yarn install
yarn dev:web
```

Desktop dev mode:

```bash
yarn dev:desktop
```

## ⚙️ Environment

Configure `.env`:

```env
PLATFORM=WEB
TARGET=MAC
```

Allowed values:
- `PLATFORM`: `WEB` | `DESKTOP`
- `TARGET`: `WIN` | `MAC` | `LIN`

## 🏗️ Production Build

Web:

```bash
yarn build:web
```

Desktop:

```bash
yarn build:desktop:mac
yarn build:desktop:win
yarn build:desktop:lin
```

Build output:
- Web static export: `out/`
- Desktop installers/artifacts: `release/`

## ✨ Features

- Draggable multi-column board (Open, Blocked, In Process, Waiting to be finished, Done)
- Ticket CRUD with details modal
- Priority system (5 levels)
- Custom labels with color picker
- Bulk delete for Done column (with confirmation)
- Dark-first UI with custom components and keyboard-friendly interactions
- Persistence:
- Web: `localStorage`
- Desktop: local file in Electron user data `public-assets/tickets.json`

## 🧱 Tech Stack

- Next.js (App Router)
- React + TypeScript
- Electron + electron-builder
- dnd-kit

## 📦 Repository Structure

- `app/` – App Router pages/layout/styles
- `components/` – UI and interaction components
- `electron/` – Electron main/preload processes
- `lib/` – constants, env, storage adapters
- `types/` – shared domain types
- `.github/` – templates and community files

## 📄 License

MIT — see [LICENSE](./LICENSE).
