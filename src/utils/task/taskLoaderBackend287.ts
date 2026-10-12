/** Borrow the already-loaded public MCP metadata implementation. This adapter
 * owns no cache, registry, task state, StorageV5 client or cleanup lifetime. */
export function deleteTaskMetadata287(
 taskId:string,storageV5?:unknown,sidecarSessionId?:string,sidecarProjectDir?:string,
):Promise<void> {
 const source=(import.meta.require('../../services/mcp/connectedProducer287.js') as typeof import('../../services/mcp/connectedProducer287.js')).getMcpConnectedProducer287().dynamicModules['chunk-dyg2mvj3.js']
 const remove=source?.c5
 if(typeof remove!=='function')throw Error('Original MCP c5 export absent')
 return remove(taskId,storageV5,sidecarSessionId,sidecarProjectDir) as Promise<void>
}
