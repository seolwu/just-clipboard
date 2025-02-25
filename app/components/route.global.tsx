import { useCallback, useEffect, useState } from 'react'
import copy from 'clipboard-copy'
import { type FlagData, type Flags } from 'types/flag'
import { availableFlags, getDefaultFlag, getFlagByName } from '~/utils/flag'
import { getTip } from '~/utils/tip'
import { DataNode, FlagNode, PrintNode } from './node'

export default function Index() {
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
      copy(text)
    }
  }, [data, copy])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location) {
      setLocation(window.location)
    }
  }, [setLocation])

  useEffect(() => {
    setFlags(availableFlags)

    if (location) {
      const match = location.pathname.match(/^\/([\w]+)/)
      if (match) {
        const char = match[1]
        const hotFlag = getFlagByName(char)
        setFlag(hotFlag)
      } else {
        const hotFlag = getDefaultFlag()
        setFlag(hotFlag)
      }
    }
  }, [location, setLocation, availableFlags, setFlag, setFlags])

  useEffect(() => {
    if (location && flag) {
      const shortName = flag.shortName

      if (window && window.history) {
        window.history.replaceState({ flag: shortName }, '', `/${shortName}`)
      }

      if (flag.transform) {
        const transformed = flag.transform(data)
        const result = `${location.origin}/${shortName}${transformed && `/${transformed}`}`
        setPrintResult(result)
      } else {
        const result = `${location.origin}/${shortName}${data && `/${data}`}`
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
