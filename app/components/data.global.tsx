import { useLocation, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { type FlagData } from 'types/flag'
import { copyTo } from '~/utils/clipboard'
import Error from './error.global'

export const regex = /^\/([\w]+)\/(.+)$/

export default function Page({ flag, postProcessing }: { flag: FlagData, postProcessing?: (flag: string, data: string) => string }) {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const pathname = location.pathname
    const search = location.search
    const hash = location.hash
    const data = pathname + search + hash

    copyTo(data, regex, postProcessing && postProcessing)
  }, [copyTo])

  useEffect(() => {
    navigate(`/${flag.shortName}`)
  }, [navigate])

  return (<></>)
}

export function ErrorBoundary() {
  return <Error cause='Invalid rule' />
}
