import { createAction, props } from '@ngrx/store';
import { Fame } from '../models';

/**
 * - Load Fames Week Success
 */
export const loadFamesOfWeekSuccess = createAction(
  '[Fames/API] Load Fames Week Success',
  props<{ fames: Fame[] }>()
);

/**
 * - Load Fames Week Failure
 */
export const loadFamesOfWeekFailure = createAction(
  '[Fames/API] Load Fames Week Failure',
  props<{ error: string }>()
);

/**
 * - Load Fames Month Success
 */
export const loadFamesOfMonthSuccess = createAction(
  '[Fames/API] Load Fames Month Success',
  props<{ fames: Fame[] }>()
);

/**
 * - Load Fames Month Failure
 */
export const loadFamesOfMonthFailure = createAction(
  '[Fames/API] Load Fames Month Failure',
  props<{ error: string }>()
);

/**
 * - Load Fames Year Success
 */
export const loadFamesOfYearSuccess = createAction(
  '[Fames/API] Load Fames Year Success',
  props<{ fames: Fame[] }>()
);

/**
 * - Load Fames Year Failure
 */
export const loadFamesOfYearFailure = createAction(
  '[Fames/API] Load Fames Year Failure',
  props<{ error: string }>()
);

/**
 * - Load Fames All Time Success
 */
export const loadFamesOfAllTimeSuccess = createAction(
  '[Fames/API] Load Fames All Time Success',
  props<{ fames: Fame[] }>()
);

/**
 * - Load Fames All Time Failure
 */
export const loadFamesOfAllTimeFailure = createAction(
  '[Fames/API] Load Fames All Time Failure',
  props<{ error: string }>()
);
