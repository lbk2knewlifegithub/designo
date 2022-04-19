import { Item, Order } from '../../shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Load Cart Success
 */
export const loadCartSuccess = createAction(
  '[Cart/API] Load Cart Success',
  props<{ items: Item[] }>()
);

/**
 * - Load Cart Failure
 */
export const loadCartFailure = createAction(
  '[Cart/API] Load Cart Failure',
  props<{ error: string }>()
);

/**
 * - Add Item Success
 */
export const addItemSuccess = createAction(
  '[Cart/API] Add Item Success',
  props<{ item: Item }>()
);

/**
 * - Add Item Failure
 */
export const addItemFailure = createAction(
  '[Cart/API] Add Item Failure',
  props<{ error: string }>()
);

/**
 * - Remove item from cart
 */
export const removeItemSuccess = createAction(
  '[Cart/API] Remove Item Success',
  props<{ item: Item }>()
);

export const removeItemFailure = createAction(
  '[Cart/API] Remove Item Failure',
  props<{ error: string }>()
);

/**
 * - Clear Success
 */
export const clearSuccess = createAction('[Cart/API] Clear Success');

/**
 * - Clear Failure
 */
export const clearFailure = createAction(
  '[Cart/API] Cleart Failure',
  props<{ error: string }>()
);

/**
 * - Add Quantity Success
 */
export const addQuantitySuccess = createAction(
  '[Cart/API] Add Quantity Success',
  props<{ productId: number }>()
);

/**
 * - Add Quantity Failure
 */
export const addQuantityFailure = createAction(
  '[Cart/API] Add Quantity Failure',
  props<{ error: string }>()
);

/**
 * - Minus quantity
 */
export const minusQuantitySuccess = createAction(
  '[Cart/API] Minus Quantity Success',
  props<{ productId: number }>()
);

/**
 * - Minus Quantity Failure
 */
export const minusQuantityFailure = createAction(
  '[Cart/API] Minus Quantity Failure',
  props<{ error: string }>()
);

/**
 * - Checkout Success
 */
export const checkoutSuccess = createAction(
  '[Cart/API] Checkout Success',
  props<{ order: Order }>()
);

/**
 * - Checkout Failure
 */
export const checkoutFailure = createAction(
  '[Cart/API] Checkout Failure',
  props<{ error: string }>()
);
