export function createOfficialSuggestionGate(host: {
  x: (key: string, fallback: boolean) => boolean
  d: (error: Error) => void
  te: (error: unknown) => Error
}): {
  getSuppressionReason(input: { paused: boolean; turnOrigin: () => string | undefined }): string | null
  getTurnOrigin(messages: readonly unknown[]): string | undefined
}
