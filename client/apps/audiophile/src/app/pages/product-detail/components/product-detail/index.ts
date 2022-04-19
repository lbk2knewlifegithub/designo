import * as fromAddProductToCart from './add-product-to-cart';
import { FeaturesComponent } from './features.component';
import { GalleryComponent } from './gallery.component';
import * as fromIncludePreviewList from './includes-preview-list';
import { ProductDetailComponent } from './product-detail.component';

export const COMPONENTS = [
  ProductDetailComponent,
  FeaturesComponent,
  GalleryComponent,
  fromIncludePreviewList.COMPONENTS,
  fromAddProductToCart.COMPONENTS,
];
