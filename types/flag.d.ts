export type FlagData = {
  name: 'default' | 'escape' | string
  shortName: string
  expressions: string
  transform: (value: string) => string
  postProcessing?: (flag: string, data: string) => string
}

export type Flags = {
  [key: string]: FlagData
}
