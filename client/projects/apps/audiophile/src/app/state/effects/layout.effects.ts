import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { tap } from 'rxjs';
import { LayoutFacade } from '../facade';

@Injectable({ providedIn: 'root' })
export class LayoutEffects {
  /**
   * - Auto Close All Overlay
   */
  closeAll$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        tap(() => {
          this._layoutFacade.closeAll();
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _layoutFacade: LayoutFacade
  ) {}
}
