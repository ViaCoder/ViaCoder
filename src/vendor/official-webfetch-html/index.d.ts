export function createOfficialHTMLConverter(host: {
  t: (message: string, options: {level: 'error'}) => void
}): {convert: (html: string) => Promise<string>}
