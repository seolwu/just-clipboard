import { Theme } from 'remix-themes'

import { LoaderType } from 'types/loader'

export interface ThemeLoader extends LoaderType { theme: Theme | null }
