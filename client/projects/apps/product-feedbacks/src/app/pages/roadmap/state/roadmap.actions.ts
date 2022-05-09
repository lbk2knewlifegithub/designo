import { createAction, props } from '@ngrx/store';
import { FeedbackStatus } from '../../../shared';

export const setFilter = createAction(
  '[Roadmap] Set Filter',
  props<{ filter: FeedbackStatus }>()
);
