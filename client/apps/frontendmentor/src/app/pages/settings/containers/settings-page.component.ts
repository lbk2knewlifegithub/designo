import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-settings-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header title="SETTINGS">
      <lbk-links></lbk-links>
    </lbk-sub-header>

    <router-outlet></router-outlet>
  `,
})
export class SettingsPageComponent {}
