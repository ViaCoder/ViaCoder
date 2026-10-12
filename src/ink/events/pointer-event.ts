/** Terminal-cell pointer event. Coordinates are zero-based; local coordinates
 * are relative to the Box receiving the event. Pointer events do not bubble. */
export class PointerEvent {
  readonly type: 'down' | 'move' | 'up';
  readonly col: number;
  readonly row: number;
  readonly localCol: number;
  readonly localRow: number;
  readonly button?: number;
  readonly shift: boolean;
  readonly alt: boolean;
  readonly ctrl: boolean;

  constructor(kind: 'down' | 'move' | 'up', col: number, row: number,
    localCol: number, localRow: number, button: number | undefined, mods: number) {
    this.type = kind;
    this.col = col;
    this.row = row;
    this.localCol = localCol;
    this.localRow = localRow;
    this.button = button;
    this.shift = (mods & 4) !== 0;
    this.alt = (mods & 8) !== 0;
    this.ctrl = (mods & 16) !== 0;
  }
}
