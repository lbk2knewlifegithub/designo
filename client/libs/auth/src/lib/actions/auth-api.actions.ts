import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { createAction, props } from '@ngrx/store';
import { GithubError } from '../errors';

// Login With Github Success
export const loginWithGithubSuccess = createAction(
  '[Auth/API] Login With Github Success',
  props<{ token: string }>()
);

// Login With Github Failure
export const loginWithGithubFailure = createAction(
  '[Auth/API] Login With Github Failure',
  props<{ error: GithubError }>()
);

// Me Success
export const meSuccess = createAction(
  '[Auth/API] Me Success',
  props<{ user: User }>()
);

// Me Failure
export const meFailure = createAction(
  '[Auth/API] Me Failure',
  props<{ error: any }>()
);

// Logout  Success
export const logoutSuccess = createAction('[Auth/API] Logout Success');

// Logout Failure
export const logoutFailure = createAction(
  '[Auth/API] Logout Failure',
  props<{ error: any }>()
);
// Update Account Success
export const updateAccountSuccess = createAction(
  '[Auth/API] Update Account Success',
  props<{ updateUserDTO: UpdateUserDTO; avatar: string | undefined }>()
);

// Update Account Failure
export const updateAccountFailure = createAction(
  '[Auth/API] Update Account Failure',
  props<{ error: any }>()
);
