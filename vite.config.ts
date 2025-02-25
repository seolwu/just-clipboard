import { vitePlugin as remix } from '@remix-run/dev'
import { vercelPreset } from '@vercel/remix/vite'
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
          type RoutePath = { [key: string]: string }

          const getRoutePath = (flag: string): RoutePath => {
            const routePath = `routes/${flag}`
            return {
              layout: `${routePath}/layout.tsx`,
              route: `${routePath}/route.tsx`,
              data: `${routePath}/data.tsx`,
            }
          }

          const addRoute = (flagChar: string, routePath: RoutePath) => {
            route(flagChar,  routePath.layout , () => {
              route('', routePath.route, { index: true })
              route('*', routePath.data)
            })
          }

          route('/', 'page/route.tsx', { index: true })
          addRoute('p', getRoutePath('plain'))
          addRoute('e', getRoutePath('escape'))
          route('*', 'page/error.tsx')
        })
      },
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
})
