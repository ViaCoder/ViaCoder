import stripAnsi from 'strip-ansi'
import { findToolByName, type Tools } from '../../Tool.js'
import type { RenderableMessage } from '../../types/message.js'
import { truncate } from '../../utils/truncate.js'
import { createFocusProjection } from './official.js'

const official=createFocusProjection({findTool:findToolByName,stripAnsi,truncate,
  artifactToolName:undefined,artifactIsPublish:undefined})

export function projectFocus(messages:RenderableMessage[],tools:Tools,isLoading=false):RenderableMessage[] {
  return official.project(messages,tools,undefined,isLoading) as RenderableMessage[]
}

export const hasFocusWork = official.hasWork as (messages: readonly unknown[])=>boolean

export function selectFocusMessages(messages:RenderableMessage[],tools:Tools,
  options:{enabled:boolean;fullscreen:boolean;transcript:boolean;isLoading?:boolean}):RenderableMessage[] {
  if(!options.enabled || !options.fullscreen || options.transcript)return messages
  return projectFocus(messages,tools,options.isLoading)
}
