import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../../shared';

/**
 * - Responsible for displaying product information. intended for readability.
 *
 * -> Includes:
 * -  Is new product?
 * -  The name of the product.
 * -  The price of the product.
 * -  The description of the product.
 * -  The price of the product.
 */
@Component({
  selector: 'lbk-product-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-left">
      <!-- new product -->
      <p *ngIf="isNew" class="text-sm text-primary-900">NEW PRODUCT</p>
      <!-- end new product -->

      <!-- name -->
      <lbk-product-name
        [class.mt-0]="!isNew"
        class="block mt-6 md:mt-4"
        [product]="product"
      ></lbk-product-name>
      <!-- end name -->

      <!-- description -->
      <p class="max-w-[445px] mt-6 text-base font-medium text-gray-400 md:mt-8">
        {{ product.description }}
      </p>
      <!-- end description -->

      <!-- price -->
      <lbk-price class="block mt-6 md:mt-8" [value]="product.price"></lbk-price>
      <!-- end price -->
    </div>
  `,
})
export class ProductInfoComponent {
  @Input() product!: Product;

  get isNew(): boolean {
    return this.product.new;
  }
}
