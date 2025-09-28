export type DocumentStatus = 'expired' | 'nearly' | 'valid' | 'none'

interface DocumentStatusResult {
  status: DocumentStatus
  daysLeft: number | null
}

export function getDocumentStatus(expiryDate: string | Date | null | undefined): DocumentStatusResult {
  if (!expiryDate) {
    return { status: 'none', daysLeft: null }
  }

  const date = expiryDate instanceof Date ? expiryDate : new Date(expiryDate)
  const today = new Date()

  const diffTime = date.setHours(0,0,0,0) - today.setHours(0,0,0,0)
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  let status: DocumentStatus = 'valid'
  if (daysLeft <= 0) {
    status = 'expired'
  } else if (daysLeft <= 15) {
    status = 'nearly'
  }

  return { status, daysLeft }
}
