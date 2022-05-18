import { Solution } from '@lbk/fm/shared';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { SolutionsActions, SolutionsAPIActions } from '../actions';

export const solutionsFeaturekey = 'solutionsRoot';

export interface State extends EntityState<Solution> {
  loaded: boolean;
  error: string | null;
  loading: boolean;
  selectedSolutionID: string | null;
}

export const adapter: EntityAdapter<Solution> = createEntityAdapter<Solution>({
  selectId: ({ id }) => id,
  sortComparer: (s1, s2) =>
    new Date(s1.createdAt).getTime() - new Date(s2.createdAt).getTime(),
});

export const initialState: State = adapter.getInitialState({
  selectedSolutionID: null,
  error: null,
  loaded: false,
  loading: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Solutions
   */
  on(SolutionsActions.loadSolutions, (state) => ({
    ...state,
    loading: true,
  })),

  /**
   * - Load Solutions Success
   */
  on(SolutionsAPIActions.loadSolutionsSuccess, (state, { solutions }) =>
    adapter.addMany(solutions, { ...state, loaded: true, loading: false })
  ),

  /**
   * - Load Solutions Failure
   */
  on(SolutionsAPIActions.loadSolutionsFailure, (state, { error }) => ({
    ...state,
    error,
    loaded: false,
    loading: false,
  })),

  /**
   * - Load Solution
   */
  on(SolutionsActions.loadSolution, (state, { solution }) =>
    adapter.addOne(solution, state)
  ),

  /**
   * - Select Solution Id
   */
  on(SolutionsActions.selectSolution, (state, { id }) => ({
    ...state,
    selectedSolutionID: id,
  }))
);

// Gets
export const getID = (state: State) => state.selectedSolutionID;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
