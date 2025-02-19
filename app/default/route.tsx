import { type MetaFunction } from '@remix-run/node'
import { useCallback } from 'react'
import Route from '~/components/route.global'

export const meta: MetaFunction = () => {
  return [
    { title: 'Just Clipboard' },
    { name: 'description', content: 'Saves data to the clipboard only' },
  ]
}

export default function Index() {
  const transform = useCallback((value: string) => {
    return value.replaceAll('\n', ' ')
  }, [])

  return <Route transform={transform}></Route>
}
