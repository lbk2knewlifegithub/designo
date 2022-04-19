import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from '../../../../shared';

@Component({
  selector: 'lbk-product-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="grid gap-[88px] md:gap-[120px] 2xl:gap-[160px]">
      <!-- add product to cart -->
      <lbk-add-product-to-cart
        (addToCart)="onAddToCart($event)"
        [product]="product"
      ></lbk-add-product-to-cart>
      <!-- end add product to cart -->

      <div
        class="grid gap-[88px] md:gap-[120px] 2xl:grid-cols-5 2xl:gap-[125px]"
      >
        <!-- features -->
        <lbk-features
          class="2xl:col-span-3"
          [features]="product.features"
        ></lbk-features>
        <!-- end features -->

        <!-- in the box -->
        <lbk-include-preview-list
          class="2xl:col-span-2"
          [includes]="product.includes"
        ></lbk-include-preview-list>
        <!-- end in the box -->
      </div>

      <!-- gallery -->
      <lbk-gallery [gallery]="product.gallery"></lbk-gallery>
      <!-- end gallery -->
    </section>
  `,
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{
    quantity: number;
    product: Product;
  }>();

  onAddToCart(quantity: number) {
    this.addToCart.emit({ product: this.product, quantity });
  }
}
