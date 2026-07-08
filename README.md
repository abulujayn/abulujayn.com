# abulujayn.com

A simple personal website and blog built with [Astro](https://astro.build/).

The site keeps things intentionally plain: Markdown and MDX content, minimal layout, no client-side JavaScript by default, and a small set of pages for posts, projects, and archives.

## Getting Started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build the site:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Scripts

- `npm run dev` starts the Astro development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs Astro checks.
- `npm run format` formats the project with Prettier.

## Project Structure

```text
src/
  components/      Reusable Astro components
  content/post/    Blog posts written in MDX
  layouts/         Page and post layouts
  pages/           Site routes
  utils/           Shared helpers
```

## Writing Posts

Posts live in `src/content/post/`. Each post has its own folder with an `index.mdx` file.

## Deployment

The project is configured for Vercel through the Astro Vercel adapter.
