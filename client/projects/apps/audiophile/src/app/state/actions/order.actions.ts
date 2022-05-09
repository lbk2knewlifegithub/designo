import { createAction, props } from '@ngrx/store';
import { BillingDetails, Payment, ShippingInfo, Item } from '../../shared';

export const pay = createAction(
  '[Order] Pay',
  props<{
    billingDetails: BillingDetails;
    shippingInfo: ShippingInfo;
    payment: Payment;
    items: Item[];
  }>()
);
