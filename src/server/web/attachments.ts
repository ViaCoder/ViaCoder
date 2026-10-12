import type { RemoteMessageContent } from '../../utils/teleport/api.js'

export type ImageAttachment = { name: string; mediaType: string; data: string }
const IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp'])
// The serve HTTP body is limited to 16 MiB; reserve space for JSON, text and
// base64 expansion rather than letting a selected image become an invalid turn.
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024

export async function readSupportedAttachment(file: File): Promise<ImageAttachment> {
  if (file.size > MAX_IMAGE_BYTES) throw new Error('单个附件不得超过 8 MiB')
  const bytes = new Uint8Array(await file.arrayBuffer())
  let binary = ''
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000))
  }
  return { name: file.name, mediaType: file.type || 'application/octet-stream', data: btoa(binary) }
}

export async function readImageAttachment(file: File): Promise<ImageAttachment> {
  if (!IMAGE_TYPES.has(file.type)) throw new Error('仅支持 PNG、JPEG、GIF 或 WebP 图片')
  return readSupportedAttachment(file)
}

export function composeTurnContent(text: string, images: ImageAttachment[]): RemoteMessageContent {
  if (!images.length) return text
  return [
    ...(text.trim() ? [{ type: 'text', text }] : []),
    ...images.map(image => ({ type: 'local_file', title: image.name, source: {
      type: 'base64', media_type: image.mediaType, data: image.data,
    } })),
  ]
}
