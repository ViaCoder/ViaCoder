import type { DOMElement } from './dom.js'
import {createSelectorFocus287} from '../utils/model/officialModelPicker287/selector.native.js'
import {Event} from './events/event.js'

// The complete original zpr owns focus, history, autofocus fallbacks and
// subscriptions on the existing Ink root. Only the pre-existing local enabled
// gate is layered here; no mirrored focus stack or subscription owner.
const OriginalFocusManager287=createSelectorFocus287({Sze:Event}).zpr
export class FocusManager extends OriginalFocusManager287 {
  private enabled = true
  override focus(node:DOMElement):void {if(this.enabled)super.focus(node)}
  override focusDirection(direction:'up'|'down'|'left'|'right',root:DOMElement):boolean {
    return this.enabled?super.focusDirection(direction,root):false
  }
  override moveFocus(direction:1|-1,root:DOMElement):void {if(this.enabled)super.moveFocus(direction,root)}
  enable():void {this.enabled=true}
  disable():void {this.enabled=false}
}

/**
 * Walk up to root and return it. The root is the node that holds
 * the FocusManager — like browser's `node.getRootNode()`.
 */
export function getRootNode(node: DOMElement): DOMElement {
  let current: DOMElement | undefined = node
  while (current) {
    if (current.focusManager) return current
    current = current.parentNode
  }
  throw new Error('Node is not in a tree with a FocusManager')
}

/**
 * Walk up to root and return its FocusManager.
 * Like browser's `node.ownerDocument` — focus belongs to the root.
 */
export function getFocusManager(node: DOMElement): FocusManager {
  return getRootNode(node).focusManager!
}
