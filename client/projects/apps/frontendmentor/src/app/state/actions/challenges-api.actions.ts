import { createAction, props } from '@ngrx/store';
import { Challenge } from '../../shared';

/**
 * - Load Challenges Success
 */
export const loadChallengesSuccess = createAction(
  '[Challenges API] Load Challenges Success',
  props<{ challenges: Challenge[] }>()
);

/**
 * - Load Challenges Failures
 */
export const loadChallengesFailure = createAction(
  '[Challenges API] Load Challenges Failure',
  props<{ error: string }>()
);

/**
 * - Start Challenge Success
 */
export const startChallengeSuccess = createAction(
  '[Challenges API] Start Challenge Success',
  props<{ id: string }>()
);

/**
 * - Start Challenge Failures
 */
export const startChallengeFailure = createAction(
  '[Challenges API] Start Challenge Failure',
  props<{ error: string }>()
);
