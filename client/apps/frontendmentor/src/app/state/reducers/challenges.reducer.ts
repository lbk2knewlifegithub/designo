import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Challenge } from '../../shared';
import { ChallengesActions, ChallengesAPIActions } from '../actions';

export const challengesFeatureKey = 'challenges';

export interface State extends EntityState<Challenge> {
  loaded: boolean;
  selectedChallengeId: number | null;
}

export const adapter: EntityAdapter<Challenge> = createEntityAdapter<Challenge>(
  {
    selectId: (challenge: Challenge) => challenge.challenge_id,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedChallengeId: null,
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Challenges Success
   */
  on(ChallengesAPIActions.loadChallengesSuccess, (state, { challenges }) =>
    adapter.addMany(challenges, { ...state, loaded: true })
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
  on(ChallengesActions.selectChallenge, (state, { challenge_id }) => ({
    ...state,
    selectedChallengeId: challenge_id,
  }))
);

// Gets
export const getId = (state: State) => state.selectedChallengeId;
export const getLoaded = (state: State) => state.loaded;
