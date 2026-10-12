import memoize from 'lodash-es/memoize.js'
import type { HookEvent } from 'src/entrypoints/agentSdkTypes.js'
import { getRegisteredHooks } from '../../bootstrap/state.js'
import {getFeatureValue_CACHED_MAY_BE_STALE} from '../../services/analytics/growthbook.js'
import {HOOK_EVENTS} from './officialHookOutput287/events.js'
import {createOfficialHookMenu287,type HookMenuGroups287} from './officialHookMenu287/native.js'
import type { AppState } from '../../state/AppState.js'
import {
  getAllHooks,
  type IndividualHookConfig,
  sortMatchersByPriority,
} from './hooksSettings.js'

export type MatcherMetadata = {
  fieldToMatch: string
  values: string[]
}

export type HookEventMetadata = {
  summary: string
  description: string
  matcherMetadata?: MatcherMetadata
}

// Reuse the original metadata/grouping functions and the existing owners.
const menu287=createOfficialHookMenu287({
  Ag:HOOK_EVENTS,S$:getRegisteredHooks,qHo:getAllHooks,KHo:sortMatchersByPriority,
  re:{reader:getFeatureValue_CACHED_MAY_BE_STALE},
})

// Preserve the existing local render-cache optimization; source metadata itself
// still defines every registerable event and matcher unchanged.
export const getHookEventMetadata=memoize(
  menu287.metadata,
  (toolNames:string[])=>toolNames.slice().sort().join(','),
)

export function groupHooksByEventAndMatcher(
  appState:AppState,toolNames:string[],
):HookMenuGroups287{return menu287.group(appState,toolNames)}

export function getSortedMatchersForEvent(
  hooksByEventAndMatcher:HookMenuGroups287,event:HookEvent,
):string[]{return menu287.sortedMatchers(hooksByEventAndMatcher,event)}

export function getHooksForMatcher(
  hooksByEventAndMatcher:HookMenuGroups287,event:HookEvent,matcher:string|null,
):IndividualHookConfig[]{return menu287.forMatcher(hooksByEventAndMatcher,event,matcher)}

// Get metadata for a specific event's matcher
export function getMatcherMetadata(
  event: HookEvent,
  toolNames: string[],
): MatcherMetadata | undefined {
  return getHookEventMetadata(toolNames)[event].matcherMetadata
}
