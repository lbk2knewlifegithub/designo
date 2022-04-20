import { createFeature, createReducer, on } from '@ngrx/store';
import { InvoicesActions, InvoicesAPIActions } from '../../../state';
import { InvoiceDetails } from './actions';

export const invoiceDetailsFeatureKey = 'invoiceDetailsPage';

export interface State {
  error: string | null;
  shownUpdateOverlay: boolean;
  pendingMaskAsPaid: boolean;
  pendingSaveAndChange: boolean;
  pendingDelete: boolean;
}

export const initialState: State = {
  error: null,
  pendingMaskAsPaid: false,
  pendingSaveAndChange: false,
  pendingDelete: false,
  shownUpdateOverlay: false,
};

export const invoiceDetailsFeature = createFeature({
  name: invoiceDetailsFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Mask As Paid
     */
    on(InvoicesActions.maskAsPaid, (state) => ({
      ...state,
      error: null,
      pendingMaskAsPaid: true,
    })),
    /**
     * - Update Invoice
     */
    on(InvoicesActions.updateInvoice, (state) => ({
      ...state,
      error: null,
      pendingSaveAndChange: true,
    })),

    /**
     * - Delete Invoice
     */
    on(InvoicesActions.deleteInvoice, (state) => ({
      ...state,
      error: null,
      pendingDelete: true,
    })),
    /**
     * - Mask As Paid Success
     * - Update Invoice Success
     * - Delete Invoice Success
     * Will make the pendingMaskAsPaid, pendingSaveAndChange, pendingDelete to false
     */
    on(
      InvoicesAPIActions.maskAsPaidSuccess,
      InvoicesAPIActions.updateInvoiceSuccess,
      InvoicesAPIActions.deleteInvoiceSuccess,
      () => initialState
    ),
    /**
     * - Mask As Paid Failure
     * - Update Invoice Failure
     * - Delete Invoice Failure
     * Will make the pendingMaskAsPaid, pendingSaveAndChange, pendingDelete to false
     */
    on(
      InvoicesAPIActions.maskAsPaidFailure,
      InvoicesAPIActions.updateInvoiceFailure,
      InvoicesAPIActions.deleteInvoiceFailure,
      (state, { error }) => ({
        ...state,
        error,
        pendingMaskAsPaid: false,
        pendingSaveAndChange: false,
        pendingDelete: false,
      })
    ),
    /**
     * - Show Update Invoice Overlay
     */
    on(InvoiceDetails.showUpdateOverlay, (state) => ({
      ...state,
      shownUpdateOverlay: true,
    })),

    /**
     * - Close Update Invoice Overlay
     */
    on(InvoiceDetails.closeUpdateOverlay, (state) => ({
      ...state,
      shownUpdateOverlay: false,
    }))
  ),
});
