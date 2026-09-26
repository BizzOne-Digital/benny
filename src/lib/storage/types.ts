export interface UploadResult {
  url: string
  key: string
  size: number
  width?: number
  height?: number
}

export interface StorageAdapter {
  upload(file: File, folder?: string): Promise<UploadResult>
  delete(key: string): Promise<void>
  getUrl(key: string): string
}
