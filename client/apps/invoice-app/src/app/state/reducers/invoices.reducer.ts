import { AuthActions, AuthApiActions } from '@lbk/auth';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Invoice, InvoiceStatus } from '../../shared';
import { InvoicesActions, InvoicesAPIActions } from '../actions';

export const invoicesFeatureKey = 'invoices';

export interface State extends EntityState<Invoice> {
  selectedInvoiceId: number | null;
  loaded: boolean;
}

export const adapter: EntityAdapter<Invoice> = createEntityAdapter<Invoice>({
  selectId: (invoice: Invoice) => invoice.invoice_id,
  sortComparer: (invoice1, invoice2) =>
    new Date(invoice1.createdAt).getTime() -
    new Date(invoice2.createdAt).getTime(),
});

export const initialState: State = adapter.getInitialState({
  selectedInvoiceId: null,
  loaded: false,
});

export const reducer = createReducer(
  initialState,

  /**
   * - Reset To Initial State
   */
  on(
    AuthActions.logout,
    AuthApiActions.loginSuccess,
    AuthApiActions.signUpSuccess,
    () => initialState
  ),

  /**
   * - Load Invoices Success
   */
  on(InvoicesAPIActions.loadInvoicesSuccess, (state, { invoices }) =>
    adapter.addMany(invoices, state)
  ),

  /**
   * - Load INVOICE
   * - Create Invoice Success
   */
  on(
    InvoicesActions.loadInvoice,
    InvoicesAPIActions.createInvoiceSuccess,
    (state, { invoice }) => adapter.addOne(invoice, state)
  ),

  /**
   * - Delete Invoice Success
   */
  on(InvoicesAPIActions.deleteInvoiceSuccess, (state, { invoice_id }) =>
    adapter.removeOne(invoice_id, state)
  ),

  /**
   * - Mask As Paid Success
   */
  on(InvoicesAPIActions.maskAsPaidSuccess, (state, { invoice_id }) =>
    adapter.updateOne(
      { id: invoice_id, changes: { status: InvoiceStatus.PAID } },
      state
    )
  ),

  /**
   * -Update Invoice Success
   */
  on(InvoicesAPIActions.updateInvoiceSuccess, (state, { updateInvoiceDTO }) => {
    const { invoice_id, ...rest } = updateInvoiceDTO;
    const invoice = state.entities[invoice_id];
    if (!invoice) return state;

    return adapter.updateOne(
      {
        id: invoice_id,
        changes: { ...rest },
      },
      state
    );
  }),

  /**
   * - Select Invoice
   */
  on(InvoicesActions.selectInvoice, (state, { invoice_id }) => ({
    ...state,
    selectedInvoiceId: invoice_id,
  }))
);

export const getId = (state: State) => state.selectedInvoiceId;
export const getLoaded = (state: State) => state.loaded;
