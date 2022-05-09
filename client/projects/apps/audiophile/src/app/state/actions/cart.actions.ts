import { Item, CheckoutDTO } from '../../shared';
import { createAction, props } from '@ngrx/store';

/**
 * - Load Cart
 */
export const loadCart = createAction('[Cart] Load Cart');

/**
 * - Add Item
 */
export const addItem = createAction('[Cart] Add Item', props<{ item: Item }>());

/**
 * - Clear All Items
 */
export const clear = createAction('[Cart] Clear All Items');

/**
 * - Add Quantity
 */
export const addQuantity = createAction(
  '[Cart] Add quantity',
  props<{ productId: number }>()
);

/**
 * - Minus Quantity
 */
export const minusQuantity = createAction(
  '[Cart] Minus quantity',
  props<{ productId: number }>()
);

/**
 * - Checkout
 */
export const checkout = createAction(
  '[Cart] Checkout',
  props<{ checkoutDTO: CheckoutDTO }>()
);
