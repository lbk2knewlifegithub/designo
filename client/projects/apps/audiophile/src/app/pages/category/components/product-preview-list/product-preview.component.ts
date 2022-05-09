import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../shared';

@Component({
  selector: 'lbk-product-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="grid place-items-center gap-8 md:gap-14 2xl:grid-cols-2 2xl:gap-[125px]"
    >
      <lbk-image
        [class.order-last]="rtl"
        class="block rounded-lg overflow-hidden"
        [image]="product.categoryImage"
      ></lbk-image>

      <div class="text-center 2xl:text-left">
        <!-- new product -->
        <p *ngIf="isNew" class="text-sm text-primary-900">NEW PRODUCT</p>
        <!-- end new product -->

        <!-- name -->
        <h2
          [class.mt-0]="!isNew"
          class="font-bold text-2xl uppercase mt-6 md:text-4xl 2xl:mt-4"
          [innerHtml]="product.name | productName: product.category"
        ></h2>
        <!-- end name -->

        <!-- description -->
        <p class="text-gray-400 font-medium mt-6 mx-auto max-w-lg md:mt-8">
          {{ product.description }}
        </p>
        <!-- end description -->

        <!-- see product -->
        <a
          [routerLink]="['/product', product.slug]"
          class="btn btn-primary mt-6 md:mt-10 2xl:mt-14"
          >See product</a
        >
        <!-- end see product -->
      </div>
    </div>
  `,
})
export class ProductPreviewComponent {
  @Input() product!: Product;
  @Input() rtl!: boolean;

  get isNew(): boolean {
    return this.product.new;
  }
}
