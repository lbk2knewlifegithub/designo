import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { TagsActions, TagsAPIActions } from '../actions';
import { TagsService } from '../services';
import { TAGS_SERVICE } from './../../shared/tokens/index';

@Injectable({ providedIn: 'root' })
export class TagsEffects {
  /**
   * - Load Tags
   */
  loadTags$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TagsActions.loadTags),
      exhaustMap(() => {
        return this._tagsService.getAllTags().pipe(
          /**
           * - Load All Tags Success
           */
          map((tags) => TagsAPIActions.loadTagsSuccess({ tags })),

          /**
           * - Load All Tags Failure
           */
          catchError(({ error }) =>
            of(TagsAPIActions.loadTagsFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    @Inject(TAGS_SERVICE)
    private readonly _tagsService: TagsService
  ) {}
}
