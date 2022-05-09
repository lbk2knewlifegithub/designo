import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '../../../../shared';

@Component({
  selector: 'lbk-bill-to',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-3 md:space-y-2">
      <span class="text-muted-900 dark:text-muted-800">Bill To</span>
      <h4>{{ clientName }}</h4>

      <lbk-address class="block" [address]="clientAddress"></lbk-address>
    </div>
  `,
})
export class BillToComponent {
  @Input() clientName!: string;
  @Input() clientAddress!: Address;
}
