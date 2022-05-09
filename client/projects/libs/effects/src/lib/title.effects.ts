import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';

/**
 * - Title Effects
 */
@Injectable({ providedIn: 'root' })
export class TitleEffects {
  /**
   * - Update Title
   */
  updateTitle$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        concatLatestFrom(() =>
          this._store.select(getSelectors().selectRouteData)
        ),
        map(([, data]) => data['title']),
        tap((title) => {
          if (title) this._titleService.setTitle(title);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store,
    private readonly _titleService: Title
  ) {}
}
