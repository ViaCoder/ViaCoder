/** The literal execution phase is emitted only after a real turn_started. */
export function RecordStatus({status}:{status?:string}) {
  if (!status) return null
  return <p className="record-submission-status" role="status">
    <span>{status}</span>{status==='执行中' && <span className="record-execution-dots" aria-hidden="true"><i/><i/><i/></span>}
  </p>
}
