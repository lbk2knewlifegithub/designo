import { User } from '@lbk/models';

/**
 * - User comment
 */
export type UserComment = Pick<User, 'id' | 'avatar' | 'name' | 'username'>;

/**
 * - Comment
 */
export interface Comment {
  /**
   * - Comment Id
   */
  comment_id: number;

  /**
   * - Full name
   */
  fullname: string;

  /**
   * - Comment Content
   */
  content: string;

  /**
   * - Parent Id
   */
  parent_id: number | null;

  /**
   * - User
   */
  user: UserComment;

  /**
   * - User name to reply
   */
  replyingTo?: string;

  /**
   * - Replies
   */
  replies?: Comment[];
}
