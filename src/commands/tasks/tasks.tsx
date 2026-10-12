import * as React from 'react';
import type {LocalJSXCommandContext} from '../../commands.js';
import type {LocalJSXCommandOnDone} from '../../types/command.js';
import {BackgroundTasksDialog} from '../../components/tasks/BackgroundTasksDialog.js';
import {getOriginalTasksPublic287} from './officialJsx287/runtime.js';
// Accepted shared viewer C remains the existing wrapper; ordinary local/cloud
// calls retain complete original de and the existing canonical state owners.
export async function call(onDone:LocalJSXCommandOnDone,context:LocalJSXCommandContext):Promise<React.ReactNode>{
 if(context.commandRuntime?.sharedSession)return <BackgroundTasksDialog toolUseContext={context} onDone={onDone}/>;
 return (await getOriginalTasksPublic287()).call(onDone,context);
}
