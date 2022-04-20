import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LayoutActions } from '../actions';
import { ThemeService } from '../services';

@Injectable({ providedIn: 'root' })
export class LayoutEffects {
  /**
   *  - To Dark Theme
   */
  toDarkThem$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LayoutActions.toDarkTheme),
        tap(() => this._themeService.toDarkTheme())
      ),
    { dispatch: false }
  );

  /**
   * - To Light Theme
   */
  toLightTheme$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(LayoutActions.toLightTheme),
        tap(() => this._themeService.toLightTheme())
      ),
    { dispatch: false }
  );

  /**
   * - Load theme
   */
  loadTheme$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LayoutActions.loadTheme),
      exhaustMap(() =>
        this._themeService.getTheme().pipe(
          map((darkTheme) =>
            darkTheme
              ? LayoutActions.toDarkTheme()
              : LayoutActions.toLightTheme()
          ),
          catchError(() => of(LayoutActions.toLightTheme()))
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _themeService: ThemeService
  ) {}
}
