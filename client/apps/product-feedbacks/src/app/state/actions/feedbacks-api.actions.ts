import { createAction, props } from '@ngrx/store';
import { Comment, Feedback } from '../../shared/models';
import { UpdateCommentDTO, UpdateFeedbackDTO } from '../../shared/dto';

/**
 * - Load Single Feedback
 */
export const loadSingleFeedback = createAction(
  '[Feedbacks/API] Load Single Feedback',
  props<{ feedback: Feedback }>()
);

/**
 * - Load FeedBacks Success
 */
export const loadFeedbacksSuccess = createAction(
  '[Feedbacks/API] Load Feedbacks Success',
  props<{ feedbacks: Feedback[] }>()
);

/**
 * - Load FeedBacks Failure
 */
export const loadFeedbacksFailure = createAction(
  '[Feedbacks/API] Load Feedbacks Failure',
  props<{ error: string }>()
);

/**
 * - Create Feedback Success
 */
export const createFeedbackSuccess = createAction(
  '[Feedbacks/API] Create Feedbacks Success',
  props<{ feedback: Feedback }>()
);

/**
 * - Create Feedback Failure
 */
export const createFeedbackFailure = createAction(
  '[Feedbacks/API] Create Feedback Failure',
  props<{ error: string }>()
);

/**
 * - Upvote Feedback Success
 */
export const upvoteSuccess = createAction(
  '[Feedbacks/API] Upvote Success',
  props<{ feedback_id: number }>()
);

/**
 * - Upvote Feedback Failure
 */
export const upvoteFailure = createAction(
  '[Feedbacks/API] Upvote Failure',
  props<{ error: string }>()
);

/**
 * - Downvote Success
 */
export const downvoteSuccess = createAction(
  '[Feedbacks/API] Downvote Success',
  props<{ feedback_id: number }>()
);

/**
 * - Downvote Feedback Failure
 */
export const downvoteFailure = createAction(
  '[Feedbacks/API] Downvote Failure',
  props<{ error: string }>()
);

/**
 * - Delete Feedback Success
 */
export const deleteFeedbackSuccess = createAction(
  '[Feedbacks/API] Delete Feedback Success',
  props<{ feedback_id: number }>()
);

/**
 * - Delete Feedback Failure
 */
export const deleteFeedbackFailure = createAction(
  '[Feedbacks/API] Delete Feedback Failure',
  props<{ error: string }>()
);

/**
 * - Update Feedback Success
 */
export const updateFeedbackSuccess = createAction(
  '[Feedbacks/API] Update Feedback Success',
  props<{ updateFeedbackDTO: UpdateFeedbackDTO }>()
);

/**
 * - Update Feedback Failure
 */
export const updateFeedbackFailure = createAction(
  '[Feedbacks/API] Update Feedback Failure',
  props<{ error: string }>()
);

/**
 * - Add Comment Success
 */
export const addCommentSuccess = createAction(
  '[Feedbacks/API] Add Comment Success',
  props<{
    feedback_id: number;
    comment: Comment;
  }>()
);

/**
 * - Add Comment Failure
 */
export const addCommentFailure = createAction(
  '[Feedbacks/API] Add Comment Failure',
  props<{ error: string }>()
);

/**
 * - Load Comments Success
 */
export const loadCommentsSucess = createAction(
  '[Feedbacks/API] Load Comments Success',
  props<{ feedback_id: number; comments: Comment[] }>()
);

/**
 * - Load Comments Failures
 */
export const loadCommentsFailure = createAction(
  '[Feedbacks/API] Load Comments Failure',
  props<{ error: string }>()
);

/**
 * - Delete Comment Success
 */
export const deleteCommentsSucess = createAction(
  '[Feedbacks/API] Delete Comments Success',
  props<{ feedback_id: number; comment_id: number }>()
);

/**
 * - Delete Comment Failures
 */
export const deleteCommentsFailure = createAction(
  '[Feedbacks/API] Delete Comments Failure',
  props<{ error: string }>()
);

/**
 * - Update Comment Success
 */
export const updateCommentSuccess = createAction(
  '[Feedbacks/API] Update Comment Success',
  props<{ updateCommentDTO: UpdateCommentDTO }>()
);

/**
 * - Update Comment Failure
 */
export const updateCommentFailure = createAction(
  '[Feedbacks/API] Update Comment Failure',
  props<{ error: string }>()
);
