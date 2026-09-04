import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const isCustomElement = (tag: string) => tag.startsWith('storysoft-')

export default defineConfig({
  plugins: [
    vue({
      template: { compilerOptions: { isCustomElement } },
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/__tests__/setup.ts'],
  },
})
