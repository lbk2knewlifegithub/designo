import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Challenge } from '../../shared';
import { ChallengesActions, ChallengesAPIActions } from '../actions';

export const challengesFeatureKey = 'challenges';

export interface State extends EntityState<Challenge> {
  loaded: boolean;
  loading: boolean;
  selectedChallengeID: string | null;
  startingChallenge: boolean;
}

export const adapter: EntityAdapter<Challenge> = createEntityAdapter<Challenge>(
  {
    selectId: (challenge: Challenge) => challenge.id,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedChallengeID: null,
  loaded: false,
  loading: false,
  startingChallenge: false,
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
   * - Start Challenge
   */
  on(ChallengesActions.startChallenge, (state) => ({
    ...state,
    startingChallenge: true,
  })),

  /**
   * - Start Challenge Success
   */
  on(ChallengesAPIActions.startChallengeSuccess, (state, { id }) => {
    return adapter.updateOne(
      { id, changes: { status: 'in-progress' } },
      {
        ...state,
        startingChallenge: false,
      }
    );
  }),

  /**
   * - Start Challenge Failure
   */
  on(ChallengesAPIActions.startChallengeFailure, (state, { error }) => ({
    ...state,
    error,
    startingChallenge: false,
  })),

  /**
   * - Select Challenge Id
   */
  on(ChallengesActions.selectChallenge, (state, { id }) => ({
    ...state,
    selectedChallengeID: id,
  }))
);

// Gets
export const getId = (state: State) => state.selectedChallengeID;
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getStartingChallenge = (state: State) => state.startingChallenge;
