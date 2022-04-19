import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';

const selectLayoutState = createFeatureSelector<fromLayout.State>(
  fromLayout.layoutFeatureKey
);

export const selectShownNav = createSelector(
  selectLayoutState,
  fromLayout.getShownNav
);
export const selectShownCart = createSelector(
  selectLayoutState,
  fromLayout.getShownCart
);
