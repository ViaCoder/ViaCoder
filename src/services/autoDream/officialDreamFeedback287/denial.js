// Complete original 2.1.287 classifier and constants; no policy state.
const g0e="Classifier unavailable";
const MCn="Auto mode unavailable \u2014 stopped after repeated responses with no safety verdict";
function i4e(e){if(e.behavior==="ask")return"user-rejected";let n=e.decisionReason;if(n.type==="classifier"&&n.classifier==="auto-mode"){if(n.reason===g0e||n.reason===MCn)return"automode-unavailable";if(n.noVerdict)return"automode-parsing-error";return"automode-blocked"}return"permission-rule"}
export const classifyDreamToolDenial287=i4e;
