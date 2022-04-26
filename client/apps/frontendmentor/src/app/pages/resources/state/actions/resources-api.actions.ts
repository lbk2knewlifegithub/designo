import { createAction, props } from '@ngrx/store';
import { Resource } from '../../../../shared';

export const loadResourcesSuccess = createAction(
  '[Resources/API] Load All Resources Success',
  props<{ resources: Resource[] }>()
);

export const loadResourcesFailure = createAction(
  '[Resources/API] Load All Resources Failure',
  props<{ error: string }>()
);
