<div align="center">
  <h1>Task Flow Board</h1>
  <img src="./public/og-image.png" alt="Task Flow Board screenshot" width="860" />

  <p><strong>Production-ready draggable Kanban board for Web and Desktop.</strong></p>

  <p>
    <a href="./LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/License-MIT-0b0f19?style=for-the-badge&logo=opensourceinitiative&logoColor=white" /></a>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img alt="Electron" src="https://img.shields.io/badge/Electron-30-1f2937?style=for-the-badge&logo=electron&logoColor=9feaf9" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-1d4ed8?style=for-the-badge&logo=typescript&logoColor=white" />
    <img alt="Platform" src="https://img.shields.io/badge/Platform-Web%20%7C%20Desktop-111827?style=for-the-badge" />
  </p>
</div>

## Overview

<div align="center">
  <img src="./docs/screenshot.png" alt="Task Flow Board screenshot" />
</div>

Task Flow Board is a dark-first task management app built with **Next.js App Router + Electron**.

- Drag-and-drop Kanban workflow
- Desktop + Web runtime
- Local persistence for both platforms
- Clean, keyboard-friendly UI

## Environment Variables

| Variable   | Required | Values              | Default | Description                                   |
| ---------- | -------- | ------------------- | ------- | --------------------------------------------- |
| `PLATFORM` | Yes      | `WEB`, `DESKTOP`    | `WEB`   | Runtime abstraction used by app/build scripts |
| `TARGET`   | Yes      | `WIN`, `MAC`, `LIN` | `MAC`   | Desktop target abstraction                    |

## Scripts

| Command                  | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `yarn dev:web`           | Run Next.js in development mode            |
| `yarn dev:desktop`       | Run Electron + Next.js in development mode |
| `yarn build:web`         | Production static web build                |
| `yarn build:desktop:mac` | Production desktop build for macOS         |
| `yarn build:desktop:win` | Production desktop build for Windows       |
| `yarn build:desktop:lin` | Production desktop build for Linux         |

## Production Output

| Artifact Type                | Location   |
| ---------------------------- | ---------- |
| Web static export            | `out/`     |
| Desktop installers / bundles | `release/` |

## Core Features

- 5 status columns: Open, Blocked, In Process, Waiting to be finished, Done
- Ticket details modal with edit/delete
- Priority levels (5)
- Custom labels with color picker
- Bulk delete for Done column (with confirmation)

## Data Persistence

| Platform | Storage                                               |
| -------- | ----------------------------------------------------- |
| Web      | Browser `localStorage`                                |
| Desktop  | Electron user-data file: `public-assets/tickets.json` |

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Electron + electron-builder
- dnd-kit

## License

MIT — see [LICENSE](./LICENSE).
