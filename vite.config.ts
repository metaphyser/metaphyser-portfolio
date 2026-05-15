import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.VITE_BASE_PATH;

export default defineConfig({
  plugins: [react()],
  base: basePath ?? (isGitHubPages && repositoryName ? `/${repositoryName}/` : '/'),
});
