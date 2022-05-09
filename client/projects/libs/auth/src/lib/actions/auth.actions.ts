import { ChangePasswordDTO, CreateUserDTO, UpdateUserDTO } from '@lbk/dto';
import { Credentials } from '@lbk/models';
import { createAction, props } from '@ngrx/store';

/**
 * - Login
 */
export const login = createAction(
  '[Auth] login',
  props<{ credentials: Credentials }>()
);

/**
 * - Login With Github
 */
export const loginWithGithub = createAction(
  '[Auth] Login With Github',
  props<{ code: string }>()
);

/**
 * - Me
 */
export const me = createAction('[Auth] Me', props<{ accessToken: string }>());

/**
 * - Sign Up
 */
export const signup = createAction(
  '[Auth] Sign Up',
  props<{
    createUserDTO: CreateUserDTO;
    avatar?: File;
  }>()
);

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
 * - Set Return Url
 */
export const setReturnUrl = createAction(
  '[Auth] Set Return Url',
  props<{ returnUrl: string | null }>()
);

/**
 * - Clear Error
 */
export const clearError = createAction('[Auth] Clear Error');
