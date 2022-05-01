import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./settings-page.component.html`,
})
export class SettingsPageComponent {}
