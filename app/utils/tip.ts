export function getTip(): string {
  const tips =  [
    'Please ensure the data is correct.',
    'Be careful when sharing sensitive information.',
    'Double-check your entry to avoid mistakes.',
    'Do not enter any personal or confidential information.',
    'Tip: Paste content from the input with Ctrl+V.',
    'Ensure your text is complete before sharing.',
    'Please enter valid information for accurate results.',
    'Saving large data might take time.',
    'Text formatting may not be preserved when sharing.',
  ]
  const index = Math.floor((Math.random() * (tips.length - 0)) + 0)
  return tips[index]
}
