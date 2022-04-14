import { User } from '@lbk/models';
import { AuthActions, AuthApiActions } from '@lbk/auth';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProfileActions } from './actions';

const profileFeatureKey = 'profile';

export interface State {
  error: string;
  pending: boolean;
  user: User | null;
}

export const initialState: State = {
  error: '',
  pending: false,
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
     * - Update Account
     */
    on(AuthActions.updateAccount, (state) => ({
      ...state,
      pending: true,
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
          pending: false,
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
      pending: false,
    }))
  ),
});
