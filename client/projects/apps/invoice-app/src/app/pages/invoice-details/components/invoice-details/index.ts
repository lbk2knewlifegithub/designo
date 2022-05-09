import { SenderAddressComponent } from './address.component';
import { BillToComponent } from './bill-to.component';
import { DateComponent } from './date.component';
import { GrandTotalComponent } from './grand-total.component';
import { InvoiceDetailsComponent } from './invoice-details.component';
import * as fromInvoiceItemList from './invoice-item-list';
import { InvoiceStatusDetailComponent } from './invoice-status-details.component';
import { SendToComponent } from './send-to.component';

export const COMPONENTS = [
  InvoiceDetailsComponent,
  InvoiceStatusDetailComponent,
  SenderAddressComponent,
  DateComponent,
  BillToComponent,
  SendToComponent,
  fromInvoiceItemList.COMPONENTS,
  GrandTotalComponent,
];
