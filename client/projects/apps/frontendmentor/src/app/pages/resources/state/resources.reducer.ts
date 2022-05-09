import { createFeature, createReducer, on } from '@ngrx/store';
import { ResourceGroup } from './../../../shared/models/resource.model';
import { ResourcesActions, ResourcesAPIActions } from './actions';

export const resourcesFeatureKey = 'resources';

export interface State {
  // resourcesGroup: { loaded: boolean; group: ResourceGroupName }[];
  // resourcesType: { loaded: boolean; type: ResourceTypeName }[];
  resourcesGroup: ResourceGroup[];
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
  resourcesGroup: [],
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
    on(
      ResourcesAPIActions.loadResourcesGroupSuccess,
      (state, { resourcesGroup }) => ({
        ...state,
        loaded: true,
        resourcesGroup,
        error: '',
        loading: false,
      })
    ),

    /**
     * - Load Resources Failure
     */
    on(ResourcesAPIActions.loadResourcesGroupFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    }))
  ),
});
