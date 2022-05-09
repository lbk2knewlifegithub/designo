import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-account-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./account-page.component.html`,
})
export class AccountPageComponent {}
