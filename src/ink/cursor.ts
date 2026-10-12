// Frame.cursor is produced by emptyFrame and renderer, and consumed by the
// terminal diff writer. Coordinates are terminal cells (zero-based).
export type Cursor = {
  x: number
  y: number
  visible: boolean
}
