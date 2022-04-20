import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

/**
 * Layout selector
 */
export const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.layoutFeatureKey
);
/**
 * - Select Dark Theme
 */
export const selectDarkThem = createSelector(
  selectLayoutState,
  fromLayout.getDarkTheme
);
