import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { tap } from 'rxjs';
import { HomeFacade } from './home.facade';

/**
 * - Home Effects
 */
@Injectable({ providedIn: 'root' })
export class HomeEffects {
  /**
   * - Auto Close Sidebar When Navigate
   */
  autoCloseOverlay$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        tap(() => this._facade.closeSidebar())
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _facade: HomeFacade
  ) {}
}
