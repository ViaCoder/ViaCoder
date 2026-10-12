// Official 2.1.283 functions, copied by read-module.mjs; see evidence.json.
function jg() { switch (process.env.CLAUDE_CODE_ENTRYPOINT) {
    case "claude-vscode": return "claude_code_vscode";
    case "remote":
    case "remote_baku":
    case "remote_cowork":
    case "remote_desktop":
    case "remote_mobile":
    case "remote_projects": return "claude_code_remote";
    case "claude-in-teams": return "claude_code_remote";
    case "sdk-cli":
    case "sdk-ts":
    case "sdk-py": return "claude_code_sdk";
    case "mcp": return "claude_code_mcp";
    case "claude-code-github-action": return "claude_code_github_action";
    case "local-agent": return "claude_code_local_agent";
    case "claude_in_slack": return "claude_in_slack";
    case "claude-in-slack": return "claude-in-slack";
    case "cli":
    default: return "claude_code_cli";
} }
function xe(e, n) { if (n.Cookie)
    delete e.Authorization; if (n.Authorization)
    delete e.Cookie, delete e["X-Organization-Uuid"]; }
export { jg as getClientPlatform, xe as reconcileCredentialHeaders };
