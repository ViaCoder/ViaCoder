import React, { type Ref } from 'react';
import type { Except } from 'type-fest';
import type { DOMElement } from '../dom.js';
import type { Styles } from '../styles.js';
type ButtonState = {
  focused: boolean;
  hovered: boolean;
  active: boolean;
};
export type Props = Except<Styles, 'textWrap'> & {
  ref?: Ref<DOMElement>;
  /**
   * Called when the button is activated via Enter, Space, or click.
   */
  onAction: () => void;
  /**
   * Tab order index. Defaults to 0 (in tab order).
   * Set to -1 for programmatically focusable only.
   */
  tabIndex?: number;
  /**
   * Focus this button when it mounts.
   */
  autoFocus?: boolean;
  /** Ignore accidental clicks shortly after mount (official default: 300 ms). */
  mountSettleMs?: number;
  /**
   * Render prop receiving the interactive state. Use this to
   * style children based on focus/hover/active — Button itself
   * is intentionally unstyled.
   *
   * If not provided, children render as-is (no state-dependent styling).
   */
  children: ((state: ButtonState) => React.ReactNode) | React.ReactNode;
};
/** Public Ink ABI over the already-selected original Ve/nn namespace.
 * Resolve on render (not barrel import) to avoid boot/config import cycles.
 * The original uses the actual root ClockContext and Ink DOM, including stray
 * activation/mount clicks and cancellable active-state timers. No second state.
 */
function Button(props: Props): React.ReactNode {
  const native = (import.meta.require('../../utils/hooks/modelSwitch287/lifecycleRuntime.js') as typeof import('../../utils/hooks/modelSwitch287/lifecycleRuntime.js'))
    .getOriginalModsLifecycle287().clearSourceModule287('chunk-jkt292h5.js');
  const OriginalButton = native.Ve as React.ComponentType<Props>;
  return <OriginalButton {...props}/>;
}
export default Button;
export type { ButtonState };
