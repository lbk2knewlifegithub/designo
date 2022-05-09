import { createAction, props } from '@ngrx/store';
import { Challenge } from './../../shared/models/challenge.model';

/**
 * - Load Challenges
 */
export const loadChallenges = createAction('[Challenges] Load Challenges');

/**
 * - Load Challenge
 */
export const loadChallenge = createAction(
  '[Challenges] Load Challenge',
  props<{ challenge: Challenge }>()
);

/**
 * - Select Challenge
 */
export const selectChallenge = createAction(
  '[Challenges] Select Challenge',
  props<{
    id: string | null;
  }>()
);
