type StringOfLength<S extends string, L extends number> = Length<S> extends L ? S : StringLengthError_ExpectedLength<L>
type StringLengthError_ExpectedLength<L extends number> = { string_length_must_be: L }

export type FlagData = {
  name: 'default' | 'escape' | string
  alias: StringOfLength<string, 1>
  expressions: string
  transform: (value: string) => string
}

export type Flags = {
  [key: string]: FlagData
}
