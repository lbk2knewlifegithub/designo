import { Injectable } from '@angular/core';
import { FeedbackCategory } from '@lbk/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { map, tap } from 'rxjs';
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

  /**
   * - Change Category
   */
  changeCategory$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        map((route) => route.payload.routerState.root.queryParams['category']),
        tap((category) => {
          if (!category) return;
          if (!Object.values(FeedbackCategory).includes(category)) return;
          this._facade.setCategory(category);
        })
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
