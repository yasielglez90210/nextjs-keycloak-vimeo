import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cryptr from 'cryptr'

/**
 * Combines multiple class values into a single string.
 *
 * @param inputs - The class values to be combined.
 * @returns The combined class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a pagination array based on the current page and total number of pages.
 *
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @returns An array representing the pagination.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}

/**
 * Encrypts a given text using a secret key.
 * @param text - The text to be encrypted.
 * @returns The encrypted string.
 */
export function encrypt(text: string) {
  const secretKey = process.env.NEXTAUTH_SECRET || ''
  const cryptr = new Cryptr(secretKey)
  const encryptedString = cryptr.encrypt(text)
  return encryptedString
}

/**
 * Decrypts an encrypted string using a secret key.
 *
 * @param encryptedString - The string to be decrypted.
 * @returns The decrypted string.
 */
export function decrypt(encryptedString: string) {
  const secretKey = process.env.NEXTAUTH_SECRET || ''
  const cryptr = new Cryptr(secretKey)
  const text = cryptr.decrypt(encryptedString)
  return text
}
