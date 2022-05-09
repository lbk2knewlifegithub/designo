import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '../../../../shared';

@Component({
  selector: 'lbk-shipping',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-price [value]="shipping" [options]="priceOptions"></lbk-price>
  `,
})
export class ShippingComponent {
  @Input() shipping!: number;
  priceOptions: PriceOptions = { title: 'Shipping' };
}
