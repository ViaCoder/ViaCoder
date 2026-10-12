import type {PermissionMode} from '../../../types/permissions.js'
export function createPermissionModeCli287(InvalidArgumentError: new (message: string) => Error): {
  choices: string[]
  parse: (value: string) => string
  normalize: (value: string) => string
  find: (value: string) => PermissionMode | undefined
}
