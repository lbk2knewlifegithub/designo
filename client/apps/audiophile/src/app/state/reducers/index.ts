import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCart from './cart.reducer';
import * as fromLayout from './layout.reducer';

export interface State {
  router: fromRouter.RouterReducerState<any>;
  [fromCart.cartFeatureKey]: fromCart.State;
  [fromLayout.layoutFeatureKey]: fromLayout.State;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    router: fromRouter.routerReducer,
    [fromCart.cartFeatureKey]: fromCart.reducer,
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
  }),
});

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
