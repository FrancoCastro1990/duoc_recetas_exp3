/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/features/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/types/**',
        '**/index.ts',
        '**/*.d.ts',
        '**/pages/**',
        '**/shared/**',
        '**/graphql/types.ts',
        '**/queries/**',
        '**/RecipeDescription.tsx',
        '**/RecipeDetailHeader.tsx',
        '**/RecipeDetailInfo.tsx',
        '**/RecipeIngredients.tsx',
        '**/RecipeInstructions.tsx',
        '**/RecipeTips.tsx'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
