import { type FlagData, type Flags } from 'types/flag'

export const availableFlags: Flags = {
  default: {
    name: 'default',
    shortName: 'd',
    expressions: 'abc',
    transform(value) {
      return value
        .replaceAll(/\s|\n/g, '%20')
    },
    postProcessing(_, data) {
      return decodeURIComponent(data)
    },
  },
  escape: {
    name: 'escape',
    shortName: 'e',
    expressions: 'a\\n',
    transform(value) {
      return value
        .replaceAll(/\r/g, '\\r')
        .replaceAll(/\n/g, '\\n')
    },
    postProcessing(_, data) {
      const encodeData = data
        .replaceAll(/\\r|\/r|&#13;/g, '%0A') // Carriage Return (\r)
        .replaceAll(/\\n|\/n|&#10;/g, '%0D') // Line Feed (\n)
      const decode = decodeURIComponent(encodeData)
  
      return decode
    },
  }
}

export function getDefaultFlag() {
  const flag = Object.values(availableFlags).filter(data => data.name === 'default')
  return flag.pop() ?? null
}

export function getFlagByName(name: string): FlagData | null {
  const flag = Object.values(availableFlags).filter(data => data.name.startsWith(name))
  return flag.pop() ?? null
}
