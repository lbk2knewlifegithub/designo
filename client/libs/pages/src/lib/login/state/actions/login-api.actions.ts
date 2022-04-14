import { Tokens } from '@lbk/models';
import { createAction, props } from '@ngrx/store';
import { LoginError } from '../login.reducer';

export const loginSuccess = createAction(
  '[Login/API] Login Success',
  props<{ token: Tokens }>()
);

export const loginFailure = createAction(
  '[Login/API] Login Failure',
  props<{ error: LoginError }>()
);
