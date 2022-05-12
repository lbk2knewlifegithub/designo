import { createAction, props } from '@ngrx/store';
import { CreateSolutionDTO } from '@lbk/fm/shared';

/**
 * - Update Solution
 */
export const updateSolution = createAction('[Hub] Update Solution');

/**
 * - Create Solution
 */
export const createSolution = createAction(
  '[Hub] Create Solution',
  props<{ challengeID: string; dto: CreateSolutionDTO }>()
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
