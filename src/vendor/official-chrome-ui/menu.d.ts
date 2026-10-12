import type {ReactNode} from 'react'
import type {ConnectedMCPServer} from '../../services/mcp/types.js'
export type ChromeMenuProps = {
  onDone:(result?:string)=>void
  isExtensionInstalled:boolean
  configEnabled:boolean|undefined
  isClaudeAISubscriber:boolean
  isWSL:boolean
}
export function ChromeMenu(props:ChromeMenuProps):ReactNode
export function BrowserPicker(props:{chromeClient:ConnectedMCPServer;onDone:(result?:string)=>void}):ReactNode
export function call(onDone:(result?:string)=>void):Promise<ReactNode>
