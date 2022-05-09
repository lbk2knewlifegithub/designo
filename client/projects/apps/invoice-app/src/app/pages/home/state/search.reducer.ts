// import { createReducer, on } from '@ngrx/store';
// import { InvoicesAPIActions } from '../../../state';
// import { HomeActions } from './actions';

// export const searchFeatureKey = 'search';

// export interface State {
//   ids: number[];
//   status: string;
// }

// const initialState: State = {
//   ids: [],
//   status: '',
// };

// export const reducer = createReducer(
//   initialState,
//   /**
//    * - Filter By Status
//    */
//   on(HomeActions.filterByStatus, (state, { status }) => ({ ...state, status })),

//   /**
//    * - Search Invoice Success
//    */
//   on(InvoicesAPIActions.searchInvoiceSuccess, (state, { invoices }) => ({
//     ids: invoices.map((i) => i.id),
//     status: state.status,
//   }))
// );

// export const getIds = (state: State) => state.ids;
// export const getStatus = (state: State) => state.status;
