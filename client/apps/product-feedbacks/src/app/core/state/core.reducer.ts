import { createFeature, createReducer, on } from '@ngrx/store';
import * as CoreActions from './core.actions';

const coreFeatureKey = 'core';

export interface State {
  shownRequiredLogin: boolean;
}

export const initialState: State = {
  shownRequiredLogin: false,
};

export const coreFeature = createFeature({
  name: coreFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Show Required Login
     */
    on(CoreActions.showRequiredLogin, (state) => ({
      ...state,
      shownRequiredLogin: true,
    })),

    /**
     * - Close Required Login
     */
    on(CoreActions.closeRequiredLogin, (state) => ({
      ...state,
      shownRequiredLogin: false,
    })),

    /**
     * - Close Required Login
     */
    on(CoreActions.closeRequiredLogin, (state) => ({
      ...state,
      shownRequiredLogin: false,
    }))
  ),
});
