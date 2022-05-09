import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./profile-page.component.html`,
})
export class ProfilePageComponent {}
