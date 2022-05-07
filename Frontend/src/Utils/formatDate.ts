function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })
}

function formatDateWithYear(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export default { formatDate, formatDateWithYear }