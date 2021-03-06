import { createAction, props } from '@ngrx/store';
import { FeedbackCategory } from '../../../../shared';
import { SortFeedback } from '../home.reducer';

/**
 * - Enter Home Page
 */
export const enter = createAction('[Home] Enter Home Page');

/**
 * - Close Side Bar
 */
export const closeSideBar = createAction('[Home] Close Side Bar');

/**
 * - Shown Side Bar
 */
export const showSideBar = createAction('[Home] Shown Side Bar');

/**
 * - Set Sort
 */
export const setSort = createAction(
  '[Home] Set Sort',
  props<{ sort: SortFeedback }>()
);

/**
 * - Set Category
 */
export const setCategory = createAction(
  '[Home] Set Category',
  props<{ category: FeedbackCategory | undefined }>()
);
