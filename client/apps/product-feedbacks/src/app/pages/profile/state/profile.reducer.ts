import { AuthActions, AuthApiActions } from '@lbk/state/auth';
import { createFeature, createReducer, on } from '@ngrx/store';

const profileFeatureKey = 'profile';

export interface State {
  error: string;
  requestingVerifyEmail: boolean;
  updatingAccount: boolean;
}

export const initialState: State = {
  error: '',
  requestingVerifyEmail: false,
  updatingAccount: false,
};

export const profileFeature = createFeature({
  name: profileFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Request Verify Email
     */
    on(AuthActions.requestVerifyEmail, (state) => {
      return {
        ...state,
        requestingVerifyEmail: true,
      };
    }),

    /**
     * - Request Verify Email Success
     */
    on(AuthApiActions.requestVerifyEmailSuccess, (state) => ({
      ...state,
      requestingVerifyEmail: false,
    })),

    /**
     * - Request Verify Email Failure
     */
    on(AuthApiActions.requestVerifyEmailFailure, (state, { error }) => ({
      ...state,
      error,
      requestingVerifyEmail: false,
    })),

    /**
     * - Update Account
     */
    on(AuthActions.updateAccount, (state) => ({
      ...state,
      updatingAccount: true,
    })),

    /**
     * - Update Account Success
     */
    on(AuthApiActions.updateAccountSuccess, (state) => ({
      ...state,
      updatingAccount: false,
    })),

    /**
     * - Update Account Failure
     */
    on(AuthApiActions.updateAccountFailure, (state, { error }) => ({
      ...state,
      error,
      updatingAccount: false,
    }))
  ),
});
