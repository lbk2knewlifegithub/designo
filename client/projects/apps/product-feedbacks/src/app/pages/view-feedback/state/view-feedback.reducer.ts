import { FeedbacksActions, FeedbacksApiActions } from '../../../state';
import { createFeature, createReducer, on } from '@ngrx/store';

const viewFeedbackPageFeatureKey = 'viewFeedbackPage';

export interface State {
  loadingComments: boolean;
  deletingComment: boolean;
  updatingComment: boolean;
}

export const initialState: State = {
  loadingComments: false,
  deletingComment: false,
  updatingComment: false,
};

export const viewFeedbackFeature = createFeature({
  name: viewFeedbackPageFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Load Comments
     */
    on(FeedbacksActions.loadComments, (state) => ({
      ...state,
      loadingComments: true,
    })),
    /**
     * - Load Comments Success
     */
    on(FeedbacksApiActions.loadCommentsSucess, (state) => ({
      ...state,
      loadingComments: false,
    })),

    /**
     * - Load Comments Failure
     */
    on(FeedbacksApiActions.loadCommentsFailure, (state) => ({
      ...state,
      loadingComments: false,
    })),

    /**
     * - Delete Comment
     */
    on(FeedbacksActions.deleteComment, (state) => ({
      ...state,
      deletingComment: true,
    })),

    /**
     * - Delete Comments Success
     */
    on(FeedbacksApiActions.deleteCommentsSucess, (state) => ({
      ...state,
      deletingComment: false,
    })),

    /**
     * - Delete Comments Failure
     */
    on(FeedbacksApiActions.deleteCommentsFailure, (state) => ({
      ...state,
      deletingComment: false,
    })),

    /**
     * - Update Comment
     */
    on(FeedbacksActions.updateComment, (state) => ({
      ...state,
      updatingComment: true,
    })),

    /**
     * - Update Comments Success
     */
    on(FeedbacksApiActions.updateCommentSuccess, (state) => ({
      ...state,
      updatingComment: false,
    })),

    /**
     * - Update Comments Failure
     */
    on(FeedbacksApiActions.updateCommentFailure, (state) => ({
      ...state,
      updatingComment: false,
    }))
  ),
});
