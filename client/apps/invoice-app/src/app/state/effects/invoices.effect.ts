import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiActions } from '@lbk/auth';
import { DialogService } from '@ngneat/dialog';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, Observable, of, tap } from 'rxjs';
import { INVOICES_SERVICE } from '../../shared';
import { InvoicesActions, InvoicesAPIActions } from '../actions';
import { InvoicesService } from '../services';

@Injectable({ providedIn: 'root' })
export class InvoicesEffects {
  /**
   * - Login Success
   */
  loginSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthApiActions.loginSuccess, InvoicesActions.loadInvoices),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([, service]) => {
        return service.getInvoices().pipe(
          map((invoices) =>
            InvoicesAPIActions.loadInvoicesSuccess({ invoices })
          ),
          catchError((error) =>
            of(InvoicesAPIActions.loadInvoicesFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * - Delete Invoice
   */
  deleteInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesActions.deleteInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ invoice_id }, service]) =>
        service.deleteInvoice(invoice_id).pipe(
          map(() => InvoicesAPIActions.deleteInvoiceSuccess({ invoice_id })),
          tap(() => this._router.navigate(['/home'])),
          catchError((error) =>
            of(InvoicesAPIActions.deleteInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  /**
   *  - mask As Paid
   */
  maskAsPaid$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesActions.maskAsPaid),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ invoice_id }, service]) =>
        service.maskAsPaid(invoice_id).pipe(
          // Mask As Paid Success
          map(() => InvoicesAPIActions.maskAsPaidSuccess({ invoice_id })),
          tap(
            () => {
              // Show Dialog Mask As Paid Success
              this._dialogService.success({
                title: 'Mask As Paid Success',
                body: 'Invoice has been marked as paid',
              });
            },
            () => {
              // Show Dialog Mask As Paid Failed
              this._dialogService.success({
                title: 'Mask As Paid Failed',
                body: 'Something went wrong. Please try again later',
              });
            }
          ),
          catchError((error) =>
            of(InvoicesAPIActions.maskAsPaidFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Update Invoice
   */
  updateInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesActions.updateInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ updateInvoiceDTO }, service]) =>
        service.updateInvoice(updateInvoiceDTO).pipe(
          map(() =>
            InvoicesAPIActions.updateInvoiceSuccess({ updateInvoiceDTO })
          ),
          catchError((error) =>
            of(InvoicesAPIActions.updateInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  /**
   * - Create Invoice
   */
  createInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(InvoicesActions.createInvoice),
      concatLatestFrom(() => this._invoicesService),
      exhaustMap(([{ createInvoiceDTO }, service]) =>
        service.createInvoice(createInvoiceDTO).pipe(
          map((invoice) =>
            InvoicesAPIActions.createInvoiceSuccess({ invoice })
          ),
          catchError((error) =>
            of(InvoicesAPIActions.createInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _router: Router,
    @Inject(INVOICES_SERVICE)
    private readonly _invoicesService: Observable<InvoicesService>,
    private readonly _dialogService: DialogService
  ) {}
}
