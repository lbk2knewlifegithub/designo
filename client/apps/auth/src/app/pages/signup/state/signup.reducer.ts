import { createFeature, createReducer, on } from '@ngrx/store';
import { SignUpAPIActions, SignUpPageActions } from './actions';

const signUpFeatureKey = 'home';

export interface State {
  error: string;
  pending: boolean;
}

export const initialState: State = {
  error: '',
  pending: false,
};

export const signUpFeature = createFeature({
  name: signUpFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Sign Up
     */
    on(SignUpPageActions.signUp, (state) => ({
      ...state,
      pending: true,
    })),

    /**
     * - Sign Up Failure
     */
    on(SignUpAPIActions.signUpFailure, (state, { error }) => ({
      ...state,
      error,
      pending: false,
    }))
  ),
});
