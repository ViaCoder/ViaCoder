/** Data contracts consumed by the existing notebook reader, editor and diff UI.
 * These declarations do not add a parser, validation or output conversion. */
export type NotebookCellType = 'code' | 'markdown' | 'raw'
type MultilineText = string | string[]

type MimeBundle = Record<string, unknown> & {'text/plain'?: MultilineText}

export type NotebookCellOutput =
  | {output_type: 'stream'; name: string; text: MultilineText}
  | {output_type: 'execute_result'; execution_count: number | null; data: MimeBundle; metadata: Record<string, unknown>}
  | {output_type: 'display_data'; data: MimeBundle; metadata: Record<string, unknown>}
  | {output_type: 'error'; ename: string; evalue: string; traceback: string[]}

export type NotebookCell = {
  id?: string
  cell_type: NotebookCellType
  source: MultilineText
  metadata: Record<string, unknown>
  execution_count?: number | null
  outputs?: NotebookCellOutput[]
  attachments?: Record<string, MimeBundle>
}

export type NotebookContent = {
  nbformat: number
  nbformat_minor: number
  metadata: Record<string, unknown> & {language_info?: {name?: string}}
  cells: NotebookCell[]
}

export type NotebookOutputImage = {
  image_data: string
  media_type: 'image/png' | 'image/jpeg'
}

export type NotebookCellSourceOutput = {
  output_type: NotebookCellOutput['output_type']
  text?: string
  image?: NotebookOutputImage
}

export type NotebookCellSource = {
  cellType: NotebookCellType
  source: string
  cell_id: string
  execution_count?: number
  language?: string
  outputs?: (NotebookCellSourceOutput | undefined)[]
}
