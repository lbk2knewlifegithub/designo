import { createSelector } from '@ngrx/store';
import * as fromFames from '../reducers';
import * as fromWeek from '../reducers/week.reducer';

/**
 * - Select Week Entities State
 */
export const selectFamesOfWeekEntitiesState = createSelector(
  fromFames.selectFamesState,
  fromFames.getWeek
);

export const {
  /**
   * - Select All Fames Of Week
   */
  selectAll: selectAllFamesOfWeek,
} = fromWeek.adapter.getSelectors(selectFamesOfWeekEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectFamesOfWeekEntitiesState,
  fromWeek.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectFamesOfWeekEntitiesState,
  fromWeek.getLoading
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectFamesOfWeekEntitiesState,
  fromWeek.getError
);
