import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
} from '@angular/core';
import { PriceModule, PriceOptions } from './price';
import { QuantityModule } from './quantity/quantity.module';

@Component({
  selector: 'lbk-total',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-price [value]="total" [options]="priceOptions"></lbk-price>
  `,
})
export class TotalComponent {
  @Input() total!: number;
  priceOptions: PriceOptions = {
    title: 'total',
  };
}

@NgModule({
  imports: [
    // Shared Components from Audiopile
    QuantityModule,
    PriceModule,
  ],
  exports: [TotalComponent],
  declarations: [TotalComponent],
})
export class TotalModule {}
