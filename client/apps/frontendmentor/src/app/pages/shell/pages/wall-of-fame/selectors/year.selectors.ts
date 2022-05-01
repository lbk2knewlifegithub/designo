import { createSelector } from '@ngrx/store';
import * as fromFames from '../reducers';
import * as fromYear from '../reducers/year.reducer';

/**
 * - Select Year Entities State
 */
export const selectFamesOfYearEntitiesState = createSelector(
  fromFames.selectFamesState,
  fromFames.getYear
);

export const {
  /**
   * - Select All Fames Of Year
   */
  selectAll: selectAllFamesOfYear,
} = fromYear.adapter.getSelectors(selectFamesOfYearEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectFamesOfYearEntitiesState,
  fromYear.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectFamesOfYearEntitiesState,
  fromYear.getLoading
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectFamesOfYearEntitiesState,
  fromYear.getError
);
