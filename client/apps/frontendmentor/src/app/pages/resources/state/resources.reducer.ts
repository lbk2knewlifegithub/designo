import { createFeature, createReducer, on } from '@ngrx/store';
import { Resource, ResourceGroup, ResourceType } from '../../../shared';
import { ResourcesAPIActions } from './actions';

export const resourcesFeatureKey = 'resources';

export interface State {
  resourcesGroup: { loaded: boolean; group: ResourceGroup }[];
  resourcesType: { loaded: boolean; type: ResourceType }[];
  resources: Resource[];
  loaded: boolean;
  error: string;
}

export const initialState: State = {
  resourcesGroup: Object.values(ResourceGroup).map((group) => ({
    loaded: false,
    group,
  })),
  resourcesType: Object.values(ResourceType).map((type) => ({
    loaded: false,
    type,
  })),
  resources: [],
  loaded: false,
  error: '',
};

export const resourcesFeature = createFeature({
  name: resourcesFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Load Resources Success
     */
    on(ResourcesAPIActions.loadResourcesSuccess, (state, { resources }) => ({
      ...state,
      loaded: true,
      resources,
      error: '',
    })),

    /**
     * - Load Resources Failure
     */
    on(ResourcesAPIActions.loadResourcesFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),
});
