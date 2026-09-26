/* eslint-disable @next/next/no-img-element -- MongoDB upload URLs must use native img */
'use client'

import { useState } from 'react'
import { resolveImageSrc } from '@/lib/image-url'

type AdminImagePreviewProps = {
  src: string
  alt: string
  className?: string
  /** Bust cache after new upload */
  cacheKey?: number
}

/**
 * Reliable preview for admin uploads (native img for /api/uploads URLs).
 * so Next.js image optimization never returns a blank thumbnail.
 */
export default function AdminImagePreview({
  src,
  alt,
  className = 'w-full h-full object-cover',
  cacheKey = 0,
}: AdminImagePreviewProps) {
  const [failed, setFailed] = useState(false)
  const resolved = resolveImageSrc(src)

  if (!resolved || resolved === '/grain.svg' || failed) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-gray-400 p-2 text-center">
        {failed ? 'Preview failed — try re-upload' : 'No image'}
      </div>
    )
  }

  const href =
    resolved.startsWith('/api/uploads/') ? `${resolved}?v=${cacheKey}` : resolved

  return (
    <img
      src={href}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      onLoad={() => setFailed(false)}
    />
  )
}
