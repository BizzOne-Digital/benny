import type { StorageAdapter } from './types'
import { LocalStorageAdapter } from './local'
import { VercelBlobStorageAdapter } from './vercel-blob'

/**
 * Legacy disk/blob adapters — prefer MongoDB uploads via POST /api/upload for admin images.
 */
export function getStorageAdapter(): StorageAdapter {
  if (process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV === 'production') {
    return new VercelBlobStorageAdapter()
  }

  return new LocalStorageAdapter()
}

export * from './types'
