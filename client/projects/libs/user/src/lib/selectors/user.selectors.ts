import { userFeature } from '../reducer/user.reducer';

export const {
  selectUser,
  selectPending,
  selectError,
  selectAlreadyTryLogin,
  selectUpdatingProfile,
  selectUpdatingEmailSettings,
} = userFeature;
