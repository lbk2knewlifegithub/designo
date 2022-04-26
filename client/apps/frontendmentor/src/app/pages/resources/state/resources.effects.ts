import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ResourcesActions, ResourcesAPIActions } from './actions';
import { RESOURCES_SERVICE } from './resources.token';
import { ResourcesService } from './services';

@Injectable({ providedIn: 'root' })
export class ResourcesEffects {
  /**
   * - Load Resources
   */
  loadAllResources$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ResourcesActions.loadAllResources),
      exhaustMap(() =>
        this._resourcesService.getAllResources().pipe(
          /**
           * - Load All Resources Success
           */
          map((resources) =>
            ResourcesAPIActions.loadResourcesSuccess({ resources })
          ),
          /**
           * - Load Resources Failure
           */
          catchError((error) =>
            of(ResourcesAPIActions.loadResourcesFailure(error))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(RESOURCES_SERVICE)
    private readonly _resourcesService: ResourcesService
  ) {}
}
