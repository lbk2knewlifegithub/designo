import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsPageComponent } from './containers';
import { InvoiceExistsGuard, InvoiceFormGuard, PendingGuard } from './guards';

const routes: Routes = [
  {
    path: ':invoice_id',
    component: InvoiceDetailsPageComponent,
    canActivate: [InvoiceExistsGuard],
    canDeactivate: [InvoiceFormGuard, PendingGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [InvoiceFormGuard],
})
export class ViewInvoiceRoutingModule {}
