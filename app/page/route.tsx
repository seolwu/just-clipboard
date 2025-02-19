import { type MetaFunction } from '@remix-run/node'
import Route from '~/components/route.global'

export default Route

export const meta: MetaFunction = () => {
  return [
    { title: 'Just Clipboard' },
    { name: 'description', content: 'Saves data to the clipboard only' },
  ]
}
