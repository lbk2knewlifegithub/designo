import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromChallenges from '../reducers/challenges.reducer';

/**
 * - Select Challenges Entities State
 */
export const selectChallengesEntitiesState =
  createFeatureSelector<fromChallenges.State>(
    fromChallenges.challengesFeatureKey
  );

/**
 * - Select Selected Challange Id
 */
export const selectSelectedChallangeId = createSelector(
  selectChallengesEntitiesState,
  fromChallenges.getId
);

export const {
  /**
   * - Select Challange Entities
   */
  selectEntities: selectChallangeEntities,

  /**
   * - Select All Challenges
   */
  selectAll: selectAllChallenges,
} = fromChallenges.adapter.getSelectors(selectChallengesEntitiesState);

/**
 * - Select Select Challange
 */
export const selectSelectedChallange = createSelector(
  selectChallangeEntities,
  selectSelectedChallangeId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectChallengesEntitiesState,
  fromChallenges.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectChallengesEntitiesState,
  fromChallenges.getLoading
);

/**
 * - Select Starting Challenge
 */
export const selectStartingChallenge = createSelector(
  selectChallengesEntitiesState,
  fromChallenges.getStartingChallenge
);
