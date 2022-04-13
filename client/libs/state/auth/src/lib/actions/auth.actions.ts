import { ChangePasswordDTO, UpdateUserDTO } from '@lbk/dto';
import { createAction, props } from '@ngrx/store';

/**
 * - Login
 */
export const login = createAction('[Auth] login');

/**
 * - Me
 */
export const me = createAction('[Auth] Me', props<{ accessToken: string }>());

/**
 * - Sign Up
 */
export const signup = createAction('[Auth] Sign Up');

/**
 * - Logout
 */
export const logout = createAction('[Auth] Logout');

/**
 * - Change Password
 */
export const changePassword = createAction(
  '[Auth] Change Password',
  props<{ changePasswordDTO: ChangePasswordDTO }>()
);

/**
 * - Update Account
 */
export const updateAccount = createAction(
  '[Auth] Update Account',
  props<{ updateUserDTO: UpdateUserDTO }>()
);

/**
 * - Request Verify Email
 */
export const requestVerifyEmail = createAction('[Auth] Request Verify Email');

/**
 * - Verify Email
 */
export const verifyEmail = createAction(
  '[Auth] Verify Email',
  props<{ token: string }>()
);
