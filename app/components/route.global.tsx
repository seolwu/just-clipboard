import { useCallback, useEffect, useState } from 'react'
import { type FlagData, type Flags } from 'types/flag'
import { defaultFlags, getDefaultFlag, getFlagByAlias } from '~/utils/flag'
import { toClipboard } from '~/utils/clipboard'
import { getTip } from '~/utils/tip'
import { DataNode, FlagNode, PrintNode } from './node'

interface RouteProps {
  transform?: (data: string) => string
}

export default function Index({ transform }: RouteProps) {
  const [location, setLocation] = useState<Location>()
  const [tip, setTip] = useState<string>(getTip())
  const [flag, setFlag] = useState<FlagData | null>()
  const [flags, setFlags] = useState<Flags | null>()
  const [data, setData] = useState<string>('')
  const [printResult, setPrintResult] = useState<string>()

  const autoResizeTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = '80px'
    event.target.style.height = event.target.scrollHeight + 'px'
  }, [])

  const handleTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value

    autoResizeTextArea(event)
    setTip(getTip())
    setData(value)
  }, [autoResizeTextArea, setData, setTip, getTip])

  const handlePrint = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    const text = event.currentTarget.textContent!
    if (data.length) {
      toClipboard(text)
    }
  }, [data, toClipboard])

  useEffect(() => {
    if (window && window.location) {
      setLocation(window.location)
    }
  }, [setLocation])

  useEffect(() => {
    setFlags(defaultFlags)

    if (location) {
      const match = location.pathname.match(/^\/([\w]+)/)
      if (match) {
        const alias = match[1]
        const tempFlag = getFlagByAlias(alias)
        setFlag(tempFlag)
      } else {
        const tempFlag = getDefaultFlag()
        setFlag(tempFlag)
      }
    }
  }, [location, setLocation, setFlag, setFlags])

  useEffect(() => {
    if (flag) {
      const alias = flag.alias
      if (window && window.history) {
        window.history.replaceState({ flag: alias }, '', `/${alias}`)
      }
    }
  }, [flag])

  useEffect(() => {
    if (location && flag) {
      const alias = flag.alias
      if (transform) {
        const transformed = transform(data)
        const result = `${location.origin}/${alias}${transformed && `/${transformed}`}`
        setPrintResult(result)
      } else {
        const result = `${location.origin}/${alias}${data && `/${data}`}`
        setPrintResult(result)
      }
    }
  }, [location, flag, data, setPrintResult])

  return (
    <div className='flex h-screen items-center justify-center font-["Open_Sans",serif]'>
      <div className='mx-6 sm:mx-12 max-w-3xl overflow-hidden'>
        {location && flag && flags && (
          <div className='flex flex-col-reverse sm:flex-row gap-5 text-sm'>
            <div className='flex flex-col gap-5 h-full'>
              <div className='p-4 h-full border border-outline rounded-xl'>
                <FlagNode
                  list={Object.values(flags)}
                  value={flag.name}
                  callback={t => setFlag(t)}
                />
              </div>
              <div className='p-4 h-full border border-outline rounded-xl'>
                <PrintNode
                  result={printResult}
                  disabled={!data.length}
                  callback={handlePrint}
                />
              </div>
            </div>
            <div className='p-4 h-full border border-outline rounded-xl'>
              <div className='flex flex-col gap-0.5'>
                <DataNode placeholder={tip} callback={handleTextArea} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
