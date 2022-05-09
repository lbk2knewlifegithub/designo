import { inject, InjectionToken } from '@angular/core';
import { selectUser } from '@lbk/auth';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { InvoicesImplService, InvoicesStorageService } from '../../state';

export const INVOICES_SERVICE = new InjectionToken('Invoice Service', {
  factory: () => {
    const invoicesImplService = inject(InvoicesImplService);
    // const invoicesFakeService = inject(InvoicesFakeService);
    const invoicesStorageService = inject(InvoicesStorageService);
    const store = inject(Store);

    const loggedIn$ = store.select(selectUser).pipe(map((u) => !!u));
    return loggedIn$.pipe(
      map((loggedIn) =>
        loggedIn ? invoicesImplService : invoicesStorageService
      )
    );
  },
});
