import { UserActions, UserAPIActions } from '@lbk/user';
import { createFeature, createReducer, on } from '@ngrx/store';
import { InvoiceStatus } from '../../../shared';
import { InvoicesActions, InvoicesAPIActions } from '../../../state';
import { HomeActions } from './actions';

export const homeFeatureKey = 'homePage';

export interface State {
  error: string;
  shownCreateInvoiceOverlay: boolean;
  pendingSaveAsDraft: boolean;
  pendingCreate: boolean;
  loadingInvoices: boolean;
  filterByStatus: InvoiceStatus | null;
}

export const initialState: State = {
  error: '',
  shownCreateInvoiceOverlay: false,
  pendingSaveAsDraft: false,
  pendingCreate: false,
  loadingInvoices: false,
  filterByStatus: null,
};

export const homeFeature = createFeature({
  name: homeFeatureKey,
  reducer: createReducer(
    initialState,

    /**
     * - Logout
     * - Create Invoice Success
     */
    on(
      UserActions.logout,
      InvoicesAPIActions.createInvoiceSuccess,
      () => initialState
    ),

    /**
     * - Create Invoice
     */
    on(InvoicesActions.createInvoice, (state, { createInvoiceDTO }) => ({
      ...state,
      error: '',
      pendingCreate: createInvoiceDTO.status === InvoiceStatus.PENDING,
      pendingSaveAsDraft: createInvoiceDTO.status === InvoiceStatus.DRAFT,
    })),

    /**
     * - Create Invoice Failure
     */
    on(InvoicesAPIActions.createInvoiceFailure, (state, { error }) => ({
      ...state,
      error,
      pendingCreate: false,
      pendingSaveAsDraft: false,
    })),

    /**
     * - Load Invoices
     */
    on(InvoicesActions.loadInvoices, (state) => ({
      ...state,
      loadingInvoices: true,
    })),

    /**
     * - Load Invoices Success
     */
    on(InvoicesAPIActions.loadInvoicesSuccess, (state) => ({
      ...state,
      loadingInvoices: false,
    })),
    /**
     * - Load Invoices Failures
     */
    on(InvoicesAPIActions.loadInvoicesFailure, (state) => ({
      ...state,
      loadingInvoices: false,
    })),

    /**
     * - Show Create Invoice Overlay
     */
    on(HomeActions.showCreateInvoiceOverlay, (state) => ({
      ...state,
      shownCreateInvoiceOverlay: true,
    })),

    /**
     * - Close Create Invoice Overlay
     */
    on(HomeActions.closeCreateInvoiceOverlay, (state) => ({
      ...state,
      shownCreateInvoiceOverlay: false,
    })),

    /**
     * - Filter By Status
     */
    on(HomeActions.filterByStatus, (state, { status }) => ({
      ...state,
      filterByStatus: status,
    }))
  ),
});

export const getError = (state: State) => state.error;
export const getPendingSaveDraft = (state: State) => state.pendingSaveAsDraft;
export const getPendingCreate = (state: State) => state.pendingCreate;
export const getLoadingInvoices = (state: State) => state.loadingInvoices;
export const getStatus = (state: State) => state.filterByStatus;
export const getShowNewInvoiceOverlay = (state: State) =>
  state.shownCreateInvoiceOverlay;
