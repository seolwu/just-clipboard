import { parsePath } from './path'

export function copyTo(data: string, regex: RegExp, postProcessing?: (flag: string, data: string) => string) {
  const [flag, clip] = parsePath(data, regex)

  if (postProcessing) {
    const postProcessed = postProcessing(flag, clip)
    toClipboard(postProcessed)
  } else {
    toClipboard(clip)
  }
}

export async function toClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext && document.hasFocus()) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.display = 'none'
    document.body.prepend(textarea)
    textarea.select()

    try {
      const success = document.execCommand('copy')
      return success
    } catch (err) {
      console.error(err)
      return false
    } finally {
      textarea.remove()
    }
  }
}
