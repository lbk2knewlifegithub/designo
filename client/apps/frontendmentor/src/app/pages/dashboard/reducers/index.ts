import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardActions, DashboardAPIActions } from '../actions';
import { Dashboard, DASHBOARD_DEFAULT } from '../models';

export const dashboardFeatureKey = 'dashboard';

export interface State extends Dashboard {
  loaded: boolean;
  loading: boolean;
  error: string | undefined;
}

export const initialState: State = {
  loaded: false,
  loading: false,
  error: undefined,
  ...DASHBOARD_DEFAULT,
};

export const dashboardFeature = createFeature({
  name: dashboardFeatureKey,
  reducer: createReducer(
    initialState,
    /**
     * - Load Dashboard
     */
    on(DashboardActions.loadDashboard, (state) => ({
      ...state,
      loading: true,
      error: undefined,
    })),
    /**
     * - Load Dashboard Success
     */
    on(DashboardAPIActions.loadDashboardSuccess, (_, { dashboard }) => ({
      ...dashboard,
      loaded: true,
      loading: false,
      error: undefined,
    })),
    /**
     * - Load Dashboard Failure
     */
    on(DashboardAPIActions.loadDashboardFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
      loaded: false,
    }))
  ),
});
