import Data from '~/components/data.global'
import { availableFlags } from '~/utils/flag'

export default function DataPage() {
  const flag = availableFlags.default!

  return <Data
    flag={flag}
    postProcessing={flag.postProcessing}
  />
}
