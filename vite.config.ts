import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/ZPI2023_IO1_5D/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vite.setup.ts'],
  },
})

