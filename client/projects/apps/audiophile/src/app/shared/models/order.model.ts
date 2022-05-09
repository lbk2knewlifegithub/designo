import { Item } from './';

export interface BillingDetails {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface ShippingInfo {
  address: string;
  zipCode: number;
  city: number;
  country: number;
}

export interface EMoney {
  accountNumber: number;
  pin: number;
}

export interface Payment {
  cashOnDelivery: boolean;
  eMoney: EMoney;
}

export interface Order {
  id: number;
  items: Item[];
  billingDetails: BillingDetails;
  shippingInfo: ShippingInfo;
  payment: Payment;
}
