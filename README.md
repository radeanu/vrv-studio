# Docker Setup for VRV Studio

This project includes a complete Docker setup for both development and production environments.

## Prerequisites

-   Docker Desktop (Windows/Mac) or Docker Engine (Linux)
-   Docker Compose v2.0+

## Quick Start

### Development Environment

1. **Start development server:**

    ```bash
    docker-compose --profile dev up
    ```

    This will start the application with hot reload on `http://localhost:3000`

2. **Stop development server:**
    ```bash
    docker-compose down
    ```

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
