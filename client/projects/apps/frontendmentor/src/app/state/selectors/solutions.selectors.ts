import { getError } from './../../../../../product-feedbacks/src/app/pages/roadmap/state/roadmap.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSolutions from '../reducers/solutions.reducer';

/**
 * - Select Solutions Entities State
 */
export const selectSolutionsEntitiesState =
  createFeatureSelector<fromSolutions.State>(fromSolutions.solutionsFeaturekey);

/**
 * - Select Selected Solution Id
 */
export const selectSelectedSolutionId = createSelector(
  selectSolutionsEntitiesState,
  fromSolutions.getID
);

export const {
  /**
   * - Select Solution Entities
   */
  selectEntities: selectSolutionsEntities,

  /**
   * - Select All Solutions
   */
  selectAll: selectAllSolutions,
} = fromSolutions.adapter.getSelectors(selectSolutionsEntitiesState);

/**
 * - Select Select Solution
 */
export const selectSelectedSolution = createSelector(
  selectSolutionsEntities,
  selectSelectedSolutionId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectSolutionsEntitiesState,
  fromSolutions.getError
);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectSolutionsEntitiesState,
  fromSolutions.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectSolutionsEntitiesState,
  fromSolutions.getLoading
);
