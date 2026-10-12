import { memoizeWithLRU } from '../memoize.js'
import specs from './specs/index.js'
import { bashAutocomplete287 } from './officialAutocomplete287/runtime.js'

export type CommandSpec = {
  name: string
  description?: string
  subcommands?: CommandSpec[]
  args?: Argument | Argument[]
  options?: Option[]
}

export type Argument = {
  name?: string
  description?: string
  isDangerous?: boolean
  isVariadic?: boolean // repeats infinitely e.g. echo hello world
  isOptional?: boolean
  isCommand?: boolean // wrapper commands e.g. timeout, sudo
  isModule?: string | boolean // for python -m and similar module args
  isScript?: boolean // script files e.g. node script.js
}

export type Option = {
  name: string | string[]
  description?: string
  args?: Argument | Argument[]
  isRequired?: boolean
}

export async function loadFigSpec(
  command: string,
): Promise<CommandSpec | null> {
  return bashAutocomplete287.loadFigSpec(command)
}
export const getCommandSpec = memoizeWithLRU(
  async (command: string): Promise<CommandSpec | null> => {
    const spec =
      specs.find(s => s.name === command) ||
      (await loadFigSpec(command)) ||
      null
    return spec
  },
  (command: string) => command,
)
