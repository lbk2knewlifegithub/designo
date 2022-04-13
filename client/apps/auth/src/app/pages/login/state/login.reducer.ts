import { createFeature, createReducer, on } from '@ngrx/store';
import { LoginAPIActions, LoginPageActions } from './actions';

const loginFeatureKey = 'loginPage';

export enum LoginError {
  InvalidCredentials = 'InvalidCredentials',
}

export interface State {
  error: LoginError | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export const loginFeature = createFeature({
  name: loginFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Login
     */
    on(LoginPageActions.login, (state) => ({
      ...state,
      pending: true,
    })),

    /**
     * - Clear Error
     */
    on(LoginPageActions.clearError, (state) => ({
      ...state,
      error: null,
    })),

    /**
     * - Login Failure
     */
    on(LoginAPIActions.loginFailure, (state, { error }) => ({
      ...state,
      error,
      pending: false,
    }))
  ),
});
