import { createReducer, on } from '@ngrx/store';
import { Item } from '../../shared';
import { CartAPIActions } from '../actions';

export const cartFeatureKey = 'cart';

export interface State {
  items: Item[];
}

const initialState: State = { items: [] };

export const reducer = createReducer(
  initialState,
  /**
   * - Load Cart Success
   */
  on(CartAPIActions.loadCartSuccess, (_, { items }) => ({ items })),

  /**
   * - Add To Cart Success
   */
  on(CartAPIActions.addItemSuccess, (state, { item: newItem }) => {
    const item = state.items.find((i) => i.productId === newItem.productId);
    if (item)
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === newItem.productId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        ),
      };

    return { ...state, items: [...state.items, newItem] };
  }),

  /**
   * - Remove All Success
   * - Checkout Success
   */
  on(CartAPIActions.clearSuccess, CartAPIActions.checkoutSuccess, (state) => ({
    ...state,
    items: [],
  })),

  /**
   * - Plus Quantity Success
   */
  on(CartAPIActions.addQuantitySuccess, (state, { productId }) => {
    const item = state.items.find((i) => i.productId === productId);
    if (!item) return state;

    return {
      ...state,
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
      ),
    };
  }),

  /**
   * - Minus Quantity Success
   */
  on(CartAPIActions.minusQuantitySuccess, (state, { productId }) => {
    const item = state.items.find((i) => i.productId === productId);
    if (!item) return state;

    /**
     * - When quantity is 1, remove the item from the cart
     */
    if (item.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== productId),
      };
    }

    return {
      ...state,
      items: state.items.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(i.quantity - 1, 0) }
          : i
      ),
    };
  })
);

export const getItems = (state: State) => state.items;
