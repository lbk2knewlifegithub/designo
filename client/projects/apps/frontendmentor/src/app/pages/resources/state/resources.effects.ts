import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ResourcesActions, ResourcesAPIActions } from './actions';
import { RESOURCES_SERVICE } from './resources.token';
import { ResourcesService } from './services';

@Injectable({ providedIn: 'root' })
export class ResourcesEffects {
  /**
   * - Load Resources Groups
   */
  loadReourcesGroup$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ResourcesActions.loadAllResources),
      exhaustMap(() =>
        this._resourcesService.getResourcesGroup().pipe(
          /**
           * - Load Resources Group Success
           */
          map((resourcesGroup) =>
            ResourcesAPIActions.loadResourcesGroupSuccess({ resourcesGroup })
          ),
          /**
           * - Load Resources Group Failure
           */
          catchError((error) =>
            of(ResourcesAPIActions.loadResourcesGroupFailure(error))
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
