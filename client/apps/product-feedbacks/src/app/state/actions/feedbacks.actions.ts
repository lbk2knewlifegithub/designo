import {
  AddCommentDTO,
  CreateFeedbackDTO,
  UpdateCommentDTO,
  UpdateFeedbackDTO,
} from '../../shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Load FeedBacks
 */
export const loadFeedBacks = createAction('[Feedbacks] Load Feedbacks');

/**
 * - Reset
 */
export const reset = createAction('[Feedbacks] Reset');

/**
 * - Load Comments
 */
export const loadComments = createAction(
  '[Feedbacks] Load Comments',
  props<{ feedback_id: number }>()
);

/**
 * - Select Feedback
 */
export const selectFeedback = createAction(
  '[Feedbacks] Select Feedback',
  props<{ feedback_id: number | null }>()
);

/**
 * - Upvote feedback
 */
export const upvote = createAction(
  '[Feedbacks] Upvote Feedback',
  props<{ feedback_id: number }>()
);

/**
 * - Downvote feedback
 */
export const downvote = createAction(
  '[Feedbacks] Downvote Feedback',
  props<{ feedback_id: number }>()
);

/**
 * - Create Feedback
 */
export const createFeedback = createAction(
  '[Feedbacks] Create Feedback',
  props<{ createFeedbackDTO: CreateFeedbackDTO }>()
);

/**
 * - Delete Feedback by id
 */
export const deleteFeedback = createAction(
  '[Feedbacks] Delete Feedback',
  props<{ feedback_id: number }>()
);

/**
 * - Update Feedback
 */
export const updateFeedback = createAction(
  '[Feedbacks] Update Feedback',
  props<{ updateFeedbackDTO: UpdateFeedbackDTO }>()
);

/**
 * - Add comment to feedback
 */
export const addComment = createAction(
  '[Feedbacks] Add Comment',
  props<{ feedback_id: number; addCommentDTO: AddCommentDTO }>()
);

/**
 * - Delete comment
 */
export const deleteComment = createAction(
  '[Feedbacks] Delete Comment',
  props<{
    feedback_id: number;
    comment_id: number;
  }>()
);

/**
 * - Update Comment
 */
export const updateComment = createAction(
  '[Feedbacks] Update Comment',
  props<{
    updateCommentDTO: UpdateCommentDTO;
  }>()
);
