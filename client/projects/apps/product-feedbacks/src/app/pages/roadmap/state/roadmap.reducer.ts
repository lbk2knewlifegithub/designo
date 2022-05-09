import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedbackStatus } from '../../../shared';
import * as RoadmapActions from './roadmap.actions';

const roadmapFeatureKey = 'roadmapFeatureKey';

export interface State {
  error: string;
  loading: boolean;
  filter: FeedbackStatus;
}

export const initialState: State = {
  error: '',
  loading: false,
  filter: FeedbackStatus.PLANNED,
};

export const roadmapFeature = createFeature({
  name: roadmapFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Set Filter
     */
    on(RoadmapActions.setFilter, (state, { filter }) => ({
      ...state,
      filter,
    }))
  ),
});
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
