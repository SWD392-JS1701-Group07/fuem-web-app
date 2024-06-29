import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date and time string into a specific format.
 *
 * @param {string} dateTimeString - The date and time string to format.
 * @param {'date' | 'time' | 'full' | 'simple'} format - The format to use for the output.
 * @return {string} The formatted date or time string.
 */
export const formatDateTime = (
  dateTimeString: string,
  format: 'date' | 'time' | 'full' | 'simple'
): string => {
  const dateObject = new Date(dateTimeString)

  switch (format) {
    case 'date':
      return dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'time':
      return dateObject.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
      })
    case 'full':
      return dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    case 'simple': {
      const day = String(dateObject.getDate()).padStart(2, '0')
      const month = String(dateObject.getMonth() + 1).padStart(2, '0')
      const year = dateObject.getFullYear()
      return `${day}/${month}/${year}`
    }
    default:
      throw new Error('Invalid format type')
  }
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength) + '...'
}
