import { createFeature, createReducer, on } from '@ngrx/store';
import { Resource } from '../../../shared';
import { ResourcesAPIActions, ResourcesActions } from './actions';

export const resourcesFeatureKey = 'resources';

export interface State {
  // resourcesGroup: { loaded: boolean; group: ResourceGroupName }[];
  // resourcesType: { loaded: boolean; type: ResourceTypeName }[];
  resources: Resource[];
  loaded: boolean;
  error: string;
  loading: boolean;
}

export const initialState: State = {
  // resourcesGroup: Object.values(ResourceGroupName).map((group) => ({
  //   loaded: false,
  //   group,
  // })),
  // resourcesType: Object.values(ResourceTypeName).map((type) => ({
  //   loaded: false,
  //   type,
  // })),
  resources: [],
  loaded: false,
  error: '',
  loading: false,
};

export const resourcesFeature = createFeature({
  name: resourcesFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Load Resources
     */
    on(ResourcesActions.loadAllResources, (state) => ({
      ...state,
      loading: false,
    })),

    /**
     * - Load Resources Success
     */
    on(ResourcesAPIActions.loadResourcesSuccess, (state, { resources }) => ({
      ...state,
      loaded: true,
      resources,
      error: '',
      loading: false,
    })),

    /**
     * - Load Resources Failure
     */
    on(ResourcesAPIActions.loadResourcesFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }))
  ),
});
