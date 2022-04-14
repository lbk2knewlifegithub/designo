import { FeedbackCategory } from '@lbk/models';
import { FeedbacksActions, FeedbacksApiActions } from '@lbk/state/feedbacks';
import { createFeature, createReducer, on } from '@ngrx/store';
import { HomeActions } from './actions';

export enum SortFeedback {
  MOST_UPVOTES = 'Most Upvotes',
  LEAST_UPVOTES = 'Least Upvotes',
  MOST_COMMENTS = 'Most Comments',
  LEAST_COMMENTS = 'Least Comments',
}

const homeFeatureKey = 'homePage';

export interface State {
  error: string;
  loading: boolean;
  shownSideBar: boolean;
  sort: SortFeedback;
  category: FeedbackCategory | undefined;
}

export const initialState: State = {
  error: '',
  loading: true,
  shownSideBar: false,
  sort: SortFeedback.MOST_UPVOTES,
  category: undefined,
};

export const homeFeature = createFeature({
  name: homeFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Set Category
     */
    on(HomeActions.setCategory, (state, { category }) => ({
      ...state,
      category,
    })),

    /**
     * - Show Side Bar
     */
    on(HomeActions.showSideBar, (state) => ({
      ...state,
      shownSideBar: true,
    })),

    /**
     * - Close Side Bar
     */
    on(HomeActions.closeSideBar, (state) => ({
      ...state,
      shownSideBar: false,
    })),
    /**
     * - Set Sort
     */
    on(HomeActions.setSort, (state, { sort }) => ({
      ...state,
      sort,
    })),

    /**
     * - Load Feedbacks
     */
    on(FeedbacksActions.loadFeedBacks, (state) => ({
      ...state,
      loading: true,
    })),
    /**
     * - Set Shown Side Bar
     */
    on(FeedbacksApiActions.loadFeedbacksSuccess, (state) => {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }),

    /**
     * - Load Feedbacks Failure
     */
    on(FeedbacksApiActions.loadFeedbacksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});
