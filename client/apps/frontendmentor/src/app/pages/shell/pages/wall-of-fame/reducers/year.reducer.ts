import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FamesActions, FamesAPIActions } from '../actions';
import { Fame } from '../models';

export const yearFeatureKey = 'year';

export interface State extends EntityState<Fame> {
  loaded?: boolean;
  loading?: boolean;
  error?: string;
}

export const adapter: EntityAdapter<Fame> = createEntityAdapter<Fame>({
  selectId: (fame: Fame) => fame.username,
  sortComparer: (f1, f2) => f1.points - f2.points,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,

  /**
   * - Load Fames Of Year
   */
  on(FamesActions.loadFamesOfYear, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: undefined,
  })),

  /**
   * - Load Fames Of Year Success
   */
  on(FamesAPIActions.loadFamesOfYearSuccess, (state, { fames }) =>
    adapter.addMany(fames, {
      ...state,
      loaded: true,
      loading: false,
      error: undefined,
    })
  ),
  /**
   * - Load Fames Of Year Failure
   */
  on(FamesAPIActions.loadFamesOfYearFailure, (state, { error }) => ({
    ...state,
    loaded: false,
    loading: false,
    error,
  }))
);

// Gets
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
