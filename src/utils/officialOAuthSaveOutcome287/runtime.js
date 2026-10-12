// Generated from the 2.1.287 native OAuth save outcome; see runtime.provenance.json.
const genericFailureMessage = "Couldn't save your login. Try logging in again.";
const macOSFailureMessage = "Couldn't save your login. If your Mac's keychain is locked, unlock it and log in again.";

class TelemetrySafeError287 extends Error{telemetryMessage;errorClass;constructor(n,e,t){super(n);this.name="TelemetrySafeError",this.telemetryMessage=e??n,this.errorClass=t}}
export class OAuthLoginStorageError287 extends TelemetrySafeError287{}

export function createOAuthSaveOutcome287({ process, clearTokenCache, fdToken, replaceFdToken, replaceBgSnapshot, environment, platform }) {
  return {
    apply(tokens, result) {
      const e = tokens;
      const s = result;
      const $C = clearTokenCache;
      const pz = fdToken;
      const FB = replaceFdToken;
      const Iwt = replaceBgSnapshot;
      const a = environment;
      const O = platform;
      const Mr = OAuthLoginStorageError287;
      const k = macOSFailureMessage;
      const T = genericFailureMessage;
      if($C(),process.env.CLAUDE_CODE_OAUTH_TOKEN)if(s.success)delete process.env.CLAUDE_CODE_OAUTH_TOKEN;else process.env.CLAUDE_CODE_OAUTH_TOKEN=e.accessToken;
      if(pz())FB(s.success?null:e.accessToken),Iwt(!1);
      if("transient"in s&&s.transient===!0&&!a.CLAUDE_CODE_OAUTH_TOKEN&&!pz())throw new Mr(O()==="macos"?k:T);
    },
  };
}
