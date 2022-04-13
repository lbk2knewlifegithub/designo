import { FeedbacksActions, FeedbacksApiActions } from '@lbk/state/feedbacks';
import { createFeature, createReducer, on } from '@ngrx/store';

const editFeedbackFeatureKey = 'editFeedbackFeatureKey';

export interface State {
  error: string;
  deletingFeedback: boolean;
  editingFeedback: boolean;
}

export const initialState: State = {
  error: '',
  editingFeedback: false,
  deletingFeedback: false,
};

export const editFeedbackFeature = createFeature({
  name: editFeedbackFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Delete Feedbacks
     */
    on(FeedbacksActions.deleteComment, (state) => ({
      ...state,
      deletingFeedback: true,
    })),
    /**
     * - Delete Feedbacks Success
     */
    on(FeedbacksApiActions.deleteCommentsSucess, (state) => ({
      ...state,
      deletingFeedback: false,
    })),
    /**
     * - Delete Feedbacks Failure
     */
    on(FeedbacksApiActions.deleteCommentsFailure, (state) => ({
      ...state,
      deletingFeedback: false,
    })),

    /**
     * - Edit Feedbacks
     */
    on(FeedbacksActions.updateFeedback, (state) => ({
      ...state,
      editingFeedback: true,
    })),
    /**
     * - Update Feedbacks Success
     */
    on(FeedbacksApiActions.updateFeedbackSuccess, (state) => ({
      ...state,
      editingFeedback: false,
    })),
    /**
     * - Update Feedbacks Failure
     */
    on(FeedbacksApiActions.deleteCommentsFailure, (state) => ({
      ...state,
      editingFeedback: false,
    }))
  ),
});
