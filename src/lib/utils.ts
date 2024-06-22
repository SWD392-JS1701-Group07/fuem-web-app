import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date and time string into a specific format.
 *
 * @param {string} dateTimeString - The date and time string to format.
 * @param {'date' | 'time'} format - The format to use for the output. 
 *   'date' formats the string as a date, 'time' formats it as a time.
 * @return {string} The formatted date or time string.
 */
export const formatDateTime = (dateTimeString: string, format: 'date' | 'time'): string => {
  const dateObject = new Date(dateTimeString)
  if (format === 'date') {
    return dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } else {
    return dateObject.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    })
  }
}

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};