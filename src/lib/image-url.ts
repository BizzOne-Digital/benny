/** Shown when image URL is missing or legacy disk path is unavailable in production */
export const IMAGE_PLACEHOLDER = '/grain.svg'

export function resolveImageSrc(url: string | undefined | null): string {
  if (!url) return IMAGE_PLACEHOLDER
  if (url.startsWith('/uploads/')) return IMAGE_PLACEHOLDER
  return url
}

export function isApiUploadImage(url: string): boolean {
  return url.startsWith('/api/uploads/')
}
