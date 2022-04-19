import { createReducer, on } from '@ngrx/store';
import { LayoutActions } from '../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  shownNav: boolean;
  shownCart: boolean;
}

const initialState: State = {
  shownNav: false,
  shownCart: false,
};

export const reducer = createReducer(
  initialState,
  /**
   * - Toggle Nav Overlay
   */
  on(LayoutActions.toggleNavOverlay, (state) => ({
    ...state,
    shownNav: !state.shownNav,
    shownCart: false,
  })),

  /**
   * - Close Nav Overlay
   */
  on(LayoutActions.closeNavOverlay, (state) => ({
    ...state,
    shownNav: false,
  })),

  /**
   * - Toggle Cart Overlay
   */
  on(LayoutActions.toggleCartOverlay, (state) => ({
    ...state,
    shownCart: !state.shownCart,
    shownNav: false,
  })),

  /**
   * - Close all overlay opening
   */
  on(LayoutActions.closeAll, () => ({
    shownNav: false,
    shownCart: false,
  }))
);

export const getShownNav = (state: State) => state.shownNav;
export const getShownCart = (state: State) => state.shownCart;
