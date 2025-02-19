import Data from '~/components/data.global'
import { useCallback } from 'react'
import { defaultFlags } from '~/utils/flag'

export default function DataPage() {
  const encode = useCallback((_: string, data: string) => {
    const encodeData = data
      .replaceAll(/\/n/g, '%20%0A')
      .replaceAll(/\/r/g, '%20%0D')
    const decode = decodeURIComponent(encodeData)

    return decode
  }, [])

  return <Data flag={defaultFlags.escape!} postProcessing={encode} />
}
