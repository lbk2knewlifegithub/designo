import { Comment } from './coment.model';
/**
 * - Feedback Status
 */
export enum FeedbackStatus {
  IN_PROGRESS = 'in-progress',
  PLANNED = 'planned',
  LIVE = 'live',
  SUGGESTION = 'suggestion',
}

/**
 * - Feedback Category
 */
export enum FeedbackCategory {
  UI = 'ui',
  UX = 'ux',
  Enhancement = 'enhancement',
  Feature = 'feature',
  Bug = 'bug',
}

/**
 * - Feedback Summary
 */
export interface FeedbackSummary {
  status: FeedbackStatus;
  color: string;
  description: string;
  feedbacks: Feedback[];
}

const DESCRIPTIONS: { [key: string]: string } = {
  [FeedbackStatus.IN_PROGRESS]: 'Currenly being developed',
  [FeedbackStatus.PLANNED]: 'Ideas prioritized for research',
  [FeedbackStatus.LIVE]: 'Released features',
};

const COLORS: { [key: string]: string } = {
  [FeedbackStatus.PLANNED]: 'warning',
  [FeedbackStatus.IN_PROGRESS]: 'accent',
  [FeedbackStatus.LIVE]: 'primary-200',
};

export const createSummaryFeedback = (
  status: FeedbackStatus,
  feedbacks: Feedback[]
): FeedbackSummary => ({
  status,
  description: DESCRIPTIONS[status],
  color: COLORS[status],
  feedbacks,
});

/**
 * - Feedback
 */
export interface Feedback {
  /**
   * - Id
   */
  feedback_id: number;

  /**
   * - User Id
   */
  user_id: number;

  /**
   * - Title
   */
  title: string;

  /**
   * - Category
   */
  category: FeedbackCategory;

  /**
   * - Upvote
   */
  upvotes: number;

  /**
   * - Upvoted
   */
  upvoted: boolean;

  /**
   * - Status
   */
  status: FeedbackStatus;

  /**
   * - Description
   */
  description: string;

  commentsLength: number;
  loadedComments: boolean | undefined;
  /**
   * - Comments
   */
  comments?: Comment[];
}

/**
 * - Identify Feedback
 * @param index
 * @param feedback
 */
export const identifyFeedback = (index: number, feedback: Feedback) => {
  return feedback.feedback_id;
};
