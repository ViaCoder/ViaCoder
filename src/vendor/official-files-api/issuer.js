// Official npm 2.1.283: complete unchanged declarations.
import {a} from './host.js';import {wo,y2t,_2t} from './slots.js';
function Ie(){if(wo()||y2t()||_2t())return"gateway";return a.CLAUDE_CODE_USE_BEDROCK?"bedrock":a.CLAUDE_CODE_USE_FOUNDRY?"foundry":a.CLAUDE_CODE_USE_ANTHROPIC_AWS?"anthropicAws":a.CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD?"anthropicGoogleCloud":a.CLAUDE_CODE_USE_MANTLE?"mantle":a.CLAUDE_CODE_USE_VERTEX?"vertex":"firstParty"}
export {Ie};
