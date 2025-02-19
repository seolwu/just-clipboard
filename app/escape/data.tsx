import { MetaFunction } from '@remix-run/node'
import { parsePath } from '~/utils/path'
import Data, { regex } from '~/components/data.global'
import { useCallback } from 'react'

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
  const encode = useCallback((_: string, data: string) => {
    const encodeData = data
      .replaceAll(/\/n/g, '%20%0A')
      .replaceAll(/\/r/g, '%20%0D')
    const decode = decodeURIComponent(encodeData)

    return decode
  }, [])

  return <Data flag='escape' postProcessing={encode} />
}
