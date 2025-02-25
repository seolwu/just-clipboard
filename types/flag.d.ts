export type FlagData = {
  name: 'plain' | 'escape' | string
  shortName: string
  expressions: string
  transform: (value: string) => string
  postProcessing?: (flag: string, data: string) => string
}

export type Flags = {
  [key: string]: FlagData
}
