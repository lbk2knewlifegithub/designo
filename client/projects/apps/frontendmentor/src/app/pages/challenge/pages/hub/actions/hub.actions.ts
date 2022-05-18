import { SolutionDTO } from '@lbk/fm/shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Update Solution
 */
export const updateSolution = createAction(
  '[Hub] Update Solution',
  props<{ solutionID: string; dto: SolutionDTO }>()
);

/**
 * - Delete Solution
 */
export const deleteSolution = createAction(
  '[Hub] Delete Solution',
  props<{ id: string }>()
);

/**
 * - Create Solution
 */
export const createSolution = createAction(
  '[Hub] Create Solution',
  props<{ challengeID: string; dto: SolutionDTO }>()
);

/**
 * - Load Solutions For Challenge
 */
export const loadSolutionsForChallange = createAction(
  '[Hub] Load Solutions For Challenge',
  props<{ id: string }>()
);

/**
 * - Select Solution
 */
export const selectSolution = createAction(
  '[Hub] Select Solution',
  props<{ id: string | null }>()
);
