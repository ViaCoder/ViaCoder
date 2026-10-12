import React from 'react'

const imageTypes = new Set(['image/png','image/jpeg','image/gif','image/webp'])
export function AttachmentCard({name,source}:{name:string;source?:Record<string,unknown>|null}) {
  const image=source?.type==='base64'&&imageTypes.has(String(source.media_type))&&typeof source.data==='string'
  const extension=name.split('.').at(-1)?.toUpperCase()
  const badge=image?'图片':source?.media_type==='application/pdf'?'PDF':extension&&/^[A-Z0-9]{1,4}$/.test(extension)?extension:'文件'
  return <section className="attachment-card" aria-label={`附件：${name}`}>
    <div className="attachment-card-heading"><span className="attachment-kind" aria-hidden="true">{badge}</span><span className="attachment-name">{name}</span></div>
    {image&&<img className="attachment-preview" alt={name} src={`data:${source!.media_type};base64,${source!.data}`} loading="lazy" />}
  </section>
}
