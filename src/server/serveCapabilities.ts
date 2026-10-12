import { z } from 'zod/v4'
import {sharedEffortStateSchema,type SharedEffortState} from './sharedEffortState.js'
import { ModelInfoSchema, SlashCommandSchema } from '../entrypoints/sdk/coreSchemas.js'
import type { ModelInfo, SlashCommand } from '../entrypoints/sdk/coreTypes.recovered.js'
import type {AgentColorName} from '../tools/AgentTool/agentColorManager.js'
import {AGENT_COLORS} from '../tools/AgentTool/agentColorManager.js'

const commandsSchema = z.array(SlashCommandSchema())
const modelsSchema = z.array(ModelInfoSchema())

export type PublicServeCapabilities = {
  /** The actual headless worker's SDK initialize command projection. */
  commands: SlashCommand[]
  models: Array<Pick<ModelInfo,
    'value' | 'displayName' | 'description' | 'disabled' | 'supportsEffort' |
    'supportedEffortLevels' | 'supportsAdaptiveThinking' | 'supportsFastMode' | 'supportsAutoMode'>>
  sdkCapabilities: string[]
  tools: string[]
  outputStyle: string
  availableOutputStyles: string[]
  permissionModes?: {bypassPermissions:boolean;auto:boolean}
  permissionMode?: string
  currentModel?: string
  /** Owner-confirmed selection; may be an alias for currentModel. */
  currentModelChoice?: string
  effortState?: SharedEffortState
  agentColor?: AgentColorName | null
  /** SDK accepted a model override, but has not emitted its effective model. */
  modelPending?: string
  /** Local worker-only control extensions; never model/API capability claims. */
  localWeb?: { version: 1; controls: Array<'local_update_permission_rules' | 'local_get_session_title' |
    'local_public_diff' | 'local_public_doctor' | 'local_public_checkpoints' | 'local_public_tasks' | 'local_public_export' | 'local_public_branch' |
    'local_public_tag' | 'local_public_memory' | 'local_public_effort' | 'local_public_color' | 'local_public_config' | 'local_public_thinking'> }
}

function object(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null
}
function strings(value: unknown): string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string') ? value : []
}

export function projectPublicSystemInit(value: unknown): { capabilities: string[]; tools: string[]; currentModel?: string; permissionMode?: string } {
  const frame = object(value)
  return { capabilities: strings(frame?.capabilities), tools: strings(frame?.tools),
    ...(typeof frame?.model === 'string' && frame.model ? { currentModel: frame.model } : {}),
    ...(typeof frame?.permissionMode === 'string' &&
      ['default', 'plan', 'acceptEdits', 'dontAsk', 'bypassPermissions', 'auto'].includes(frame.permissionMode)
      ? { permissionMode: frame.permissionMode } : {}) }
}

/** Whitelist SDK init fields only; never copy account, auth source, paths or tokens. */
export function projectPublicCapabilities(responseValue: unknown, systemInitValue?: unknown): PublicServeCapabilities | null {
  const response = object(responseValue)
  if (!response) return null
  const commands = commandsSchema.safeParse(response.commands)
  const models = modelsSchema.safeParse(response.models)
  if (!commands.success || !models.success || typeof response.output_style !== 'string' ||
    !Array.isArray(response.available_output_styles) || !response.available_output_styles.every(item => typeof item === 'string')) return null
  const systemInit = object(systemInitValue)
  const localWeb = object(response.local_web)
  const permissionModes = object(localWeb?.permission_modes)
  const effort=sharedEffortStateSchema.safeParse(localWeb?.effort_state)
  const localWebControls = Array.isArray(localWeb?.controls) && localWeb.controls.every(control =>
    ['local_update_permission_rules', 'local_get_session_title', 'local_public_diff', 'local_public_doctor', 'local_public_checkpoints', 'local_public_tasks',
      'local_public_export', 'local_public_branch', 'local_public_tag', 'local_public_memory', 'local_public_effort', 'local_public_color', 'local_public_config', 'local_public_thinking'].includes(control))
    ? localWeb.controls as NonNullable<PublicServeCapabilities['localWeb']>['controls'] : null
  return {
    commands: commands.data,
    ...(localWeb?.version===1&&effort.success?{effortState:effort.data as SharedEffortState}:{}),
    ...(localWeb?.version===1&&(localWeb.agent_color===null||AGENT_COLORS.includes(localWeb.agent_color as AgentColorName))
      ? {agentColor:localWeb.agent_color as AgentColorName|null}:{}),
    ...(localWeb?.version === 1 && typeof permissionModes?.bypassPermissions === 'boolean' && typeof permissionModes?.auto === 'boolean'
      ? {permissionModes:{bypassPermissions:permissionModes.bypassPermissions,auto:permissionModes.auto}} : {}),
    models: models.data.map(model => ({
      value: model.value, displayName: model.displayName, description: model.description,
      ...(model.disabled !== undefined ? { disabled: model.disabled } : {}),
      ...(model.supportsEffort !== undefined ? { supportsEffort: model.supportsEffort } : {}),
      ...(model.supportedEffortLevels !== undefined ? { supportedEffortLevels: model.supportedEffortLevels } : {}),
      ...(model.supportsAdaptiveThinking !== undefined ? { supportsAdaptiveThinking: model.supportsAdaptiveThinking } : {}),
      ...(model.supportsFastMode !== undefined ? { supportsFastMode: model.supportsFastMode } : {}),
      ...(model.supportsAutoMode !== undefined ? { supportsAutoMode: model.supportsAutoMode } : {}),
    })),
    sdkCapabilities: strings(systemInit?.capabilities),
    tools: strings(systemInit?.tools),
    outputStyle: response.output_style,
    availableOutputStyles: response.available_output_styles as string[],
    ...(localWeb?.version === 1 && localWebControls ? { localWeb: { version: 1 as const, controls: localWebControls } } : {}),
    ...(localWeb?.version===1&&typeof localWeb.current_model_choice==='string'?{currentModelChoice:localWeb.current_model_choice}:{}),
    ...(localWeb?.version===1&&typeof localWeb.current_model==='string'?{currentModel:localWeb.current_model}:
      typeof systemInit?.currentModel === 'string' ? { currentModel: systemInit.currentModel } : {}),
    ...(typeof response.current_permission_mode === 'string' &&
      ['default', 'plan', 'acceptEdits', 'dontAsk', 'bypassPermissions', 'auto'].includes(response.current_permission_mode)
      ? { permissionMode: response.current_permission_mode } :
      typeof systemInit?.permissionMode === 'string' ? { permissionMode: systemInit.permissionMode } : {}),
  }
}

/** Project a real SDK commands_changed event; invalid catalogs stay unknown. */
export function projectChangedCommands(value: unknown): PublicServeCapabilities['commands'] | null {
  const parsed = commandsSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}
