import type { TsNode } from '../bashParser.js'
import type { ParsedCommandData } from '../parser.js'
import type { CommandSpec } from '../registry.js'
export interface BashAutocompleteParser287 { parse(source: string, timeoutMs?: number): TsNode | null }
export interface BashAutocompletePorts287 { cb(): BashAutocompleteParser287; fO(): boolean; ku(): boolean }
export interface BashAutocomplete287 { parseCommand(command: string): Promise<ParsedCommandData | null>; extractCommandArguments(commandNode: TsNode): string[]; loadFigSpec(command: string): Promise<CommandSpec | null> }
export declare function createBashAutocomplete287(ports: BashAutocompletePorts287): BashAutocomplete287
