import { FeedbackStatus } from '@lbk/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFeedbacks from './reducers/feedbacks.reducer';

/**
 * - Select Feedback Entities State
 */
export const selectFeedbacksEntitiesState =
  createFeatureSelector<fromFeedbacks.State>(fromFeedbacks.feedbacksFeatureKey);

/**
 * - Select Feedback Selected Id
 */
export const selectSelectedFeedbackId = createSelector(
  selectFeedbacksEntitiesState,
  fromFeedbacks.getId
);

export const {
  selectIds: selectFeedbacksIds,
  selectEntities: selectFeedbacksEntities,
  selectAll: selectAllFeedbacks,
} = fromFeedbacks.adapter.getSelectors(selectFeedbacksEntitiesState);

/**
 *  - Select  Feedback Selected
 */
export const selectSelectedFeedback = createSelector(
  selectFeedbacksEntities,
  selectSelectedFeedbackId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 *  - Select Loaded
 */
export const selectLoaded = createSelector(
  selectFeedbacksEntitiesState,
  fromFeedbacks.getLoaded
);

/**
 *  - Select Feedback Planned
 */

/**
 *  - Select Feedback In-Progress
 */
export const selectFeedbacksProgress = createSelector(
  selectAllFeedbacks,
  (feedbacks) =>
    feedbacks.filter((f) => f.status === FeedbackStatus.IN_PROGRESS)
);
/**
 *  - Select Feedback Live
 */
export const selectFeedbacksLive = createSelector(
  selectAllFeedbacks,
  (feedbacks) => feedbacks.filter((f) => f.status === FeedbackStatus.LIVE)
);
