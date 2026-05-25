# Todo Board (Next.js + Electron)

A complete App Router project that runs on:
- WEB
- DESKTOP (Electron)

Desktop target env:
- WIN
- MAC
- LIN

## Setup

```bash
yarn install
```

## Env

Edit `.env`:

```env
PLATFORM=WEB
TARGET=MAC
```

## Run

Web:

```bash
yarn dev:web
```

Desktop:

```bash
# Example for mac
yarn dev:desktop
```

## Build

Web build:

```bash
yarn build:web
```

Desktop builds:

```bash
yarn build:desktop:win
yarn build:desktop:mac
yarn build:desktop:lin
```

## Features

- Jira-like draggable board
- Ticket fields: `id`, `title`, `description`, `label`, `status`
- Constant columns (statuses): Open, Blocked, In Process, Waiting to be finished, Done
- Create Ticket modal
- Persistence:
- Web: browser localStorage
- Desktop: local machine file at Electron user data path under `public-assets/tickets.json`
