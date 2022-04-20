import { createReducer, on } from '@ngrx/store';
import { LayoutActions } from '../actions';

export const layoutFeatureKey = 'layout';

export interface State {
  darkTheme: boolean;
}

export const initialState: State = {
  darkTheme: false,
};

export const reducer = createReducer(
  initialState,

  /**
   * - Set To Light Theme
   */
  on(LayoutActions.toLightTheme, (state) => ({
    ...state,
    darkTheme: false,
  })),

  /**
   * - Set To Dark Theme
   */
  on(LayoutActions.toDarkTheme, (state) => ({
    ...state,
    darkTheme: true,
  }))
);

export const getDarkTheme = (state: State) => state.darkTheme;
