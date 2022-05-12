import { Solution } from '@lbk/fm/shared';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromHub from '../reducer/hub.reducer';

/**
 * - Select Hub Entities State
 */
export const selectHubEntitiesState = createFeatureSelector<fromHub.State>(
  fromHub.hubFeatureKey
);

/**
 * - Select Selected Hub Id
 */
export const selectSelectedSolutionID = createSelector(
  selectHubEntitiesState,
  fromHub.getId
);

export const {
  /**
   * - Select Hub Entities
   */
  selectEntities: selectSolutionsEntities,

  /**
   * - Select All Solutions
   */
  selectAll: selectAllSolutions,
} = fromHub.adapter.getSelectors(selectHubEntitiesState);

/**
 * - Select Select Solution
 */
export const selectSelectedSolution = createSelector(
  selectSolutionsEntities,
  selectSelectedSolutionID,
  (entities, selectedID) => {
    return selectedID && (entities[selectedID] as Solution | undefined);
  }
);

/**
 * - Select Loaded Solutions
 */
export const selectLoadedSolutions = createSelector(
  selectHubEntitiesState,
  fromHub.getLoadedSolutions
);

/**
 * - Select Loading Solutions
 */
export const selectLoadingSolutions = createSelector(
  selectHubEntitiesState,
  fromHub.getLoadingSolutions
);

/**
 * - Select Updating Solution
 */
export const selectUpdatingSolution = createSelector(
  selectHubEntitiesState,
  fromHub.getUpdatingSolution
);

/**
 * - Select creating Solution
 */
export const selectCreatingSolution = createSelector(
  selectHubEntitiesState,
  fromHub.getCreatingSolution
);
