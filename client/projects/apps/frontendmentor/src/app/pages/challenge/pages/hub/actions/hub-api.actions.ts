import { Solution, CreateSolutionDTO } from '@lbk/fm/shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Load Solutions For Challenge Success
 */
export const loadSolutionsForChallangeSuccess = createAction(
  '[Hub/API] Load Solutions For Challenge Success',
  props<{ solutions: Solution[] }>()
);

/**
 * - Load Solutions For Challenge Failure
 */
export const loadSolutionsForChallangeFailure = createAction(
  '[Hub/API] Load Solutions For Challenge Failure',
  props<{ error: string }>()
);

/**
 * - Update Solution Success
 */
export const updateSolutionSuccess = createAction(
  '[Hub/API] Update Solution Success',
  props<{ solution: Solution }>()
);

/**
 * - Update Solution Failure
 */
export const updateSolutionFailure = createAction(
  '[Hub/API] Update Solution Failure',
  props<{ error: string }>()
);

/**
 * - Create Solution Success
 */
export const createSolutionSuccess = createAction(
  '[Hub/API] Create Solution Success',
  props<{ id: string; dto: CreateSolutionDTO }>()
);

/**
 * - Create Solution Failure
 */
export const createSolutionFailure = createAction(
  '[Hub/API] Create Solution Failure',
  props<{ error: string }>()
);
