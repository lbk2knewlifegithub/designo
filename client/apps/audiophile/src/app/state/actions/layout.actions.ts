import { createAction } from '@ngrx/store';

/**
 * - Nav overlay actions
 */
export const toggleNavOverlay = createAction('[Layout] Toggle Nav Overlay');
export const closeNavOverlay = createAction('[Layout] Close Nav Overlay');

/**
 * - Cart overlay actions
 */
export const toggleCartOverlay = createAction('[Layout] Toggle Cart Overlay');
export const closeCartDialog = createAction('[Layout] Close Cart Overlay');

export const closeAll = createAction('[Layout] Close All Dialog');
