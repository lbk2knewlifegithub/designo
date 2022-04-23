import { createFeature, createReducer } from '@ngrx/store';

export const homeFeatureKey = 'home';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State {}

export const initialState: State = {};

export const homeFeature = createFeature({
  name: homeFeatureKey,
  reducer: createReducer(initialState),
});
