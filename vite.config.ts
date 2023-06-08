import type { UserConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import type { RootNode, TemplateChildNode } from '@vue/compiler-core'
import { fileURLToPath, URL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// https://vitejs.dev/config/

const removeDataTestAttrs = (node: RootNode | TemplateChildNode) => {
  if (node.type === 1) {
    node.props = node.props.filter((prop) => (prop.type === 6 ? prop.name !== 'data-test' : true))
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          nodeTransforms: process.env.NODE_ENV === 'production' ? [removeDataTestAttrs] : []
        }
      }
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')
    })
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['../tests/unit.setup.ts']
  },
  build: {
    chunkSizeWarningLimit: 1600
  }
} as UserConfig & { test: InlineConfig })
