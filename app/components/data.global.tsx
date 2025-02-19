import { useLocation, useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { copyTo } from '~/utils/clipboard'
import Error from './error.global'
import { Flags } from 'types/flag'

export const regex = /^\/([\w]+)\/(.+)$/

export default function Page({ flag, postProcessing }: { flag: Flags, postProcessing?: (flag: string, data: string) => string }) {
  const navigate = useNavigate()

  const location = useLocation()
  
  useEffect(() => {
    const path = location.pathname
    copyTo(path, regex, postProcessing && postProcessing)
  }, [copyTo])

  useEffect(() => {
    navigate(`/${flag.slice(0, 1)}`)
  }, [navigate])

  return (<></>)
}

export function ErrorBoundary() {
  return <Error cause='Invalid rule' />
}
