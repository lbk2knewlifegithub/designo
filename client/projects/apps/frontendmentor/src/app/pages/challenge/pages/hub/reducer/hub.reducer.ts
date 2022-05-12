import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Solution } from '@lbk/fm/shared';
import { HubAPIActions, HubActions } from '../actions';

export const hubFeatureKey = 'hub';

export interface State extends EntityState<Solution> {
  loadedSolutions: boolean;
  loadingSolutions: boolean;
  selectedSolutionID: string | null;
  updatingSolution: boolean;
  creatingSolution: boolean;
}

export const adapter: EntityAdapter<Solution> = createEntityAdapter<Solution>({
  selectId: (solution: Solution) => solution.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedSolutionID: null,
  loadedSolutions: false,
  loadingSolutions: false,
  startingChallenge: false,
  updatingSolution: false,
  creatingSolution: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Solutions For Challenges
   */
  on(HubActions.loadSolutionsForChallange, (state) => ({
    ...state,
    loadingSolutions: true,
  })),

  /**
   * - Load Solutions For Challenges  Success
   */
  on(HubAPIActions.loadSolutionsForChallangeSuccess, (state, { solutions }) =>
    adapter.addMany(solutions, {
      ...state,
      loaded: true,
      loading: false,
      error: null,
    })
  ),

  /**
   * - Load Solutions For Challenges Failure
   */
  on(HubAPIActions.loadSolutionsForChallangeFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  /**
   * - Create Solution
   */
  on(HubActions.createSolution, (state) => ({
    ...state,
    creatingSolution: true,
  })),

  /**
   * - Create Solution Success
   */
  // on(HubAPIActions.createSolutionSuccess, (state, {id, dto }) =>
  //   adapter.addOne({...dto, id}, {
  //     ...state,
  //     error: null,
  //     creatingSolution: false
  //   })
  // ),

  /**
   * - Create Solution Failure
   */
  on(HubAPIActions.createSolutionFailure, (state, { error }) => ({
    ...state,
    error,
    creatingSolution: false,
  })),

  /**
   * - Select Solution ID
   */
  on(HubActions.selectSolution, (state, { id }) => ({
    ...state,
    selectedSolutionID: id,
  }))
);

// Gets
export const getId = (state: State) => state.selectedSolutionID;
export const getLoadedSolutions = (state: State) => state.loadedSolutions;
export const getLoadingSolutions = (state: State) => state.loadingSolutions;
export const getUpdatingSolution = (state: State) => state.updatingSolution;
export const getCreatingSolution = (state: State) => state.creatingSolution;
