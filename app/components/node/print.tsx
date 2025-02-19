import { useCallback, useEffect, useState } from 'react'
import { Node } from './'
import MousePointerClick from '../MousePointerClick'

interface PrintNodeProps {
  result: string | undefined
  disabled: boolean
  callback: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void
}

export function PrintNode({ result, disabled, callback }: PrintNodeProps) {
  const alertDuration = 1500
  const [alertVisible, setAlertVisible] = useState<boolean>(false)

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
    callback(event)
    setAlertVisible(true)
  }, [callback, setAlertVisible])

  useEffect(() => {
    if (alertVisible) {
      setTimeout(() => {
        setAlertVisible(false)
      }, alertDuration)
    }
  }, [alertDuration, alertVisible, setAlertVisible])
  
  return (
    <Node name='Print'
      description={
        <div className='flex flex-col'>
          Prints the result value.
          <span className='bg-outline/25'>
            Click the URL below to copy it to your clipboard.
          </span>
        </div>
      }
    >
      <div className='flex flex-col gap-1.5 mt-3 w-full min-w-48'>
        <div className='flex flex-row gap-1'>
          <button
            className='px-2 py-1.5 w-full min-w-40 max-w-64 border border-outline rounded-lg disabled:text-outline text-left truncate transition-colors duration-300 not-disabled:cursor-pointer select-none'
            disabled={disabled}
            onClick={handleClick}
          >
            <span
              className='whitespace-normal overflow-auto'
              style={{ overflowWrap: 'break-word' }}
            >
              {result}
            </span>
          </button>
          <button
            className='flex items-center justify-center p-1 mt-0.5 mb-auto not-disabled:cursor-pointer'
            disabled={disabled}
            onClick={handleClick}
          >
            <MousePointerClick width={20} height={20} />
          </button>
        </div>
        {alertVisible && (
          <span className='flex justify-center text-primary text-xs'>
            Successfully copied to clipboard!
          </span>
        )}
      </div>
    </Node>
  )
}