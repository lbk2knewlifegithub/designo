import { Credentials } from '@lbk/models';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ credentials: Credentials }>()
);

export const clearError = createAction('[Login Page] Clear Error');
