import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'

export default function Error({ cause }: { cause?: string }) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [navigate])

  return (<>{cause}</>)
}
