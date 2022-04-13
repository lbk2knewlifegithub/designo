import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '@lbk/state/auth';

const verifyEmailFeatureKey = 'verifyEmail';

export interface State {
  error: string;
  loading: boolean;
}

export const initialState: State = {
  error: '',
  loading: false,
};

export const verifyEmailFeature = createFeature({
  name: verifyEmailFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Verify Email
     */
    on(AuthActions.verifyEmail, (state) => ({
      ...state,
      loading: true,
      error: '',
    })),

    /**
     * - Verify Email Success
     */
    on(AuthApiActions.verifyEmailSuccess, (state) => ({
      ...state,
      loading: false,
      error: '',
    })),

    /**
     * - Verify Email Failure
     */
    on(AuthApiActions.verifyEmailFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});
