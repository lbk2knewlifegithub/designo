import * as fromBillingDetails from './billing-details';
import { CheckoutFormComponent } from './checkout-form.component';
import { InputComponent } from './input.component';
import * as fromPayment from './payment';
import * as fromShippingInfo from './shipping-info';

export const COMPONENTS = [
  fromBillingDetails.COMPONENTS,
  fromShippingInfo.COMPONENTS,
  fromPayment.COMPONENTS,
  CheckoutFormComponent,
  InputComponent,
];
