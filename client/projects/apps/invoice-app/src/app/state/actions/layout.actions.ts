import { createAction } from '@ngrx/store';

/**
 * - Dark Theme
 */
export const loadTheme = createAction('[Layout] Load Theme');
export const toDarkTheme = createAction('[Layout] To Dark Theme');
export const toLightTheme = createAction('[Layout] To Light Theme');
