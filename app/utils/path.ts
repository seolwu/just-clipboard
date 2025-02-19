export function parsePath(path: string, regex: RegExp) {
  const match = regex.exec(path)
  
  if (match) {
    const flag = match[1]
    const data = match[2]
    
    return [flag, data]
  } else {
    return []
  }
}
