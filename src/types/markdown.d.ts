/** Bun's text loader imports bundled Markdown as UTF-8 strings. */
declare module '*.md' {
  const text: string
  export default text
}
