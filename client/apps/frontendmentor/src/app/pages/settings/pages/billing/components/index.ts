import { BillingDetailsComponent } from './billing-details.component';
import * as fromPaymentHistory from './payment-history';

export const COMPONENTS = [
  BillingDetailsComponent,
  ...fromPaymentHistory.COMPONENTS,
];
