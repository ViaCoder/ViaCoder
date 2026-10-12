// Complete original IDe subscription members, initialized on the existing Ink instance.
export function installNativeRenderSubscriptions287(owner){(function(){
this.frameListeners=new Set;;
this.subscribeFrames=(n)=>(this.frameListeners.add(n),()=>{this.frameListeners.delete(n)});;
this.tellFrameListeners=function tellFrameListeners(){for(let n of this.frameListeners)n()}.bind(this);
this.clickListeners=new Set;;
this.subscribeClicks=(n)=>(this.clickListeners.add(n),()=>{this.clickListeners.delete(n)});;
this.tellClickedNowhere=function tellClickedNowhere(){let n=[...this.clickListeners];queueMicrotask(()=>{for(let u of n)if(this.clickListeners.has(u))u(null,null)})}.bind(this);
this.hoverTrackedListeners=new Set;;
this.subscribeHoverTracked=(n)=>(this.hoverTrackedListeners.add(n),()=>{this.hoverTrackedListeners.delete(n)});;
this.isHoverTracked=()=>this.altScreenActive&&this.altScreenMouseTracking==="full";;
}).call(owner);}
