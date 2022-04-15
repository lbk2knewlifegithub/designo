import { InjectionToken } from '@angular/core';

// API URL
export const API_URL = new InjectionToken<string>('API_URL');

// CLIENT PRODUCT FEEDBACKS URL
export const CLIENT_PRODUCT_FEEDBACKS_URL = new InjectionToken<string>(
  'CLIENT_PRODUCT_FEEDBACKS_URL'
);

// DEFAULT AVATAR
export const DEFAULT_AVATAR = new InjectionToken<string>('DEFAULT_AVATAR', {
  factory: () =>
    'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/dc/dc8cf07e4359374d5958451ac2410efa1d530683_full.jpg',
});

// Local Storage Token
function storageFactory() {
  return typeof window === undefined || typeof localStorage === undefined
    ? null
    : localStorage;
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken('local-storage', {
  factory: storageFactory,
});
