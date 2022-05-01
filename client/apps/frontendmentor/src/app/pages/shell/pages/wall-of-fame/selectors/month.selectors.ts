import { createSelector } from '@ngrx/store';
import * as fromFames from '../reducers';
import * as fromMonth from '../reducers/month.reducer';

/**
 * - Select Month Entities State
 */
export const selectFamesOfMonthEntitiesState = createSelector(
  fromFames.selectFamesState,
  fromFames.getMonth
);

export const {
  /**
   * - Select All Fames Of Month
   */
  selectAll: selectAllFamesOfMonth,
} = fromMonth.adapter.getSelectors(selectFamesOfMonthEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectFamesOfMonthEntitiesState,
  fromMonth.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectFamesOfMonthEntitiesState,
  fromMonth.getLoading
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectFamesOfMonthEntitiesState,
  fromMonth.getError
);
