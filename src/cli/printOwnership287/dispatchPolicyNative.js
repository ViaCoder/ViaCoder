function tb(e){return e.mode==="poll-event"};
function hd(e){return e.shouldQuery===!1&&e.queryHeldForNextTurn!==!0||tb(e)||e.pollEmptyDispatch===!0||e.passive===!0};
export {hd as commandLacksUserIntent287};
