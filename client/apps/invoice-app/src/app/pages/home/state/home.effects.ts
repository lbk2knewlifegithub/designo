import { Injectable } from '@angular/core';
import { AuthApiActions } from '@lbk/auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { tap } from 'rxjs';
import { InvoicesFacade } from '../../../state';
import { HomeFacade } from './home.facade';

@Injectable({ providedIn: 'root' })
export class HomeEffects {
  /**
   * - Auto Close Create Invoice Overlay when navigating to Another Page
   */
  closeCreateInvoiceOverlay$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerNavigatedAction),
        tap(() => this._homeFacade.closeCreateInvoiceOverlay())
      ),
    {
      dispatch: false,
    }
  );

  /**
   * - When Logout Successfully, Reset Invoices
   */
  logoutSuccess = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthApiActions.logoutSuccess),
        tap(() => {
          this._invoicesFacade.loadAllInvoices(true);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _invoicesFacade: InvoicesFacade,
    private readonly _homeFacade: HomeFacade
  ) {}
}
