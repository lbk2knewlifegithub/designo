import { FeedbacksActions, FeedbacksApiActions } from '@lbk/state/feedbacks';
import { createFeature, createReducer, on } from '@ngrx/store';

const createFeedbackFeatureKey = 'createFeedbackPage';

export interface State {
  creating: boolean;
  error: string;
}

export const initialState: State = {
  creating: false,
  error: '',
};

export const createFeedbackFeature = createFeature({
  name: createFeedbackFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Create Feedback
     */
    on(FeedbacksActions.createFeedback, (state) => ({
      ...state,
      creating: true,
    })),

    /**
     * - Create Feedback  Success
     */
    on(FeedbacksApiActions.createFeedbackSuccess, (state) => ({
      ...state,
      creating: false,
    })),

    /**
     * - Create Feedback  Failure
     */
    on(FeedbacksApiActions.createFeedbackFailure, (state, { error }) => ({
      ...state,
      creating: false,
      error,
    }))
  ),
});
