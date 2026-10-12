export declare function createPolicyBooleanSource287(reader: (name: string, fallback: boolean) => unknown): {
  register(reader: ((name: string, fallback: boolean) => unknown) | null): ((name: string, fallback: boolean) => unknown) | null
  servedTrue(name: string): boolean
}
