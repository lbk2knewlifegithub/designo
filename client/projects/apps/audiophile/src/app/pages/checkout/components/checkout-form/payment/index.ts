import { CashOnDeliveryComponent } from './cash-on-delivery.component';
import * as fromEMoneyForm from './e-money-form';
import * as fromPaymentMethod from './payment-method';
import { PaymentComponent } from './payment.component';

export const COMPONENTS = [
  PaymentComponent,
  CashOnDeliveryComponent,
  fromEMoneyForm.COMPONENTS,
  fromPaymentMethod.COMPONENTS,
];
