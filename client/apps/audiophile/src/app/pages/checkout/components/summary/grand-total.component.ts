import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '../../../../shared';

@Component({
  selector: 'lbk-grand-total',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-price [value]="grandTotal" [options]="priceOptions"></lbk-price>
  `,
})
export class GrandTotalComponent {
  @Input() grandTotal!: number;
  priceOptions: PriceOptions = {
    title: 'grand total',
    color: 'text-primary-900',
  };
}
