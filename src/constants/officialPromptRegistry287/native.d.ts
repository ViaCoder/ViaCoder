export type PromptSectionCompute<T = string | null> = () => T | Promise<T>;
export interface PromptSectionDefinition<T = string | null> {
  name: string;
  compute: PromptSectionCompute<T>;
  cacheBreak: boolean;
}
export type PromptSectionRecord<T = string | null> = { id: string; text: T; scope: string };
export type PromptSectionResolverCallback<T = string | null> = (
  normalizedName: string,
  value: T,
  hookOrigin?: unknown,
) => T | Promise<T> | null | undefined;
export interface PromptSectionResolver287<T = string | null> {
  setPromptSectionResolver(callback: PromptSectionResolverCallback<T> | undefined): void;
  resolvePromptSection(normalizedName: string, value: T, hookOrigin?: unknown): T | Promise<T>;
  setPromptSectionInvalidator(callback: (() => void) | undefined): void;
  invalidatePromptSections(): void;
}
export interface PromptRegistry287Ports<T = string | null> {
  /** Current authoritative prompt assembly section map. */
  sections(): Map<string, T>;
  /** Authoritative state writer; invoked only if the captured epoch is still current. */
  recordSection(name: string, value: T): void;
  /** Current authoritative prompt-assembly epoch. */
  epoch(): unknown;
  /** The same authoritative resolver factory method used by the official public default. */
  resolvePromptSection(normalizedName: string, value: T, hookOrigin?: unknown): T | Promise<T>;
}
export interface PromptRegistry287<T = string | null> {
  defineSection(name: string, compute: PromptSectionCompute<T>): PromptSectionDefinition<T>;
  resolvePromptSections(sections: PromptSectionDefinition<T>[], options?: { isStored?: boolean; hookOrigin?: unknown }): Promise<Array<T | null>>;
  toScopedRecords(scope: string, pairs: Array<[string, T | null]>): PromptSectionRecord<T>[];
}
export function createPromptResolver287<T = string | null>(): PromptSectionResolver287<T>;
export function createPromptRegistry287<T = string | null>(ports: PromptRegistry287Ports<T>): PromptRegistry287<T>;
