import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Challenge } from '../../shared';
import { ChallengesActions, ChallengesAPIActions } from '../actions';

export const challengesFeatureKey = 'challenges';

export interface State extends EntityState<Challenge> {
  loaded: boolean;
  loading: boolean;
  selectedChallengeId: string | null;
}

export const adapter: EntityAdapter<Challenge> = createEntityAdapter<Challenge>(
  {
    selectId: (challenge: Challenge) => challenge.id,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedChallengeId: null,
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Challenge
   */
  on(ChallengesActions.loadChallenges, (state) => ({
    ...state,
    loading: true,
  })),

  /**
   * - Load Challenges Success
   */
  on(ChallengesAPIActions.loadChallengesSuccess, (state, { challenges }) =>
    adapter.addMany(challenges, { ...state, loaded: true, loading: false })
  ),

  /**
   * - Load Challenge
   */
  on(ChallengesActions.loadChallenge, (state, { challenge }) =>
    adapter.addOne(challenge, { ...state })
  ),

  /**
   * - Select Challenge Id
   */
  on(ChallengesActions.selectChallenge, (state, { id }) => ({
    ...state,
    selectedChallengeId: id,
  }))
);

// Gets
export const getId = (state: State) => state.selectedChallengeId;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
