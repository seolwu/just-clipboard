import copy from 'clipboard-copy'
import { parsePath } from './path'

export function copyTo(data: string, regex: RegExp, postProcessing?: (flag: string, data: string) => string) {
  const [flag, clip] = parsePath(data, regex)

  if (postProcessing) {
    const postProcessed = postProcessing(flag, clip)
    copy(postProcessed)
  } else {
    copy(clip)
  }
}
