import { BillingDetails, Item, Payment, ShippingInfo } from '../../shared';

export interface CheckoutDTO {
  billingDetails: BillingDetails;
  shippingInfo: ShippingInfo;
  payment: Payment;
  items: Item[];
}
