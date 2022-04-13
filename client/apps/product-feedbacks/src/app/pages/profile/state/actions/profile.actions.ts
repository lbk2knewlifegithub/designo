import { createAction, props } from '@ngrx/store';
import { User } from '@lbk/models';

export const enter = createAction(
  '[ProfilePage] Enter',
  props<{ user: User }>()
);
