import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';

/**
 * - Select Cart State
 */
const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

/**
 * - Seelect Items
 */
export const selectItems = createSelector(selectCartState, fromCart.getItems);
