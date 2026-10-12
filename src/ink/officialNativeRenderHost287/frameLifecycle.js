// Complete original IDe members installed on the existing Ink owner.
export function installNativeFrameLifecycle287(owner,source){
const {pYt,DI,MI,Y0n,Ko}=source;
(function(){
this.keptForNextFrame="";this.leftAltScreenSinceFrame=!1;this._handoffRawMode=!1;
this.keepForNextFrame=function keepForNextFrame(n){if(this.leftAltScreenSinceFrame||this.isUnmounted)return!1;if(this.keptForNextFrame===""&&n!=="")setImmediate(this.writeKeptForNextFrame);return this.keptForNextFrame+=n,!0}.bind(this);
this.takeKeptForNextFrame=function takeKeptForNextFrame(){let n=this.keptForNextFrame;return this.keptForNextFrame="",n}.bind(this);
this.writeKeptForNextFrame=()=>{let n=this.takeKeptForNextFrame();if(n!==""&&!this.isUnmounted)pYt(this.terminal,n)};;
this.writeAfterKept=function writeAfterKept(n){if(this.keptForNextFrame!=="")this.keptForNextFrame+=n;else this.options.stdout.write(n)}.bind(this);
Object.defineProperty(this,"nativeCursorSeq",{configurable:true,get:function nativeCursorSeq(){if(this.accessibilityMode||this.isScreenReaderEnabled)return"";return this.nativeCursorVisible?DI:MI}});
this.handoffAltScreen=function handoffAltScreen(){this.isPaused=!0,this.altScreenActive=!1,this.endPointerCapture(),this.tellClickedNowhere(),this.modes.reset("altScreen"),this.modes.reset("surface")}.bind(this);
Object.defineProperty(this,"lastFrameFillsCurrentViewport",{configurable:true,get:function lastFrameFillsCurrentViewport(){let n=Y0n(this.options.stdout,this.warnGarbageWinsizeOnce);return this.frontFrame.screen.height>0&&Ko(this.frontFrame)&&this.frontFrame.viewport.height===n.rows&&this.frontFrame.viewport.width===n.cols}});
this.handoffRawMode=function handoffRawMode(){this._handoffRawMode=!0}.bind(this);
Object.defineProperty(this,"hasUnmounted",{configurable:true,get:function hasUnmounted(){return this.isUnmounted}});
}).call(owner);
}
