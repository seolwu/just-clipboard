import { Node } from './'

interface DataNodeProps {
  placeholder: string
  callback: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function DataNode({ placeholder, callback }: DataNodeProps) {
  return (
    <Node name='Data' description='Enter the data you want to save to the clipboard.'>
      <div className='mt-4 w-full border border-outline rounded-lg'>
        <textarea
          placeholder={placeholder}
          className='px-2 mt-1.5 w-full h-auto min-h-20 max-h-[calc(100dvh-32rem)] sm:max-h-[calc(100dvh-16rem)] focus-within:outline-0 resize-none select-none'
          onChange={callback}
        />
      </div>
    </Node>
  )
}