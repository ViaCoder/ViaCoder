import 'react/compiler-runtime'

/**
 * React 19.2.4 exports c in both cjs/react-compiler-runtime.*.js files. Each
 * implementation delegates to dispatcher.useMemoCache(size). @types/react
 * intentionally omits this compiler-internal export from autocomplete.
 *
 * Reconciler 0.33.0 allocates Array(size), initially filled with
 * Symbol.for('react.memo_cache_sentinel'). Generated code then reads/writes
 * unrelated values in those slots: dependencies, callbacks, JSX, objects, etc.
 * Only the compiler knows the per-index types; size alone cannot encode them.
 * The intentional any below describes that low-level heterogeneous cache ABI,
 * not component props, application state, or a catch-all module declaration.
 */
declare module 'react/compiler-runtime' {
  export function c(size: number): Array<any>
}
