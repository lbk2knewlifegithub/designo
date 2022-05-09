import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lbk-amount',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p class="font-bold text-gray-400">x{{ amount }}</p> `,
})
export class AmountComponent {
  @Input() amount!: number;
}
