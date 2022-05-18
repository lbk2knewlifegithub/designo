import { createAction, props } from '@ngrx/store';
import { Tag } from '../../shared';

/**
 * - Load Tags Success
 */
export const loadTagsSuccess = createAction(
  '[Tags/API] Load Tags Success',
  props<{ tags: Tag[] }>()
);

/**
 * - Load Tags Failures
 */
export const loadTagsFailure = createAction(
  '[Tags/API] Load Tags Failure',
  props<{ error: string }>()
);
