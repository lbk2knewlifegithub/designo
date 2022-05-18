import { Solution } from '@lbk/fm/shared';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { HubActions, HubAPIActions } from '../actions';

export const hubFeatureKey = 'hub';

export interface State extends EntityState<Solution> {
  loadedSolutions: boolean;
  loadingSolutions: boolean;
  selectedSolutionID: string | null;
  updatingSolution: boolean;
  submittingSolution: boolean;
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
  submittingSolution: false,
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
    submittingSolution: true,
  })),

  /**
   * - Create Solution Success
   */
  on(HubAPIActions.createSolutionSuccess, (state, { solution }) => {
    return adapter.addOne(solution, {
      ...state,
      error: null,
      submittingSolution: false,
    });
  }),

  /**
   * - Create Solution Failure
   */
  on(HubAPIActions.createSolutionFailure, (state, { error }) => ({
    ...state,
    error,
    submittingSolution: false,
  })),

  /**
   * - Update Solution
   */
  on(HubActions.updateSolution, (state) => ({
    ...state,
    updatingSolution: true,
  })),

  /**
   * - Update Solution Success
   */
  on(HubAPIActions.updateSolutionSuccess, (state, { id, screenshot, dto }) =>
    adapter.updateOne(
      {
        id,
        changes: {
          ...dto,
          screenshot,
        },
      },
      {
        ...state,
        error: null,
        updatingSolution: false,
      }
    )
  ),

  /**
   * - Update Solution Failure
   */
  on(HubAPIActions.updateSolutionFailure, (state, { error }) => ({
    ...state,
    error,
    updatingSolution: false,
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
export const getCreatingSolution = (state: State) => state.submittingSolution;
