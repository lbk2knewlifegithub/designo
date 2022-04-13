import { User } from '@lbk/models';
import { AuthActions, AuthApiActions } from '@lbk/state/auth';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './actions';

const profileFeatureKey = 'profile';

export interface State {
  error: string;
  requestingVerifyEmail: boolean;
  updatingAccount: boolean;
  user: User | null;
}

export const initialState: State = {
  error: '',
  requestingVerifyEmail: false,
  updatingAccount: false,
  user: null,
};

export const profileFeature = createFeature({
  name: profileFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Enter
     */
    on(ProfileActions.enter, (state, { user }) => {
      return {
        ...state,
        user,
      };
    }),
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
     * - Update account success
     */
    on(
      AuthApiActions.updateAccountSuccess,
      (
        state,
        {
          updateUserDTO: {
            firstname,
            lastname,
            // email
          },
          avatar,
        }
      ) => {
        console.log(firstname, lastname);

        if (!state.user) return state;
        const { user } = state;

        return {
          ...state,
          updatingAccount: false,
          user: {
            ...user,
            firstname,
            lastname,
            // verified: user.email === email,
            // email,
            avatar: avatar ? avatar : user.avatar,
          },
        };
      }
    ),

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
