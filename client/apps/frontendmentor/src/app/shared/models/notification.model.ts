export type NotificationType =
  | 'likes'
  | 'upload'
  | 'follow'
  | 'mention'
  | 'comment'
  | 'bookmark'
  | 'upvoted'
  | 'reply';

export interface SolutionNotification {
  solution_id: number;
  name: string;
}

export interface UserNotification {
  name: string;
  username: string;
  image: string;
}

export interface Notification {
  notification_id: number;
  createdAt: string;
  type: NotificationType;
}
