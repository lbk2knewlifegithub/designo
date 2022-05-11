import { EmailSettings } from './../../../../models/src/lib/user.model';
import { UpdateUserDTO } from '@lbk/dto';
import { User } from '@lbk/models';
import { createAction, props } from '@ngrx/store';
import { GithubError } from '../errors';

// Login With Github Success
export const loginWithGithubSuccess = createAction(
  '[User/API] Login With Github Success',
  props<{ token: string }>()
);

// Login With Github Failure
export const loginWithGithubFailure = createAction(
  '[User/API] Login With Github Failure',
  props<{ error: GithubError }>()
);

// Me Success
export const meSuccess = createAction(
  '[User/API] Me Success',
  props<{ user: User }>()
);

// Me Failure
export const meFailure = createAction(
  '[User/API] Me Failure',
  props<{ error: string }>()
);

// Logout  Success
export const logoutSuccess = createAction('[User/API] Logout Success');

// Logout Failure
export const logoutFailure = createAction(
  '[User/API] Logout Failure',
  props<{ error: string }>()
);

// Update Account Success
export const updateProfileSuccess = createAction(
  '[User/API] Update Account Success',
  props<{ updateUserDTO: UpdateUserDTO; avatar: string | undefined }>()
);

// Update Account Failure
export const updateAccountFailure = createAction(
  '[User/API] Update Account Failure',
  props<{ error: string }>()
);

// Delete Account Success
export const deleteAccountSuccess = createAction(
  '[User/API] Delete Account Success'
);

// Delete Account Failure
export const deleteAccountFailure = createAction(
  '[User/API] Delete Account Failure',
  props<{ error: string }>()
);

// Update Email Settings Success
export const updateEmailSettingsSuccess = createAction(
  '[User/API] Update Email Settings Success',
  props<{ emailSettings: EmailSettings }>()
);

// Update Email Settings Failure
export const updateEmailSettingsFailure = createAction(
  '[User/API] Update Email Settings Failure',
  props<{ error: string }>()
);
