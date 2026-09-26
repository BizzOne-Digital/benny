const EXT_TO_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
}

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

/** Resolve image MIME from File (handles empty type on some Windows browsers). */
export function resolveImageMimeFromFile(file: File): string | null {
  if (file.type && ALLOWED.has(file.type)) {
    return file.type
  }
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  const mime = EXT_TO_MIME[ext]
  return mime && ALLOWED.has(mime) ? mime : null
}

export function isAllowedImageMime(mime: string): boolean {
  return ALLOWED.has(mime)
}
