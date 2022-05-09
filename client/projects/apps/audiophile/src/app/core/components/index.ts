import * as fromCart from './cart';
import * as fromFooter from './footer';
import * as fromHeader from './header';

export const COMPONENTS = [
  ...fromFooter.COMPONENTS,
  ...fromHeader.COMPONENTS,
  ...fromCart.COMPONENTS,
];
