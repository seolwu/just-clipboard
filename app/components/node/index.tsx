export { DataNode } from './data'
export { FlagNode } from './flag'
export { PrintNode } from './print'

interface NodeProps {
  name: React.ReactNode
  description?: React.ReactNode | React.ReactNode[]
  children?: React.ReactNode | React.ReactNode[]
}

export function Node({ name, description, children }: NodeProps) {
  return (
    <div className='flex flex-col items-start gap-0.5'>
      <header className='font-semibold'>{name}</header>
      <span className='text-on-background/45 text-xs font-normal tracking-wide'>
        {description}
      </span>
      {children}
    </div>
  )
}
