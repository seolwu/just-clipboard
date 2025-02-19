import { type FlagData, type Flags } from 'types/flag'

export const defaultFlags: Flags = {
  default: {
    name: 'default',
    alias: 'd',
    expressions: 'abc',
    transform(value) {
      return value
        .replaceAll('\n', ' ')
    },
  },
  escape: {
    name: 'escape',
    alias: 'e',
    expressions: 'a\\n',
    transform(value) {
      return value
        .replaceAll('\r', '&#13;')
        .replaceAll('\n', '&#10;')
    },
  }
}

export function getDefaultFlag() {
  const flag = Object.values(defaultFlags).filter(data => data.name === 'default')
  return flag.pop() ?? null
}

export function getFlagByAlias(alias: string): FlagData | null {
  const flag = Object.values(defaultFlags).filter(data => data.alias === alias)
  return flag.pop() ?? null
}
