import { MetaFunction } from '@remix-run/node'
import { parsePath } from '~/utils/path'
import Data, { regex } from '~/components/data.global'

export async function clientLoader() {
  if (window && window.location) {
    const [, clip] = parsePath(window.location.pathname, regex)
    return clip
  }
  return
}

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: `${data && `${data} # `}Just Clipboard` },
    { name: 'description', content: 'Saves data to the clipboard only' },
  ]
}

export default function DataPage() {
  return <Data flag='escape' />
}
