import {APIError, APIConnectionError, AuthenticationError, NotFoundError} from '@anthropic-ai/sdk'
import {catalog} from '../../../vendor/official-model-catalog/catalog.js'
import {getCatalogEntry} from '../catalog.js'
import {CANONICAL_ID_TO_KEY} from '../configs.js'
import {getModelStrings} from '../modelStrings.js'
import {saveGlobalConfig} from '../../config.js'
import {logError} from '../../log.js'
import {logForDebugging} from '../../debug.js'
import {sideQuery, type SideQueryOptions} from '../../sideQuery.js'
import {getOfficialModelMenuPolicy287, createOfficialModelMenuPorts287, getOfficialModelPickerProviderOwner287, getOfficialModelReprobeRuntime287} from '../officialModelPicker287.js'
import {createModelMenuValidation287, createModelMenuValidationErrors287, createModelMenuValidationText287,
  createModelMenuValidationTimer287, createModelMenuValidationHosts287, createModelMenuValidationFallback287,
  createModelMenuValidationGate287} from './native.js'

const text = createModelMenuValidationText287({})
const timer = createModelMenuValidationTimer287({})
const hosts = createModelMenuValidationHosts287({})
const errors = createModelMenuValidationErrors287({...text, xt: APIError})
const fallback = createModelMenuValidationFallback287({
  Gj: () => catalog, xa: getCatalogEntry, OU: CANONICAL_ID_TO_KEY,
  RS: getModelStrings, od: () => (createOfficialModelMenuPorts287().od as () => boolean)(),
  a: process.env,
})
export function createOfficialModelValidationPorts287(): Record<string, unknown> {
  const menu = createOfficialModelMenuPorts287(), policy = getOfficialModelMenuPolicy287()
  return {...menu, ...policy, ...text, ...timer, ...hosts, ...errors, ...fallback,
    ...createModelMenuValidationGate287(menu),
    Xr: getOfficialModelPickerProviderOwner287,
    Kjt: 600_000,
    xt: APIError, Jd: APIConnectionError, rHe: AuthenticationError, oHe: NotFoundError,
    d: logError, t: logForDebugging,
    // The public local caller uses the existing credential selector. A supplied
    // private credential handle is not silently dropped or reinterpreted.
    t2: (input: SideQueryOptions & {credentials?: unknown; timeout?: number}) => {
      if (input.credentials !== undefined) throw new Error('Explicit model-validation credential handle requires its original query caller')
      return sideQuery({...input, signal: input.signal ?? (input.timeout === undefined ? undefined : AbortSignal.timeout(input.timeout))})
    },
    Ae: (updater: Parameters<typeof saveGlobalConfig>[0], storage?: Parameters<typeof saveGlobalConfig>[1]) => saveGlobalConfig(updater, storage),
    wte: (storage?: unknown, credentials?: unknown) => {
      if (storage !== undefined || credentials !== undefined) throw new Error('Explicit bootstrap context requires its original refresh caller')
      return import('../../../services/api/bootstrap.js').then(module => module.fetchBootstrapData())
    },
    // The local /model command is registered for interactive and print callers;
    // private launch lanes with no command UI are outside this facade.
    i8: () => '/model',
  }
}
let validation: ReturnType<typeof createModelMenuValidation287> | undefined
export function getOfficialModelValidation287() {
  if (!validation) {
    validation = createModelMenuValidation287(createOfficialModelValidationPorts287())
    // Register a lazy query into the same original sessionModelDenyReprobe.
    // Merely importing/opening the menu never sends a model query.
  }
  getOfficialModelReprobeRuntime287().jVo(model => validation!.Jae(model))
  return validation
}
export function clearOfficialValidatedModels287(): void {
  getOfficialModelPickerProviderOwner287().providerCache.validatedModels.clear()
}
