// Generated from the exact AJ/TJ/rJ raw schema expressions. No runtime import.
import type {PermissionUpdate} from '../../../entrypoints/sdk/coreTypes.js'
export type PreToolUseHookSpecificOutput={
hookEventName:"PreToolUse";
permissionDecision?:"allow" | "deny" | "ask" | "defer";
permissionDecisionReason?:string;
updatedInput?:Record<string,unknown>;
additionalContext?:string;
}

export type UserPromptSubmitHookSpecificOutput={
hookEventName:"UserPromptSubmit";
additionalContext?:string;
sessionTitle?:string;
suppressOriginalPrompt?:boolean;
}

export type UserPromptExpansionHookSpecificOutput={
hookEventName:"UserPromptExpansion";
additionalContext?:string;
suppressOriginalPrompt?:boolean;
}

export type SessionStartHookSpecificOutput={
hookEventName:"SessionStart";
additionalContext?:string;
initialUserMessage?:string;
sessionTitle?:string;
watchPaths?:Array<string>;
reloadSkills?:boolean;
}

export type SetupHookSpecificOutput={
hookEventName:"Setup";
additionalContext?:string;
}

export type PreModelSwitchHookSpecificOutput={
hookEventName:"PreModelSwitch";
permissionDecision?:"allow" | "deny" | "ask";
permissionDecisionReason?:string;
}

export type PostModelSwitchHookSpecificOutput={
hookEventName:"PostModelSwitch";
additionalContext?:string;
}

export type SubagentStartHookSpecificOutput={
hookEventName:"SubagentStart";
additionalContext?:string;
}

export type PostToolUseHookSpecificOutput={
hookEventName:"PostToolUse";
additionalContext?:string;
classifierContext?:string;
updatedToolOutput?:unknown;
updatedMCPToolOutput?:unknown;
}

export type PostToolUseFailureHookSpecificOutput={
hookEventName:"PostToolUseFailure";
additionalContext?:string;
}

export type PostToolBatchHookSpecificOutput={
hookEventName:"PostToolBatch";
additionalContext?:string;
}

export type StopHookSpecificOutput={
hookEventName:"Stop";
additionalContext?:string;
}

export type SubagentStopHookSpecificOutput={
hookEventName:"SubagentStop";
additionalContext?:string;
}

export type PermissionDeniedHookSpecificOutput={
hookEventName:"PermissionDenied";
retry?:boolean;
}

export type NotificationHookSpecificOutput={
hookEventName:"Notification";
additionalContext?:string;
}

export type PermissionRequestHookSpecificOutput={
hookEventName:"PermissionRequest";
decision:({
behavior:"allow";
updatedInput?:Record<string,unknown>;
updatedPermissions?:Array<PermissionUpdate>;
}) | ({
behavior:"deny";
message?:string;
interrupt?:boolean;
});
}

export type ElicitationHookSpecificOutput={
hookEventName:"Elicitation";
action?:"accept" | "decline" | "cancel";
content?:Record<string,unknown>;
}

export type ElicitationResultHookSpecificOutput={
hookEventName:"ElicitationResult";
action?:"accept" | "decline" | "cancel";
content?:Record<string,unknown>;
}

export type CwdChangedHookSpecificOutput={
hookEventName:"CwdChanged";
watchPaths?:Array<string>;
}

export type FileChangedHookSpecificOutput={
hookEventName:"FileChanged";
watchPaths?:Array<string>;
}

export type WorktreeCreateHookSpecificOutput={
hookEventName:"WorktreeCreate";
worktreePath:string;
}

export type MessageDisplayHookSpecificOutput={
hookEventName:"MessageDisplay";
displayContent?:string;
}

export type AsyncHookJSONOutput={async:true;asyncTimeout?:number}
export type SyncHookJSONOutput={
continue?:boolean;
suppressOutput?:boolean;
stopReason?:string;
decision?:"approve" | "block";
reason?:string;
systemMessage?:string;
terminalSequence?:string;
hookSpecificOutput?:PreToolUseHookSpecificOutput | UserPromptSubmitHookSpecificOutput | UserPromptExpansionHookSpecificOutput | SessionStartHookSpecificOutput | SetupHookSpecificOutput | PreModelSwitchHookSpecificOutput | PostModelSwitchHookSpecificOutput | SubagentStartHookSpecificOutput | PostToolUseHookSpecificOutput | PostToolUseFailureHookSpecificOutput | PostToolBatchHookSpecificOutput | StopHookSpecificOutput | SubagentStopHookSpecificOutput | PermissionDeniedHookSpecificOutput | NotificationHookSpecificOutput | PermissionRequestHookSpecificOutput | ElicitationHookSpecificOutput | ElicitationResultHookSpecificOutput | CwdChangedHookSpecificOutput | FileChangedHookSpecificOutput | WorktreeCreateHookSpecificOutput | MessageDisplayHookSpecificOutput;
}
export type HookJSONOutput=AsyncHookJSONOutput|SyncHookJSONOutput
