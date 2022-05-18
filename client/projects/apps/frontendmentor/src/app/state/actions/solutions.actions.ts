import { Solution } from '@lbk/fm/shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Load Solutions
 */
export const loadSolutions = createAction('[Solutions] Load All Solutions');

/**
 * - Load Solution
 */
export const loadSolution = createAction(
  '[Solutions] Load Solution',
  props<{ solution: Solution }>()
);

/**
 * - Select Solution
 */
export const selectSolution = createAction(
  '[Solutions] Select Solution',
  props<{
    id: string | null;
  }>()
);
