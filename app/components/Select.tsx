export interface SelectProps {
  list: any[]
  value: any
  expression: any[]
  callback: (value: any) => void
}

export function Select({ list, value, expression, callback }: SelectProps) {
  return (<>
    {list.map((v, i) => (
      <button
        key={v}
        className='px-2 py-1.5 not-disabled:hover:bg-outline/35 disabled:text-violet-400 border border-outline rounded-lg transition-colors duration-300 not-disabled:cursor-pointer select-none'
        disabled={value === v}
        onClick={() => callback(v)}
      >
        <div className='flex justify-between'>
          <span className='capitalize'>{v}</span>
          <span className='flex items-center text-xs'>{expression[i]}</span>
        </div>
      </button>
    ))}
  </>)
}
