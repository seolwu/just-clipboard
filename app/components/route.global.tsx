import { useCallback, useEffect, useState } from 'react'
import { type Flags } from 'types/flag'
import { alias, defaultFlags, flagExpressions as fex } from '~/utils/flag'
import { toClipboard } from '~/utils/clipboard'
import { getTip } from '~/utils/tip'
import MousePointerClick from './MousePointerClick'

export default function Index() {
  const [location, setLocation] = useState<Location>()
  const [tip, setTip] = useState<string>(getTip())
  const [flag, setFlag] = useState<Flags>()
  const [flags, setFlags] = useState<Flags[]>([])
  const [data, setData] = useState<string>('')
  const [printResult, setPrintResult] = useState<string>()
  const [toast, setToast] = useState<string | null>(null)
  const toastDuration = 1500

  const autoResizeTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = '80px'
    event.target.style.height = event.target.scrollHeight + 'px'
  }, [])

  const handleTextArea = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResizeTextArea(event)
    setData(event.target.value)
    setTip(getTip())
  }, [autoResizeTextArea, setData, setTip, getTip])

  const handlePrint = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    const text = event.currentTarget.textContent!
    if (data.length) {
      toClipboard(text)
      setToast('Successfully copied to clipboard!')
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
        const flagAlias = match[1]
        setFlag(alias(flagAlias)!)
      } else {
        setFlag('default')
      }
    }
  }, [location, setLocation, setFlag, setFlags, alias])

  useEffect(() => {
    if (flag) {
      const flagAlias = flag.slice(0, 1)
      if (window && window.history) {
        window.history.replaceState({ flag: flagAlias }, '', `/${flagAlias}`)
      }
    }
  }, [flag])

  useEffect(() => {
    if (location && flag) {
      const result = `${location.origin}/${flag.slice(0, 1)}${data && `/${data}`}`
      setPrintResult(result)
    }
  }, [location, flag, data, setPrintResult])

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast(null)
      }, toastDuration)
    }
  }, [toastDuration, toast, setToast])

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='mx-6 sm:mx-12 max-w-3xl overflow-hidden'>
        {location && flag && (
          <div className='flex flex-col-reverse sm:flex-row gap-5 text-sm'>
            <div className='flex flex-col gap-5 h-full'>
              <div className='p-4 h-full border border-outline rounded-xl'>
                <div className='flex flex-col gap-0.5'>
                  <header className='font-bold'>Flag</header>
                  <span className='text-on-background/45 text-xs font-extralight tracking-wide'>
                    Select the data format.
                  </span>
                  <div className='flex flex-col gap-1.5 mt-3'>
                    {flags.map((value, index) => (
                      <button
                        key={value}
                        className='px-2 py-1.5 not-disabled:hover:bg-outline/35 disabled:text-violet-400 border border-outline rounded-lg transition-colors duration-300 not-disabled:cursor-pointer select-none'
                        disabled={flag === value}
                        onClick={() => setFlag(value)}
                      >
                        <div className='flex justify-between'>
                          <span className='capitalize'>{value}</span>
                          <span className='flex items-center text-xs'>{fex[index]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className='p-4 h-full border border-outline rounded-xl'>
                <div className='flex flex-col items-start gap-0.5'>
                  <header className='font-bold'>Print</header>
                  <span className='text-on-background/45 text-xs font-extralight tracking-wide'>
                    Prints the result value.
                  </span>
                  <span className='bg-outline/15 text-on-background/45 text-xs font-extralight tracking-wide'>
                    Click the URL below to copy it to your clipboard.
                  </span>
                  <div className='flex flex-col gap-1.5 mt-3 w-full min-w-48'>
                    <div className='flex flex-row gap-1'>
                      <button
                        className='px-2 py-1.5 w-full min-w-40 max-w-64 border border-outline rounded-lg disabled:text-outline text-left truncate transition-colors duration-300 not-disabled:cursor-pointer select-none'
                        disabled={!data.length}
                        onClick={handlePrint}
                      >
                        <span
                          className='whitespace-normal overflow-auto'
                          style={{ overflowWrap: 'break-word' }}
                        >
                          {printResult}
                        </span>
                      </button>
                      <button
                        className='flex items-center justify-center p-1 my-auto not-disabled:cursor-pointer'
                        disabled={!data.length}
                        onClick={handlePrint}
                      >
                        <MousePointerClick width={20} height={20} />
                      </button>
                    </div>
                    {toast && (
                      <span className='flex justify-center text-violet-400 text-xs'>
                        {toast}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='p-4 h-full border border-outline rounded-xl'>
              <div className='flex flex-col gap-0.5'>
                <header className='font-bold'>Data</header>
                <span className='text-on-background/45 text-xs font-extralight tracking-wide'>
                  Enter the data you want to save to the clipboard.
                </span>
                <div className='mt-4 border border-outline rounded-lg'>
                  <textarea
                    placeholder={tip}
                    className='px-2 mt-1.5 w-full h-auto min-h-20 max-h-[calc(100dvh-32rem)] sm:max-h-[calc(100dvh-16rem)] focus-within:outline-0 resize-none select-none'
                    onChange={handleTextArea}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
