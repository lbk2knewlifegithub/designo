import * as from from './address-form/address-form.component';
import * as fromBillToForm from './bill-to';
import * as fromFormHelper from './form-helper';
import { InvoiceFormTitleComponent } from './invoice-form-title';
import * as fromItemsForm from './items-form';

export const COMPONENTS = [
  fromItemsForm.COMPONENTS,
  fromFormHelper.COMPONENTS,
  fromBillToForm.COMPONENTS,
  from.AddressFormComponent,
  InvoiceFormTitleComponent,
];
