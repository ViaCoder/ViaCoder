export declare function f<T>(create: () => T): () => T
export declare const nQn: {lazy<T>(create: () => T): () => T; builtCount(): number; releaseBuiltSince(count: number): void; reset(): void}
