/** The validation callback runs before each entry is copied or inflated. */
export function unzipValidatedEntries(
  data: Uint8Array,
  validate: (entry: {name: string; originalSize: number}) => void,
): Record<string, Uint8Array>
