import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes(route => {
          route('/', 'page/route.tsx', { index: true })
          route('d', 'default/layout.tsx', () => {
            route('', 'default/route.tsx', { index: true })
            route('*', 'default/data.tsx')
          })
          route('e', 'escape/layout.tsx', () => {
            route('', 'escape/route.tsx', { index: true })
            route('*', 'escape/data.tsx')
          })
          route('*', 'page/error.tsx')
        })
      },
    }),
    tsconfigPaths(),
  ],
})
