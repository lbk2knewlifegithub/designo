import { createAction, props } from '@ngrx/store';
import { ResourceGroup } from '@lbk/fm/shared';

export const loadResourcesGroupSuccess = createAction(
  '[Resources/API] Load Resources Group',
  props<{ resourcesGroup: ResourceGroup[] }>()
);

export const loadResourcesGroupFailure = createAction(
  '[Resources/API] Load All Resources Failure',
  props<{ error: string }>()
);
