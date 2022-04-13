import { InjectionToken } from '@angular/core';

// API AUTH URL
export const API_AUTH_URL = new InjectionToken<string>('API_AUTH_URL');

// API IMAGES URL
export const API_IMAGES_URL = new InjectionToken<string>('API_IMAGES_URL');

// API PRODUCT FEEDBACKS URL
export const API_PRODUCT_FEEDBACKS_URL = new InjectionToken<string>(
  'API_PRODUCT_FEEDBACKS_URL'
);

// CLIENT URL URL
export const CLIENT_AUTH_URL = new InjectionToken<string>('CLIENT_AUTH_URL');

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
