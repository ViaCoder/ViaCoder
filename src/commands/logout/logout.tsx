import * as React from 'react';
import { Text } from '../../ink.js';
import { gracefulShutdownSync } from '../../utils/gracefulShutdown.js';
import { getOriginalOAuthLifecycle287 } from '../../utils/officialOAuthLifecycle287/productionBinding.js';
import type { OAuthResetOptions287 } from '../../utils/officialOAuthLifecycle287/reset.js';
export async function performLogout(options: OAuthResetOptions287): Promise<void> {
  await getOriginalOAuthLifecycle287().reset.ite(options)
}

// Original rJt runs over the same active owners as install/reset. Existing
// callers keep the options-first API; optional storage is explicitly handed in.
export async function clearAuthRelatedCaches(options: OAuthResetOptions287 = {}): Promise<void> {
  await getOriginalOAuthLifecycle287().reset.rJt(options.storageV5, options)
}
import type {LocalJSXCommandContext,LocalJSXCommandOnDone} from '../../types/command.js';
import {jsx} from 'react/jsx-runtime';
import {logEvent} from '../../services/analytics/index.js';
import {createLogoutCommand287} from './official287/native.js';
const logoutCommand287=createLogoutCommand287({
 Pt:()=>getOriginalOAuthLifecycle287().resetPorts.Pt(),n:Text,cs:gracefulShutdownSync,
 // Retain the already-established telemetry-C binding from OAuth startup host.
 z_e:data=>logEvent('tengu_auth_action',data as never),ite:performLogout,e:jsx,
});
export async function call(onDone:LocalJSXCommandOnDone,context:LocalJSXCommandContext):Promise<React.ReactNode>{
 return logoutCommand287.call(onDone,context);
}
