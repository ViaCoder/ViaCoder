/** Type-only contracts recovered from AppStateStore/Tool and permissions.ts.
 * Functions retain their call signatures; object/array/tuple fields, maps and
 * sets are recursively readonly. Tasks are excluded by AppStateStore itself.
 * This reconstructs the documented contract, not an unavailable original file.
 */
export type DeepImmutable<T> =
  T extends (...args: never[]) => unknown ? T
    : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepImmutable<K>, DeepImmutable<V>>
      : T extends ReadonlySet<infer V> ? ReadonlySet<DeepImmutable<V>>
        : T extends object ? { readonly [K in keyof T]: DeepImmutable<T[K]> }
          : T

/** messageQueueManager uses this to require each non-editable mode once. */
export type Permutations<T, Choice = T> = [T] extends [never] ? []
  : Choice extends Choice ? [Choice, ...Permutations<Exclude<T, Choice>>] : never
