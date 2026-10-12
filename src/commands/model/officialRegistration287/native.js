// Complete official 2.1.287 registration. Model owner/rendering remain caller-owned.
export function createModelCommandRegistration287({rt,As}){
var yWe={type:"local-jsx",name:"model",get description(){return`Set the AI model for Claude Code (currently ${As(rt())})`},argumentHint:"[model]",immediate:!0,requires:{ink:!0},thinClientDispatch:"control-request"};
return yWe;
}
