import { type Flags } from 'types/flag'

export const defaultFlags: Flags[] = ['default', 'escape']
export const flagExpressions = ['abc', 'a\\n']

export function alias(name: string): Flags | null {
  for (let flag of defaultFlags) {
    if (flag.startsWith(name)) {
      return flag
    }
  }
  
  return null
}
