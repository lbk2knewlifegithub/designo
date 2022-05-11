import { EmailSettings } from './../../../../models/src/lib/user.model';
import { ChangePasswordDTO, CreateUserDTO, UpdateUserDTO } from '@lbk/dto';
import { createAction, props } from '@ngrx/store';

/**
 * - Login With Github
 */
export const loginWithGithub = createAction(
  '[User] Login With Github',
  props<{ code: string }>()
);

/**
 * - Me
 */
export const me = createAction('[User] Me');

/**
 * - Sign Up
 */
export const signup = createAction(
  '[User] Sign Up',
  props<{
    createUserDTO: CreateUserDTO;
    avatar?: File;
  }>()
);

/**
 * - Logout
 */
export const logout = createAction('[User] Logout');

/**
 * - Change Password
 */
export const changePassword = createAction(
  '[User] Change Password',
  props<{ changePasswordDTO: ChangePasswordDTO }>()
);

/**
 * - Update Account
 */
export const updateProfile = createAction(
  '[User] Update Account',
  props<{ updateUserDTO: UpdateUserDTO }>()
);

/**
 * - Set Return Url
 */
export const setReturnUrl = createAction(
  '[User] Set Return Url',
  props<{ returnUrl: string | null }>()
);

/**
 * - Clear Error
 */
export const clearError = createAction('[User] Clear Error');

/**
 * - Delete Account
 */
export const deleteAccount = createAction('[User] Delete Account');

/**
 * - Update Email Settings
 */
export const updateEmailSettings = createAction(
  '[User] Update Email Settings',
  props<{ emailSettings: EmailSettings }>()
);
