import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromChallenges from './challenges.reducer';
import * as fromTags from './tags.reducer';
import * as fromSolutions from './solutions.reducer';

export interface State {
  [fromChallenges.challengesFeatureKey]: fromChallenges.State;
  [fromTags.tagsFeatureKey]: fromTags.State;
  [fromSolutions.solutionsFeaturekey]: fromSolutions.State;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromChallenges.challengesFeatureKey]: fromChallenges.reducer,
    [fromTags.tagsFeatureKey]: fromTags.reducer,
    [fromSolutions.solutionsFeaturekey]: fromSolutions.reducer,
    router: fromRouter.routerReducer,
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
