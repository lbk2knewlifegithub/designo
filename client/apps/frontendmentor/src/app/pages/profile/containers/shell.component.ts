import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lbk-shell-profile-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lbk-sub-header title="PROFILE">
      <lbk-links></lbk-links>
    </lbk-sub-header>
    <router-outlet></router-outlet>
  `,
})
export class ShellComponent {}
