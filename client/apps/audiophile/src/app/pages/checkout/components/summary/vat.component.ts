import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceOptions } from '../../../../shared';

@Component({
  selector: 'lbk-vat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <lbk-price [value]="vat" [options]="priceOptions"></lbk-price> `,
})
export class VatComponent {
  @Input() vat!: number;
  priceOptions: PriceOptions = { title: 'Vat (included)' };
}
