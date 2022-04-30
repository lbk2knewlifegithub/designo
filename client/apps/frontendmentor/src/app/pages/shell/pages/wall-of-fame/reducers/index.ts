import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAllTime from './all-time.reducer';
import * as fromMonth from './month.reducer';
import * as fromWeek from './week.reducer';
import * as fromYear from './year.reducer';

export const famesFeatureKey = 'fames';

export interface State {
  [fromWeek.weekFeatureKey]: fromWeek.State;
  [fromMonth.monthFeatureKey]: fromMonth.State;
  [fromYear.yearFeatureKey]: fromYear.State;
  [fromAllTime.allTimeFeatureKey]: fromAllTime.State;
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Fames Reudcer',
  {
    factory: () => ({
      [fromWeek.weekFeatureKey]: fromWeek.reducer,
      [fromMonth.monthFeatureKey]: fromMonth.reducer,
      [fromYear.yearFeatureKey]: fromYear.reducer,
      [fromAllTime.allTimeFeatureKey]: fromAllTime.reducer,
    }),
  }
);

/**
 * - Select Fames State
 */
export const selectFamesState = createFeatureSelector<State>(famesFeatureKey);

export const getWeek = (state: State) => state.week;
export const getMonth = (state: State) => state.month;
export const getYear = (state: State) => state.year;
export const getAllTime = (state: State) => state.allTime;
