import {record,str,num,bool,stringArray,pick,rows,type Row} from './publicResultPrimitives.js'

/** Same existing diff projection, without importing the server SDK host. */
export function projectPublicDiffResult(raw:unknown):Row|null {
  const value=record(raw)
  if(!value)return null
      if (bool(value.available) === undefined || value.stats !== null && !record(value.stats)) return null
      const stats = record(value.stats)
      const files = rows(value.files, row => {
        if (!str(row.path) || num(row.linesAdded) === undefined || num(row.linesRemoved) === undefined ||
          bool(row.isBinary) === undefined) return null
        const hunks = rows(row.hunks, hunk => {
          const lines = stringArray(hunk.lines)
          if (!lines || ['oldStart', 'oldLines', 'newStart', 'newLines'].some(key => num(hunk[key]) === undefined)) return null
          return { oldStart: hunk.oldStart, oldLines: hunk.oldLines, newStart: hunk.newStart,
            newLines: hunk.newLines, lines }
        })
        return hunks ? { path: row.path, linesAdded: row.linesAdded, linesRemoved: row.linesRemoved,
          isBinary: row.isBinary, ...pick(row, ['isUntracked', 'detailUnavailable'], bool), hunks } : null
      })
      return files && (!stats || ['filesCount', 'linesAdded', 'linesRemoved'].every(key => num(stats[key]) !== undefined))
        ? { available: value.available, stats: stats ? pick(stats, ['filesCount', 'linesAdded', 'linesRemoved'], num) : null, files } : null
}
