import { UpdateUserDTO } from '@lbk/dto';
import { Tokens, User } from '@lbk/models';
import { createAction, props } from '@ngrx/store';

// Login Success
export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ tokens: Tokens }>()
);

// Login Failure
export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
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

// Sign Up
export const signUpSuccess = createAction(
  '[Auth/API] SignUp Success',
  props<{ tokens: Tokens }>()
);

// Sign Up Failure
export const signUpFailure = createAction(
  '[Auth/API] SignUp Failure',
  props<{ error: any }>()
);

// Logout  Success
export const logoutSuccess = createAction('[Auth/API] Logout Success');

// Logout Failure
export const logoutFailure = createAction(
  '[Auth/API] Logout Failure',
  props<{ error: any }>()
);

// Change Password Success
export const changePasswordSuccess = createAction(
  '[Auth/API] Change Password Success'
);

// Change Password Failure
export const changePasswordFailure = createAction(
  '[Auth/API] Change password Failure',
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
