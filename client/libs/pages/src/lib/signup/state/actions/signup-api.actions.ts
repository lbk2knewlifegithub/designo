import { Tokens } from '@lbk/models';
import { createAction, props } from '@ngrx/store';

export const signUpSuccess = createAction(
  '[Signup/API] Sign Up Success',
  props<{ token: Tokens }>()
);

export const signUpFailure = createAction(
  '[Signup/API] Sign Up Failure',
  props<{ error: any }>()
);
