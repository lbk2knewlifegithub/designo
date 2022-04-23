export interface Address {
  address_id: number;
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  item_id: number;
  name: string;
  quantity: number;
  price: number;
}

const ITEM_DEFAULT: Item = {
  item_id: 1,
  name: '',
  price: 1,
  quantity: 1,
};

export const ITEM_KEYS = Object.keys(ITEM_DEFAULT);

export interface Invoice {
  invoice_id: number;
  createdAt: string;
  description: string;
  paymentTerms: PaymentTerms;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items?: Item[];
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

export type RandomInvoice = Omit<Invoice, 'invoice_id'>;
