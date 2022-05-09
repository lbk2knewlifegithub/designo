import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Address } from '../../../../shared';

@Component({
  selector: 'lbk-address',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class.md:text-right]="textRightMedium"
      class="text-sm text-muted-900 dark:text-muted-800"
    >
      <p>{{ address.street }}</p>
      <p>{{ address.city }}</p>
      <p>{{ address.postCode }}</p>
      <p>{{ address.country }}</p>
    </div>
  `,
})
export class SenderAddressComponent {
  @Input() address!: Address;

  /**
   * Test right in medium breakpoint
   */
  @Input() textRightMedium = false;
}
