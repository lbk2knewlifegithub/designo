import { User } from '@lbk/models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions, UserAPIActions } from '../actions';

const userFeatureKey = 'user';

export interface State {
  user: User | null;
  error: string | null;
  pending: boolean;
  updatingProfile: boolean;
  updatingEmailSettings: boolean;
  alreadyTryLogin: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  pending: false,
  alreadyTryLogin: false,
  updatingProfile: false,
  updatingEmailSettings: false,
};

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer: createReducer(
    initialState,
    // Set pending to true
    on(
      UserActions.signup,
      UserActions.changePassword,
      UserActions.updateProfile,
      (state) => ({
        ...state,
        pending: true,
        updatingProfile: true,
      })
    ),

    // Set pending to false
    on(UserAPIActions.updateProfileSuccess, (state) => ({
      ...state,
      pending: false,
      updatingProfile: false,
    })),

    // Set pending to false
    on(UserAPIActions.updateAccountFailure, (state, { error }) => ({
      ...state,
      error,
      pending: false,
      updatingProfile: false,
    })),

    /**
     * - Logout
     * - Delete Account Success
     */
    on(UserActions.logout, UserAPIActions.deleteAccountSuccess, (state) => ({
      ...state,
      user: null,
      alreadyTryLogin: false,
    })),

    /**
     * - Logout
     * - Login Success
     * - Will Set Already Try Login To failed
     */
    on(UserActions.logout, (state) => ({
      ...state,
      alreadyTryLogin: false,
    })),

    /**
     * - Me Success
     */
    on(UserAPIActions.meSuccess, (state, { user }) => ({
      ...state,
      user,
      alreadyTryLogin: true,
    })),

    /**
     * - Me Failure
     */
    on(UserAPIActions.meFailure, (state, { error }) => ({
      ...state,
      error,
      alreadyTryLogin: true,
    })),

    /**
     * - Update account success
     */
    on(
      UserAPIActions.updateProfileSuccess,
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
    on(UserActions.setReturnUrl, (state, { returnUrl }) => ({
      ...state,
      returnUrl,
    })),
    /**
     * - Clear Error
     */
    on(UserActions.clearError, (state) => ({
      ...state,
      error: null,
    })),

    // Update Email Settings
    on(UserActions.updateEmailSettings, (state) => ({
      ...state,
      updatingEmailSettings: true,
    })),

    // Update Email Settings Success
    on(
      UserAPIActions.updateEmailSettingsSuccess,
      (state, { emailSettings }) => ({
        ...state,
        user: { ...state.user!, emailSettings },
        updatingEmailSettings: false,
      })
    ),
    // Update Email Settings Failure
    on(UserAPIActions.updateEmailSettingsFailure, (state) => ({
      ...state,
      updatingEmailSettings: false,
    }))
  ),
});
