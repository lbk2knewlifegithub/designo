import { authFeature } from './auth.reducer';

export const { selectUser, selectPending, selectReturnUrl, selectError } =
  authFeature;