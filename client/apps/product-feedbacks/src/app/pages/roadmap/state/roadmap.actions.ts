import { createAction, props } from '@ngrx/store';
import { FeedbackStatus } from '@lbk/models';

export const setFilter = createAction(
  '[Roadmap] Set Filter',
  props<{ filter: FeedbackStatus }>()
);
