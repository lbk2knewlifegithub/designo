import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInvoices from '../reducers/invoices.reducer';

/**
 * - Select Invoices Entities State
 */
export const selectInvoicesEntitiesState =
  createFeatureSelector<fromInvoices.State>(fromInvoices.invoicesFeatureKey);

/**
 * - Select Selected Invoice Id
 */
export const selectSelectedInvoiceId = createSelector(
  selectInvoicesEntitiesState,
  fromInvoices.getId
);

export const {
  /**
   * - Select Invoice Entities
   */
  selectEntities: selectInvoiceEntities,

  /**
   * - Select All Invoices
   */
  selectAll: selectAllInvoices,
} = fromInvoices.adapter.getSelectors(selectInvoicesEntitiesState);

/**
 * - Select Select Invoice
 */
export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * - Select Loaded
 */
export const selectLoaded = createSelector(
  selectInvoicesEntitiesState,
  fromInvoices.getLoaded
);
