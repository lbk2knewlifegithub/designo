import { User } from '@lbk/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './actions';

const authFeatureKey = 'auth';

export enum AuthError {
  InvalidCredentials = 'InvalidCredentials',
  Unauthorize = 'Unauthorize',
}

export interface State {
  user: User | null;
  error: AuthError | null;
  pending: boolean;
  updatingProfile: boolean;
  returnUrl: string | null;
  alreadyTryLogin: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  pending: false,
  returnUrl: null,
  alreadyTryLogin: false,
  updatingProfile: false,
};

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: createReducer(
    initialState,
    // Set pending to true
    on(
      AuthActions.login,
      AuthActions.signup,
      AuthActions.changePassword,
      AuthActions.updateProfile,
      (state) => ({
        ...state,
        pending: true,
        updatingProfile: true,
      })
    ),

    // Set pending to false
    on(AuthApiActions.updateAccountSuccess, (state) => ({
      ...state,
      pending: false,
      updatingProfile: false,
    })),

    // Set pending to false
    on(AuthApiActions.updateAccountFailure, (state, { error }) => ({
      ...state,
      error,
      pending: false,
      updatingProfile: false,
    })),

    /**
     * - Logout
     * - Delete Account Success
     */
    on(AuthActions.logout, AuthApiActions.deleteAccountSuccess, (state) => ({
      ...state,
      user: null,
      alreadyTryLogin: false,
    })),

    /**
     * - Logout
     * - Login Success
     * - Will Set Already Try Login To failed
     */
    on(AuthActions.logout, (state) => ({
      ...state,
      alreadyTryLogin: false,
    })),

    /**
     * - Me Success
     */
    on(AuthApiActions.meSuccess, (state, { user }) => ({
      ...state,
      user,
      alreadyTryLogin: true,
    })),

    /**
     * - Me Failure
     */
    on(AuthApiActions.meFailure, (state, { error }) => ({
      ...state,
      error,
      alreadyTryLogin: true,
    })),

    /**
     * - Update account success
     */
    on(
      AuthApiActions.updateAccountSuccess,
      (state, { updateUserDTO, avatar }) => {
        if (!state.user) return state;
        const { user } = state;

        return {
          ...state,
          user: {
            ...user,
            ...updateUserDTO,
            avatar: avatar ? avatar : user.avatar,
          },
          pending: false,
        };
      }
    ),
    /**
     * - Set returnUrl
     */
    on(AuthActions.setReturnUrl, (state, { returnUrl }) => ({
      ...state,
      returnUrl,
    })),
    /**
     * - Clear Error
     */
    on(AuthActions.clearError, (state) => ({
      ...state,
      error: null,
    }))
  ),
});
