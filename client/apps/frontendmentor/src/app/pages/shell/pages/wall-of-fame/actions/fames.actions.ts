import { createAction } from '@ngrx/store';

/**
 * - Load Fames Of Week
 */
export const loadFamesOfWeek = createAction(
  '[Wall Of Fame] Load Fames Of Week'
);

/**
 * - Load Fame Of Month
 */
export const loadFamesOfMonth = createAction(
  '[Wall Of Fame] Load Fames Of Month'
);

/**
 * - Load Fames Of Year
 */
export const loadFamesOfYear = createAction(
  '[Wall Of Fame] Load Fames Of Year'
);

/**
 * - Load Fames Of All Time
 */
export const loadFamesOfAllTime = createAction(
  '[Wall Of Fame] Load Fames Of All Time'
);
