import Data from '~/components/data.global'
import { defaultFlags } from '~/utils/flag'

export default function DataPage() {
  return <Data flag={defaultFlags.default!} />
}
