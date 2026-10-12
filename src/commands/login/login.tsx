import * as React from 'react';
import type { LocalJSXCommandContext } from '../../commands.js';
import type { LocalJSXCommandOnDone } from '../../types/command.js';
import {adoptLoginContextC287,getLoginOuterSource287,type LoginProps287} from './outer287.js';
export async function call(onDone: LocalJSXCommandOnDone, context: LocalJSXCommandContext): Promise<React.ReactNode> {
  return getLoginOuterSource287().uos(onDone,adoptLoginContextC287(context));
}

export function Login(props:LoginProps287):React.ReactNode {
  const Component=getLoginOuterSource287().Nie;
  return <Component {...props}/>;
}


