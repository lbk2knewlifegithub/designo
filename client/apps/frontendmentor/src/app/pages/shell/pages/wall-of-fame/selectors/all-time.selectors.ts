import { createSelector } from '@ngrx/store';
import * as fromFames from '../reducers';
import * as fromAllTime from '../reducers/all-time.reducer';

/**
 * - Select AllTime Entities State
 */
export const selectFamesOfAllTimeEntitiesState = createSelector(
  fromFames.selectFamesState,
  fromFames.getAllTime
);

export const {
  /**
   * - Select All Fames Of AllTime
   */
  selectAll: selectAllFamesOfAllTime,
} = fromAllTime.adapter.getSelectors(selectFamesOfAllTimeEntitiesState);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectFamesOfAllTimeEntitiesState,
  fromAllTime.getLoaded
);

/**
 * - Select Loading
 */
export const selectLoading = createSelector(
  selectFamesOfAllTimeEntitiesState,
  fromAllTime.getLoading
);

/**
 * - Select Error
 */
export const selectError = createSelector(
  selectFamesOfAllTimeEntitiesState,
  fromAllTime.getError
);
