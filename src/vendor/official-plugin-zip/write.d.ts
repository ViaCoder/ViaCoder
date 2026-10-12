/** Narrow typed surface consumed by the plugin cache; implementation is the
 * complete, byte-identical official 2.1.283 ZIP writer module. */
export type ZipEntry = [Uint8Array, { os: number; attrs: number }]
export function zipSync(
  files: Record<string, ZipEntry>,
  options: { level: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 },
): Uint8Array
