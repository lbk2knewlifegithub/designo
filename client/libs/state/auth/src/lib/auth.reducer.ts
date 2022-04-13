import { User } from '@lbk/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './actions';

const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  error: string;
  pending: boolean;
}

export const initialState: State = {
  user: null,
  error: '',
  pending: false,
};

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Me
     */
    on(
      AuthActions.me,
      AuthActions.changePassword,
      AuthActions.updateAccount,
      AuthActions.requestVerifyEmail,
      (state) => ({
        ...state,
        pending: true,
      })
    ),

    /**
     * - Change password success
     * - Delete account success
     * - Update Account success
     * - Request Verify Email Success
     */
    on(
      AuthApiActions.changePasswordSuccess,
      AuthApiActions.updateAccountSuccess,
      AuthApiActions.requestVerifyEmailSuccess,
      (state) => ({
        ...state,
        pending: false,
      })
    ),

    /**
     * - Login Failure
     * - Change password Failure
     * - Delete account Failure
     */
    on(
      AuthApiActions.loginFailure,
      AuthApiActions.changePasswordFailure,
      AuthApiActions.updateAccountFailure,
      AuthApiActions.requestVerifyEmailFailure,
      (state, { error }) => ({
        ...state,
        error,
        pending: false,
      })
    ),

    /**
     * - Logout
     */
    on(AuthActions.logout, (state) => ({
      ...state,
      user: null,
    })),
    /**
     * - Login Success
     */
    on(AuthApiActions.loginSuccess, (state, { user }) => ({
      ...state,
      user,
      pending: false,
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
        if (!state.user) return state;
        const { user } = state;

        return {
          ...state,
          user: {
            ...user,
            firstname,
            lastname,
            // verified: user.email === email,
            // email,
            avatar: avatar ? avatar : user.avatar,
          },
          pending: false,
        };
      }
    )
  ),
});
