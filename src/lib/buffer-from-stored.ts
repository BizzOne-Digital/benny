/**
 * Normalize MongoDB / Mongoose binary fields to a Node Buffer for HTTP responses.
 */
export function bufferFromStored(data: unknown): Buffer | null {
  if (data == null) return null
  if (Buffer.isBuffer(data)) return data
  if (data instanceof Uint8Array) return Buffer.from(data)

  if (typeof data === 'object') {
    const record = data as Record<string, unknown>
    if (record._bsontype === 'Binary') {
      if (typeof (record as { read?: (p: number, l: number) => Buffer }).read === 'function') {
        const bin = record as { read: (p: number, l: number) => Buffer; length: () => number }
        return Buffer.from(bin.read(0, bin.length()))
      }
      if (record.buffer) {
        return Buffer.from(record.buffer as Uint8Array)
      }
    }
    if (record.type === 'Buffer' && Array.isArray(record.data)) {
      return Buffer.from(record.data as number[])
    }
    if ('buffer' in record && record.buffer) {
      return Buffer.from(record.buffer as Uint8Array)
    }
  }

  return null
}
