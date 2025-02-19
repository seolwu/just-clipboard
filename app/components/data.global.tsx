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
    const path = location.pathname
    copyTo(path, regex, postProcessing && postProcessing)
  }, [copyTo])

  useEffect(() => {
    navigate(`/${flag.alias}`)
  }, [navigate])

  return (<></>)
}

export function ErrorBoundary() {
  return <Error cause='Invalid rule' />
}
