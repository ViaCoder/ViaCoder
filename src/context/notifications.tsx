import type * as React from 'react';
import { nextOfficialNotification287, useOfficialNotifications287 } from './officialNotificationRuntime287/runtime.js';
import type { Theme } from '../utils/theme.js';
type Priority = 'low' | 'medium' | 'high' | 'immediate';
type BaseNotification = {
  key: string;
  /**
   * Keys of notifications that this notification invalidates.
   * If a notification is invalidated, it will be removed from the queue
   * and, if currently displayed, cleared immediately.
   */
  invalidates?: string[];
  priority: Priority;
  timeoutMs?: number;
  pinned?: boolean;
  wrap?: boolean;
  kind?: string;
  color?: keyof Theme;
  requeueOnPreempt?: boolean;
  heldDuringDiffPanel?: boolean;
  exemptFromDiffPanelHold?: boolean;
  /**
   * Combine notifications with the same key, like Array.reduce().
   * Called as fold(accumulator, incoming) when a notification with a matching
   * key already exists in the queue or is currently displayed.
   * Returns the merged notification (should carry fold forward for future merges).
   */
  fold?: (accumulator: Notification, incoming: Notification) => Notification;
};
type TextNotification = BaseNotification & {
  text: string;
  color?: keyof Theme;
};
type JSXNotification = BaseNotification & {
  jsx: React.ReactNode;
};
type AddNotificationFn = (content: Notification) => void;
type RemoveNotificationFn = (key: string) => void;
export type NotificationSegment = {
  text: string;
  color?: keyof Theme;
  dim?: boolean;
  bold?: boolean;
  url?: string;
};
type SegmentsNotification = BaseNotification & {segments: NotificationSegment[]};
export type Notification = TextNotification | JSXNotification | SegmentsNotification;

// The original hook, timers, hold/preemption/fold and pinned helpers all come
// from the same canonical module used by the mounted bridge's PZe caller.
export function useNotifications(): {
  addNotification: AddNotificationFn;
  removeNotification: RemoveNotificationFn;
  processQueue: () => void;
} {
  return useOfficialNotifications287();
}
export function getNext(queue: Notification[]): Notification | undefined {
  return nextOfficialNotification287(queue);
}
