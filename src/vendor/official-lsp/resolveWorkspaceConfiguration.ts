/** Official 2.1.283 chunk-wyjbafrm.js:FQo, with descriptive names only. */
export function resolveWorkspaceConfiguration(settings:unknown,section?:string):unknown {
  if(settings==null)return null
  if(section===undefined||section==='')return settings
  let value:unknown=settings
  for(const part of section.split('.')){
    if(value===null||typeof value!=='object'||!Object.prototype.hasOwnProperty.call(value,part))return null
    value=(value as Record<string,unknown>)[part]
  }
  return value??null
}
