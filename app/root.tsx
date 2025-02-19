import './tailwind.css'

import {
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import { themeSessionResolver } from './utils/session'
import { type ThemeLoader } from 'types/theme'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
  }
]

export const loader: LoaderFunction = async ({ request }): Promise<ThemeLoader> => {
  try {
    const { getTheme } = await themeSessionResolver(request)
    return { theme: getTheme() }
  } catch {
    return { theme: null }
  }
}

export default function AppWithProviders() {
  const data: ThemeLoader = useLoaderData<typeof loader>()
  
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction='action/set-theme'>
      <App>
        <Outlet />
      </App>
    </ThemeProvider>
  )
}

export function App({ children }: { children?: React.ReactElement }) {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()

  return (
    <html lang='en' className={theme ?? ''}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
        <meta name='darkreader-lock' content='true' />
        <link rel='shortcut icon' href='/favicon.ico'></link>
        <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
        <Meta />
        <Links />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
