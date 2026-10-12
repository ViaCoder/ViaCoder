import type { ReactNode, Ref } from 'react'
import type { Accessibility, DOMElement } from './dom.js'
import type { EventHandlerProps } from './events/event-handlers.js'
import type { Styles, TextStyles } from './styles.js'

// These are this renderer's host elements, not DOM elements. The properties
// are consumed by reconciler.applyProp and the corresponding Ink components.
type HostProps = EventHandlerProps & {
  children?: ReactNode
  ref?: Ref<DOMElement>
  style?: Styles
  tabIndex?: number
  autoFocus?: boolean
  accessibility?: Accessibility
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'ink-box': HostProps & { stickyScroll?: boolean }
      'ink-text': HostProps & { textStyles?: TextStyles }
      'ink-link': HostProps & { href: string }
      'ink-raw-ansi': {
        rawText: string
        rawWidth: number
        rawHeight: number
      }
    }
  }
}
