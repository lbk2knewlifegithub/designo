import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { HomeActions } from './actions';

@Injectable({ providedIn: 'root' })
export class HomeEffects {
  /**
   * - Auto Close Create Invoice Overlay when navigating to Another Page
   */
  closeCreateInvoiceOverlay$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        tap(() => this._store.dispatch(HomeActions.closeCreateInvoiceOverlay()))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _store: Store
  ) {}
}
