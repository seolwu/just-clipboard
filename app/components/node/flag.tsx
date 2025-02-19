import { Node } from './'
import { type FlagData } from 'types/flag'

export interface FlagNodeProps {
  list: FlagData[]
  value: string
  callback: (value: FlagData) => void
}

export function FlagNode({ list, value, callback }: FlagNodeProps) {
  return (
    <Node name='Flag' description='Select the data format.'>
      <div className='flex flex-col gap-1.5 mt-3 w-full'>
        {list.map((flagData, index) => (
          <button
            key={index}
            className='px-2 py-1.5 not-disabled:hover:bg-outline/35 disabled:text-violet-400 border border-outline rounded-lg transition-colors duration-300 not-disabled:cursor-pointer select-none'
            disabled={value === flagData.name}
            onClick={() => callback(flagData)}
          >
            <div className='flex justify-between'>
              <span className='capitalize'>{flagData.name}</span>
              {flagData.expressions && (
                <span className='flex items-center text-xs'>{flagData.expressions}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </Node>
  )
}
