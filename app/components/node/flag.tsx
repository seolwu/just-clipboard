import { Node } from './'
import { Select, SelectProps } from '../Select'

interface FlagNodeProps extends SelectProps {}

export function FlagNode({ list, value, expression, callback }: FlagNodeProps) {
  return (
    <Node name='Flag' description='Select the data format.'>
      <div className='flex flex-col gap-1.5 mt-3 w-full'>
        <Select
          list={list}
          value={value}
          expression={expression}
          callback={callback}
        />
      </div>
    </Node>
  )
}