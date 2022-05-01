/**
 * - Notification Type
 */
export type NotifyType =
  | 'like'
  | 'upload'
  | 'follow'
  | 'mention'
  | 'comment'
  | 'bookmark'
  | 'upvote'
  | 'reply';

/**
 * - Solution Notification
 */
export interface SolutionNotify {
  solution_id: number;
  name: string;
}
/**
 * - User Notification
 */
export interface UserNotification {
  name: string;
  username: string;
  image: string;
}

/**
 * - Notification
 */
export interface Notification {
  notification_id: number;
  createdAt: string;
  user: UserNotification;
  type: NotifyType;
  solution?: SolutionNotify;
}

export const identifyNotification = (
  index: number,
  notification: Notification
) => notification.notification_id;
