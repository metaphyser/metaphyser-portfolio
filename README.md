# Portfolio Website

Minimal portfolio baseline built with React, Vite, TypeScript, Storybook, JSON content, and GitHub Pages deployment.

## Commands

- `pnpm install`
- `pnpm dev`
- `pnpm storybook`
- `pnpm build`
- `pnpm build-storybook`

## Content

Edit:

- `src/data/profile.json`
- `src/data/projects.json`

## GitHub Pages

The deployment workflow is in `.github/workflows/deploy.yml`.

For a repository site like `https://<user>.github.io/<repo>/`, the Vite `base` path is inferred during GitHub Actions builds from `GITHUB_REPOSITORY`.

After pushing to `main`, configure the repository Pages source to `GitHub Actions` in GitHub settings.
