import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { Observable, of } from 'rxjs';
import { InvoiceDetailsPageComponent } from '../containers';

@Injectable({ providedIn: 'root' })
export class InvoiceFormGuard
  implements CanDeactivate<InvoiceDetailsPageComponent>
{
  constructor(private readonly _dialogService: DialogService) {}

  canDeactivate(
    viewInvoicePageComponent: InvoiceDetailsPageComponent
  ): Observable<boolean> {
    const invoiceForm =
      viewInvoicePageComponent.editOverLayComponent?.invoiceForm;

    if (invoiceForm.dirty)
      return this._dialogService.confirm({
        title: 'You have unsaved changes',
        body: 'Are you sure you want to leave this page?',
      }).afterClosed$;

    return of(true);
  }
}
