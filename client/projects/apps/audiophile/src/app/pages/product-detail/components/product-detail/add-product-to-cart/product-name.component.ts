import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../../shared';

@Component({
  selector: 'lbk-product-name',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2
      class="font-bold text-2xl uppercase mt-6 md:text-4xl"
      [innerHtml]="product.name | productName: product.category"
    ></h2>
  `,
})
export class ProductNameComponent {
  @Input() product!: Product;
}
