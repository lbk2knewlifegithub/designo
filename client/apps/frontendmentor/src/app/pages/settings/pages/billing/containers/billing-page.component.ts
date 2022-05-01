import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-billing-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./billing-page.component.html`,
})
export class BillingPageComponent {}
