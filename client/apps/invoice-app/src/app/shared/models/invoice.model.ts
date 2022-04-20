export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  invoice_id: number;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: PaymentTerms;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
}

export enum PaymentTerms {
  ONE_DAY = 1,
  SEVEN_DAYS = 7,
  THIRTY_DAYS = 30,
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  PAID = 'paid',
  PENDING = 'pending',
}
